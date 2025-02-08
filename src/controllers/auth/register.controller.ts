    import { Request, Response } from "express"
    import { responseCodes } from "../../utils/response-codes.util";
    import { hashPassword } from "../../utils/hash.util";
    import { prisma } from "../../config/db.config";
    import { Prisma } from "@prisma/client";
    import { createAccessToken, createRefreshToken } from "../../utils/jwt.util";
    import { randomUUID } from "crypto";

    type registerRequest = {
        name: string,
        username?: string,
        email: string,
        password: string
    }
    export const register = async (req: Request, res: Response) => {
        let { name, username, email, password }: registerRequest = req.body;

        if(!name || !email || !password ){
            return responseCodes.clientError.notFound(res, "all fields are required");
        }

        try {
            
            const hashedPassword = await hashPassword(password);
            if(!username){
                username = randomUUID();
            }
            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    username: username,
                    password: hashedPassword
                }
            })

            const refreshToken = createRefreshToken(user.id);
            const accessToken = createAccessToken(user.id);

            await prisma.session.create({
                data: {
                    userId: user.id,
                    token: refreshToken,
                }
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            res.setHeader("Authorization", `Bearer ${accessToken}`);
            console.log(res.getHeaders());

            // const otp = generateOTP();
            // sendOtpEmail(user.email, otp, 'Email Verification OTP', `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`);
            
            user.password = "";
            return responseCodes.success.created(res, user, "User created successfully && verification email sent");
        }
        catch (error: unknown) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const targetField = error.meta?.target as string[];

                    if (targetField.includes('email')) {
                        return responseCodes.clientError.badRequest(res, "Email already exists");
                    }

                    if (targetField.includes('username')) {
                        return responseCodes.clientError.badRequest(res, "Username already exists");
                    }
                }
            }
            return responseCodes.serverError.internalServerError(res, "Internal server error");
        }
    }