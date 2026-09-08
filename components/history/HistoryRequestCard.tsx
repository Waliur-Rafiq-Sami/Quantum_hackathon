"use client";

import React from "react";
import { HistoryServiceRequest } from "@/types/history";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Trash2,
  Star,
  Banknote,
  ShieldCheck,
  MapPin,
} from "lucide-react";

interface Props {
  request: HistoryServiceRequest;
  onView: (req: HistoryServiceRequest) => void;
  onRebook: (req: HistoryServiceRequest) => void;
  onRevoke: (id: string) => void;
}

export const HistoryRequestCard: React.FC<Props> = ({
  request,
  onView,
  onRebook,
  onRevoke,
}) => {
  const isCompleted = request.status === "Completed";

  return (
    <div
      className={`bg-slate-900/90 border rounded-3xl p-6 shadow-xl transition-all ${
        isCompleted
          ? "border-slate-800 hover:border-emerald-500/30"
          : "border-slate-800 hover:border-red-500/30"
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs mb-1.5">
            <span className="font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-md">
              {request.id}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{request.scheduledDate}</span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                isCompleted
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <XCircle className="w-3 h-3" />
              )}
              {request.status}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {request.serviceTitle}
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            {request.serviceCategory}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onView(request)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" /> View Details
          </button>

          <button
            onClick={() => onRebook(request)}
            className="px-3.5 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Rebook
          </button>

          <button
            onClick={() => onRevoke(request.id)}
            title="Revoke / Remove from History"
            className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl text-xs font-semibold transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* Provider Snapshot */}
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/60 flex items-center gap-3.5">
          <img
            src={request.provider.avatar}
            alt={request.provider.name}
            className={`w-12 h-12 rounded-2xl object-cover border ${
              isCompleted
                ? "border-emerald-500/30"
                : "border-slate-700 grayscale"
            }`}
          />
          <div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-200">
              {request.provider.name}
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {request.provider.expertise}
            </div>

            <div className="flex items-center gap-1 mt-1 text-[11px] font-mono">
              {request.ratingGiven ? (
                <>
                  <span className="text-slate-400">Your Rating:</span>
                  <span className="text-amber-400 font-bold flex items-center">
                    <Star className="w-3 h-3 fill-amber-400 mr-0.5" />{" "}
                    {request.ratingGiven}.0
                  </span>
                </>
              ) : (
                <>
                  <span className="text-slate-500">Provider Rating:</span>
                  <span className="text-slate-400 font-bold flex items-center">
                    <Star className="w-3 h-3 fill-slate-500 mr-0.5" />{" "}
                    {request.provider.rating}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Details & Billing */}
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/60 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> Resolved On:
            </span>
            <span className="font-mono font-medium">
              {request.completedDate}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location:
            </span>
            <span className="truncate max-w-[200px] text-slate-300">
              {request.location}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Banknote className="w-3.5 h-3.5 text-emerald-400" />{" "}
              {isCompleted ? "Amount Paid" : "Est. Amount"} (
              {request.paymentMethod}):
            </span>
            <span
              className={`font-mono font-black text-base ${
                isCompleted ? "text-emerald-400" : "text-slate-500 line-through"
              }`}
            >
              ৳{request.totalCost}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
