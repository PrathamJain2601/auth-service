export const emailTemplates = {
    verificationEmail: (code: string, userName: string) => {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Email Verification</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7fa;">
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: 20px auto; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #333;">Hello ${userName},</h2>
                        <p style="color: #666;">Welcome to Auth! We're excited to have you on board.</p>
                        <p style="color: #666;">To complete your registration, please verify your email by clicking the button below:</p>
                        <a href="http://localhost:5000/verify-email?token=${code}" 
                            style="background-color: #999999; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block; margin-top: 10px;">
                            Verify Email
                        </a>
                        <p style="color: #666;">This link will expire in 10 minutes. If you did not request this verification, you can safely ignore this email.</p>
                        <p style="color: #999; text-align: center; margin-top: 30px;">Thanks for joining us!<br>Contact support at support@auth.com if you need help.</p>
                    </div>
                </body>
            </html>
        `;
    },
};
