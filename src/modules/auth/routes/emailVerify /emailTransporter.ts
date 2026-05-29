import nodemailer from 'nodemailer'
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "91208612734a14",
    pass: "41bd4baf0bb734"
  }
});