import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {Response, Request} from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));;

app.use(cors({
    origin: "your-frontend-domain", // Make sure this matches your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/", (req: Request, res: Response)=>{
    res.send("server is running");
})

import auth from "./routes/auth.routes.js";
app.use("/auth", auth);
import otp from "./routes/otp.routes.js";
app.use("/otp", otp);
import user from "./routes/user.routes.js";
app.use("/user", user);


app.listen(PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`);
});