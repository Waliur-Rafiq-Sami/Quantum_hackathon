export type HistoryServiceStatus = "Completed" | "Cancelled";
export type UrgencyLevel = "Normal" | "Urgent" | "Emergency";

export interface HistoryServiceProvider {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  phone: string;
  avatar: string;
}

export interface HistoryServiceRequest {
  id: string;
  serviceTitle: string;
  serviceCategory: string;
  location: string;
  completedDate: string; // Used for when the job actually finished/cancelled
  scheduledDate: string;
  timeSlot: string;
  urgency: UrgencyLevel;
  status: HistoryServiceStatus;
  totalCost: number;
  paymentMethod: string;
  provider: HistoryServiceProvider;
  ratingGiven?: number; // Optional: If the user rated the completed job
  feedback?: string;
}
