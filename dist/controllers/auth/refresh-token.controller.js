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
exports.refreshAccessToken = void 0;
const response_codes_util_1 = require("../../utils/response-codes.util");
const jwt_util_1 = require("../../utils/jwt.util");
const db_config_1 = require("../../config/db.config");
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return response_codes_util_1.responseCodes.clientError.unauthorized(res, "Refresh token is required");
    }
    try {
        const decoded = (0, jwt_util_1.verifyRefreshToken)(refreshToken);
        if (!decoded || !decoded.sub) {
            return response_codes_util_1.responseCodes.clientError.unauthorized(res, "Invalid refresh token");
        }
        const user = yield db_config_1.prisma.user.findUnique({
            where: { id: decoded.sub },
        });
        if (!user) {
            return response_codes_util_1.responseCodes.clientError.notFound(res, "User not found");
        }
        const newAccessToken = (0, jwt_util_1.createAccessToken)(user.id);
        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        return response_codes_util_1.responseCodes.success.ok(res, null, "New access token generated successfully");
    }
    catch (error) {
        console.log(error);
        return response_codes_util_1.responseCodes.serverError.internalServerError(res, "Internal server error");
    }
});
exports.refreshAccessToken = refreshAccessToken;
