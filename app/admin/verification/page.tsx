"use client";

import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Ban,
  Trash2,
  ShieldAlert,
  Star,
  Activity,
  UserCheck,
  UserX,
  Clock,
  Briefcase,
  AlertTriangle,
} from "lucide-react";

// --- Types ---
type ProviderStatus = "Active" | "Pending" | "Blocked";

interface Provider {
  id: string;
  name: string;
  businessName: string;
  email: string;
  category: string;
  status: ProviderStatus;
  rating: number;
  jobsCompleted: number;
  joinedAt: string;
}

// --- Mock Data ---
const INITIAL_PROVIDERS: Provider[] = [
  {
    id: "PRV-8021",
    name: "Tariqul Islam",
    businessName: "Tariq Electro Care",
    email: "tariq.elec@example.com",
    category: "Electrical",
    status: "Active",
    rating: 4.8,
    jobsCompleted: 142,
    joinedAt: "2024-03-12",
  },
  {
    id: "PRV-8022",
    name: "Kamrul Hasan",
    businessName: "Hasan Cooling",
    email: "hasan.ac@example.com",
    category: "AC Repair",
    status: "Pending",
    rating: 0,
    jobsCompleted: 0,
    joinedAt: "2026-09-07",
  },
  {
    id: "PRV-8023",
    name: "Rafiq Ahmed",
    businessName: "Rafiq Plumbing Experts",
    email: "rafiq.plumb@example.com",
    category: "Plumbing",
    status: "Blocked",
    rating: 3.2,
    jobsCompleted: 45,
    joinedAt: "2025-11-20",
  },
  {
    id: "PRV-8024",
    name: "Sumiya Akter",
    businessName: "Clean & Shine Services",
    email: "sumiya.clean@example.com",
    category: "Cleaning",
    status: "Active",
    rating: 4.9,
    jobsCompleted: 310,
    joinedAt: "2023-01-05",
  },
  {
    id: "PRV-8025",
    name: "Jalal Uddin",
    businessName: "Jalal Woodworks",
    email: "jalal.carpentry@example.com",
    category: "Carpentry",
    status: "Pending",
    rating: 0,
    jobsCompleted: 0,
    joinedAt: "2026-09-08",
  },
];

export default function ProviderManagementPage() {
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProviderStatus | "All">(
    "All",
  );
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "danger" | "warning";
  } | null>(null);

  const triggerToast = (
    text: string,
    type: "success" | "danger" | "warning",
  ) => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Admin Actions ---
  const handleApprove = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Active" } : p)),
    );
    triggerToast(`Provider ${id} has been approved and activated.`, "success");
  };

  const handleBlockToggle = (id: string, currentStatus: ProviderStatus) => {
    const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
    );
    if (newStatus === "Blocked") {
      triggerToast(
        `Provider ${id} has been blocked from the platform.`,
        "warning",
      );
    } else {
      triggerToast(
        `Provider ${id} block lifted. Account is now active.`,
        "success",
      );
    }
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      `CRITICAL ACTION: Are you sure you want to permanently delete provider ${id}?`,
    );
    if (confirmed) {
      setProviders((prev) => prev.filter((p) => p.id !== id));
      triggerToast(`Provider ${id} has been permanently deleted.`, "danger");
    }
  };

  // --- Filtering & Searching ---
  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // --- Metrics ---
  const totalCount = providers.length;
  const activeCount = providers.filter((p) => p.status === "Active").length;
  const pendingCount = providers.filter((p) => p.status === "Pending").length;
  const blockedCount = providers.filter((p) => p.status === "Blocked").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative">
      {/* Toast Notification Overlay */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold border backdrop-blur-md ${
              toastMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                : toastMessage.type === "warning"
                  ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                  : "bg-red-500/10 border-red-500/40 text-red-400"
            }`}
          >
            {toastMessage.type === "success" && (
              <CheckCircle2 className="w-5 h-5" />
            )}
            {toastMessage.type === "warning" && <Ban className="w-5 h-5" />}
            {toastMessage.type === "danger" && (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400">
                ADMIN PRIVILEGES ACTIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Provider Database
              <ShieldAlert className="w-6 h-6 text-red-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-2 max-w-lg">
              Manage service providers. Approve pending accounts, enforce
              platform rules by blocking violators, or permanently delete data.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg font-black text-white">
                  {activeCount}
                </div>
                <div className="text-[10px] uppercase font-mono text-slate-500">
                  Active
                </div>
              </div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="p-2 bg-red-500/10 text-red-400 rounded-lg">
                <UserX className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg font-black text-white">
                  {blockedCount}
                </div>
                <div className="text-[10px] uppercase font-mono text-slate-500">
                  Blocked
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, Name, or Business..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-900 border border-slate-800 rounded-xl p-1">
            {(["All", "Active", "Pending", "Blocked"] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === status
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {status}
                  {status !== "All" && (
                    <span className="ml-1.5 text-[10px] opacity-70">
                      (
                      {status === "Active"
                        ? activeCount
                        : status === "Pending"
                          ? pendingCount
                          : blockedCount}
                      )
                    </span>
                  )}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800">
                  <th className="p-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    Provider Info
                  </th>
                  <th className="p-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    Business & Category
                  </th>
                  <th className="p-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    Status
                  </th>
                  <th className="p-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    Metrics
                  </th>
                  <th className="p-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold text-right">
                    Admin Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredProviders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <Search className="w-8 h-8 mb-3 opacity-20" />
                        <p className="text-sm font-bold text-slate-400">
                          No providers found
                        </p>
                        <p className="text-xs">
                          Adjust your filters or search query.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProviders.map((provider) => (
                    <tr
                      key={provider.id}
                      className="hover:bg-slate-800/20 transition-colors group"
                    >
                      {/* Provider Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-sm">
                            {provider.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white mb-0.5 flex items-center gap-2">
                              {provider.name}
                              <span className="text-[9px] font-mono bg-slate-900 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded">
                                {provider.id}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500">
                              {provider.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Business & Category */}
                      <td className="p-4">
                        <div className="text-sm font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                          {provider.businessName}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-purple-500/50"></span>
                          {provider.category}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            provider.status === "Active"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : provider.status === "Pending"
                                ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                : "bg-red-500/10 border-red-500/30 text-red-400"
                          }`}
                        >
                          {provider.status === "Active" && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {provider.status === "Pending" && (
                            <Clock className="w-3 h-3" />
                          )}
                          {provider.status === "Blocked" && (
                            <Ban className="w-3 h-3" />
                          )}
                          {provider.status}
                        </span>
                      </td>

                      {/* Metrics */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                            <Star
                              className={`w-3.5 h-3.5 ${provider.rating > 0 ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                            />
                            {provider.rating > 0
                              ? provider.rating.toFixed(1)
                              : "N/A"}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500">
                            <Activity className="w-3 h-3" />{" "}
                            {provider.jobsCompleted} Jobs
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Approve Action (Only for Pending) */}
                          {provider.status === "Pending" && (
                            <button
                              onClick={() => handleApprove(provider.id)}
                              className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                            </button>
                          )}

                          {/* Block/Unblock Action (Not for Pending) */}
                          {provider.status !== "Pending" && (
                            <button
                              onClick={() =>
                                handleBlockToggle(provider.id, provider.status)
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
                                provider.status === "Blocked"
                                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                                  : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20"
                              }`}
                            >
                              <Ban className="w-3.5 h-3.5" />
                              {provider.status === "Blocked"
                                ? "Unblock"
                                : "Block"}
                            </button>
                          )}

                          {/* Delete Action (Available for all) */}
                          <button
                            onClick={() => handleDelete(provider.id)}
                            className="p-1.5 bg-slate-900 hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-slate-800 hover:border-red-500/30 rounded-lg transition-all"
                            title="Delete Provider Data Permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination/Info */}
          <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>
              Showing {filteredProviders.length} of {totalCount} records
            </span>
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500/50" /> Admin
              access logged
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
