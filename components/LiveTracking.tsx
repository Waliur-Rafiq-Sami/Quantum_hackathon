"use client";

import React from "react";
import { CheckCircle2, PhoneCall, Clock, FileText } from "lucide-react";
import { ServiceRequest } from "../types/service";

interface LiveTrackingProps {
  activeRequest: ServiceRequest | null;
  onUpdateStatus: (newStatus: ServiceRequest["status"]) => void;
  onOpenInvoice: () => void;
}

const STEPS: ServiceRequest["status"][] = [
  "Requested",
  "Accepted",
  "On the Way",
  "In Progress",
  "Completed",
];

export default function LiveTracking({
  activeRequest,
  onUpdateStatus,
  onOpenInvoice,
}: LiveTrackingProps) {
  if (!activeRequest) {
    return (
      <section id="live-tracking" className="py-12 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-xs">
          No active booking. Use the booking widget above to simulate a live
          dispatch tracking lifecycle.
        </div>
      </section>
    );
  }

  const currentIdx = STEPS.indexOf(activeRequest.status);

  return (
    <section id="live-tracking" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Live Service Tracker
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Booking Reference: {activeRequest.id}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${activeRequest.provider.phone}`}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" /> Contact Tech
              </a>
              {activeRequest.status === "Completed" && (
                <button
                  onClick={onOpenInvoice}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
                >
                  <FileText className="w-3.5 h-3.5" /> View Digital Invoice
                </button>
              )}
            </div>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-8">
            {STEPS.map((step, idx) => {
              const isActive = idx === currentIdx;
              const isPassed = idx < currentIdx;

              return (
                <div
                  key={step}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? "bg-blue-600/15 border-blue-500 text-blue-300 ring-2 ring-blue-500/20"
                      : isPassed
                        ? "bg-slate-950 border-emerald-500/40 text-emerald-400"
                        : "bg-slate-950/50 border-slate-800/80 text-slate-600"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono font-bold">
                      0{idx + 1}
                    </span>
                    {isPassed && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    )}
                  </div>
                  <div className="font-bold text-xs">{step}</div>
                </div>
              );
            })}
          </div>

          {/* Details Bar */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <span className="text-slate-400">Scheduled Time Slot:</span>
                <span className="text-slate-100 font-bold ml-1.5">
                  {activeRequest.timeSlot} ({activeRequest.date})
                </span>
              </div>
            </div>

            {/* Admin/Customer Controls to simulate status changes */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] font-mono">
                Simulate Lifecycle:
              </span>
              {STEPS.map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatus(s)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                    activeRequest.status === s
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
