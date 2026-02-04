// import crypto from "crypto";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import EmailToken from "../models/EmailToken.js";
// import { signAccessToken, signRefreshToken } from "../config/jwt.js";
// import { setAuthCookies } from "../utils/token.js";
// import { sendMail } from "../mail/transporter.js";
// import {
//   verifyEmailTemplate,
//   resetPasswordTemplate,
// } from "../utils/emailTemplates.js";

// /* =========================
//    REGISTER
// ========================= */
// export const register = async (req, res) => {
//   try {
//     const user = await User.create(req.body);

//     const token = crypto.randomBytes(32).toString("hex");
//     const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

//     await EmailToken.create({
//       user: user._id,
//       token_hash: tokenHash,
//       purpose: "verify_email",
//       expires_at: Date.now() + 15 * 60 * 1000,
//     });

//     const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}&uid=${user._id}`;

//     await sendMail({
//       to: user.email,
//       subject: "Verify your email",
//       html: verifyEmailTemplate(link),
//     });

//     res.status(201).json({ message: "Verification email sent" });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ error: "Registration failed" });
//   }
// };

// /* =========================
//    VERIFY EMAIL
// ========================= */
// export const verifyEmail = async (req, res) => {
//   try {
//     const { token, uid } = req.body;
//     const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

//     const record = await EmailToken.findOne({
//       user: uid,
//       token_hash: tokenHash,
//       purpose: "verify_email",
//       expires_at: { $gt: Date.now() },
//     });

//     if (!record)
//       return res.status(400).json({ error: "Invalid or expired token" });

//     await User.findByIdAndUpdate(uid, { isEmailVerified: true });
//     await EmailToken.deleteMany({ user: uid, purpose: "verify_email" });

//     res.json({ success: true });
//   } catch (err) {
//     console.error("Verify email error:", err);
//     res.status(500).json({ error: "Verification failed" });
//   }
// };

// /* =========================
//    LOGIN
// ========================= */
// export const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user || !(await user.comparePassword(req.body.password)))
//       return res.status(401).json({ error: "Invalid credentials" });

//     if (!user.isEmailVerified)
//       return res.status(403).json({ error: "Email not verified" });

//     const accessToken = signAccessToken(user);
//     const refreshToken = signRefreshToken(user);

//     user.refreshToken = refreshToken;
//     await user.save();

//     setAuthCookies(res, accessToken, refreshToken);
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Login failed" });
//   }
// };

// /* =========================
//    FORGOT PASSWORD
// ========================= */
// export const forgotPassword = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user)
//       return res.json({ message: "If email exists, link sent" });

//     const token = crypto.randomBytes(32).toString("hex");
//     const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

//     await EmailToken.create({
//       user: user._id,
//       token_hash: tokenHash,
//       purpose: "reset_password",
//       expires_at: Date.now() + 15 * 60 * 1000,
//     });

//     const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}&uid=${user._id}`;

//     await sendMail({
//       to: user.email,
//       subject: "Reset Password",
//       html: resetPasswordTemplate(link),
//     });

//     res.json({ message: "Reset link sent" });
//   } catch (err) {
//     console.error("Forgot password error:", err);
//     res.status(500).json({ error: "Failed to send reset email" });
//   }
// };

// /* =========================
//    RESET PASSWORD
// ========================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { token, uid, newPassword } = req.body;
//     const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

//     const record = await EmailToken.findOne({
//       user: uid,
//       token_hash: tokenHash,
//       purpose: "reset_password",
//       expires_at: { $gt: Date.now() },
//     });

//     if (!record)
//       return res.status(400).json({ error: "Invalid or expired token" });

//     const hashed = await bcrypt.hash(newPassword, 10);
//     await User.findByIdAndUpdate(uid, { password: hashed });

//     await EmailToken.deleteMany({ user: uid, purpose: "reset_password" });

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     res.status(500).json({ error: "Password reset failed" });
//   }
// };












import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import EmailToken from "../models/EmailToken.js";
import { signAccessToken, signRefreshToken } from "../config/jwt.js";
import { setAuthCookies } from "../utils/token.js";
import { sendMail } from "../mail/transporter.js";
import {
  verifyEmailTemplate,
  resetPasswordTemplate,
} from "../mail/emailTemplates.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Prevent duplicate users
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const user = await User.create({ name, email, password, phone, address });

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    await EmailToken.create({
      user: user._id,
      token_hash: tokenHash,
      purpose: "verify_email",
      expires_at: Date.now() + 60 * 60 * 1000,
    });

    const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}&uid=${user._id}`;

    await sendMail({
      to: user.email,
      subject: "Verify your email",
      html: verifyEmailTemplate(link),
    });

    res.status(201).json({
      success: true,
      message: "Verification email sent",
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

/* =========================
   VERIFY EMAIL
========================= */
export const verifyEmail = async (req, res) => {
  try {
    const { token, uid } = req.body;
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const record = await EmailToken.findOne({
      user: uid,
      token_hash: tokenHash,
      purpose: "verify_email",
      expires_at: { $gt: Date.now() },
    });

    if (!record) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    await User.findByIdAndUpdate(uid, { isEmailVerified: true });
    await EmailToken.deleteMany({ user: uid, purpose: "verify_email" });

    res.json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    console.error("Verify email error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ error: "Email not verified" });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "If email exists, link sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    await EmailToken.create({
      user: user._id,
      token_hash: tokenHash,
      purpose: "reset_password",
      expires_at: Date.now() + 15 * 60 * 1000,
    });

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}&uid=${user._id}`;

    await sendMail({
      to: user.email,
      subject: "Reset Password",
      html: resetPasswordTemplate(link),
    });

    res.json({ message: "Reset link sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Failed to send reset email" });
  }
};

/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (req, res) => {
  try {
    const { token, uid, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "Password too short" });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const record = await EmailToken.findOne({
      user: uid,
      token_hash: tokenHash,
      purpose: "reset_password",
      expires_at: { $gt: Date.now() },
    });

    if (!record) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(uid, { password: hashed });

    await EmailToken.deleteMany({ user: uid, purpose: "reset_password" });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Password reset failed" });
  }
};

/* =========================
   AUTH ME
========================= */
export const me = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};
/* =========================
   LOGOUT
========================= */
// export const logout = async (req, res) => {
//   res.clearCookie("accessToken");
//   res.clearCookie("refreshToken");
//   res.json({ success: true });
// };


export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ success: true });
};
