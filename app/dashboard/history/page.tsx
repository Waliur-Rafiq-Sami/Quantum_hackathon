"use client";

import React, { useState, useMemo } from "react";
import {
  INITIAL_HISTORY_REQUESTS,
  HISTORY_CATEGORIES,
} from "@/data/mockHistory";
import { HistoryServiceRequest } from "@/types/history";
import { HistoryRequestCard } from "@/components/history/HistoryRequestCard";
import { HistoryDetailsModal } from "@/components/history/HistoryDetailsModal";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Banknote,
  AlertCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function HistoryPage() {
  const router = useRouter();

  // Active state handling for workable interactions
  const [historyRequests, setHistoryRequests] = useState<
    HistoryServiceRequest[]
  >(INITIAL_HISTORY_REQUESTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Modal State
  const [selectedRequest, setSelectedRequest] =
    useState<HistoryServiceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Notification state
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Metrics calculation
  const totalCompleted = useMemo(
    () => historyRequests.filter((r) => r.status === "Completed").length,
    [historyRequests],
  );
  const totalCancelled = useMemo(
    () => historyRequests.filter((r) => r.status === "Cancelled").length,
    [historyRequests],
  );
  const totalSpent = useMemo(() => {
    return historyRequests
      .filter((r) => r.status === "Completed")
      .reduce((sum, req) => sum + req.totalCost, 0);
  }, [historyRequests]);

  // Handle Actions
  const handleViewDetails = (req: HistoryServiceRequest) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const handleRevokeRecord = (id: string) => {
    setHistoryRequests((prev) => prev.filter((r) => r.id !== id));
    showToast(`Record ${id} has been revoked and removed from history.`);
  };

  const handleRebook = (req: HistoryServiceRequest) => {
    showToast(
      `Rebooking initialized for "${req.serviceTitle}". Redirecting...`,
    );
    // setTimeout(() => {
    //   router.push(
    //     `/dashboard/book?service=${encodeURIComponent(req.serviceTitle)}`,
    //   );
    // }, 1200);
  };

  // Filtered dataset
  const filteredHistory = historyRequests.filter((req) => {
    const matchesSearch =
      req.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.provider.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || req.serviceCategory === selectedCategory;

    const matchesStatus =
      selectedStatus === "All" || req.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative">
        {/* Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white font-medium px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs border border-blue-400/30 animate-bounce">
            <Check className="w-4 h-4" />
            {notification}
          </div>
        )}

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  BAUST CSE FEST 2026
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  • Records & Logs
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                Service Request History
                <FileText className="w-6 h-6 text-slate-400" />
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Review your past bookings, download invoices, and rebook
                favorite technicians.
              </p>
            </div>
          </div>

          {/* Lifetime Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Total Jobs Completed
                </span>
                <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                  {totalCompleted}
                </div>
              </div>
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Lifetime Spent
                </span>
                <div className="text-3xl font-black text-blue-400 font-mono mt-1">
                  ৳{totalSpent.toLocaleString()}
                </div>
              </div>
              <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl">
                <Banknote className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Cancelled Requests
                </span>
                <div className="text-3xl font-black text-red-400 font-mono mt-1">
                  {totalCancelled}
                </div>
              </div>
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/40 p-4 border border-slate-800 rounded-2xl">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search history by ID, service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 font-mono"
              >
                <option value="All">All Categories</option>
                {HISTORY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 font-mono"
              >
                <option value="All">All Results</option>
                <option value="Completed">Completed Only</option>
                <option value="Cancelled">Cancelled Only</option>
              </select>
            </div>
          </div>

          {/* History Feed */}
          <div className="space-y-6">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-300">
                  No History Records Found
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No past service requests match your search or applied filters.
                </p>
              </div>
            ) : (
              filteredHistory.map((req) => (
                <HistoryRequestCard
                  key={req.id}
                  request={req}
                  onView={handleViewDetails}
                  onRebook={handleRebook}
                  onRevoke={handleRevokeRecord}
                />
              ))
            )}
          </div>
        </div>

        {/* Interactive Modal */}
        <HistoryDetailsModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRebook={handleRebook}
          onRevoke={handleRevokeRecord}
        />
      </div>
    </>
  );
}
