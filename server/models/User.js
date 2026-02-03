import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, index: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
  line1: { type: String }, 
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
},


    role: { type: String, enum: ["user", "admin"], default: "user" },

    isEmailVerified: { type: Boolean, default: false },

    refreshToken: String,

    emailVerifyToken: String,
    emailVerifyExpires: Date,

    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
