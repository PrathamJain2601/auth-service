"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controllers/otp/index.controller"));
const router = (0, express_1.Router)();
router.post("/send-otp", index_controller_1.default.sendOtp);
router.post("/verify-otp", index_controller_1.default.verifyOtp);
router.post("/resend-otp", index_controller_1.default.resendOtp);
router.get("/check-verification", index_controller_1.default.checkVerification);
exports.default = router;
