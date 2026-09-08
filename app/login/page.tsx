"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserCheck, Briefcase, ArrowLeft } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";
import LoginHeroShowcase from "../../components/auth/LoginHeroShowcase";
import { AccountType } from "../../types/auth";

export default function LoginPage() {
  const [accountType, setAccountType] = useState<AccountType>("customer");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Ambient Radial Lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl w-full grid lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left Section: Form Container */}
        <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl flex flex-col justify-between shadow-2xl">
          <div>
            {/* Top Back Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
              <span className="text-xs text-slate-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-400 font-bold hover:underline"
                >
                  Sign Up
                </Link>
              </span>
            </div>

            {/* Title Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Select your role to sign in to your dashboard.
              </p>
            </div>

            {/* Account Role Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => setAccountType("customer")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  accountType === "customer"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <UserCheck className="w-4 h-4" /> Customer
              </button>

              <button
                type="button"
                onClick={() => setAccountType("provider")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  accountType === "provider"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Briefcase className="w-4 h-4" /> Service Provider
              </button>
            </div>

            {/* Render Login Form */}
            <LoginForm mode={accountType} />
          </div>

          {/* Security Footer Note */}
          <div className="mt-8 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-500">
            Protected by end-to-end tokenized authentication. HomeAssist © 2026
          </div>
        </div>

        {/* Right Section: Visual Showcase */}
        <div className="lg:col-span-6 hidden lg:block">
          <LoginHeroShowcase mode={accountType} />
        </div>
      </div>
    </div>
  );
}
