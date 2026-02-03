import mongoose from "mongoose";

const { Schema } = mongoose;

const EmailTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token_hash: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["verify_email", "reset_password"],
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EmailToken", EmailTokenSchema);
