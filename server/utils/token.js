// // utils/tokens.js
// import jwt from 'jsonwebtoken';
// import { randomBytes } from 'crypto';
// import bcrypt from 'bcrypt';

// export const signAccessToken = (payload) => {
//   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP || '15m' });
// };

// export const generateRandomToken = (len = 48) => randomBytes(len).toString('hex');

// export const hashToken = async (token) => {
//   const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
//   return bcrypt.hash(token, rounds);
// };

// export const compareTokenHash = async (token, hash) => {
//   return bcrypt.compare(token, hash);
// };










// utils/tokens.js
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
// Load secrets from environment
const ACCESS_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  process.env.JWT_SECRET; // fallback if your env uses JWT_SECRET

if (!ACCESS_SECRET) {
  throw new Error(
    '❌ Missing ACCESS_TOKEN_SECRET (or JWT_SECRET) in environment. Please add it to your .env file.'
  );
}

// Helper to sign an access token
export const signAccessToken = (payload) => {
  const expiresIn = process.env.ACCESS_TOKEN_EXP || '15m';
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn });
};

// Generate a random token (used for email verification, etc.)
export const generateRandomToken = (len = 48) => randomBytes(len).toString('hex');

// Hash any token (like email verification or refresh)
export const hashToken = async (token) => {
  const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
  return bcrypt.hash(token, rounds);
};

// Compare plain token to its hashed version
export const compareTokenHash = async (token, hash) => {
  return bcrypt.compare(token, hash);
};
