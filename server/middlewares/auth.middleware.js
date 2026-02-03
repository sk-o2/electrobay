// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies.accessToken;

//     if (!token) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// /* USER AUTH (LOGGED IN) */
// export const protect = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// /* ADMIN ONLY */
// export const adminOnly = (req, res, next) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({ message: "Admin access only" });
//   }
//   next();
// };



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies.accessToken;

//     if (!token) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };





import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* =========================
   ADMIN ONLY
========================= */
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
  next();
};
