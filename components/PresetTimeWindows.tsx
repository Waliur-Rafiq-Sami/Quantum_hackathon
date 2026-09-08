"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Wrench,
  MapPin,
  Calendar,
  Clock,
  Zap,
  FileText,
  ChevronDown,
  Check,
  Star,
  ShieldCheck,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Sparkles,
} from "lucide-react";

// --- Types ---
export interface Provider {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  baseCharge: number;
  matchScore?: number;
  avatar: string;
}

export interface ServiceRequest {
  id: string;
  serviceName: string;
  location: string;
  date: string;
  timeSlot: string;
  urgency: "Normal" | "Urgent";
  problemDetails: string;
  provider: Provider;
  status: string;
  createdAt: string;
}

export interface TimeSlotOption {
  id: string;
  label: string;
  period: "Morning" | "Afternoon" | "Evening";
  icon: React.ElementType;
  tag?: string;
  available?: boolean;
}

// Unified Props Interface for Time Picker Components
export interface TimePickerProps {
  timeSlot: string;
  setTimeSlot: (slot: string) => void;
}

export interface BookingWidgetProps {
  providers?: Provider[];
  onConfirmBooking: (req: ServiceRequest) => void;
}

// Shared Time Slot Presets
const TIME_SLOTS: TimeSlotOption[] = [
  {
    id: "1",
    label: "08:00 AM - 10:00 AM",
    period: "Morning",
    icon: Sunrise,
    tag: "Fastest",
    available: true,
  },
  {
    id: "2",
    label: "10:00 AM - 12:00 PM",
    period: "Morning",
    icon: Sun,
    available: true,
  },
  {
    id: "3",
    label: "01:00 PM - 03:00 PM",
    period: "Afternoon",
    icon: Sun,
    tag: "Popular",
    available: true,
  },
  {
    id: "4",
    label: "03:00 PM - 05:00 PM",
    period: "Afternoon",
    icon: Sunset,
    available: true,
  },
  {
    id: "5",
    label: "05:00 PM - 07:00 PM",
    period: "Evening",
    icon: Moon,
    available: true,
  },
];

// --- Sub-Component 1: Grid-style Preferred Time Picker ---
export function PreferredTimePicker({
  timeSlot,
  setTimeSlot,
}: TimePickerProps) {
  const [isCustom, setIsCustom] = useState(false);

  return (
    <div className="space-y-3">
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          Preferred Arrival Window
        </label>
        <button
          type="button"
          onClick={() => setIsCustom(!isCustom)}
          className="text-[11px] text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          {isCustom ? "Select standard slot" : "Set custom time"}
        </button>
      </div>

      {!isCustom ? (
        /* Preset Time Slot Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TIME_SLOTS.map((slot) => {
            const Icon = slot.icon;
            const isSelected = timeSlot === slot.label;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setTimeSlot(slot.label)}
                className={`relative flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? "bg-blue-950/60 border-blue-500 text-white shadow-sm shadow-blue-500/20 ring-1 ring-blue-500/40"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-slate-900 text-slate-500"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <span className="font-mono font-medium block leading-none">
                      {slot.label}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {slot.period}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {slot.tag && !isSelected && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {slot.tag}
                    </span>
                  )}
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-400 stroke-[3]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Native Time Input Fallback */
        <div className="relative">
          <input
            type="time"
            value={
              timeSlot.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/) ? timeSlot : ""
            }
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
          />
          <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>
      )}
    </div>
  );
}

// --- Sub-Component 2: Popover Dropdown Time Picker (Same API) ---
export function CustomTimePicker({ timeSlot, setTimeSlot }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-blue-400" />
        Arrival Window
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-950/80 border text-left rounded-xl px-3.5 py-2.5 text-xs text-slate-200 flex items-center justify-between transition-all duration-200 focus:outline-none ${
          isOpen
            ? "border-blue-500 ring-2 ring-blue-500/20 bg-slate-900"
            : "border-slate-800 hover:border-slate-700 bg-slate-950"
        }`}
      >
        <span className="flex items-center gap-2 truncate font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {timeSlot || "Select Time Window"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 p-3 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Available Slots
            </span>
            <button
              type="button"
              onClick={() => setIsCustom(!isCustom)}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {isCustom ? "Use presets" : "Custom time"}
            </button>
          </div>

          {!isCustom ? (
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {TIME_SLOTS.map((slot) => {
                const Icon = slot.icon;
                const isSelected = timeSlot === slot.label;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => {
                      setTimeSlot(slot.label);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                      isSelected
                        ? "bg-blue-600/20 border border-blue-500/50 text-white font-medium"
                        : "hover:bg-slate-800/60 text-slate-300 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          isSelected
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left font-mono">
                        <div>{slot.label}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {slot.tag && !isSelected && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {slot.tag}
                        </span>
                      )}
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="pt-1">
              <input
                type="time"
                value={
                  timeSlot.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
                    ? timeSlot
                    : ""
                }
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- Main Widget Component ---
export default function BookingWidget({
  providers = [],
  onConfirmBooking,
}: BookingWidgetProps) {
  const [selectedService, setSelectedService] = useState(
    "Appliance & Gadget Repair",
  );
  const [location, setLocation] = useState("Dhanmondi, Dhaka");
  const [date, setDate] = useState("2026-09-12");
  const [timeSlot, setTimeSlot] = useState("01:00 PM - 03:00 PM");
  const [urgency, setUrgency] = useState<"Normal" | "Urgent">("Normal");
  const [problemDetails, setProblemDetails] = useState(
    "AC unit blowing warm air, needs gas check.",
  );
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const topProvider = providers[0] || {
    id: "PROV-101",
    name: "Tanvir Hossain",
    expertise: "Master HVAC Technician",
    rating: 4.9,
    reviewsCount: 142,
    distanceKm: 1.8,
    baseCharge: 850,
    matchScore: 98,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 500);
  };

  const handleLockBooking = () => {
    if (!topProvider) return;
    const newReq: ServiceRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceName: selectedService,
      location,
      date,
      timeSlot,
      urgency,
      problemDetails,
      provider: topProvider,
      status: "Requested",
      createdAt: new Date().toLocaleTimeString(),
    };
    onConfirmBooking(newReq);
  };

  return (
    <section id="booking" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-800/80 gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Automated
                Service Dispatch
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
                Submit Service Requirement
              </h3>
            </div>
            {urgency === "Urgent" && (
              <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2 shadow-sm shadow-red-500/10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Emergency Priority (+৳200)
              </span>
            )}
          </div>

          {/* Booking Inputs Form */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
          >
            {/* Service Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-blue-400" /> Category
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="Appliance & Gadget Repair">
                  Appliance & Gadget Repair
                </option>
                <option value="Plumbing Services">Plumbing Services</option>
                <option value="Electrical Systems">Electrical Systems</option>
                <option value="Deep Cleaning & Pest Control">
                  Deep Cleaning & Pest Control
                </option>
                <option value="Home Care & Carpentry">
                  Home Care & Carpentry
                </option>
                <option value="Relocation & Shifting">
                  Relocation & Shifting
                </option>
              </select>
            </div>

            {/* Location Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Urgency Dispatch Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-400" /> Dispatch Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency("Normal")}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    urgency === "Normal"
                      ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm shadow-blue-500/20"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency("Urgent")}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    urgency === "Urgent"
                      ? "bg-red-600/20 border-red-500 text-red-300 shadow-sm shadow-red-500/20"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  Emergency
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" /> Scheduled
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
              />
            </div>

            {/* Time Selector (Now accepts timeSlot & setTimeSlot identically) */}
            <CustomTimePicker timeSlot={timeSlot} setTimeSlot={setTimeSlot} />

            {/* Problem Details */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" /> Issue
                Description
              </label>
              <input
                type="text"
                value={problemDetails}
                onChange={(e) => setProblemDetails(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Describe your issue..."
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 lg:col-span-3 pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 font-bold text-white rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-mono"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Finding Nearest Qualified Technician...
                  </span>
                ) : (
                  <>Run Automated Matching Engine</>
                )}
              </button>
            </div>
          </form>

          {/* Top Recommendation Box */}
          {hasSearched && topProvider && (
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Top Matched Technician
                </span>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/80 shadow-sm">
                  Match Score: {topProvider.matchScore ?? 98}%
                </span>
              </div>

              <div className="p-4 bg-slate-950/90 rounded-2xl border border-blue-500/30 hover:border-blue-500/60 transition-all grid md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 flex items-center gap-3.5">
                  <img
                    src={topProvider.avatar}
                    alt={topProvider.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                      {topProvider.name}
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                    </h4>
                    <p className="text-xs text-slate-400">
                      {topProvider.expertise}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-300 font-mono">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {topProvider.rating} ({topProvider.reviewsCount})
                      </span>
                      <span>•</span>
                      <span className="text-blue-400">
                        {topProvider.distanceKm} km away
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col sm:flex-row items-end sm:items-center justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400 font-mono">
                      ৳
                      {topProvider.baseCharge +
                        (urgency === "Urgent" ? 200 : 0)}
                    </div>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      Estimated Charge
                    </span>
                  </div>
                  <button
                    onClick={handleLockBooking}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    <Check className="w-4 h-4" /> Confirm & Lock Slot
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
