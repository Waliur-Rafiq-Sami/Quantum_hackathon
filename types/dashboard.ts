// ==========================================
// File: types/dashboard.ts
// ==========================================

export type ServiceStatus =
  | "Requested"
  | "Accepted"
  | "On the Way"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export type PaymentMethodType =
  | "Cash on Delivery"
  | "bKash"
  | "Nagad"
  | "Credit/Debit Card";

export interface Provider {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  baseCharge: number;
  matchScore: number;
  avatar: string;
  phone: string;
}

export interface ServiceRequest {
  id: string;
  serviceCategory: string;
  serviceTitle: string;
  customerName: string;
  contactPhone: string;
  location: string;
  date: string;
  timeSlot: string;
  urgency: "Normal" | "Emergency";
  problemDetails: string;
  images: string[];
  provider: Provider;
  status: ServiceStatus;
  paymentMethod: PaymentMethodType;
  paymentStatus: "Pending" | "Paid";
  totalAmount: number;
  createdAt: string;
  customerRating?: number;
  customerReview?: string;
}
