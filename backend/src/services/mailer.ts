import nodemailer from "nodemailer";

import { readFileSync } from "fs";

const smtpFile = readFileSync("/run/secrets/smtp-config", {
  encoding: "utf8",
});

const smtpConfig = JSON.parse(smtpFile);

const transporter = nodemailer.createTransport({
  port: smtpConfig.smtp_port,
  host: smtpConfig.smtp_host,
  auth: {
    user: smtpConfig.smtp_user,
    pass: smtpConfig.smtp_pass,
  },
  secure: true,
});

export const sendMail = async (to: string, subject: string, text: string) => {
  return await transporter.sendMail({
    from: smtpConfig.smtp_from,
    to,
    subject,
    text,
  });
};
