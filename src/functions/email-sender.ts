import * as nodemailer from 'nodemailer';
import { HOST_NAME, HOST_EMAIL, HOST_PASSWORD } from "../config";

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: HOST_EMAIL,
    pass: HOST_PASSWORD,
  },
});

async function sendMail(email, subject, html) {
  const msg = {
    html,
    subject,
    to: email,
    from: `'${HOST_NAME} <${HOST_EMAIL}>'`,
  };
  await mailTransport.sendMail(msg);
  return null;
}

export default sendMail;
