import { JobRequest, BookedSlot } from "@/types/provider";

export const INITIAL_JOB_REQUESTS: JobRequest[] = [
  {
    id: "JOB-9021",
    customerName: "Tanvir Ahmed",
    customerPhone: "+880 1711-223344",
    customerAddress: "House 42, Road 7, Dhanmondi, Dhaka",
    serviceTitle: "AC Cooling & Master Repair",
    serviceCategory: "Appliance & Gadget Repair",
    date: "2026-09-12",
    timeSlot: "04:00 PM - 06:00 PM",
    urgency: "High",
    problemDetails:
      "AC is making loud rattling noise and not blowing cold air. Water leaking inside bedroom.",
    estimatedPay: 1200,
    distanceKm: 2.3,
    status: "Requested",
  },
  {
    id: "JOB-9022",
    customerName: "Sumiya Rahman",
    customerPhone: "+880 1819-556677",
    customerAddress: "Block B, Section 11, Mirpur, Dhaka",
    serviceTitle: "Bathroom Pipe Leakage Fix",
    serviceCategory: "Plumbing",
    date: "2026-09-12",
    timeSlot: "04:00 PM - 06:00 PM", // Same time slot to demonstrate double-booking protection!
    urgency: "Emergency",
    problemDetails:
      "Main water pipe burst under sink. Water flooding bathroom floor urgently.",
    estimatedPay: 1500,
    distanceKm: 4.1,
    status: "Requested",
  },
  {
    id: "JOB-9023",
    customerName: "Rafiqul Islam",
    customerPhone: "+880 1912-889900",
    customerAddress: "Sector 4, Uttara, Dhaka",
    serviceTitle: "Short Circuit & Breaker Repair",
    serviceCategory: "Electrical",
    date: "2026-09-13",
    timeSlot: "10:00 AM - 12:00 PM",
    urgency: "Normal",
    problemDetails:
      "Main switch trips every time refrigerator turns on. Need complete breaker inspection.",
    estimatedPay: 950,
    distanceKm: 3.5,
    status: "Requested",
  },
  {
    id: "JOB-9018",
    customerName: "Anisur Rahman",
    customerPhone: "+880 1678-112233",
    customerAddress: "Banani 11, Dhaka",
    serviceTitle: "Full House Deep Cleaning",
    serviceCategory: "Cleaning & Pest Control",
    date: "2026-09-10",
    timeSlot: "02:00 PM - 04:00 PM",
    urgency: "Normal",
    problemDetails:
      "Move-in deep cleaning for 3 BHK apartment including kitchen sanitization.",
    estimatedPay: 2500,
    distanceKm: 1.8,
    status: "In Progress",
  },
];

export const INITIAL_BOOKED_SLOTS: BookedSlot[] = [
  {
    id: "SLOT-101",
    date: "2026-09-10",
    timeSlot: "02:00 PM - 04:00 PM",
    jobId: "JOB-9018",
    serviceTitle: "Full House Deep Cleaning",
    customerName: "Anisur Rahman",
  },
];
