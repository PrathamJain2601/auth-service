"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const response_codes_util_1 = require("../../utils/response-codes.util");
const hash_util_1 = require("../../utils/hash.util");
const db_config_1 = require("../../config/db.config");
const client_1 = require("@prisma/client");
const jwt_util_1 = require("../../utils/jwt.util");
const crypto_1 = require("crypto");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { name, username, email, password } = req.body;
    if (!name || !email || !password) {
        return response_codes_util_1.responseCodes.clientError.notFound(res, "all fields are required");
    }
    try {
        const hashedPassword = yield (0, hash_util_1.hashPassword)(password);
        if (!username) {
            username = (0, crypto_1.randomUUID)();
        }
        const user = yield db_config_1.prisma.user.create({
            data: {
                email: email,
                name: name,
                username: username,
                password: hashedPassword
            }
        });
        const refreshToken = (0, jwt_util_1.createRefreshToken)(user.id);
        const accessToken = (0, jwt_util_1.createAccessToken)(user.id);
        yield db_config_1.prisma.session.create({
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
        return response_codes_util_1.responseCodes.success.created(res, user, "User created successfully");
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const targetField = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
                if (targetField.includes('email')) {
                    return response_codes_util_1.responseCodes.clientError.badRequest(res, "Email already exists");
                }
                if (targetField.includes('username')) {
                    return response_codes_util_1.responseCodes.clientError.badRequest(res, "Username already exists");
                }
            }
        }
        return response_codes_util_1.responseCodes.serverError.internalServerError(res, "Internal server error");
    }
});
exports.register = register;
