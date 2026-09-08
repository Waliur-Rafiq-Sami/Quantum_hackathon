"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BookingWidget from "../components/BookingWidget";
import ServiceCategories from "../components/ServiceCategories";

import LiveTracking from "../components/LiveTracking";
import ProviderDashboard from "../components/ProviderDashboard";
import InvoiceModal from "../components/InvoiceModal";
import Footer from "../components/Footer";

import { MOCK_PROVIDERS } from "../data/mockServices";
import { ServiceRequest, AlgorithmWeights, Provider } from "../types/service";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"customer" | "provider">("customer");

  // Algorithm Weights state
  const [weights, setWeights] = useState<AlgorithmWeights>({
    distance: 40,
    rating: 30,
    price: 20,
    speed: 10,
  });

  // Dynamically recalculate match score based on user-controlled weights
  const scoredProviders: Provider[] = MOCK_PROVIDERS.map((p) => {
    const distScore = Math.max(0, 100 - p.distanceKm * 15);
    const ratingScore = (p.rating / 5) * 100;
    const priceScore = Math.max(0, 100 - p.baseCharge / 20);
    const speedScore = 90;

    const totalWeight =
      weights.distance + weights.rating + weights.price + weights.speed || 1;
    const calculated =
      (distScore * weights.distance +
        ratingScore * weights.rating +
        priceScore * weights.price +
        speedScore * weights.speed) /
      totalWeight;

    return {
      ...p,
      matchScore: Math.round(calculated),
    };
  }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  // Active Request State
  const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>({
    id: "REQ-8821",
    serviceName: "Appliance & Gadget Repair",
    location: "Dhanmondi, Dhaka",
    date: "2026-09-12",
    timeSlot: "4:00 PM - 6:00 PM",
    urgency: "Normal",
    problemDetails: "Air conditioner blowing warm air.",
    provider: scoredProviders[0],
    status: "On the Way",
    createdAt: "4:02 PM",
  });

  const [showInvoice, setShowInvoice] = useState(false);

  const handleUpdateStatus = (newStatus: ServiceRequest["status"]) => {
    if (activeRequest) {
      setActiveRequest({ ...activeRequest, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {viewMode === "customer" ? (
        <main>
          <Hero />
          <BookingWidget
            providers={scoredProviders}
            onConfirmBooking={(req) => setActiveRequest(req)}
          />
          <ServiceCategories />
          {/* <AlgorithmTuner
            weights={weights}
            setWeights={setWeights}
            providers={scoredProviders}
          /> */}
          {/* <LiveTracking
            activeRequest={activeRequest}
            onUpdateStatus={handleUpdateStatus}
            onOpenInvoice={() => setShowInvoice(true)}
          /> */}
        </main>
      ) : (
        <ProviderDashboard
          request={activeRequest}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {showInvoice && activeRequest && (
        <InvoiceModal
          request={activeRequest}
          onClose={() => setShowInvoice(false)}
        />
      )}

      {/* Footer receiving viewMode props */}
      <Footer viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
}
