import mongoose from "mongoose";
import User from "./models/User.js"; // adjust path

await mongoose.connect("mongodb+srv://electrobayhere_db_user:J2zfRX3GynjlwjeF@electrobay.smi4a4h.mongodb.net/?appName=electrobay");

await User.updateMany(
  { address: { $type: "string" } },
  { $set: { address: {} } }
);

console.log("Address field fixed");
process.exit();
