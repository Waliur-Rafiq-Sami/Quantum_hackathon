"use client";

import React from "react";
import { ActiveServiceRequest } from "@/types/requests";
import { RequestStatusStepper } from "./RequestStatusStepper";
import {
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  Star,
  RotateCcw,
  XCircle,
  AlertTriangle,
  Banknote,
  Sparkles,
} from "lucide-react";

interface Props {
  request: ActiveServiceRequest;
  onAdvanceStatus: (id: string) => void;
  onCancelRequest: (id: string) => void;
}

export const ActiveRequestCard: React.FC<Props> = ({
  request,
  onAdvanceStatus,
  onCancelRequest,
}) => {
  const isCancellable =
    request.status === "Requested" || request.status === "Accepted";

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 hover:border-slate-700 transition-all">
      {/* Request Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs mb-1.5">
            <span className="font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-md">
              {request.id}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{request.createdAt}</span>
            {request.urgency === "Emergency" && (
              <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Emergency (+৳200)
              </span>
            )}
            {request.urgency === "Urgent" && (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                Urgent Priority
              </span>
            )}
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {request.serviceTitle}
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            {request.serviceCategory}
          </p>
        </div>

        {/* Demo Advance & Cancel Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAdvanceStatus(request.id)}
            className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            title="Simulate provider changing status for hackathon evaluation"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
            Advance Demo Step
          </button>

          {isCancellable ? (
            <button
              onClick={() => onCancelRequest(request.id)}
              className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
            >
              <XCircle className="w-3.5 h-3.5" /> Cancel Job
            </button>
          ) : (
            <button
              disabled
              className="px-3.5 py-2 bg-slate-800/40 border border-slate-800 text-slate-500 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-not-allowed opacity-60"
              title="Provider is en route or active. Cannot cancel."
            >
              <XCircle className="w-3.5 h-3.5" /> Cannot Cancel
            </button>
          )}
        </div>
      </div>

      {/* Live Stepper Tracker */}
      <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />{" "}
            Real-Time Service Pipeline
          </span>
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
            Active: {request.status}
          </span>
        </div>
        <RequestStatusStepper status={request.status} />
      </div>

      {/* Recommended & Assigned Technician + Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommended Provider */}
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={request.provider.avatar}
              alt={request.provider.name}
              className="w-13 h-13 rounded-2xl object-cover border border-slate-700 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-100">
                {request.provider.name}
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono flex items-center gap-0.5 ml-1">
                  <Sparkles className="w-2.5 h-2.5" />{" "}
                  {request.provider.matchScore}% Match
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {request.provider.expertise}
              </div>
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-1">
                <span className="text-amber-400 font-bold flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {request.provider.rating} ({request.provider.reviewsCount})
                </span>
                <span>•</span>
                <span className="text-slate-300">
                  {request.provider.distanceKm} km away
                </span>
              </div>
            </div>
          </div>
          <a
            href={`tel:${request.provider.phone}`}
            className="p-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl transition-colors"
            title="Call Technician"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Schedule & Price Details */}
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> Time Slot:
            </span>
            <span className="font-mono font-medium">
              {request.preferredDate} ({request.timeSlot})
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400" /> Location:
            </span>
            <span className="truncate max-w-[210px] text-slate-200 font-medium">
              {request.location}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Banknote className="w-3.5 h-3.5 text-emerald-400" /> Estimated
              Fee ({request.paymentMethod}):
            </span>
            <span className="font-mono font-black text-emerald-400 text-base">
              ৳{request.estimatedCost}
            </span>
          </div>
        </div>
      </div>

      {/* Problem Summary */}
      <div className="text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
        <span className="font-mono font-bold text-slate-300 uppercase text-[10px] bg-slate-800 px-2 py-0.5 rounded">
          Issue
        </span>
        <p className="text-slate-300 line-clamp-2">
          {request.problemDescription}
        </p>
      </div>
    </div>
  );
};
