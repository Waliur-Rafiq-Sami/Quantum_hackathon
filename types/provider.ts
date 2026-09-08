export type JobStatus =
  | "Requested"
  | "Accepted"
  | "On the Way"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export type UrgencyLevel = "Normal" | "High" | "Emergency";

export interface JobRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  serviceTitle: string;
  serviceCategory: string;
  date: string;
  timeSlot: string;
  urgency: UrgencyLevel;
  problemDetails: string;
  estimatedPay: number;
  distanceKm: number;
  status: JobStatus;
}

export interface BookedSlot {
  id: string;
  date: string;
  timeSlot: string;
  jobId: string;
  serviceTitle: string;
  customerName: string;
}
