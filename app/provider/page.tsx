"use client";

import React, { useState, useMemo } from "react";
import {
  INITIAL_JOB_REQUESTS,
  INITIAL_BOOKED_SLOTS,
} from "@/data/mockProviderJobs";
import { JobRequest, BookedSlot, JobStatus } from "@/types/provider";
import {
  Wrench,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Truck,
  Play,
  Check,
  Ban,
  Lock,
  Phone,
  User,
  ShieldCheck,
  AlertTriangle,
  Banknote,
  Briefcase,
  Layers,
  ChevronRight,
  Power,
} from "lucide-react";

export default function ProviderDashboard() {
  const [jobs, setJobs] = useState<JobRequest[]>(INITIAL_JOB_REQUESTS);
  const [bookedSlots, setBookedSlots] =
    useState<BookedSlot[]>(INITIAL_BOOKED_SLOTS);
  const [activeTab, setActiveTab] = useState<
    "incoming" | "active" | "schedule"
  >("incoming");
  const [notification, setNotification] = useState<string | null>(null);

  // NEW: Provider Active Status State
  const [isProviderActive, setIsProviderActive] = useState<boolean>(true);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper: Check if a date & time slot is locked/booked
  const isSlotBooked = (date: string, timeSlot: string) => {
    return bookedSlots.some(
      (slot) => slot.date === date && slot.timeSlot === timeSlot,
    );
  };

  // 1. Accept Job Action (with Double Booking Prevention)
  const handleAcceptJob = (job: JobRequest) => {
    if (isSlotBooked(job.date, job.timeSlot)) {
      showToast(
        `⛔ Double-Booking Prevented! You already have a booked job on ${job.date} at ${job.timeSlot}.`,
      );
      return;
    }

    // Lock the time slot
    const newSlot: BookedSlot = {
      id: `SLOT-${Date.now()}`,
      date: job.date,
      timeSlot: job.timeSlot,
      jobId: job.id,
      serviceTitle: job.serviceTitle,
      customerName: job.customerName,
    };

    setBookedSlots((prev) => [...prev, newSlot]);

    // Update job status
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: "Accepted" } : j)),
    );

    showToast(
      `✅ Accepted ${job.id}! Time slot [${job.date} @ ${job.timeSlot}] is now LOCKED.`,
    );
  };

  // 2. Reject Job Action
  const handleRejectJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "Cancelled" } : j)),
    );
    showToast(`Job ${jobId} rejected.`);
  };

  // 3. Status Lifecycle Progression Action
  const handleAdvanceStatus = (job: JobRequest) => {
    let nextStatus: JobStatus = job.status;

    if (job.status === "Accepted") nextStatus = "On the Way";
    else if (job.status === "On the Way") nextStatus = "In Progress";
    else if (job.status === "In Progress") nextStatus = "Completed";

    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: nextStatus } : j)),
    );

    showToast(`Status updated: Job ${job.id} is now "${nextStatus}".`);
  };

  // Toggle Provider Status
  const handleToggleStatus = () => {
    setIsProviderActive((prev) => {
      const newState = !prev;
      showToast(
        newState
          ? "✅ You are now Online and accepting jobs."
          : "⏸️ You are now Offline.",
      );
      return newState;
    });
  };

  // Computed Datasets
  const incomingRequests = useMemo(
    () => jobs.filter((j) => j.status === "Requested"),
    [jobs],
  );

  const activeJobs = useMemo(
    () =>
      jobs.filter((j) =>
        ["Accepted", "On the Way", "In Progress"].includes(j.status),
      ),
    [jobs],
  );

  const completedJobs = useMemo(
    () => jobs.filter((j) => j.status === "Completed"),
    [jobs],
  );

  const totalEarnings = useMemo(() => {
    return completedJobs.reduce((sum, j) => sum + j.estimatedPay, 0);
  }, [completedJobs]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-medium px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs border border-slate-700 animate-bounce max-w-md">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Provider Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
                PROVIDER DISPATCH PORTAL
              </span>
              <span className="text-xs text-slate-500 font-mono">
                • BAUST CSE FEST 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Rahim Electronics Center
              <ShieldCheck className="w-6 h-6 text-teal-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage service dispatches, prevent time-slot double bookings, and
              track active repairs.
            </p>
          </div>

          {/* Interactive Provider Status Toggle */}
          <button
            onClick={handleToggleStatus}
            className={`flex items-center gap-3 bg-slate-950/80 hover:bg-slate-900 border p-3.5 rounded-2xl transition-all text-left ${
              isProviderActive ? "border-slate-800" : "border-red-900/50"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isProviderActive
                  ? "bg-teal-500/10 border border-teal-500/20 text-teal-400"
                  : "bg-red-500/10 border border-red-500/20 text-red-400"
              }`}
            >
              <Power className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">
                Status (Click to Toggle)
              </div>
              <div
                className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isProviderActive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isProviderActive ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Online & Dispatch Ready
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Currently Offline
                  </>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Incoming Requests
              </span>
              <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                {incomingRequests.length}
              </div>
            </div>
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Active In-Progress
              </span>
              <div className="text-3xl font-black text-blue-400 font-mono mt-1">
                {activeJobs.length}
              </div>
            </div>
            <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl">
              <Wrench className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Locked Time Slots
              </span>
              <div className="text-3xl font-black text-teal-400 font-mono mt-1">
                {bookedSlots.length}
              </div>
            </div>
            <div className="p-3.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl">
              <Lock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Completed Earnings
              </span>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                ৳{totalEarnings.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
              <Banknote className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "incoming"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" /> Incoming Requests (
            {incomingRequests.length})
          </button>

          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "active"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Wrench className="w-4 h-4" /> Active Jobs ({activeJobs.length})
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "schedule"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Lock className="w-4 h-4" /> Locked Time Slots ({bookedSlots.length}
            )
          </button>
        </div>

        {/* TAB 1: INCOMING REQUESTS & DOUBLE-BOOKING AUDIT */}
        {activeTab === "incoming" && (
          <div className="space-y-4">
            {!isProviderActive && incomingRequests.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-2xl text-sm flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p>
                  You have pending requests, but you are currently marked as{" "}
                  <b>Offline</b>. Toggle your status to Online to let customers
                  know you are available.
                </p>
              </div>
            )}

            {incomingRequests.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-300">
                  No Pending Incoming Job Requests
                </h4>
                <p className="text-xs text-slate-500">
                  You have reviewed or responded to all incoming customer
                  requests.
                </p>
              </div>
            ) : (
              incomingRequests.map((job) => {
                const hasConflict = isSlotBooked(job.date, job.timeSlot);

                return (
                  <div
                    key={job.id}
                    className={`bg-slate-900/90 border rounded-3xl p-6 shadow-xl transition-all ${
                      hasConflict
                        ? "border-red-500/50 bg-red-950/10"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-xs mb-1.5 flex-wrap">
                          <span className="font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-md">
                            {job.id}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              job.urgency === "Emergency"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : job.urgency === "High"
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                  : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {job.urgency} Urgency
                          </span>

                          {/* Time Conflict Pill */}
                          {hasConflict && (
                            <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1 animate-pulse">
                              <AlertTriangle className="w-3 h-3" /> Time
                              Conflict Warning
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-black text-white">
                          {job.serviceTitle}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {job.serviceCategory}
                        </p>
                      </div>

                      {/* Pay & Actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-4">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-mono block">
                            Est. Payout
                          </span>
                          <span className="text-2xl font-black text-emerald-400 font-mono">
                            ৳{job.estimatedPay}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRejectJob(job.id)}
                            className="px-3.5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <Ban className="w-3.5 h-3.5" /> Reject
                          </button>

                          <button
                            onClick={() => handleAcceptJob(job)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg ${
                              hasConflict || !isProviderActive
                                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                                : "bg-teal-600 hover:bg-teal-500 text-white"
                            }`}
                            disabled={!isProviderActive}
                            title={
                              !isProviderActive
                                ? "Go online to accept jobs"
                                : ""
                            }
                          >
                            <Check className="w-3.5 h-3.5" /> Accept Job
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Customer & Time Slot Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
                      <div className="p-3.5 bg-slate-950/60 border border-slate-800/60 rounded-xl space-y-1">
                        <span className="text-slate-500 font-mono flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-blue-400" />{" "}
                          Customer
                        </span>
                        <p className="font-bold text-slate-200">
                          {job.customerName}
                        </p>
                        <a
                          href={`tel:${job.customerPhone}`}
                          className="text-blue-400 hover:underline text-[11px] block"
                        >
                          {job.customerPhone}
                        </a>
                      </div>

                      <div className="p-3.5 bg-slate-950/60 border border-slate-800/60 rounded-xl space-y-1">
                        <span className="text-slate-500 font-mono flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-red-400" />{" "}
                          Service Location
                        </span>
                        {/* Properly Formatted Address Block */}
                        <p
                          className="font-medium text-slate-300 leading-relaxed"
                          title="Service Address"
                        >
                          {job.customerAddress}
                        </p>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl space-y-1 border ${
                          hasConflict
                            ? "bg-red-950/20 border-red-500/30"
                            : "bg-slate-950/60 border-slate-800/60"
                        }`}
                      >
                        <span className="text-slate-500 font-mono flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />{" "}
                          Requested Time Slot
                        </span>
                        <p className="font-bold text-slate-200">{job.date}</p>
                        <p className="font-mono text-slate-300 font-semibold">
                          {job.timeSlot}
                        </p>
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div className="mt-3 p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs text-slate-300">
                      <span className="font-bold font-mono text-slate-400 uppercase text-[10px] block mb-0.5">
                        Problem Notes:
                      </span>
                      "{job.problemDetails}"
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE & IN-PROGRESS JOBS */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeJobs.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-2">
                <Wrench className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-300">
                  No Active Jobs Right Now
                </h4>
                <p className="text-xs text-slate-500">
                  Accept incoming requests from the "Incoming Requests" tab to
                  start servicing.
                </p>
              </div>
            ) : (
              activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs mb-1">
                        <span className="font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-md">
                          {job.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">{job.date}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-300 font-bold">
                          {job.timeSlot}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white">
                        {job.serviceTitle}
                      </h3>
                    </div>

                    {/* Status Stepper Progression Button */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleAdvanceStatus(job)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
                      >
                        {job.status === "Accepted" && (
                          <>
                            <Truck className="w-4 h-4" /> Start Travel (On the
                            Way)
                          </>
                        )}
                        {job.status === "On the Way" && (
                          <>
                            <Play className="w-4 h-4" /> Begin Service (In
                            Progress)
                          </>
                        )}
                        {job.status === "In Progress" && (
                          <>
                            <Check className="w-4 h-4" /> Mark Completed & Bill
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Lifecycle Status Stepper Bar */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Dispatch Lifecycle Progression
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold font-mono">
                      <div
                        className={`p-2 rounded-xl border ${
                          [
                            "Accepted",
                            "On the Way",
                            "In Progress",
                            "Completed",
                          ].includes(job.status)
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-900 text-slate-600 border-slate-800"
                        }`}
                      >
                        1. Accepted
                      </div>
                      <div
                        className={`p-2 rounded-xl border ${
                          ["On the Way", "In Progress", "Completed"].includes(
                            job.status,
                          )
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-900 text-slate-600 border-slate-800"
                        }`}
                      >
                        2. On the Way
                      </div>
                      <div
                        className={`p-2 rounded-xl border ${
                          ["In Progress", "Completed"].includes(job.status)
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-slate-900 text-slate-600 border-slate-800"
                        }`}
                      >
                        3. In Progress
                      </div>
                      <div
                        className={`p-2 rounded-xl border ${
                          job.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-900 text-slate-600 border-slate-800"
                        }`}
                      >
                        4. Completed
                      </div>
                    </div>
                  </div>

                  {/* Customer Contact */}
                  <div className="p-4 bg-slate-950/60 border border-slate-800/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-mono block mb-1">
                        Customer Info & Location
                      </span>
                      <span className="font-bold text-white text-sm block">
                        {job.customerName}
                      </span>
                      {/* Properly Formatted Address Block */}
                      <span className="text-slate-400 block mt-0.5">
                        <MapPin className="inline w-3 h-3 mr-1 text-red-400" />
                        {job.customerAddress}
                      </span>
                    </div>

                    <a
                      href={`tel:${job.customerPhone}`}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold flex items-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call{" "}
                      {job.customerPhone}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: SCHEDULED & LOCKED TIME SLOTS (AUTOMATED DOUBLE BOOKING PROTECTION) */}
        {activeTab === "schedule" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-teal-400" /> System Time Slot
                  Locks
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  The automated scheduling engine blocks these time windows so
                  no two customers can double-book you.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {bookedSlots.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No time slots currently locked.
                </div>
              ) : (
                bookedSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between flex-wrap gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl font-mono font-bold">
                        🔒 LOCKED
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {slot.serviceTitle}
                        </h4>
                        <p className="text-slate-400">
                          Customer: {slot.customerName} ({slot.jobId})
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-slate-400 block text-[10px] uppercase">
                        Reserved Window
                      </span>
                      <span className="font-bold text-amber-400 text-sm">
                        {slot.date}
                      </span>
                      <span className="block text-slate-200 font-semibold">
                        {slot.timeSlot}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
