import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createRefreshToken = (id: string) => {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if(!REFRESH_TOKEN_SECRET){
        throw new Error("Missing REFRESH_TOKEN_SECRET in environment variables.");
    }
    const token = jwt.sign({sub: id}, REFRESH_TOKEN_SECRET, {expiresIn: "30d"});
    return token;
}

const createAccessToken = (id: string) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    if(!ACCESS_TOKEN_SECRET){
        throw new Error("Missing ACCESS_TOKEN_SECRET in environment variables.");
    }
    const token = jwt.sign({sub: id}, ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    return token;
}

const verifyRefreshToken = (token: string) => {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if(!REFRESH_TOKEN_SECRET){
        throw new Error("Missing REFRESH_TOKEN_SECRET in environment variables.");
    }
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as { sub: string };
    return decoded;
}

const verifyAccessToken = (token: string) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    if(!ACCESS_TOKEN_SECRET){
        throw new Error("Missing ACCESS_TOKEN_SECRET in environment variables.");
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { sub: string };
    return decoded;
}

export {createRefreshToken, createAccessToken, verifyAccessToken, verifyRefreshToken};