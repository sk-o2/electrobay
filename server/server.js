// server.js
import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on ${process.env.PORT}`)
);

// import app from "./app.js";
// import connectDB from "./config/db.js";
// import dotenv from "dotenv";

// dotenv.config();
// connectDB();

// export default app;
