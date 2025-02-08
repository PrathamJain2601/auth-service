"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_verification_controller_1 = require("./check-verification.controller");
const resend_otp_controller_1 = require("./resend-otp.controller");
const send_otp_controller_1 = require("./send-otp.controller");
const verify_otp_controller_1 = require("./verify-otp.controller");
const otp = { checkVerification: check_verification_controller_1.checkVerification, resendOtp: resend_otp_controller_1.resendOtp, sendOtp: send_otp_controller_1.sendOtp, verifyOtp: verify_otp_controller_1.verifyOtp };
exports.default = otp;
