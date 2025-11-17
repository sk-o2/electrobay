// // routes/auth.js
// import express from 'express';
// import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid';

// import User from '../models/User.js';
// import RefreshToken from '../models/RefreshToken.js';
// import EmailToken from '../models/EmailToken.js';

// import { signAccessToken, generateRandomToken, hashToken, compareTokenHash } from '../utils/token.js';
// import { sendMail } from '../mail/transporter.js';
// import { getCookieOptions } from '../middleware/auth.js';

// const router = express.Router();

// const ACCESS_TOKEN_AGE_MS = (() => {
//   const s = process.env.ACCESS_TOKEN_EXP || '15m';
//   if (s.endsWith('m')) return parseInt(s.slice(0, -1), 10) * 60 * 1000;
//   if (s.endsWith('h')) return parseInt(s.slice(0, -1), 10) * 60 * 60 * 1000;
//   return 15 * 60 * 1000;
// })();
// const REFRESH_TOKEN_DAYS = parseInt(process.env.REFRESH_TOKEN_EXP_DAYS || '30', 10);
// const REFRESH_TOKEN_AGE_MS = REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000;

// // REGISTER
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password, phone, address } = req.body;
//     if (!email || !password) return res.status(400).json({ error: 'email and password required' });

//     const exists = await User.findOne({ email: email.toLowerCase() });
//     if (exists) return res.status(400).json({ error: 'Email already in use' });

//     const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
//     const password_hash = await bcrypt.hash(password, saltRounds);

//     const user = await User.create({
//       email: email.toLowerCase(),
//       password_hash,
//       phone: phone || null,
//       address: address || null,
//       is_active: false
//     });

//     const token = generateRandomToken(32);
//     const token_hash = await hashToken(token);
//     const expires_at = new Date(Date.now() + (parseInt(process.env.EMAIL_TOKEN_EXP_HOURS || '24', 10) * 3600 * 1000));

//     await EmailToken.create({
//       user: user._id,
//       token_hash,
//       purpose: 'verify_email',
//       expires_at
//     });

//     const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}&uid=${user._id}`;
//     await sendMail({
//       to: email,
//       subject: 'Verify your email',
//       html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
//       text: `Verify your email: ${verifyLink}`
//     });

//     return res.json({ success: true, message: 'User created. Verification email sent.' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // VERIFY EMAIL
// router.post('/verify-email', async (req, res) => {
//   try {
//     const { token, uid } = req.body;
//     if (!token || !uid) return res.status(400).json({ error: 'token and uid required' });

//     const tokens = await EmailToken.find({ user: uid, purpose: 'verify_email' });
//     if (!tokens.length) return res.status(400).json({ error: 'Invalid or expired token' });

//     let match = null;
//     for (const t of tokens) {
//       const ok = await compareTokenHash(token, t.token_hash);
//       if (ok) { match = t; break; }
//     }
//     if (!match) return res.status(400).json({ error: 'Invalid token' });
//     if (new Date(match.expires_at) < new Date()) return res.status(400).json({ error: 'Expired token' });

//     await User.findByIdAndUpdate(uid, { is_active: true });
//     await EmailToken.deleteMany({ user: uid, purpose: 'verify_email' });

//     return res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // LOGIN
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password, remember } = req.body;
//     if (!email || !password) return res.status(400).json({ error: 'email and password required' });

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//     const ok = await bcrypt.compare(password, user.password_hash);
//     if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

//     if (!user.is_active) return res.status(403).json({ error: 'Please verify your email' });

//     const accessToken = signAccessToken({ sub: user._id, role: user.role });

//     const refreshToken = generateRandomToken(48);
//     const refreshHash = await hashToken(refreshToken);
//     const expires_at = new Date(Date.now() + REFRESH_TOKEN_AGE_MS);

//     await RefreshToken.create({
//       user: user._id,
//       token_hash: refreshHash,
//       user_agent: req.get('User-Agent') || '',
//       ip: req.ip,
//       expires_at
//     });

//     res.cookie('access_token', accessToken, getCookieOptions({ maxAgeMs: ACCESS_TOKEN_AGE_MS }));
//     res.cookie('refresh_token', refreshToken, getCookieOptions({ maxAgeMs: REFRESH_TOKEN_AGE_MS }));

//     return res.json({ success: true, user: { id: user._id, role: user.role } });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // REFRESH (rotate)
// router.post('/refresh', async (req, res) => {
//   try {
//     const refreshToken = req.cookies?.refresh_token;
//     if (!refreshToken) return res.status(401).json({ error: 'Refresh token missing' });

//     const tokens = await RefreshToken.find({ revoked: false });
//     let match = null;
//     for (const t of tokens) {
//       const ok = await compareTokenHash(refreshToken, t.token_hash);
//       if (ok) { match = t; break; }
//     }
//     if (!match) return res.status(401).json({ error: 'Invalid refresh token' });
//     if (new Date(match.expires_at) < new Date()) return res.status(401).json({ error: 'Refresh token expired' });

//     match.revoked = true;
//     await match.save();

//     const newRefresh = generateRandomToken(48);
//     const newHash = await hashToken(newRefresh);
//     const newExpires = new Date(Date.now() + REFRESH_TOKEN_AGE_MS);

//     await RefreshToken.create({
//       user: match.user,
//       token_hash: newHash,
//       user_agent: req.get('User-Agent') || '',
//       ip: req.ip,
//       expires_at: newExpires
//     });

//     const user = await User.findById(match.user);
//     const accessToken = signAccessToken({ sub: user._id, role: user.role });

//     res.cookie('access_token', accessToken, getCookieOptions({ maxAgeMs: ACCESS_TOKEN_AGE_MS }));
//     res.cookie('refresh_token', newRefresh, getCookieOptions({ maxAgeMs: REFRESH_TOKEN_AGE_MS }));

//     return res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // LOGOUT
// router.post('/logout', async (req, res) => {
//   try {
//     const refreshToken = req.cookies?.refresh_token;
//     if (refreshToken) {
//       const tokens = await RefreshToken.find({ revoked: false });
//       for (const t of tokens) {
//         const ok = await compareTokenHash(refreshToken, t.token_hash);
//         if (ok) {
//           t.revoked = true;
//           await t.save();
//         }
//       }
//     }
//     res.clearCookie('access_token', getCookieOptions());
//     res.clearCookie('refresh_token', getCookieOptions());
//     return res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // FORGOT PASSWORD
// router.post('/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ error: 'email required' });

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.json({ success: true, message: 'If that email exists we sent a reset link' });
//     }

//     const token = generateRandomToken(32);
//     const tokenHash = await hashToken(token);
//     const expires_at = new Date(Date.now() + (parseInt(process.env.EMAIL_TOKEN_EXP_HOURS || '2', 10) * 3600 * 1000));

//     await EmailToken.create({
//       user: user._id,
//       token_hash: tokenHash,
//       purpose: 'reset_password',
//       expires_at
//     });

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&uid=${user._id}`;
//     await sendMail({
//       to: user.email,
//       subject: 'Reset your password',
//       html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
//       text: `Reset your password: ${resetLink}`
//     });

//     return res.json({ success: true, message: 'If that email exists we sent a reset link' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // RESET PASSWORD
// router.post('/reset-password', async (req, res) => {
//   try {
//     const { token, uid, newPassword } = req.body;
//     if (!token || !uid || !newPassword) return res.status(400).json({ error: 'token, uid, newPassword required' });

//     const tokens = await EmailToken.find({ user: uid, purpose: 'reset_password' });
//     if (!tokens.length) return res.status(400).json({ error: 'Invalid or expired token' });

//     let match = null;
//     for (const t of tokens) {
//       const ok = await compareTokenHash(token, t.token_hash);
//       if (ok) { match = t; break; }
//     }
//     if (!match) return res.status(400).json({ error: 'Invalid token' });
//     if (new Date(match.expires_at) < new Date()) return res.status(400).json({ error: 'Expired token' });

//     const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
//     const newHash = await bcrypt.hash(newPassword, saltRounds);
//     await User.findByIdAndUpdate(uid, { password_hash: newHash });

//     await EmailToken.deleteMany({ user: uid, purpose: 'reset_password' });
//     await RefreshToken.updateMany({ user: uid }, { revoked: true });

//     res.clearCookie('access_token', getCookieOptions());
//     res.clearCookie('refresh_token', getCookieOptions());

//     return res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;

























// // routes/auth.js
// import express from 'express';
// import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid';

// import User from '../models/User.js';
// import RefreshToken from '../models/RefreshToken.js';
// import EmailToken from '../models/EmailToken.js';

// import {
//   signAccessToken,
//   generateRandomToken,
//   hashToken,
//   compareTokenHash
// } from '../utils/token.js';
// import { sendMail } from '../mail/transporter.js';
// import { getCookieOptions } from '../middleware/auth.js';

// const router = express.Router();

// const ACCESS_TOKEN_AGE_MS = (() => {
//   const s = process.env.ACCESS_TOKEN_EXP || '15m';
//   if (s.endsWith('m')) return parseInt(s.slice(0, -1), 10) * 60 * 1000;
//   if (s.endsWith('h')) return parseInt(s.slice(0, -1), 10) * 60 * 60 * 1000;
//   return 15 * 60 * 1000;
// })();
// const REFRESH_TOKEN_DAYS = parseInt(process.env.REFRESH_TOKEN_EXP_DAYS || '30', 10);
// const REFRESH_TOKEN_AGE_MS = REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000;

// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// // REGISTER
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password, phone, address } = req.body;
//     if (!email || !password) return res.status(400).json({ error: 'email and password required' });

//     const exists = await User.findOne({ email: email.toLowerCase() });
//     if (exists) return res.status(400).json({ error: 'Email already in use' });

//     const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
//     const password_hash = await bcrypt.hash(password, saltRounds);

//     const user = await User.create({
//       email: email.toLowerCase(),
//       password_hash,
//       phone: phone || null,
//       address: address || null,
//       is_active: false
//     });

//     const token = generateRandomToken(32);
//     const token_hash = await hashToken(token);
//     const expires_at = new Date(Date.now() + (parseInt(process.env.EMAIL_TOKEN_EXP_HOURS || '24', 10) * 3600 * 1000));

//     await EmailToken.create({
//       user: user._id,
//       token_hash,
//       purpose: 'verify_email',
//       expires_at
//     });

//     const verifyLink = `${FRONTEND_URL}/verify-email?token=${token}&uid=${user._id}`;

//     // Try sending verification email; if it fails we'll still return success but include a warning
//     try {
//       await sendMail({
//         to: email,
//         subject: 'Verify your email',
//         html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
//         text: `Verify your email: ${verifyLink}`
//       });
//     } catch (mailErr) {
//       console.error('Mail send failed (register):', mailErr);
//       // Return 201 but inform client that email failed to send
//       return res.status(201).json({
//         success: true,
//         message: 'User created. Verification email could not be sent automatically.',
//         mailError: String(mailErr.message || mailErr)
//       });
//     }

//     return res.status(201).json({ success: true, message: 'User created. Verification email sent.' });
//   } catch (err) {
//     console.error('Register error:', err);
//     return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
//   }
// });

// // VERIFY EMAIL
// router.post('/verify-email', async (req, res) => {
//   try {
//     const { token, uid } = req.body;
//     if (!token || !uid) return res.status(400).json({ error: 'token and uid required' });

//     const tokens = await EmailToken.find({ user: uid, purpose: 'verify_email' });
//     if (!tokens.length) return res.status(400).json({ error: 'Invalid or expired token' });

//     let match = null;
//     for (const t of tokens) {
//       const ok = await compareTokenHash(token, t.token_hash);
//       if (ok) { match = t; break; }
//     }
//     if (!match) return res.status(400).json({ error: 'Invalid token' });
//     if (new Date(match.expires_at) < new Date()) return res.status(400).json({ error: 'Expired token' });

//     await User.findByIdAndUpdate(uid, { is_active: true });
//     await EmailToken.deleteMany({ user: uid, purpose: 'verify_email' });

//     return res.json({ success: true });
//   } catch (err) {
//     console.error('Verify email error:', err);
//     return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
//   }
// });

// // LOGIN
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password, remember } = req.body;
//     if (!email || !password) return res.status(400).json({ error: 'email and password required' });

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//     const ok = await bcrypt.compare(password, user.password_hash);
//     if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

//     if (!user.is_active) return res.status(403).json({ error: 'Please verify your email' });

//     const accessToken = signAccessToken({ sub: user._id, role: user.role });

//     const refreshToken = generateRandomToken(48);
//     const refreshHash = await hashToken(refreshToken);
//     const expires_at = new Date(Date.now() + REFRESH_TOKEN_AGE_MS);

//     await RefreshToken.create({
//       user: user._id,
//       token_hash: refreshHash,
//       user_agent: req.get('User-Agent') || '',
//       ip: req.ip,
//       expires_at
//     });

//     res.cookie('access_token', accessToken, getCookieOptions({ maxAgeMs: ACCESS_TOKEN_AGE_MS }));
//     res.cookie('refresh_token', refreshToken, getCookieOptions({ maxAgeMs: REFRESH_TOKEN_AGE_MS }));

//     return res.json({ success: true, user: { id: user._id, role: user.role } });
//   } catch (err) {
//     console.error('Login error:', err);
//     return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
//   }
// });

// // REFRESH (rotate)
// router.post('/refresh', async (req, res) => {
//   try {
//     const refreshToken = req.cookies?.refresh_token;
//     if (!refreshToken) return res.status(401).json({ error: 'Refresh token missing' });

//     const tokens = await RefreshToken.find({ revoked: false });
//     let match = null;
//     for (const t of tokens) {
//       const ok = await compareTokenHash(refreshToken, t.token_hash);
//       if (ok) { match = t; break; }
//     }
//     if (!match) return res.status(401).json({ error: 'Invalid refresh token' });
//     if (new Date(match.expires_at) < new Date()) return res.status(401).json({ error: 'Refresh token expired' });

//     match.revoked = true;
//     await match.save();

//     const newRefresh = generateRandomToken(48);
//     const newHash = await hashToken(newRefresh);
//     const newExpires = new Date(Date.now() + REFRESH_TOKEN_AGE_MS);

//     await RefreshToken.create({
//       user: match.user,
//       token_hash: newHash,
//       user_agent: req.get('User-Agent') || '',
//       ip: req.ip,
//       expires_at: newExpires
//     });

//     const user = await User.findById(match.user);
//     const accessToken = signAccessToken({ sub: user._id, role: user.role });

//     res.cookie('access_token', accessToken, getCookieOptions({ maxAgeMs: ACCESS_TOKEN_AGE_MS }));
//     res.cookie('refresh_token', newRefresh, getCookieOptions({ maxAgeMs: REFRESH_TOKEN_AGE_MS }));

//     return res.json({ success: true });
//   } catch (err) {
//     console.error('Refresh error:', err);
//     return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
//   }
// });

// // LOGOUT
// router.post('/logout', async (req, res) => {
//   try {
//     const refreshToken = req.cookies?.refresh_token;
//     if (refreshToken) {
//       const tokens = await RefreshToken.find({ revoked: false });
//       for (const t of tokens) {
//         const ok = await compareTokenHash(refreshToken, t.token_hash);
//         if (ok) {
//           t.revoked = true;
//           await t.save();
//         }
//       }
//     }
//     res.clearCookie('access_token', getCookieOptions());
//     res.clearCookie('refresh_token', getCookieOptions());
//     return res.json({ success: true });
//   } catch (err) {
//     console.error('Logout error:', err);
//     return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
//   }
// });

// // FORGOT PASSWORD
// router.post('/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ error: 'email required' });

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.json({ success: true, message: 'If that email exists we sent a reset link' });
//     }

//     const token = generateRandomToken(32);
//     const tokenHash = await hashToken(token);
//     const expires_at = new Date(Date.now() + (parseInt(process.env.EMAIL_TOKEN_EXP_HOURS || '2', 10) * 3600 * 1000));

//     await EmailToken.create({
//       user: user._id,
//       token_hash: tokenHash,
//       purpose: 'reset_password',
//       expires_at
//     });

//     const resetLink = `${FRONTEND_URL}/reset-password?token=${token}&uid=${user._id}`;

//     try {
//       await sendMail({
//         to: user.email,
//         subject: 'Reset your password',
//         html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
//         text: `Reset your password: ${resetLink}`
//       });
//     } catch (mailErr) {
//       console.error('Mail send failed (forgot-password):', mailErr);
//       return res.json({
//         success: true,
//         message: 'If that email exists we sent a reset link (note: email sending failed).',
//         mailError: String(mailErr.message || mailErr)
//       });
//     }

//     return res.json({ success: true, message: 'If that email exists we sent a reset link' });
//   } catch (err) {
//     console.error('Forgot password error:', err);
//     return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
//   }
// });

// // RESET PASSWORD
// router.post('/reset-password', async (req, res) => {
//   try {
//     const { token, uid, newPassword } = req.body;
//     if (!token || !uid || !newPassword) return res.status(400).json({ error: 'token, uid, newPassword required' });

//     const tokens = await EmailToken.find({ user: uid, purpose: 'reset_password' });
//     if (!tokens.length) return res.status(400).json({ error: 'Invalid or expired token' });

//     let match = null;
//     for (const t of tokens) {
//       const ok = await compareTokenHash(token, t.token_hash);
//       if (ok) { match = t; break; }
//     }
//     if (!match) return res.status(400).json({ error: 'Invalid token' });
//     if (new Date(match.expires_at) < new Date()) return res.status(400).json({ error: 'Expired token' });

//     const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
//     const newHash = await bcrypt.hash(newPassword, saltRounds);
//     await User.findByIdAndUpdate(uid, { password_hash: newHash });

//     await EmailToken.deleteMany({ user: uid, purpose: 'reset_password' });
//     await RefreshToken.updateMany({ user: uid }, { revoked: true });

//     res.clearCookie('access_token', getCookieOptions());
//     res.clearCookie('refresh_token', getCookieOptions());

//     return res.json({ success: true });
//   } catch (err) {
//     console.error('Reset password error:', err);
//     return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
//   }
// });

// export default router;


















// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import EmailToken from '../models/EmailToken.js';

import {
  signAccessToken,
  generateRandomToken,
  hashToken,
  compareTokenHash
} from '../utils/token.js';
import { sendMail } from '../mail/transporter.js';
import { getCookieOptions } from '../middleware/auth.js';

const router = express.Router();

const ACCESS_TOKEN_AGE_MS = (() => {
  const s = process.env.ACCESS_TOKEN_EXP || '15m';
  if (s.endsWith('m')) return parseInt(s.slice(0, -1), 10) * 60 * 1000;
  if (s.endsWith('h')) return parseInt(s.slice(0, -1), 10) * 60 * 60 * 1000;
  return 15 * 60 * 1000;
})();
const REFRESH_TOKEN_DAYS = parseInt(process.env.REFRESH_TOKEN_EXP_DAYS || '30', 10);
const REFRESH_TOKEN_AGE_MS = REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const BACKEND_URL = process.env.BACKEND_URL || process.env.BACKEND_ORIGIN || `http://localhost:${process.env.PORT || 5000}`;

/**
 * REGISTER
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, phone, address } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ error: 'Email already in use' });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
    const password_hash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email: email.toLowerCase(),
      password_hash,
      phone: phone || null,
      address: address || null,
      is_active: false
    });

    const token = generateRandomToken(32);
    const token_hash = await hashToken(token);
    const expires_at = new Date(Date.now() + (parseInt(process.env.EMAIL_TOKEN_EXP_HOURS || '24', 10) * 3600 * 1000));

    await EmailToken.create({
      user: user._1d || user._id, // defensive: prefer _id but keep compatibility
      token_hash,
      purpose: 'verify_email',
      expires_at
    });

    // send a link that points to the backend verify endpoint (which will verify then redirect to frontend)
    const verifyLink = `${BACKEND_URL}/api/auth/verify-email?token=${token}&uid=${user._id}`;

    // Try sending verification email; if it fails we'll still return success but include a warning
    try {
      await sendMail({
        to: email,
        subject: 'Verify your email',
        html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
        text: `Verify your email: ${verifyLink}`
      });
    } catch (mailErr) {
      console.error('Mail send failed (register):', mailErr);
      // Return 201 but inform client that email failed to send
      return res.status(201).json({
        success: true,
        message: 'User created. Verification email could not be sent automatically.',
        mailError: String(mailErr.message || mailErr)
      });
    }

    return res.status(201).json({ success: true, message: 'User created. Verification email sent.' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
  }
});

/**
 * GET /api/auth/verify-email
 * Verifies token server-side and redirects to frontend with result
 */
router.get('/verify-email', async (req, res) => {
  try {
    const { token, uid } = req.query;
    if (!token || !uid) {
      return res.redirect(`${FRONTEND_URL}/verify-email?status=error&reason=invalid`);
    }

    const tokens = await EmailToken.find({ user: uid, purpose: 'verify_email' });
    if (!tokens.length) {
      return res.redirect(`${FRONTEND_URL}/verify-email?status=error&reason=notfound`);
    }

    let match = null;
    for (const t of tokens) {
      const ok = await compareTokenHash(token, t.token_hash);
      if (ok) { match = t; break; }
    }
    if (!match) {
      return res.redirect(`${FRONTEND_URL}/verify-email?status=error&reason=invalid_token`);
    }
    if (new Date(match.expires_at) < new Date()) {
      return res.redirect(`${FRONTEND_URL}/verify-email?status=error&reason=expired`);
    }

    await User.findByIdAndUpdate(uid, { is_active: true });
    await EmailToken.deleteMany({ user: uid, purpose: 'verify_email' });

    return res.redirect(`${FRONTEND_URL}/verify-email?status=success`);
  } catch (err) {
    console.error('Verify GET error:', err);
    return res.redirect(`${FRONTEND_URL}/verify-email?status=error&reason=server`);
  }
});

/**
 * POST /api/auth/verify-email
 * (kept for client-side POST flows; still works)
 */
router.post('/verify-email', async (req, res) => {
  try {
    const { token, uid } = req.body;
    if (!token || !uid) return res.status(400).json({ error: 'token and uid required' });

    const tokens = await EmailToken.find({ user: uid, purpose: 'verify_email' });
    if (!tokens.length) return res.status(400).json({ error: 'Invalid or expired token' });

    let match = null;
    for (const t of tokens) {
      const ok = await compareTokenHash(token, t.token_hash);
      if (ok) { match = t; break; }
    }
    if (!match) return res.status(400).json({ error: 'Invalid token' });
    if (new Date(match.expires_at) < new Date()) return res.status(400).json({ error: 'Expired token' });

    await User.findByIdAndUpdate(uid, { is_active: true });
    await EmailToken.deleteMany({ user: uid, purpose: 'verify_email' });

    return res.json({ success: true });
  } catch (err) {
    console.error('Verify email error:', err);
    return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
  }
});

/**
 * LOGIN
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    if (!user.is_active) return res.status(403).json({ error: 'Please verify your email' });

    const accessToken = signAccessToken({ sub: user._id, role: user.role });

    const refreshToken = generateRandomToken(48);
    const refreshHash = await hashToken(refreshToken);
    const expires_at = new Date(Date.now() + REFRESH_TOKEN_AGE_MS);

    await RefreshToken.create({
      user: user._id,
      token_hash: refreshHash,
      user_agent: req.get('User-Agent') || '',
      ip: req.ip,
      expires_at
    });

    res.cookie('access_token', accessToken, getCookieOptions({ maxAgeMs: ACCESS_TOKEN_AGE_MS }));
    res.cookie('refresh_token', refreshToken, getCookieOptions({ maxAgeMs: REFRESH_TOKEN_AGE_MS }));

    return res.json({ success: true, user: { id: user._id, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
  }
});

/**
 * REFRESH (rotate)
 */
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token missing' });

    const tokens = await RefreshToken.find({ revoked: false });
    let match = null;
    for (const t of tokens) {
      const ok = await compareTokenHash(refreshToken, t.token_hash);
      if (ok) { match = t; break; }
    }
    if (!match) return res.status(401).json({ error: 'Invalid refresh token' });
    if (new Date(match.expires_at) < new Date()) return res.status(401).json({ error: 'Refresh token expired' });

    match.revoked = true;
    await match.save();

    const newRefresh = generateRandomToken(48);
    const newHash = await hashToken(newRefresh);
    const newExpires = new Date(Date.now() + REFRESH_TOKEN_AGE_MS);

    await RefreshToken.create({
      user: match.user,
      token_hash: newHash,
      user_agent: req.get('User-Agent') || '',
      ip: req.ip,
      expires_at: newExpires
    });

    const user = await User.findById(match.user);
    const accessToken = signAccessToken({ sub: user._id, role: user.role });

    res.cookie('access_token', accessToken, getCookieOptions({ maxAgeMs: ACCESS_TOKEN_AGE_MS }));
    res.cookie('refresh_token', newRefresh, getCookieOptions({ maxAgeMs: REFRESH_TOKEN_AGE_MS }));

    return res.json({ success: true });
  } catch (err) {
    console.error('Refresh error:', err);
    return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
  }
});

/**
 * LOGOUT
 */
router.post('/logout', async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) {
      const tokens = await RefreshToken.find({ revoked: false });
      for (const t of tokens) {
        const ok = await compareTokenHash(refreshToken, t.token_hash);
        if (ok) {
          t.revoked = true;
          await t.save();
        }
      }
    }
    res.clearCookie('access_token', getCookieOptions());
    res.clearCookie('refresh_token', getCookieOptions());
    return res.json({ success: true });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
  }
});

/**
 * FORGOT PASSWORD
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: true, message: 'If that email exists we sent a reset link' });
    }

    const token = generateRandomToken(32);
    const tokenHash = await hashToken(token);
    const expires_at = new Date(Date.now() + (parseInt(process.env.EMAIL_TOKEN_EXP_HOURS || '2', 10) * 3600 * 1000));

    await EmailToken.create({
      user: user._id,
      token_hash: tokenHash,
      purpose: 'reset_password',
      expires_at
    });

    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}&uid=${user._id}`;

    try {
      await sendMail({
        to: user.email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        text: `Reset your password: ${resetLink}`
      });
    } catch (mailErr) {
      console.error('Mail send failed (forgot-password):', mailErr);
      return res.json({
        success: true,
        message: 'If that email exists we sent a reset link (note: email sending failed).',
        mailError: String(mailErr.message || mailErr)
      });
    }

    return res.json({ success: true, message: 'If that email exists we sent a reset link' });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
  }
});

/**
 * RESET PASSWORD
 */
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token, uid, newPassword } = req.body;
    if (!token || !uid || !newPassword) return res.status(400).json({ error: 'token, uid, newPassword required' });

    const tokens = await EmailToken.find({ user: uid, purpose: 'reset_password' });
    if (!tokens.length) return res.status(400).json({ error: 'Invalid or expired token' });

    let match = null;
    for (const t of tokens) {
      const ok = await compareTokenHash(token, t.token_hash);
      if (ok) { match = t; break; }
    }
    if (!match) return res.status(400).json({ error: 'Invalid token' });
    if (new Date(match.expires_at) < new Date()) return res.status(400).json({ error: 'Expired token' });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
    const newHash = await bcrypt.hash(newPassword, saltRounds);
    await User.findByIdAndUpdate(uid, { password_hash: newHash });

    await EmailToken.deleteMany({ user: uid, purpose: 'reset_password' });
    await RefreshToken.updateMany({ user: uid }, { revoked: true });

    res.clearCookie('access_token', getCookieOptions());
    res.clearCookie('refresh_token', getCookieOptions());

    return res.json({ success: true });
  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ error: 'Server error', details: String(err.message || err) });
  }
});

export default router;
