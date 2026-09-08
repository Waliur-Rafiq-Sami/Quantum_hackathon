import { model, models, Schema, type InferSchemaType } from "mongoose";

const serviceRequestSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "matched", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    matchedProviderId: { type: Schema.Types.ObjectId, ref: "Provider" },
  },
  { timestamps: true },
);

export type ServiceRequest = InferSchemaType<typeof serviceRequestSchema>;
export const ServiceRequestModel =
  models.ServiceRequest || model("ServiceRequest", serviceRequestSchema);
