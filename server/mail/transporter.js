// // mail/transporter.js
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || '587', 10),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// });

// export const sendMail = async ({ to, subject, html, text }) => {
//   return transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html,
//     text
//   });
// };













// // mail/transporter.js
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// if (!process.env.EMAIL_USER) {
//   console.warn("⚠️ EMAIL_USER is not set. Emails will fail until you set EMAIL_USER and EMAIL_PASS in .env");
// }

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // verify transporter on startup so errors surface immediately
// const verifyTransporter = async () => {
//   try {
//     await transporter.verify();
//     console.log("📨 SMTP transporter verified (Gmail). Ready to send emails.");
//   } catch (err) {
//     console.error("❌ SMTP verification failed. Emails will not send.");
//     // Helpful guidance
//     console.error("   • Make sure EMAIL_USER and EMAIL_PASS are set in your .env");
//     console.error("   • If using Gmail, create an App Password (https://myaccount.google.com/apppasswords) after enabling 2-Step Verification.");
//     console.error("   • If you recently changed your password, update EMAIL_PASS.");
//     console.error("   • Full error:", err && err.message ? err.message : err);
//     // don't rethrow — keep server running; sendMail will throw when used
//   }
// };

// await verifyTransporter();

// export const sendMail = async ({ to, subject, html, text }) => {
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     const msg = "EMAIL_USER or EMAIL_PASS not configured in environment";
//     console.error("❌ sendMail aborted:", msg);
//     throw new Error(msg);
//   }

//   try {
//     const info = await transporter.sendMail({
//       from: `"CircuitHub" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//       text,
//     });

//     console.log(`✅ Email sent to ${to}. messageId=${info.messageId}`);
//     return info;
//   } catch (err) {
//     console.error("❌ sendMail error:", err && err.message ? err.message : err);
//     throw err;
//   }
// };



import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({ to, subject, html, text }) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured");
  }

  try {
    const data = await resend.emails.send({
      from: "ElectroBay <electrobay.here@gmail.com>",
      to,
      subject,
      html,
      text,
    });

    console.log(`✅ Email sent to ${to}`, data.id);
    return data;
  } catch (error) {
    console.error("❌ sendMail error:", error);
    throw error;
  }
};
