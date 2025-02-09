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
exports.getProfile = void 0;
const db_config_1 = require("../../config/db.config");
const response_codes_util_1 = require("../../utils/response-codes.util");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const user = yield db_config_1.prisma.user.findUnique({
            select: {
                name: true,
                id: true,
                email: true,
                username: true,
                avatar: true,
                isVerified: true,
                updatedAt: true,
                createdAt: true,
                role: true,
                company: true
            },
            where: {
                id: id
            }
        });
        if (!user) {
            return response_codes_util_1.responseCodes.serverError.internalServerError(res, "User not found some internal error");
        }
        return response_codes_util_1.responseCodes.success.ok(res, user, "user fetched");
    }
    catch (e) {
        console.log(e);
        return response_codes_util_1.responseCodes.serverError.internalServerError(res, "internal server error");
    }
});
exports.getProfile = getProfile;
