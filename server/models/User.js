// models/User.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const AddressSchema = new Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
}, { _id: false });

const UserSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String },
  address: { type: AddressSchema, default: null },
  is_active: { type: Boolean, default: false },
  role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', function preSave(next) {
  this.updated_at = Date.now();
  next();
});




export default mongoose.model('User', UserSchema);
