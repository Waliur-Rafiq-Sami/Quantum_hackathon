"use client";

import React from "react";
import { Zap, ShieldCheck, Clock, CheckCircle, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-medium mb-6">
          <Zap className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
          Next-Generation Smart Home Automation System
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Instant Home Services. <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                Zero Phone Calls Required.
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              AutoServe eliminates back-and-forth phone tag. Our multi-variable
              algorithm pairs you with verified nearby technicians in under 3
              seconds based on distance, live schedule windows, fixed pricing,
              and expertise score.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#booking"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 text-sm"
              >
                Simulate Instant Request <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#algorithm-tuner"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold transition-all text-sm"
              >
                Test Match Scoring Algorithm
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="space-y-1">
                <div className="text-xl font-extrabold text-white">100%</div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-400" />{" "}
                  Conflict-Free Slots
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-extrabold text-white">
                  &lt; 2.5 km
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> Geo-Fenced
                  Dispatch
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-extrabold text-white">
                  4.8 / 5.0
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-amber-400" /> Verified
                  Pros
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
                alt="Professional technician at work"
                className="w-full h-80 object-cover brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Active Auto-Dispatch Active
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Smart Match Engine v2.4 Operating Normally
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
