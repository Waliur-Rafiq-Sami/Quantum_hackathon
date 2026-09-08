// ==========================================
// File: components/dashboard/StatusTracker.tsx
// ==========================================

"use client";

import React from "react";
import { ServiceStatus } from "@/types/dashboard";
import {
  Check,
  Clock,
  Truck,
  Wrench,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const STEPS: {
  status: ServiceStatus;
  label: string;
  icon: React.ElementType;
}[] = [
  { status: "Requested", label: "Requested", icon: Clock },
  { status: "Accepted", label: "Accepted", icon: Check },
  { status: "On the Way", label: "On the Way", icon: Truck },
  { status: "In Progress", label: "In Progress", icon: Wrench },
  { status: "Completed", label: "Completed", icon: CheckCircle2 },
];

export function StatusTracker({ status }: { status: ServiceStatus }) {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold">
        <XCircle className="w-4 h-4 text-red-400" />
        This service request has been cancelled.
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.status === status);

  return (
    <div className="w-full py-2">
      <div className="relative flex items-center justify-between">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />

        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${(currentIndex / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {/* Step Nodes */}
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={step.status}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 font-mono text-xs ${
                  isCurrent
                    ? "bg-blue-600 text-white ring-4 ring-blue-500/30 scale-110 shadow-lg shadow-blue-500/50"
                    : isDone
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-slate-900 border border-slate-700 text-slate-500"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`mt-2 text-[10px] font-mono font-semibold transition-colors ${
                  isCurrent
                    ? "text-blue-400"
                    : isDone
                      ? "text-slate-200"
                      : "text-slate-600"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
