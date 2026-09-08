"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white">
              AUTOSERVE<span className="text-blue-500">.AI</span>
            </span>
            <span className="block text-[10px] text-slate-400 tracking-widest font-mono">
              AUTONOMOUS SERVICE DISPATCH
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#booking" className="hover:text-blue-400 transition-colors">
            Instant Booking
          </a>
          <a
            href="#categories"
            className="hover:text-blue-400 transition-colors"
          >
            Service Catalog
          </a>
          <a
            href="#algorithm-tuner"
            className="hover:text-blue-400 transition-colors"
          >
            AI Match Engine
          </a>
          <a
            href="#live-tracking"
            className="hover:text-blue-400 transition-colors"
          >
            Live Dispatch Track
          </a>
        </div>

        {/* Authentication Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-blue-400" /> Log In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" /> Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
