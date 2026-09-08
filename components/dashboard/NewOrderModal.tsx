// ==========================================
// File: components/dashboard/NewOrderModal.tsx
// ==========================================

"use client";

import React, { useState } from "react";
import { ServiceRequest, Provider, PaymentMethodType } from "@/types/dashboard";
import { MOCK_PROVIDERS, fontCategoryList } from "@/data/mockData";
import {
  X,
  Wrench,
  MapPin,
  Calendar,
  Clock,
  Zap,
  FileText,
  User,
  Phone,
  Upload,
  Check,
  Star,
  ShieldCheck,
  CreditCard,
  Banknote,
  Sparkles,
} from "lucide-react";

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitOrder: (order: ServiceRequest) => void;
}

export function NewOrderModal({
  isOpen,
  onClose,
  onSubmitOrder,
}: NewOrderModalProps) {
  const [category, setCategory] = useState(fontCategoryList[0]);
  const [serviceTitle, setServiceTitle] = useState(
    "Appliance Repair & Servicing",
  );
  const [customerName, setCustomerName] = useState("Sarah Ahmed");
  const [contactPhone, setContactPhone] = useState("+880 1700-112233");
  const [location, setLocation] = useState(
    "House 42, Road 7/A, Dhanmondi, Dhaka",
  );
  const [date, setDate] = useState("2026-09-15");
  const [timeSlot, setTimeSlot] = useState("02:00 PM - 04:00 PM");
  const [urgency, setUrgency] = useState<"Normal" | "Emergency">("Normal");
  const [problemDetails, setProblemDetails] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("Cash on Delivery");

  const [matchedProvider, setMatchedProvider] = useState<Provider>(
    MOCK_PROVIDERS[0],
  );

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map((f) => URL.createObjectURL(f));
      setImages((prev) => [...prev, ...urls]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseFee = matchedProvider.baseCharge;
    const urgencyFee = urgency === "Emergency" ? 200 : 0;

    const newRequest: ServiceRequest = {
      id: `HA-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceCategory: category,
      serviceTitle: serviceTitle || `${category} Job`,
      customerName,
      contactPhone,
      location,
      date,
      timeSlot,
      urgency,
      problemDetails,
      images,
      provider: matchedProvider,
      status: "Requested",
      paymentMethod,
      paymentStatus: "Pending",
      totalAmount: baseFee + urgencyFee,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    onSubmitOrder(newRequest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 my-8 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Create New Service Request
              </h3>
              <p className="text-xs text-slate-400">
                Automated Smart Provider Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-blue-400" /> Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              >
                {fontCategoryList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Job Title */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Service Title / Requirement
              </label>
              <input
                type="text"
                required
                value={serviceTitle}
                onChange={(e) => setServiceTitle(e.target.value)}
                placeholder="e.g. AC Servicing or Pipe Fitting"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" /> Full Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" /> Contact Phone
              </label>
              <input
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 font-mono text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Service Address
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" /> Preferred
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 font-mono text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> Preferred Time
                Window
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 font-mono text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
            </div>

            {/* Dispatch Priority */}
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-400" /> Urgency Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUrgency("Normal")}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    urgency === "Normal"
                      ? "bg-blue-600/20 border-blue-500 text-blue-300"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Standard Dispatch
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency("Emergency")}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    urgency === "Emergency"
                      ? "bg-red-600/20 border-red-500 text-red-300"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Emergency Priority (+৳200)
                </button>
              </div>
            </div>

            {/* Problem Details */}
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" /> Problem
                Details
              </label>
              <textarea
                rows={2}
                value={problemDetails}
                onChange={(e) => setProblemDetails(e.target.value)}
                placeholder="Describe what needs servicing or fixed..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">
                Attach Photos{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer text-slate-400 hover:text-slate-200">
                  <Upload className="w-4 h-4 text-blue-400" /> Upload Image
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="preview"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method Option (Defaults to Cash on Delivery) */}
            <div className="sm:col-span-2 pt-2 border-t border-slate-800">
              <label className="block text-slate-300 font-semibold mb-2 flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-emerald-400" /> Preferred
                Payment Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  [
                    "Cash on Delivery",
                    "bKash",
                    "Nagad",
                    "Credit/Debit Card",
                  ] as PaymentMethodType[]
                ).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-2.5 rounded-xl border font-semibold text-center transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethod === method
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {method === "Cash on Delivery" && (
                      <Banknote className="w-3.5 h-3.5" />
                    )}
                    {method !== "Cash on Delivery" && (
                      <CreditCard className="w-3.5 h-3.5" />
                    )}
                    <span>{method}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-emerald-400/80 mt-1.5 font-mono">
                ✓ Default: Cash on Delivery selected. Pay after service
                completion.
              </p>
            </div>
          </div>

          {/* Recommended Provider Match Summary */}
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-blue-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={matchedProvider.avatar}
                alt={matchedProvider.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-700"
              />
              <div>
                <div className="flex items-center gap-1 text-slate-100 font-bold">
                  {matchedProvider.name}
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  ⭐ {matchedProvider.rating} • {matchedProvider.distanceKm} km
                  away • {matchedProvider.matchScore}% Match
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-sm font-black text-emerald-400">
                ৳
                {matchedProvider.baseCharge +
                  (urgency === "Emergency" ? 200 : 0)}
              </div>
              <span className="text-[10px] text-slate-500">
                Total Estimated
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-mono transition-all"
          >
            <Check className="w-4 h-4" /> Confirm & Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
