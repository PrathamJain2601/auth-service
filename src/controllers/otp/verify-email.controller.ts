import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import { verifyVerificationToken } from "../../utils/jwt.util";
import { responseCodes } from "../../utils/response-codes.util";

const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token) {
        return responseCodes.clientError.badRequest(res, null, "Token is required");
    }

    try {
        const decoded = verifyVerificationToken(token as string);
        const email = decoded.sub; 

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return responseCodes.clientError.notFound(res, "User not found");
        }

        if (user.isVerified) {
            return responseCodes.clientError.badRequest(res, null, "Email already verified");
        }

        const otpRecord = await prisma.otp.findFirst({
            where: { email: user.email },
            orderBy: { createdAt: 'desc' },  
        });

        if (!otpRecord) {
            return responseCodes.clientError.badRequest(res, null, "OTP not found");
        }

        const currentTime = new Date();
        const otpExpirationTime = otpRecord.createdAt.getTime() + 10 * 60 * 1000; 

        if (currentTime.getTime() > otpExpirationTime) {
            return responseCodes.clientError.badRequest(res, null, "OTP has expired");
        }

        await prisma.user.update({
            where: { email: email },
            data: { isVerified: true },
        });

        await prisma.otp.delete({
            where: { id: otpRecord.id },
        });

        return responseCodes.success.ok(res, null, "Email successfully verified");
    } catch (error) {
        console.error("Error verifying email: ", error);
        return responseCodes.serverError.internalServerError(res, "An error occurred while verifying the email");
    }
};

export { verifyEmail };
