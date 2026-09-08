import { LucideIcon } from "lucide-react";

export type ServiceCategory = {
  id: string;
  name: string;
  desc: string;
  image: string;
  icon: LucideIcon;
  badge?: string;
  startingPrice: string;
  popularTasks: string[];
};

export type Provider = {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  baseCharge: number;
  availableTime: string;
  expertise: string;
  verified: boolean;
  phone: string;
  avatar: string;
  matchScore?: number;
};

export type ServiceRequest = {
  id: string;
  serviceName: string;
  location: string;
  date: string;
  timeSlot: string;
  urgency: "Normal" | "Urgent";
  problemDetails: string;
  provider: Provider;
  status: "Requested" | "Accepted" | "On the Way" | "In Progress" | "Completed";
  createdAt: string;
};

export type AlgorithmWeights = {
  distance: number;
  rating: number;
  price: number;
  speed: number;
};
