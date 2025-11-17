
// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

//getMe.................................................

// export const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch user" });
//   }
// };



export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("_id name email role");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user }); // return object with user so frontend gets { user: { ... } }
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};


/* -------------------------- Helper: Create JWT Token -------------------------- */
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role},
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ------------------------------ USER SIGNUP ------------------------------ */
export const signup = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      verificationToken,
    });

    // Send verification email
    const verifyURL = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    await sendEmail(
      email,
      "Verify Your Email",
      `<p>Click <a href="${verifyURL}">here</a> to verify your email.</p>`
    );

    return res.status(200).json({
      message: "Signup successful! Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup." });
  }
};

/* --------------------------- VERIFY EMAIL --------------------------- */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired verification link" });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Email verification error:", err);
    return res.status(500).json({ message: "Server error during verification" });
  }
};

/* ----------------------------- USER LOGIN ----------------------------- */
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user);

    // Set JWT in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in production (HTTPS)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      token, // optional if frontend uses localStorage
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};

/* --------------------------- FORGOT PASSWORD --------------------------- */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail(
      email,
      "Password Reset Request",
      `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`
    );

    return res.status(200).json({
      message: "Password reset link sent to your email",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error during password reset request" });
  }
};

/* --------------------------- RESET PASSWORD --------------------------- */
// export const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user)
//       return res.status(400).json({ message: "Invalid or expired reset token" });

//     user.password = await bcrypt.hash(password, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     return res.status(200).json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     return res.status(500).json({ message: "Server error during password reset" });
//   }
// };
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // Extract token from URL
    const { password } = req.body; // New password entered by user

    // 1️⃣ Verify token & expiration
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    // 2️⃣ Hash new password
    user.password = await bcrypt.hash(password, 10);

    // 3️⃣ Clear token fields so it can't be reused
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ------------------------------ LOGOUT ------------------------------ */
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error during logout" });
  }
};

/* -------------------------- PROTECTED ROUTE EXAMPLE -------------------------- */
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({ user: req.user });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching profile" });
  }
};
