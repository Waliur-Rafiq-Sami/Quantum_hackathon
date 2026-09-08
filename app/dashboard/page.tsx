// ==========================================
// File: app/page.tsx
// ==========================================

"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import UserDashboard from "@/components/dashboard/UserDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Main User Dashboard & Service Hub */}
      <div className="py-6">
        <UserDashboard />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 font-mono">
          <p>HomeAssist — Automated Smart Home Service Platform</p>
          <p className="mt-1 text-[11px] text-slate-600">
            BAUST CSE FEST 2026 Hackathon Submission
          </p>
        </div>
      </footer>
    </main>
  );
}
