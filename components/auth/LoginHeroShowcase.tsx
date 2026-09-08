"use client";

import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Activity,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { AccountType } from "../../types/auth";

interface LoginHeroShowcaseProps {
  mode: AccountType;
}

export default function LoginHeroShowcase({ mode }: LoginHeroShowcaseProps) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Brand Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            HomeAssist
          </span>
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>{" "}
          Systems Operational
        </span>
      </div>

      {/* Center Dynamic Card */}
      <div className="relative z-10 my-8 space-y-6">
        {mode === "customer" ? (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> Welcome Back,
              Valued Client
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Manage Your Service <br />
              <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                Requests & Trackers
              </span>
            </h2>

            {/* Interactive Live Status Widget Mock */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Active Service Tracker
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                  Technician En Route
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Order #AS-8942</span>
                <span className="font-bold text-slate-200">
                  AC Deep Maintenance
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-3/4 rounded-full"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 text-indigo-400" /> Service
              Partner Console
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Access Your Daily <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
                Jobs & Payout Console
              </span>
            </h2>

            {/* Provider Earnings Widget Mock */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-semibold text-slate-200">
                  This Week's Earnings
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  +18.4% <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">৳ 24,500</span>
                <span className="text-[10px] text-slate-400">
                  14 Jobs Completed
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Trust Indicators */}
      <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          <span>Biometric & Passkey Enabled</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>SOC-2 Type II Certified</span>
        </div>
      </div>
    </div>
  );
}
