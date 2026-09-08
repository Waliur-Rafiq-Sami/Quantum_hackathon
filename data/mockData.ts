// ==========================================
// File: data/mockData.ts
// ==========================================

import { Provider, ServiceRequest } from "@/types/dashboard";

export const fontCategoryList = [
  "Appliance & Gadget Repair",
  "Plumbing Services",
  "Electrical Systems",
  "Deep Cleaning & Pest Control",
  "Home Maintenance",
  "Moving & Shifting",
  "Car Care & Repair",
  "Personal Care",
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: "PROV-101",
    name: "Rahim Electronics",
    expertise: "AC & Appliance Repair Specialist",
    rating: 4.8,
    reviewsCount: 184,
    distanceKm: 2.3,
    baseCharge: 1000,
    matchScore: 98,
    avatar:
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&q=80",
    phone: "+880 1711-223344",
  },
  {
    id: "PROV-102",
    name: "Karim Plumbing & Sanitation",
    expertise: "Master Plumber & Pipe Leakage Specialist",
    rating: 4.9,
    reviewsCount: 210,
    distanceKm: 1.5,
    baseCharge: 800,
    matchScore: 95,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    phone: "+880 1812-334455",
  },
  {
    id: "PROV-103",
    name: "Dhaka Electric Solutions",
    expertise: "Certified High-Voltage Electrician",
    rating: 4.7,
    reviewsCount: 96,
    distanceKm: 3.1,
    baseCharge: 900,
    matchScore: 91,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    phone: "+880 1913-445566",
  },
];

export const INITIAL_ORDERS: ServiceRequest[] = [
  {
    id: "HA-8092",
    serviceCategory: "Appliance & Gadget Repair",
    serviceTitle: "AC Cooling & Gas Refill Check",
    customerName: "Sarah Ahmed",
    contactPhone: "+880 1700-112233",
    location: "House 42, Road 7/A, Dhanmondi, Dhaka",
    date: "2026-09-12",
    timeSlot: "04:00 PM - 06:00 PM",
    urgency: "Normal",
    problemDetails:
      "AC unit blowing warm air, needs pressure check and cleaning.",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80",
    ],
    provider: MOCK_PROVIDERS[0],
    status: "On the Way",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    totalAmount: 1000,
    createdAt: "2026-09-08 14:30",
  },
  {
    id: "HA-7421",
    serviceCategory: "Plumbing Services",
    serviceTitle: "Kitchen Sink Leakage Repair",
    customerName: "Sarah Ahmed",
    contactPhone: "+880 1700-112233",
    location: "House 42, Road 7/A, Dhanmondi, Dhaka",
    date: "2026-08-25",
    timeSlot: "10:00 AM - 12:00 PM",
    urgency: "Emergency",
    problemDetails: "Main drainage pipe clogged, water overflowing in kitchen.",
    images: [],
    provider: MOCK_PROVIDERS[1],
    status: "Completed",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",
    totalAmount: 1000, // 800 + 200 Emergency fee
    createdAt: "2026-08-25 09:15",
    customerRating: 5,
    customerReview:
      "Fixed the leak in less than 30 minutes. Super polite provider!",
  },
];
