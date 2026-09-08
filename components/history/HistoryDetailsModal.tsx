"use client";

import React from "react";
import { HistoryServiceRequest } from "@/types/history";
import {
  X,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  MapPin,
  Banknote,
  Star,
  ShieldCheck,
  Phone,
  Download,
  RotateCcw,
  Trash2,
} from "lucide-react";

interface Props {
  request: HistoryServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onRebook: (req: HistoryServiceRequest) => void;
  onRevoke: (id: string) => void;
}

export const HistoryDetailsModal: React.FC<Props> = ({
  request,
  isOpen,
  onClose,
  onRebook,
  onRevoke,
}) => {
  if (!isOpen || !request) return null;

  const isCompleted = request.status === "Completed";

  const handleDownloadInvoice = () => {
    const invoiceContent = `
==============================================
            SERVICE INVOICE
==============================================
Invoice ID: INV-${request.id}
Date: ${request.completedDate}
Service: ${request.serviceTitle}
Category: ${request.serviceCategory}
Status: ${request.status}

Provider: ${request.provider.name}
Location: ${request.location}

Total Paid: BDT ${request.totalCost}
Payment Method: ${request.paymentMethod}
==============================================
`;
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${request.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1 font-mono text-xs">
              <span className="font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-md">
                {request.id}
              </span>
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
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {request.serviceTitle}
            </h2>
            <p className="text-xs text-slate-400">{request.serviceCategory}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Content */}
        <div className="space-y-6 mt-6">
          {/* Provider Details */}
          <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={request.provider.avatar}
                alt={request.provider.name}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  {request.provider.name}
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                </h4>
                <p className="text-xs text-slate-400">
                  {request.provider.expertise}
                </p>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />{" "}
                  {request.provider.rating} Rating
                </div>
              </div>
            </div>

            <a
              href={`tel:${request.provider.phone}`}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />{" "}
              {request.provider.phone}
            </a>
          </div>

          {/* Logistics & Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-950/60 border border-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-500 font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Scheduled Date
              </span>
              <p className="font-semibold text-slate-200">
                {request.scheduledDate}
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-500 font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Resolved Time
              </span>
              <p className="font-semibold text-slate-200">
                {request.completedDate}
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800/60 rounded-xl space-y-1 sm:col-span-2">
              <span className="text-slate-500 font-mono flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Service Address
              </span>
              <p className="font-semibold text-slate-200">{request.location}</p>
            </div>
          </div>

          {/* Feedback Section (if completed) */}
          {request.feedback && (
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
                Your Feedback
              </span>
              <p className="text-xs italic text-slate-300">
                "{request.feedback}"
              </p>
            </div>
          )}

          {/* Payment Summary */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
                Payment ({request.paymentMethod})
              </span>
              <span className="text-2xl font-black font-mono text-emerald-400">
                ৳{request.totalCost}
              </span>
            </div>

            {isCompleted && (
              <button
                onClick={handleDownloadInvoice}
                className="px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" /> Download Invoice
              </button>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onRevoke(request.id);
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Trash2 className="w-4 h-4" /> Revoke Record
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
            >
              Close
            </button>
            <button
              onClick={() => {
                onRebook(request);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Rebook Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
