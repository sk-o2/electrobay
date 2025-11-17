// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file

// const app = express(); // Create an Express application

// app.use(cors()); // Enable CORS for all routes
// app.use(express.json()); // Parse JSON request bodies

// app.get('/',(req, res)=>{
//     res.send('server is running')
// })

// // Connect to MongoDB

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true, // Use the new URL parser
//     useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine

// }).then(()=>
//     console.log('connected to mongodb')
// ).catch((err)=>
//     console.error('failed to connect to mongodb', err)
// );

// const PORT=process.env.PORT || 5000; // Use the PORT environment variable or default to 5000

// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`)
// })

// import dotenv from "dotenv";
// dotenv.config();
// console.log("Loaded .env variables:");
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import cookieParser from "cookie-parser";

// const app = express();

// // Middleware
// app.use(cors({ origin: "http://localhost:5173", credentials: true })); // allow frontend requests
// app.use(express.json());
// app.use(cookieParser());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error(err));

// // Routes
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
// Route imports
import authRoutes from './routes/auth.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import protectedRoutes from './routes/protected.js'


dotenv.config();

const app = express();
app.use(helmet());
app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Your React app URL
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);        // Login, Signup
app.use('/api/products', productRoutes); // Public product routes
app.use('/api/cart', cartRoutes);        // Protected cart routes
app.use('/api/orders', orderRoutes);     // Protected order routes
app.use('/api/user', userRoutes);        // Protected user routes
app.use('/api', protectedRoutes);       // Additional protected routes
app.use("/api", authRoutes);
app.use('/api/profile', protectedRoutes); // User profile routes

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
