"use client";

import React from "react";
import { ActiveServiceStatus } from "@/types/requests";
import { Clock, Check, Navigation, Wrench, CheckCircle2 } from "lucide-react";

interface Props {
  status: ActiveServiceStatus;
}

const STEPS: {
  status: ActiveServiceStatus | "Completed";
  label: string;
  icon: React.ElementType;
}[] = [
  { status: "Requested", label: "Requested", icon: Clock },
  { status: "Accepted", label: "Accepted", icon: Check },
  { status: "On the Way", label: "On the Way", icon: Navigation },
  { status: "In Progress", label: "In Progress", icon: Wrench },
  { status: "Completed", label: "Completed", icon: CheckCircle2 },
];

export const RequestStatusStepper: React.FC<Props> = ({ status }) => {
  const currentIndex = STEPS.findIndex((step) => step.status === status);

  return (
    <div className="w-full py-2">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${(Math.max(0, currentIndex) / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={step.status}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 font-mono text-xs ${
                  isDone
                    ? "bg-blue-600 text-white ring-4 ring-slate-900 shadow-lg shadow-blue-500/30"
                    : isCurrent
                      ? "bg-indigo-500 text-white ring-4 ring-indigo-500/30 animate-pulse shadow-lg shadow-indigo-500/50"
                      : "bg-slate-900 border border-slate-700 text-slate-500"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`mt-2 text-[11px] font-mono whitespace-nowrap ${
                  isCurrent
                    ? "text-indigo-400 font-bold"
                    : isDone
                      ? "text-slate-300 font-medium"
                      : "text-slate-500"
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
};
