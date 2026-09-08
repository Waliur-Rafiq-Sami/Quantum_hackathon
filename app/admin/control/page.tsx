"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Users,
  UserCheck,
  FileText,
  Ticket,
  MessageSquare,
  Search,
  Check,
  Ban,
  Building,
  Clock,
  CheckCircle2,
  AlertCircle,
  Settings,
  Power,
  Send,
  AlertTriangle,
  Sliders,
  BellRing,
  X,
  CornerDownRight,
} from "lucide-react";

// --- Types ---
interface ProviderApplication {
  id: string;
  name: string;
  businessName: string;
  category: string;
  submittedAt: string;
  phone: string;
  location: string;
  status: "Pending" | "Approved" | "Rejected";
  documents: { name: string; verified: boolean }[];
}

interface SupportTicket {
  id: string;
  title: string;
  userType: "Customer" | "Provider";
  userName: string;
  date: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  description: string;
}

// --- Initial Mock Data ---
const INITIAL_APPLICATIONS: ProviderApplication[] = [
  {
    id: "APP-9012",
    name: "Tariqul Islam",
    businessName: "Tariq Electro Care",
    category: "Electrical & Wiring",
    submittedAt: "2026-09-08",
    phone: "+880 1712-345678",
    location: "Kazla, Rajshahi",
    status: "Pending",
    documents: [
      { name: "National ID (NID)", verified: true },
      { name: "Trade License 2026", verified: true },
      { name: "Electrician Certification", verified: false },
    ],
  },
  {
    id: "APP-9013",
    name: "Kamrul Hasan",
    businessName: "Hasan Cooling Experts",
    category: "AC Repair & Servicing",
    submittedAt: "2026-09-07",
    phone: "+880 1819-876543",
    location: "Shaheb Bazar, Rajshahi",
    status: "Pending",
    documents: [
      { name: "National ID (NID)", verified: true },
      { name: "HVAC Technical Permit", verified: true },
    ],
  },
];

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "TKT-3021",
    title: "Unresolved billing dispute after job completion",
    userType: "Provider",
    userName: "Rahim Electrical",
    date: "2026-09-08",
    priority: "High",
    status: "Open",
    description:
      "Customer marked job as completed but payment hasn't reflected in my wallet balance after 24 hours.",
  },
  {
    id: "TKT-3019",
    title: "Technician arrived 2 hours late",
    userType: "Customer",
    userName: "Sultana Parveen",
    date: "2026-09-07",
    priority: "Medium",
    status: "In Progress",
    description:
      "The scheduled plumber arrived way past the designated time without prior notice.",
  },
];

export default function AdminControlPage() {
  const [activeTab, setActiveTab] = useState<
    "verification" | "tickets" | "settings"
  >("verification");
  const [applications, setApplications] =
    useState<ProviderApplication[]>(INITIAL_APPLICATIONS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reply Modal States
  const [selectedTicketForReply, setSelectedTicketForReply] =
    useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState<string>("");

  // System Control States
  const [platformFee, setPlatformFee] = useState<number>(10);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [autoDispatch, setAutoDispatch] = useState<boolean>(true);
  const [announcementText, setAnnouncementText] = useState<string>("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Provider Verification Handlers
  const handleApproveProvider = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Approved" } : app)),
    );
    triggerToast(
      `✅ Provider ${id} has been verified and granted platform access.`,
    );
  };

  const handleRejectProvider = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app)),
    );
    triggerToast(`⛔ Provider ${id} application rejected.`);
  };

  // Support Ticket Handlers
  const handleResolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t)),
    );
    triggerToast(`✅ Ticket ${id} successfully resolved.`);
  };

  // Reply Modal Submit Handler
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicketForReply) return;

    // Automatically update status to 'In Progress' if currently 'Open'
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicketForReply.id
          ? { ...t, status: t.status === "Open" ? "In Progress" : t.status }
          : t,
      ),
    );

    triggerToast(
      `💬 Reply sent to ${selectedTicketForReply.userName} (${selectedTicketForReply.id})`,
    );
    setSelectedTicketForReply(null);
    setReplyMessage("");
  };

  // Broadcast Handler
  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    triggerToast(`📢 System Announcement Broadcasted: "${announcementText}"`);
    setAnnouncementText("");
  };

  const pendingApps = applications.filter((a) => a.status === "Pending");
  const openTickets = tickets.filter((t) => t.status !== "Resolved");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-purple-500/40 text-white font-medium px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs animate-bounce max-w-md">
          <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Reply Popup Modal */}
      {selectedTicketForReply && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded">
                    {selectedTicketForReply.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedTicketForReply.userType}:{" "}
                    {selectedTicketForReply.userName}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Reply to User Ticket
                </h3>
              </div>
              <button
                onClick={() => setSelectedTicketForReply(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Original Query Context */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-1.5">
              <span className="font-bold text-slate-300 block">
                {selectedTicketForReply.title}
              </span>
              <p className="text-slate-400 italic font-sans leading-relaxed">
                "{selectedTicketForReply.description}"
              </p>
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <CornerDownRight className="w-3.5 h-3.5 text-purple-400" />
                  Write Response Message:
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your official administrative support response here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedTicketForReply(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Send Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                SYSTEM CONTROL CENTER
              </span>
              <span className="text-xs text-slate-500 font-mono">
                • ROUTE: /admin/control
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Admin Control Hub
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Verify pending service providers, manage help tasks and disputes,
              and configure system rules.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-mono uppercase">
                Platform Mode
              </div>
              <div
                className={`text-xs font-bold flex items-center gap-1.5 justify-end mt-0.5 ${
                  maintenanceMode ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    maintenanceMode
                      ? "bg-amber-400 animate-ping"
                      : "bg-emerald-400 animate-pulse"
                  }`}
                ></span>
                {maintenanceMode
                  ? "Maintenance Mode Active"
                  : "Normal Operation"}
              </div>
            </div>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Total Users
              </span>
              <div className="text-3xl font-black text-white font-mono mt-1">
                14,280
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Active Providers
              </span>
              <div className="text-3xl font-black text-teal-400 font-mono mt-1">
                912
              </div>
            </div>
            <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Pending Verifications
              </span>
              <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                {pendingApps.length}
              </div>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Open Help Tasks
              </span>
              <div className="text-3xl font-black text-red-400 font-mono mt-1">
                {openTickets.length}
              </div>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl">
              <Ticket className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("verification")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "verification"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Provider Verifications
            {pendingApps.length > 0 && (
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px]">
                {pendingApps.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "tickets"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Ticket className="w-4 h-4" /> Help Tasks & Support
            {openTickets.length > 0 && (
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full text-[10px]">
                {openTickets.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "settings"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" /> System Control & Settings
          </button>
        </div>

        {/* TAB 1: PROVIDER VERIFICATION */}
        {activeTab === "verification" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
              <h2 className="text-sm font-bold text-slate-200">
                Pending Provider KYC Approvals ({pendingApps.length})
              </h2>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search provider or business..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-full"
                />
              </div>
            </div>

            {applications.filter(
              (a) =>
                a.businessName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                a.name.toLowerCase().includes(searchQuery.toLowerCase()),
            ).length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
                <CheckCircle2 className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-300">
                  All Clear!
                </h4>
                <p className="text-xs text-slate-500">
                  No provider verification requests match your criteria.
                </p>
              </div>
            ) : (
              applications
                .filter(
                  (a) =>
                    a.businessName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    a.name.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((app) => (
                  <div
                    key={app.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row gap-6"
                  >
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-md">
                          {app.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">
                          Submitted: {app.submittedAt}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ml-auto lg:ml-2 ${
                            app.status === "Approved"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : app.status === "Rejected"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-white">
                          {app.businessName}
                        </h3>
                        <p className="text-sm font-bold text-teal-400 mb-2">
                          {app.category}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block mb-0.5">
                              Applicant
                            </span>
                            <span className="font-bold text-slate-200">
                              {app.name}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block mb-0.5">
                              Phone
                            </span>
                            <span className="font-bold text-slate-200">
                              {app.phone}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block mb-0.5">
                              Location
                            </span>
                            <span className="font-bold text-slate-200">
                              {app.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-1/3 flex flex-col justify-between space-y-4">
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
                          Uploaded Credentials
                        </h4>
                        <div className="space-y-2">
                          {app.documents.map((doc, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800/50 text-xs"
                            >
                              <span className="font-bold text-slate-300 flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-slate-500" />
                                {doc.name}
                              </span>
                              {doc.verified ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                                  <CheckCircle2 className="w-3 h-3" /> Valid
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                                  <AlertCircle className="w-3 h-3" /> Needs
                                  Review
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {app.status === "Pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRejectProvider(app.id)}
                            className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs rounded-xl border border-red-500/20 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Ban className="w-4 h-4" /> Reject
                          </button>
                          <button
                            onClick={() => handleApproveProvider(app.id)}
                            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-4 h-4" /> Approve
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* TAB 2: HELP TASKS & DISPUTES */}
        {activeTab === "tickets" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-purple-400" /> Support Desk &
                  Customer Disputes
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Review and resolve active user reports, payment issues, and
                  dispute tasks.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row gap-5"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {ticket.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ticket.priority === "High"
                            ? "bg-red-500/20 text-red-400"
                            : ticket.priority === "Medium"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {ticket.priority} Priority
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          ticket.status === "Resolved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : ticket.status === "In Progress"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-slate-800 text-white border-slate-700"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">
                      {ticket.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      "{ticket.description}"
                    </p>

                    <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />{" "}
                        {ticket.userName} ({ticket.userType})
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />{" "}
                        {ticket.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 justify-end min-w-[140px]">
                    {ticket.status !== "Resolved" && (
                      <button
                        onClick={() => handleResolveTicket(ticket.id)}
                        className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-bold text-xs rounded-xl border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Mark Resolved
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedTicketForReply(ticket)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 text-purple-400" />{" "}
                      Reply User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM CONTROL & SETTINGS */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Parameters */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-purple-400" /> Core System
                Parameters
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Platform Commission Fee
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Percentage deducted per completed booking
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={platformFee}
                      onChange={(e) => setPlatformFee(Number(e.target.value))}
                      className="w-16 bg-slate-900 border border-slate-700 text-center text-sm font-bold text-white py-1 rounded-xl focus:outline-none focus:border-purple-500"
                    />
                    <span className="text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Automated Dispatch Engine
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Auto-assign nearest available provider
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setAutoDispatch(!autoDispatch);
                      triggerToast(
                        `Auto-Dispatch turned ${!autoDispatch ? "ON" : "OFF"}`,
                      );
                    }}
                    className={`p-2 rounded-xl border transition-all ${
                      autoDispatch
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    <Power className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      System Maintenance Mode
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Disable new bookings temporarily
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setMaintenanceMode(!maintenanceMode);
                      triggerToast(
                        `Maintenance Mode ${!maintenanceMode ? "ENABLED" : "DISABLED"}`,
                      );
                    }}
                    className={`p-2 rounded-xl border transition-all ${
                      maintenanceMode
                        ? "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Platform Announcement Broadcast */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BellRing className="w-5 h-5 text-amber-400" /> Platform System
                Broadcast
              </h3>

              <form onSubmit={handleSendAnnouncement} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-2 font-medium">
                    Broadcast Announcement Banner (Pushed to all active users &
                    providers)
                  </label>
                  <textarea
                    rows={4}
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    placeholder="E.g., System maintenance scheduled for Sunday at 2:00 AM UTC..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Broadcast Announcement
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
