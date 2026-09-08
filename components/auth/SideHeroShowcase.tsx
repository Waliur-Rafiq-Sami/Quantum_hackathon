"use client";

import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { AccountType } from "../../types/auth";

interface SideHeroShowcaseProps {
  mode: AccountType;
}

export default function SideHeroShowcase({ mode }: SideHeroShowcaseProps) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
      {/* Background Ambient Blur Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            AUTOSERVE<span className="text-blue-500">.AI</span>
          </span>
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-slate-400">
          v2.4 Autonomous Platform
        </span>
      </div>

      {/* Middle Dynamic Showcase Content */}
      <div className="relative z-10 my-8 space-y-6">
        {mode === "customer" ? (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-blue-400" /> Instant Customer
              Dispatch
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Book Home Services in <br />
              <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                Under 10 Seconds
              </span>
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Join over 15,000+ homeowners using AutoServe’s AI matching engine
              to eliminate phone tag and lock in guaranteed transparent pricing.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Conflict-free automatic technician assignment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5-stage live dispatch status tracker</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automatic digital invoice generation</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Service
              Partner Network
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Grow Your Business <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
                With Zero Marketing Spend
              </span>
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Get direct job dispatch requests straight to your console based on
              your location, schedule, and preferred base charges.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Guaranteed instant payment disbursements</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Automated route & distance management</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Zero double-booking calendar protection</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Social Proof Widget */}
      <div className="relative z-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">4.9 / 5.0</div>
            <div className="text-[10px] text-slate-400">
              Customer Satisfaction
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">1,200+</div>
            <div className="text-[10px] text-slate-400">Verified Pros</div>
          </div>
        </div>
      </div>
    </div>
  );
}
