import { HistoryServiceRequest } from "@/types/history";

export const HISTORY_CATEGORIES = [
  "Appliance & Gadget Repair",
  "Plumbing",
  "Electrical",
  "Cleaning & Pest Control",
  "Home Maintenance",
  "Moving & Shifting",
  "Car Care & Repair",
  "Personal Care",
];

export const INITIAL_HISTORY_REQUESTS: HistoryServiceRequest[] = [
  {
    id: "REQ-2026-7742",
    serviceTitle: "Full House Deep Cleaning & Pest Control",
    serviceCategory: "Cleaning & Pest Control",
    location: "House 42, Road 7/A, Dhanmondi, Dhaka",
    scheduledDate: "2026-08-15",
    completedDate: "2026-08-15 06:30 PM",
    timeSlot: "02:00 PM - 06:00 PM",
    urgency: "Normal",
    status: "Completed",
    totalCost: 3500,
    paymentMethod: "Credit Card",
    provider: {
      id: "PROV-408",
      name: "CleanMate Solutions",
      expertise: "Deep Clean & Pest Extermination",
      rating: 4.9,
      phone: "+880 1711-556677",
      avatar:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=200",
    },
    ratingGiven: 5,
    feedback: "Excellent service! The team was on time and very thorough.",
  },
  {
    id: "REQ-2026-7810",
    serviceTitle: "Front-Load Washing Machine Drum Repair",
    serviceCategory: "Appliance & Gadget Repair",
    location: "Block C, Bashundhara R/A, Dhaka",
    scheduledDate: "2026-08-22",
    completedDate: "2026-08-22 12:45 PM",
    timeSlot: "10:00 AM - 01:00 PM",
    urgency: "Urgent",
    status: "Completed",
    totalCost: 2200,
    paymentMethod: "bKash Digital",
    provider: {
      id: "PROV-115",
      name: "Appliance Master BD",
      expertise: "Washing Machine & Fridge Specialist",
      rating: 4.6,
      phone: "+880 1912-334455",
      avatar:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=200",
    },
    ratingGiven: 4,
  },
  {
    id: "REQ-2026-7905",
    serviceTitle: "Premium Sofa Shampoo Cleaning",
    serviceCategory: "Cleaning & Pest Control",
    location: "Sector 4, Road 11, Uttara, Dhaka",
    scheduledDate: "2026-09-01",
    completedDate: "2026-09-01 09:15 AM", // Time it was cancelled
    timeSlot: "11:00 AM - 01:00 PM",
    urgency: "Normal",
    status: "Cancelled",
    totalCost: 1200,
    paymentMethod: "Cash on Delivery",
    provider: {
      id: "PROV-412",
      name: "Urban Cleaners",
      expertise: "Upholstery & Carpet Cleaning",
      rating: 4.7,
      phone: "+880 1813-221100",
      avatar:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200",
    },
  },
];
