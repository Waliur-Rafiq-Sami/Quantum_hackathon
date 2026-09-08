import { model, models, Schema, type InferSchemaType } from "mongoose";

const providerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true },
    skills: { type: [String], required: true, default: [] },
    location: { type: String, required: true, trim: true },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type Provider = InferSchemaType<typeof providerSchema>;
export const ProviderModel =
  models.Provider || model("Provider", providerSchema);
