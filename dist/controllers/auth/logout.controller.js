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
exports.logout = void 0;
const db_config_1 = require("../../config/db.config");
const response_codes_util_1 = require("../../utils/response-codes.util");
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return response_codes_util_1.responseCodes.clientError.unauthorized(res, "no refresh token found");
        }
        yield db_config_1.prisma.session.deleteMany({
            where: {
                token: refreshToken
            }
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        res.setHeader("Authorization", "");
        return response_codes_util_1.responseCodes.success.ok(res, "Logged out successfully");
    }
    catch (error) {
        console.log(error);
        return response_codes_util_1.responseCodes.serverError.internalServerError(res, "Internal server error");
    }
});
exports.logout = logout;
