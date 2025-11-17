// // middleware/auth.js
// import jwt from 'jsonwebtoken';

// export const getCookieOptions = ({ maxAgeMs = null } = {}) => {
//   const opts = {
//     httpOnly: true,
//     secure: process.env.COOKIE_SECURE === 'true',
//     sameSite: 'lax',
//     domain: process.env.COOKIE_DOMAIN || undefined,
//     path: '/'
//   };
//   if (maxAgeMs) opts.maxAge = maxAgeMs;
//   return opts;
// };

// export const authenticate = (req, res, next) => {
//   try {
//     const token = req.cookies?.access_token;
//     if (!token) return res.status(401).json({ error: 'Not authenticated' });
//     const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = payload;
//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid/expired access token' });
//   }
// };

// export const authorize = (roles = []) => (req, res, next) => {
//   if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
//   if (roles.length && !roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
//   return next();
// };


// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Cookie options helper
 */
export const getCookieOptions = ({ maxAgeMs = null } = {}) => {
  const opts = {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: '/'
  };
  if (maxAgeMs) opts.maxAge = maxAgeMs;
  return opts;
};

/**
 * authenticate middleware (keeps your original name for compatibility)
 */
export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // req.user = payload; // keep entire payload available (id/_id/role etc.)
    req.user = { _id: decoded.id, role: decoded.role };
    return next();
  } catch (err) {
    console.error('Auth verify error:', err.message);
    return res.status(401).json({ error: 'Invalid/expired access token' });
  }
};

/**
 * protect alias — exported so routes that import `protect` will work
 */
export const protect = authenticate;

/**
 * Role-based authorization middleware
 */
export const authorize = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (roles.length && !roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
  return next();
};




export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  next();
};
