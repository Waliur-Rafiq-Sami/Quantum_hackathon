"use client";

import React from "react";
import { Check, X, MapPin, Clock, Phone } from "lucide-react";
import { ServiceRequest } from "../types/service";

interface ProviderDashboardProps {
  request: ServiceRequest | null;
  onUpdateStatus: (status: ServiceRequest["status"]) => void;
}

export default function ProviderDashboard({
  request,
  onUpdateStatus,
}: ProviderDashboardProps) {
  if (!request) {
    return (
      <section className="py-16 text-center text-slate-500 text-xs">
        No active requests assigned in Provider Console yet. Submit a booking
        from Customer View first.
      </section>
    );
  }

  return (
    <section className="py-12 bg-slate-950 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center pb-6 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              Provider Dispatch Console
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Technician: Rahim Electronics
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            ● Technician Online
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-start pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-blue-400 font-bold">
                Incoming Assigned Task
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {request.serviceName}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Problem: {request.problemDetails}
              </p>
            </div>
            <span className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs font-mono font-bold rounded">
              Status: {request.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Location: {request.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Window: {request.timeSlot}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Customer Ref: +880 1700-112233</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
            <button
              onClick={() => onUpdateStatus("Accepted")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Accept Job
            </button>
            <button
              onClick={() => onUpdateStatus("On the Way")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
            >
              Mark "On The Way"
            </button>
            <button
              onClick={() => onUpdateStatus("In Progress")}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold"
            >
              Mark "In Progress"
            </button>
            <button
              onClick={() => onUpdateStatus("Completed")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
            >
              Mark "Completed"
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
