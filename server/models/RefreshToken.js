// models/RefreshToken.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const RefreshTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token_hash: { type: String, required: true },
  user_agent: String,
  ip: String,
  revoked: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date, required: true }
});

export default mongoose.model('RefreshToken', RefreshTokenSchema);
