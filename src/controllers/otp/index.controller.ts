import { checkVerification } from "./check-verification.controller";
import { resendOtp } from "./resend-otp.controller";
import { sendOtp } from "./send-otp.controller";
import { verifyOtp } from "./verify-otp.controller";

const otp = {checkVerification, resendOtp, sendOtp, verifyOtp};
export default otp;