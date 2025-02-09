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