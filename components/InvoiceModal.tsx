"use client";

import React from "react";
import { CheckCircle2, Download, Printer } from "lucide-react";
import { ServiceRequest } from "../types/service";

interface InvoiceModalProps {
  request: ServiceRequest;
  onClose: () => void;
}

export default function InvoiceModal({ request, onClose }: InvoiceModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-slate-100 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold mb-2">
          <CheckCircle2 className="w-4 h-4" /> OFFICIAL AUTOMATED INVOICE
        </div>

        <h3 className="text-xl font-bold text-white">
          AutoServe Digital Receipt
        </h3>
        <p className="text-xs text-slate-400 font-mono">
          Invoice ID: INV-{request.id}
        </p>

        <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Service Category:</span>
            <span className="font-bold text-slate-200">
              {request.serviceName}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Provider:</span>
            <span className="font-bold text-slate-200">
              {request.provider.name}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Service Charge:</span>
            <span className="font-mono text-slate-200">
              ৳{request.provider.baseCharge}
            </span>
          </div>
          {request.urgency === "Urgent" && (
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">
                Emergency Priority Surcharge:
              </span>
              <span className="font-mono text-red-400">+৳200</span>
            </div>
          )}
          <div className="flex justify-between pt-2 text-sm font-bold">
            <span className="text-white">Total Charge Paid:</span>
            <span className="text-emerald-400 font-mono">
              ৳
              {request.provider.baseCharge +
                (request.urgency === "Urgent" ? 200 : 0)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print Invoice
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Done
          </button>
        </div>
      </div>
    </div>
  );
}
