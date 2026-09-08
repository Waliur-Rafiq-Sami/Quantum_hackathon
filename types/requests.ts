export type ActiveServiceStatus =
  | "Requested"
  | "Accepted"
  | "On the Way"
  | "In Progress";

export type UrgencyLevel = "Normal" | "Urgent" | "Emergency";

export interface ServiceProvider {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  phone: string;
  avatar: string;
  matchScore: number;
}

export interface ActiveServiceRequest {
  id: string;
  serviceTitle: string;
  serviceCategory: string;
  problemDescription: string;
  location: string;
  preferredDate: string;
  timeSlot: string;
  urgency: UrgencyLevel;
  status: ActiveServiceStatus;
  estimatedCost: number;
  paymentMethod: string;
  createdAt: string;
  provider: ServiceProvider;
}
