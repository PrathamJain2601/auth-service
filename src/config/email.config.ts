import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
});

export default transporter;