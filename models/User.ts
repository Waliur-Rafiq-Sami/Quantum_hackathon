import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "customer" | "provider";

  // Customer Specific Fields
  location?: string;

  // Service Provider Specific Fields
  businessName?: string;
  expertiseCategory?: string;
  serviceArea?: string;
  baseCharge?: number;
  verificationDocument?: string; // URL or File path
  isVerified?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["customer", "provider"],
      required: [true, "Role is required"],
    },

    // Customer fields
    location: {
      type: String,
      default: "",
    },

    // Service Provider fields
    businessName: {
      type: String,
      default: "",
    },
    expertiseCategory: {
      type: String,
      default: "",
    },
    serviceArea: {
      type: String,
      default: "",
    },
    baseCharge: {
      type: Number,
      default: 0,
    },
    verificationDocument: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent overwrite model error during Next.js hot-reloads
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
