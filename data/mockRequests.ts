import { ActiveServiceRequest } from "@/types/requests";

export const CATEGORIES_LIST = [
  "Appliance & Gadget Repair",
  "Plumbing",
  "Electrical",
  "Cleaning & Pest Control",
  "Home Maintenance",
  "Moving & Shifting",
  "Car Care & Repair",
  "Personal Care",
];

export const INITIAL_ACTIVE_REQUESTS: ActiveServiceRequest[] = [
  {
    id: "REQ-2026-8801",
    serviceTitle: "Dual Inverter AC Deep Cleaning & Gas Refill",
    serviceCategory: "Appliance & Gadget Repair",
    problemDescription:
      "Unit is not cooling effectively and makes a buzzing sound during compressor activation.",
    location: "House 42, Road 7/A, Dhanmondi, Dhaka",
    preferredDate: "2026-09-09",
    timeSlot: "04:00 PM - 06:00 PM",
    urgency: "Normal",
    status: "On the Way",
    estimatedCost: 1000,
    paymentMethod: "Cash on Delivery",
    createdAt: "2026-09-08 02:30 PM",
    provider: {
      id: "PROV-102",
      name: "Rahim Electronics",
      expertise: "HVAC & AC Master Technician",
      rating: 4.8,
      reviewsCount: 142,
      distanceKm: 2.3,
      phone: "+880 1711-223344",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      matchScore: 96,
    },
  },
  {
    id: "REQ-2026-8804",
    serviceTitle: "Main Water Line Pipe Leak Fix",
    serviceCategory: "Plumbing",
    problemDescription:
      "Severe water leakage under kitchen sink causing minor floor flooding.",
    location: "Sector 4, Road 11, Uttara, Dhaka",
    preferredDate: "2026-09-08",
    timeSlot: "07:00 PM - 08:30 PM",
    urgency: "Emergency",
    status: "Requested",
    estimatedCost: 1500,
    paymentMethod: "bKash Digital",
    createdAt: "2026-09-08 06:15 PM",
    provider: {
      id: "PROV-204",
      name: "Karim Plumbing Works",
      expertise: "Pipe Fittings & Drain Specialist",
      rating: 4.9,
      reviewsCount: 89,
      distanceKm: 1.1,
      phone: "+880 1812-998877",
      avatar:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200",
      matchScore: 98,
    },
  },
  {
    id: "REQ-2026-8809",
    serviceTitle: "Circuit Breaker Tripping Diagnostic",
    serviceCategory: "Electrical",
    problemDescription:
      "Main breaker trips whenever heavy appliances are powered on.",
    location: "Block C, Bashundhara R/A, Dhaka",
    preferredDate: "2026-09-10",
    timeSlot: "10:00 AM - 12:00 PM",
    urgency: "Urgent",
    status: "In Progress",
    estimatedCost: 850,
    paymentMethod: "Cash on Delivery",
    createdAt: "2026-09-08 05:00 PM",
    provider: {
      id: "PROV-305",
      name: "Dhaka Electric Solutions",
      expertise: "Certified High Voltage Electrician",
      rating: 4.7,
      reviewsCount: 210,
      distanceKm: 3.5,
      phone: "+880 1913-445566",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      matchScore: 91,
    },
  },
];
