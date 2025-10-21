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


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // allow frontend requests
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
