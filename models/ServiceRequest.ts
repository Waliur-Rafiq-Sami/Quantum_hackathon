import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IProvider {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  baseCharge: number;
  matchScore?: number;
  avatar: string;
}

export interface IServiceRequest extends Document {
  serviceName: string;
  customerName: string;
  contactPhone: string;
  location: string;
  date: string;
  timeSlot: string;
  urgency: "Normal" | "Urgent";
  problemDetails: string;
  images: string[];
  provider: IProvider;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProviderSchema = new Schema<IProvider>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    expertise: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewsCount: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    baseCharge: { type: Number, required: true },
    matchScore: { type: Number },
    avatar: { type: String, required: true },
  },
  { _id: false },
);

const ServiceRequestSchema = new Schema<IServiceRequest>(
  {
    serviceName: { type: String, required: true },
    customerName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    urgency: { type: String, enum: ["Normal", "Urgent"], default: "Normal" },
    problemDetails: { type: String, required: true },
    images: { type: [String], default: [] },
    provider: { type: ProviderSchema, required: true },
    status: { type: String, default: "Requested" },
  },
  { timestamps: true },
);

export default models.ServiceRequest ||
  model<IServiceRequest>("ServiceRequest", ServiceRequestSchema);
