"use client";

import React from "react";
import { UserCheck, LayoutDashboard } from "lucide-react";

interface FooterProps {
  viewMode: "customer" | "provider";
  setViewMode: (mode: "customer" | "provider") => void;
}

export default function Footer({ viewMode, setViewMode }: FooterProps) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Brand Information */}
        <div className="space-y-1 text-center sm:text-left">
          <div>
            <span className="text-slate-300 font-bold">HomeAssist</span> —
            Automated home service platform
          </div>
          <div className="text-slate-500">
            Instant booking • Trusted providers • Zero hassle
          </div>
        </div>

        {/* Relocated View Switcher Control */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode("customer")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === "customer"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> Customer View
          </button>
        </div>
      </div>
    </footer>
  );
}
