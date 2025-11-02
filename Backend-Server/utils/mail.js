import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure:true,
  port:465,
  auth: {
    user: process.env.Email,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});
export const sendOtp=async (to,otp) => {
  const info = await transporter.sendMail({
    from: process.env.Email,
    to: to,
    subject: "Reset Password",
    text: "Hello world?", // plain‑text body
    html: `<b>Your Otp is <h1>${otp}</h1> <p>It expires is 5 min</p> </b>`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};