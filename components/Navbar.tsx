"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LogIn,
  UserPlus,
  LayoutDashboard,
  History,
  HelpCircle,
  Briefcase,
  Wrench,
  Banknote,
  ShieldCheck,
  User,
} from "lucide-react";

type UserRole = "customer" | "provider" | "admin";

export default function Navbar() {
  const pathname = usePathname();
  const userRole: UserRole = "admin"; // Options: "customer" | "provider" | "admin"

  // Navigation config for Customer role
  const customerNavLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      iconColor: "text-blue-400",
      isActive: pathname === "/dashboard",
    },
    {
      name: "Service History",
      href: "/dashboard/history",
      icon: History,
      iconColor: "text-indigo-400",
      isActive: pathname?.startsWith("/dashboard/history"),
    },
    {
      name: "Help & Support",
      href: "/support",
      icon: HelpCircle,
      iconColor: "text-amber-400",
      isActive: pathname?.startsWith("/support"),
    },
  ];

  // Navigation config for Provider role
  const providerNavLinks = [
    {
      name: "Provider Dashboard",
      href: "/provider",
      icon: Briefcase,
      iconColor: "text-teal-400",
      isActive: pathname === "/provider",
    },
    {
      name: "Earnings & Payouts",
      href: "/provider/earnings",
      icon: Banknote,
      iconColor: "text-purple-400",
      isActive: pathname?.startsWith("/provider/earnings"),
    },
    {
      name: "Help Desk",
      href: "/support",
      icon: HelpCircle,
      iconColor: "text-amber-400",
      isActive: pathname?.startsWith("/support"),
    },
  ];

  // Navigation config for Admin role
  const adminNavLinks = [
    {
      name: "Admin Control Center",
      href: "/admin/control",
      icon: ShieldCheck,
      iconColor: "text-purple-400",
      isActive: pathname === "/admin/control",
    },
    {
      name: "Provider Verification",
      href: "/admin/verification",
      icon: Wrench,
      iconColor: "text-emerald-400",
      isActive:
        pathname?.startsWith("/admin/verification") &&
        !pathname?.includes("support"),
    },
    {
      name: "Help Task & Disputes",
      href: "/admin/tickets",
      icon: HelpCircle,
      iconColor: "text-amber-400",
      isActive: pathname?.startsWith("/admin/tickets"),
    },
  ];

  // Select appropriate links based on the active role
  const activeNavLinks =
    userRole === "admin"
      ? adminNavLinks
      : userRole === "provider"
        ? providerNavLinks
        : customerNavLinks;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Role Badge */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">
                  HomeAssist
                </span>
                {userRole === "admin" && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full">
                    ADMIN
                  </span>
                )}
                {userRole === "provider" && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full">
                    PROVIDER
                  </span>
                )}
              </div>
              <span className="block text-[10px] text-slate-400 tracking-widest font-mono">
                AUTOMATED HOME SERVICE PLATFORM
              </span>
            </div>
          </Link>
        </div>

        {/* Conditional Navigation Links */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
          {activeNavLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={`${link.href}-${idx}`}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                  link.isActive
                    ? "bg-slate-900 text-white border-slate-700 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60 border-transparent hover:border-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${link.iconColor}`} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Authentication Actions */}
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
