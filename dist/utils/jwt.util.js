"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.createAccessToken = exports.createRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createRefreshToken = (id) => {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if (!REFRESH_TOKEN_SECRET) {
        throw new Error("Missing REFRESH_TOKEN_SECRET in environment variables.");
    }
    const token = jsonwebtoken_1.default.sign({ sub: id }, REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
    return token;
};
exports.createRefreshToken = createRefreshToken;
const createAccessToken = (id) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    if (!ACCESS_TOKEN_SECRET) {
        throw new Error("Missing ACCESS_TOKEN_SECRET in environment variables.");
    }
    const token = jsonwebtoken_1.default.sign({ sub: id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    return token;
};
exports.createAccessToken = createAccessToken;
const verifyRefreshToken = (token) => {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if (!REFRESH_TOKEN_SECRET) {
        throw new Error("Missing REFRESH_TOKEN_SECRET in environment variables.");
    }
    const decoded = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
    return decoded;
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyAccessToken = (token) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    if (!ACCESS_TOKEN_SECRET) {
        throw new Error("Missing ACCESS_TOKEN_SECRET in environment variables.");
    }
    const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
    return decoded;
};
exports.verifyAccessToken = verifyAccessToken;
