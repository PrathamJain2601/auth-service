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
exports.login = void 0;
const response_codes_util_js_1 = require("../../utils/response-codes.util.js");
const db_config_js_1 = require("../../config/db.config.js");
const hash_util_js_1 = require("../../utils/hash.util.js");
const jwt_util_js_1 = require("../../utils/jwt.util.js");
function checkToken(token, userLoggedIn) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token) {
            return true;
        }
        try {
            const decoded = (0, jwt_util_js_1.verifyRefreshToken)(token);
            if (!decoded || !decoded.sub) {
                return true;
            }
            const user = yield db_config_js_1.prisma.user.findUnique({
                where: { id: decoded.sub },
            });
            if (!user) {
                return true;
            }
            if (user.id == userLoggedIn) {
                return false;
            }
            return true;
        }
        catch (e) {
            console.log(e);
            throw new Error("Internal Server Error in checkToken");
            return false;
        }
    });
}
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailOrUsername, password } = req.body;
    const { refreshToken } = req.cookies;
    if (!password || !emailOrUsername) {
        return response_codes_util_js_1.responseCodes.clientError.notFound(res, "All fields are required");
    }
    try {
        const user = yield db_config_js_1.prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            },
        });
        if (!user) {
            return response_codes_util_js_1.responseCodes.clientError.notFound(res, "User not found");
        }
        const match = yield (0, hash_util_js_1.verifyPassword)(password, user.password);
        if (!match) {
            return response_codes_util_js_1.responseCodes.clientError.forbidden(res, "wrong email or password");
        }
        const accessToken = (0, jwt_util_js_1.createAccessToken)(user.id);
        if (yield checkToken(refreshToken, user.id)) {
            const newRefreshToken = (0, jwt_util_js_1.createRefreshToken)(user.id);
            yield db_config_js_1.prisma.session.create({
                data: {
                    userId: user.id,
                    token: newRefreshToken,
                }
            });
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
        }
        res.setHeader("Authorization", `Bearer ${accessToken}`);
        user.password = "";
        return response_codes_util_js_1.responseCodes.success.ok(res, user, "Logged in successfully");
    }
    catch (error) {
        console.log(error);
        return response_codes_util_js_1.responseCodes.serverError.internalServerError(res, "Internal Error");
    }
});
exports.login = login;
