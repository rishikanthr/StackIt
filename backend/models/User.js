import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 40,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // allows null for guests
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    passwordHash: { type: String },
    role: {
      type: String,
      enum: ['guest', 'user', 'admin'],
      default: 'guest',
    },
  },
  { timestamps: true }
);

// Compare password
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

// Hash password before save (for user/admin only)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash') || !this.passwordHash) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

export default model('User', UserSchema);
