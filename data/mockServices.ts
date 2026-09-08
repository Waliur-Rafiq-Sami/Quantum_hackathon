import {
  Wrench,
  Droplet,
  Zap,
  Sparkles,
  Home,
  Truck,
  Car,
  UserCheck,
} from "lucide-react";
import { ServiceCategory, Provider } from "../types/service";

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "appliance",
    name: "Appliance & Gadget Repair",
    desc: "Precision diagnostics & genuine part replacements for ACs, fridges, smart TVs & electronics.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    icon: Wrench,
    badge: "Most Requested",
    startingPrice: "৳ 500",
    popularTasks: [
      "AC Gas Refill",
      "TV Panel Fix",
      "Refrigerator Compressor",
      "Washing Machine Servicing",
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing Services",
    desc: "Master plumbers for high-pressure leak detection, fitting repairs, and drainage routing.",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800",
    icon: Droplet,
    startingPrice: "৳ 400",
    popularTasks: [
      "Pipe Leakage Repair",
      "Sanitary Installation",
      "Water Tank Cleaning",
      "Geyser Setup",
    ],
  },
  {
    id: "electrical",
    name: "Electrical Systems",
    desc: "Certified electricians for circuit safety audits, DB box wiring, and fixture setups.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    icon: Zap,
    badge: "30-Min Emergency",
    startingPrice: "৳ 450",
    popularTasks: [
      "Short Circuit Fix",
      "Switchboard Wiring",
      "Generator Service",
      "Chandelier Assembly",
    ],
  },
  {
    id: "cleaning",
    name: "Deep Cleaning & Pest Control",
    desc: "Hospital-grade eco-sanitization, upholstery deep-clean & pest eradication.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
    icon: Sparkles,
    startingPrice: "৳ 800",
    popularTasks: [
      "Full House Deep Clean",
      "Sofa & Carpet Wash",
      "Bedbug Treatment",
      "Termite Control",
    ],
  },
  {
    id: "maintenance",
    name: "Home Care & Carpentry",
    desc: "Custom woodworking, door lock retrofitting, wall drilling, and structural touch-ups.",
    image:
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&q=80&w=800",
    icon: Home,
    startingPrice: "৳ 600",
    popularTasks: [
      "Furniture Repair",
      "Smart Lock Mounting",
      "Wall Painting Touch-up",
      "Curtain Rod Drilling",
    ],
  },
  {
    id: "moving",
    name: "Relocation & Shifting",
    desc: "Hassle-free home & office logistics with bubble-wrap packaging & safe transport.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    icon: Truck,
    startingPrice: "৳ 2,500",
    popularTasks: [
      "Apartment Relocation",
      "Office Furniture Shift",
      "Heavy Safe Moving",
      "Inter-City Transport",
    ],
  },
  {
    id: "car",
    name: "On-Demand Car Care",
    desc: "Doorstep waterless detailing, battery diagnostics, and mobile engine tune-ups.",
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800",
    icon: Car,
    startingPrice: "৳ 1,200",
    popularTasks: [
      "Full Interior Wash",
      "Engine OBD Diagnostic",
      "Battery Jumpstart",
      "Ceramic Coating",
    ],
  },
  {
    id: "personal",
    name: "At-Home Personal Care",
    desc: "Verified grooming, wellness therapy, and specialized home physiotherapy.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    icon: UserCheck,
    startingPrice: "৳ 700",
    popularTasks: [
      "Salon at Home",
      "Therapeutic Massage",
      "Elderly Care Routine",
      "Post-Op Rehab",
    ],
  },
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: "p1",
    name: "Rahim Electronics & HVAC",
    rating: 4.9,
    reviewsCount: 218,
    distanceKm: 1.8,
    baseCharge: 1000,
    availableTime: "4:30 PM",
    expertise: "AC Repair & Cooling Master",
    verified: true,
    phone: "+880 1711-902831",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "p2",
    name: "Metro Tech Services",
    rating: 4.7,
    reviewsCount: 142,
    distanceKm: 0.9,
    baseCharge: 1200,
    availableTime: "5:00 PM",
    expertise: "Electrical & Smart Home",
    verified: true,
    phone: "+880 1819-445102",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "p3",
    name: "SmartCool Experts",
    rating: 4.8,
    reviewsCount: 310,
    distanceKm: 3.4,
    baseCharge: 950,
    availableTime: "4:15 PM",
    expertise: "Appliance Overhaul Specialist",
    verified: true,
    phone: "+880 1912-883311",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
];
