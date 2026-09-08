"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
} from "lucide-react";

type UserRole = "customer" | "provider" | "admin";

interface UserProfile {
  fullName?: string;
  email?: string;
  role?: UserRole;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Read auth state from localStorage on component mount and route changes
  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole") as UserRole | null;
    const storedUser = localStorage.getItem("userData");

    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
      if (storedUser) {
        try {
          setUserData(JSON.parse(storedUser));
        } catch (err) {
          console.error("Failed to parse user data from localStorage", err);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserData(null);
    }
  }, [pathname]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");

    setIsLoggedIn(false);
    setUserRole(null);
    setUserData(null);

    router.push("/login");
  };

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

  // Fallback nav links for logged-out visitors
  const guestNavLinks = [
    {
      name: "Services",
      href: "/#services",
      icon: Wrench,
      iconColor: "text-blue-400",
      isActive: false,
    },
    {
      name: "Help & Support",
      href: "/support",
      icon: HelpCircle,
      iconColor: "text-amber-400",
      isActive: pathname?.startsWith("/support"),
    },
  ];

  // Select appropriate links based on active role
  const activeNavLinks = !isLoggedIn
    ? guestNavLinks
    : userRole === "admin"
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
                {isMounted && isLoggedIn && userRole === "admin" && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full">
                    ADMIN
                  </span>
                )}
                {isMounted && isLoggedIn && userRole === "provider" && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full">
                    PROVIDER
                  </span>
                )}
                {isMounted && isLoggedIn && userRole === "customer" && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full">
                    CUSTOMER
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
          {isMounted &&
            activeNavLinks.map((link, idx) => {
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
          {isMounted && isLoggedIn ? (
            /* Logged-In State */
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-slate-200 max-w-[120px] truncate">
                  {userData?.fullName || "User Account"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </div>
          ) : (
            /* Logged-Out State */
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
