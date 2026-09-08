// "use client";

// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import { SERVICES_DATA } from "../data/mockServices";
// import { ServiceCategory } from "../types/service";

// export default function ServiceCategories() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategoryModal, setSelectedCategoryModal] =
//     useState<ServiceCategory | null>(null);

//   const filteredServices = SERVICES_DATA.filter(
//     (s) =>
//       s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       s.desc.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   return (
//     <section
//       id="categories"
//       className="py-16 bg-slate-900/40 border-y border-slate-800/80"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
//           <div>
//             <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
//               Full Spectrum Services
//             </span>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
//               Automated Home Care Catalog
//             </h2>
//           </div>

//           <div className="relative w-full md:w-72">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Filter services..."
//               className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
//             />
//             <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredServices.map((item) => {
//             const IconComp = item.icon;
//             return (
//               <div
//                 key={item.id}
//                 onClick={() => setSelectedCategoryModal(item)}
//                 className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col justify-between cursor-pointer"
//               >
//                 <div className="relative h-44 w-full overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

//                   {item.badge && (
//                     <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
//                       {item.badge}
//                     </span>
//                   )}

//                   <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center">
//                     <IconComp className="w-5 h-5 text-blue-400" />
//                   </div>
//                 </div>

//                 <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
//                   <div>
//                     <h4 className="font-bold text-base text-slate-100 group-hover:text-blue-400 transition-colors">
//                       {item.name}
//                     </h4>
//                     <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
//                       {item.desc}
//                     </p>
//                   </div>

//                   <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
//                     <span className="text-[11px] text-slate-400">
//                       Starting from
//                     </span>
//                     <span className="text-xs font-bold text-white font-mono">
//                       {item.startingPrice}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Modal Detail Preview */}
//         {selectedCategoryModal && (
//           <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
//             <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative">
//               <button
//                 onClick={() => setSelectedCategoryModal(null)}
//                 className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm"
//               >
//                 ✕
//               </button>
//               <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                 {selectedCategoryModal.name}
//               </h3>
//               <p className="text-xs text-slate-400 mt-2">
//                 {selectedCategoryModal.desc}
//               </p>

//               <div className="mt-4 pt-3 border-t border-slate-800">
//                 <span className="text-xs font-mono font-bold text-blue-400 uppercase">
//                   Covered Tasks & Services
//                 </span>
//                 <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
//                   {selectedCategoryModal.popularTasks.map((task) => (
//                     <li key={task} className="flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
//                       {task}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <button
//                 onClick={() => setSelectedCategoryModal(null)}
//                 className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
//               >
//                 Close Service Preview
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Wrench,
  Droplet,
  Zap,
  Sparkles,
  Home,
  Truck,
  Car,
  User,
  X,
  Check,
  ShieldCheck,
  Clock,
  MapPin,
  AlertCircle,
  ArrowRight,
  Calculator,
  TrendingDown,
  Star,
  CheckCircle2,
} from "lucide-react";
import { ServiceRequest, Provider } from "../types/service";

// Expanded Task-Level Data matching BAUST CSE FEST 2026 Hackathon Requirements
export interface TaskItem {
  id: string;
  name: string;
  basePrice: number;
  duration: string;
  description: string;
  isPopular?: boolean;
}

export interface CategoryDetail {
  id: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  image: string;
  badge?: string;
  startingPrice: number;
  avgMarketPrice: number;
  ratePerKm: number; // Dynamic distance charge rate
  tasks: TaskItem[];
}

const EXTENDED_CATEGORIES: CategoryDetail[] = [
  {
    id: "appliance",
    name: "Appliance & Gadget Repair",
    desc: "AC maintenance, TV repair, refrigerator servicing & microwave overhaul.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
    badge: "High Demand",
    startingPrice: 800,
    avgMarketPrice: 1200,
    ratePerKm: 30,
    tasks: [
      {
        id: "ac-gas",
        name: "AC Master Servicing & Gas Refill",
        basePrice: 1500,
        duration: "90 mins",
        description:
          "Pressure check, jet wash outdoor unit & Freon R32 refill.",
        isPopular: true,
      },
      {
        id: "fridge-compressor",
        name: "Refrigerator Compressor & Cooling Repair",
        basePrice: 1800,
        duration: "120 mins",
        description: "Relay switch replacement, gas charging & thermostat fix.",
      },
      {
        id: "microwave-circuit",
        name: "Microwave PCB & Magnetron Repair",
        basePrice: 900,
        duration: "45 mins",
        description: "High-voltage diode testing & heating coil fix.",
      },
      {
        id: "tv-display",
        name: "LED/OLED TV Backlight & Panel Repair",
        basePrice: 1200,
        duration: "60 mins",
        description: "Strip light replacing, display board re-soldering.",
      },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing Services",
    desc: "Leak detection, pipe fittings, sanitary installation & pump repair.",
    icon: Droplet,
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    badge: "24/7 Fast",
    startingPrice: 500,
    avgMarketPrice: 850,
    ratePerKm: 25,
    tasks: [
      {
        id: "pipe-leak",
        name: "Concealed Pipe Leak Detection & Sealing",
        basePrice: 850,
        duration: "60 mins",
        description: "Acoustic detection and chemical sealant application.",
        isPopular: true,
      },
      {
        id: "sanitary-fit",
        name: "Commode / Sink Fitting & Blockage Clear",
        basePrice: 700,
        duration: "45 mins",
        description: "Drain snake clearing and silicone sealing.",
      },
      {
        id: "water-pump",
        name: "Submersible Motor & Pump Overhaul",
        basePrice: 1400,
        duration: "90 mins",
        description: "Winding check, capacitor replacement & line prime.",
      },
    ],
  },
  {
    id: "electrical",
    name: "Electrical Systems",
    desc: "Short circuit repair, DB box installation, light fixture & generator care.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    startingPrice: 450,
    avgMarketPrice: 700,
    ratePerKm: 20,
    tasks: [
      {
        id: "short-circuit",
        name: "Emergency Short-Circuit Diagnosis",
        basePrice: 650,
        duration: "40 mins",
        description:
          "Multimeter line tracing, burnt wire bypass & breaker check.",
        isPopular: true,
      },
      {
        id: "db-box",
        name: "3-Phase Distribution Box Wiring",
        basePrice: 1600,
        duration: "120 mins",
        description: "MCB/RCCB installation & load balance optimization.",
      },
      {
        id: "fan-chandelier",
        name: "Heavy Chandelier / Decorative Lighting Setup",
        basePrice: 800,
        duration: "60 mins",
        description:
          "Ceiling anchor drilling, transformer setup & safety check.",
      },
    ],
  },
  {
    id: "cleaning",
    name: "Deep Cleaning & Pest Control",
    desc: "Full home deep sanitization, sofa wash, kitchen degreasing & pest extermination.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    badge: "Eco-Friendly",
    startingPrice: 1200,
    avgMarketPrice: 1800,
    ratePerKm: 35,
    tasks: [
      {
        id: "sofa-wash",
        name: "5-Seater Sofa Injection-Extraction Deep Wash",
        basePrice: 1600,
        duration: "90 mins",
        description:
          "Stain extraction, anti-microbial shampooing & vacuum dry.",
        isPopular: true,
      },
      {
        id: "pest-bedbug",
        name: "Herbal Bed Bug & Cockroach Eradication",
        basePrice: 2200,
        duration: "150 mins",
        description:
          "Odorless chemical misting + gel baiting with 6-month warranty.",
      },
      {
        id: "kitchen-degrease",
        name: "Modular Kitchen Steam Degreasing",
        basePrice: 1900,
        duration: "120 mins",
        description:
          "Chimney filter degreasing, cabinet oil stain steam removal.",
      },
    ],
  },
  {
    id: "carpentry",
    name: "Home Care & Carpentry",
    desc: "Furniture repair, door lock installation, cabinet setup & wall mounting.",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    startingPrice: 600,
    avgMarketPrice: 950,
    ratePerKm: 20,
    tasks: [
      {
        id: "smart-lock",
        name: "Digital Biometric Door Lock Installation",
        basePrice: 1100,
        duration: "60 mins",
        description:
          "Wooden door mortise cutting, sensor calibration & testing.",
        isPopular: true,
      },
      {
        id: "furniture-repair",
        name: "Hinge, Drawer Slider & Wood Polish Touchup",
        basePrice: 750,
        duration: "45 mins",
        description: "Soft-close hinge replacement & minor scratch sanding.",
      },
    ],
  },
  {
    id: "moving",
    name: "Relocation & Shifting",
    desc: "Home shifting, heavy furniture packing, office relocation & truck dispatch.",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    startingPrice: 3500,
    avgMarketPrice: 5000,
    ratePerKm: 60,
    tasks: [
      {
        id: "flat-shift",
        name: "2BHK Complete Apartment Relocation",
        basePrice: 5500,
        duration: "300 mins",
        description:
          "Bubble wrap packaging, covered truck freight & unpacking.",
        isPopular: true,
      },
      {
        id: "appliance-move",
        name: "Heavy Appliance Single-Item Safe Transport",
        basePrice: 2000,
        duration: "90 mins",
        description: "Strapped hydraulic lift loading with transit insurance.",
      },
    ],
  },
  {
    id: "carcare",
    name: "On-Demand Car Care",
    desc: "At-home waterless foam wash, battery jumpstart, oil change & detailing.",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
    startingPrice: 700,
    avgMarketPrice: 1100,
    ratePerKm: 30,
    tasks: [
      {
        id: "foam-wash",
        name: "Doorstep Premium Foam Wash & Interior Vacuum",
        basePrice: 950,
        duration: "60 mins",
        description: "High-pressure washer, tire shine & dashboard polish.",
        isPopular: true,
      },
      {
        id: "battery-boost",
        name: "24/7 Emergency Battery Jumpstart & Health Test",
        basePrice: 600,
        duration: "30 mins",
        description: "Heavy-duty booster cable restart & alternator testing.",
      },
    ],
  },
  {
    id: "personalcare",
    name: "At-Home Personal Care",
    desc: "Salon grooming, therapeutic massage, elder nursing & physiotherapy.",
    icon: User,
    image:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80",
    badge: "Verified Pros",
    startingPrice: 650,
    avgMarketPrice: 1000,
    ratePerKm: 20,
    tasks: [
      {
        id: "hair-spa",
        name: "Men's / Women's Executive Haircut & Spa",
        basePrice: 850,
        duration: "50 mins",
        description: "Hygienic single-use cape, styling & scalp massage.",
        isPopular: true,
      },
      {
        id: "physio-session",
        name: "Orthopedic Physiotherapy Session",
        basePrice: 1200,
        duration: "60 mins",
        description:
          "Joint mobilization, TENS machine therapy & exercise plan.",
      },
    ],
  },
];

interface ServiceCategoriesProps {
  onSelectTaskToBook?: (req: Partial<ServiceRequest>) => void;
}

export default function ServiceCategories({
  onSelectTaskToBook,
}: ServiceCategoriesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDetail | null>(null);

  // Dynamic Calculation state inside the Modal Popup
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [userDistance, setUserDistance] = useState<number>(3.2); // km
  const [urgency, setUrgency] = useState<"Normal" | "Urgent">("Normal");
  const [preferredDate, setPreferredDate] = useState("2026-09-12");
  const [preferredTime, setPreferredTime] = useState("4:00 PM - 6:00 PM");
  const [isBookingDone, setIsBookingDone] = useState(false);

  // Filter Categories
  const filteredCategories = useMemo(() => {
    return EXTENDED_CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.tasks.some((t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [searchQuery]);

  // Open Modal with first task pre-selected
  const handleOpenCategory = (cat: CategoryDetail) => {
    setSelectedCategory(cat);
    setSelectedTaskId(cat.tasks[0]?.id || "");
    setIsBookingDone(false);
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
    setIsBookingDone(false);
  };

  // Currently Active Selected Task object
  const activeTask = useMemo(() => {
    if (!selectedCategory) return null;
    return (
      selectedCategory.tasks.find((t) => t.id === selectedTaskId) ||
      selectedCategory.tasks[0]
    );
  }, [selectedCategory, selectedTaskId]);

  // Price Calculations
  const calculatedPricing = useMemo(() => {
    if (!selectedCategory || !activeTask)
      return { base: 0, distanceCharge: 0, emergencyFee: 0, total: 0 };

    const base = activeTask.basePrice;
    const distanceCharge = Math.round(
      userDistance * selectedCategory.ratePerKm,
    );
    const emergencyFee = urgency === "Urgent" ? 200 : 0;
    const total = base + distanceCharge + emergencyFee;

    return { base, distanceCharge, emergencyFee, total };
  }, [selectedCategory, activeTask, userDistance, urgency]);

  // Calculated Provider Match Score for the Modal
  const calculatedMatchScore = useMemo(() => {
    const baseScore = 98;
    const distPenalty = Math.min(20, userDistance * 1.5);
    const urgencyBonus = urgency === "Urgent" ? 2 : 0;
    return Math.max(75, Math.round(baseScore - distPenalty + urgencyBonus));
  }, [userDistance, urgency]);

  // Handle Instant Booking Dispatch
  const handleConfirmTaskBooking = () => {
    if (!selectedCategory || !activeTask) return;

    setIsBookingDone(true);

    const partialRequest: Partial<ServiceRequest> = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceName: `${selectedCategory.name}: ${activeTask.name}`,
      location: "Dhanmondi, Dhaka",
      date: preferredDate,
      timeSlot: preferredTime,
      urgency: urgency,
      problemDetails: `Selected Task: ${activeTask.name}. ${activeTask.description}`,
      status: "Requested",
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    if (onSelectTaskToBook) {
      onSelectTaskToBook(partialRequest);
    }

    setTimeout(() => {
      handleCloseCategory();
    }, 1200);
  };

  return (
    <section
      id="categories"
      className="py-16 bg-slate-900/40 border-y border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                BAUST CSE FEST 2026 Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">
                • 8 Service Domains
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Automated Home Care Catalog
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Click any service category to inspect granular sub-tasks, run live
              distance-based price calculations, and dispatch instant jobs.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category, e.g. AC repair, sofa wash..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleOpenCategory(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/90 hover:border-blue-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/10 flex flex-col justify-between cursor-pointer"
              >
                {/* Card Banner Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                  {item.badge && (
                    <span className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md border border-blue-400/30">
                      {item.badge}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center shadow-lg">
                    <IconComp className="w-5 h-5 text-blue-400" />
                  </div>

                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-300 bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800">
                    {item.tasks.length} Tasks Covered
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-slate-100 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                      <span>{item.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Pricing Footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-mono">
                        Starting From
                      </span>
                      <span className="text-xs font-black text-emerald-400 font-mono">
                        ৳{item.startingPrice}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block font-mono">
                        Market Avg
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 line-through font-mono">
                        ৳{item.avgMarketPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400">
              No service matching "
              <span className="text-slate-200">{searchQuery}</span>"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs text-blue-400 hover:underline font-semibold"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SHADCN-STYLED HIGH-PERFORMANCE POPUP DIALOG FOR TASK-LEVEL BOOKING        */}
      {/* ========================================================================= */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in-0 duration-200 overflow-y-auto">
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden my-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header Banner */}
            <div className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border-b border-slate-800 p-6 flex items-center justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-slate-700/80 flex items-center justify-center shadow-lg">
                  {React.createElement(selectedCategory.icon, {
                    className: "w-6 h-6 text-blue-400",
                  })}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                    Interactive Task Inspector
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {selectedCategory.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleCloseCategory}
                className="relative z-10 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* SECTION 1: Specific Task Selection Radio Options */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2.5 flex items-center justify-between">
                  <span>1. Select Specific Requirement / Task</span>
                  <span className="text-[11px] font-normal text-blue-400">
                    Highlighted Task-Level Pricing
                  </span>
                </label>

                <div className="space-y-2.5">
                  {selectedCategory.tasks.map((task) => {
                    const isSelected = selectedTaskId === task.id;
                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? "bg-blue-950/40 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/30"
                            : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-blue-500 bg-blue-500"
                                : "border-slate-600 bg-transparent"
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-3 h-3 text-white stroke-[3]" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4
                                className={`text-xs font-bold ${
                                  isSelected ? "text-white" : "text-slate-300"
                                }`}
                              >
                                {task.name}
                              </h4>
                              {task.isPopular && (
                                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                                  Most Booked
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                              {task.description}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-mono mt-1.5">
                              <Clock className="w-3 h-3" /> Est. {task.duration}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-emerald-400 font-mono block">
                            ৳{task.basePrice}
                          </span>
                          <span className="text-[9px] text-slate-500">
                            Base
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: Dynamic Distance & Urgency Controls */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-blue-400" /> 2.
                    Real-Time Variable Parameters
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> Algorithmic Pricing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Distance Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <label className="text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" /> Service
                        Distance
                      </label>
                      <span className="font-bold font-mono text-blue-400">
                        {userDistance.toFixed(1)} km
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="15.0"
                      step="0.5"
                      value={userDistance}
                      onChange={(e) =>
                        setUserDistance(parseFloat(e.target.value))
                      }
                      className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Rate: +৳{selectedCategory.ratePerKm}/km from technician
                      hub
                    </span>
                  </div>

                  {/* Urgency Selector */}
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">
                      Dispatch Priority
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setUrgency("Normal")}
                        className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                          urgency === "Normal"
                            ? "bg-blue-600/20 border-blue-500 text-blue-300"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        Standard Slot
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency("Urgent")}
                        className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                          urgency === "Urgent"
                            ? "bg-red-600/20 border-red-500 text-red-300"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        Urgent (+৳200)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Live Price Calculation Breakdown & Match Score */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Calculated Total Charge
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-emerald-400 font-mono">
                      ৳{calculatedPricing.total}
                    </span>
                    <span className="text-xs text-slate-500 line-through font-mono">
                      ৳{selectedCategory.avgMarketPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-1">
                    <span>Base: ৳{calculatedPricing.base}</span>
                    <span>+ Dist: ৳{calculatedPricing.distanceCharge}</span>
                    {calculatedPricing.emergencyFee > 0 && (
                      <span className="text-red-400">+ Urgent: ৳200</span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-right w-full sm:w-auto">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    AI Provider Match Score
                  </span>
                  <span className="text-sm font-bold text-blue-400 font-mono flex items-center justify-end gap-1">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    {calculatedMatchScore}% Optimal Match
                  </span>
                </div>
              </div>

              {/* SECTION 4: Dispatch Confirmation Button */}
              <div>
                {isBookingDone ? (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Task Locked & Dispatched to AI Match Engine!
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirmTaskBooking}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 font-bold text-white rounded-xl shadow-lg shadow-blue-600/25 transition-all text-xs flex items-center justify-center gap-2"
                  >
                    Lock Task & Auto-Dispatch Job (৳{calculatedPricing.total})
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Bottom Guardrail Footer */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
              <span>AutoServe.AI Algorithmic Dispatch v2.4</span>
              <span>Double-Booking Prevention Lock Active</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
