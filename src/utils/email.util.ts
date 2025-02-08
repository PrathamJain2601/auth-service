import transporter from "../config/email.config"

type text = {
    subject: string,
    html: string
}

export const sendEmail = async (toEmail: string, text: text) => {
    try{
        const mailOptions = {
            from: "Auth <Auth@gmail.com>",
            to: toEmail,
            subject: text.subject,
            html: text.html,
          };
      
          await transporter.sendMail(mailOptions);
          return true;
    }
    catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
}

export const emailTemplates = {
    otp: (otp: number) => {
        return {
            subject:`Email verification otp`,
            html: `<h1> congratulation on starting yout journey on Auth </h1>
                <p> Your email verification otp is ${otp}. It is valid for only 10 minutes </p>
            `
        }
    }
}