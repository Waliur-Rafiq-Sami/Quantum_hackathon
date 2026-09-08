// "use client";

// import React, { useState } from "react";
// import {
//   Ticket,
//   Search,
//   CheckCircle2,
//   AlertTriangle,
//   Clock,
//   MessageSquare,
//   Send,
//   User,
//   Shield,
//   X,
//   FileText,
//   CornerDownRight,
//   Filter,
//   UserCheck,
//   Zap,
//   Lock,
//   ChevronRight,
//   LifeBuoy,
//   RefreshCw,
//   TrendingUp,
// } from "lucide-react";

// // --- Types ---
// type TicketStatus = "Open" | "In Progress" | "Escalated" | "Resolved";
// type TicketPriority = "High" | "Medium" | "Low";
// type UserType = "Customer" | "Provider";
// type TicketCategory =
//   | "Billing & Refund"
//   | "Service Dispute"
//   | "Technical Issue"
//   | "Account & Verification"
//   | "General Query";

// interface TicketMessage {
//   id: string;
//   sender: "user" | "admin" | "system";
//   senderName: string;
//   text: string;
//   timestamp: string;
//   isInternal?: boolean;
// }

// interface SupportTicket {
//   id: string;
//   title: string;
//   category: TicketCategory;
//   userType: UserType;
//   userName: string;
//   userEmail: string;
//   userPhone: string;
//   bookingId?: string;
//   date: string;
//   priority: TicketPriority;
//   status: TicketStatus;
//   assignedAdmin: string;
//   description: string;
//   messages: TicketMessage[];
// }

// export default function AdminTicketsPage() {
//   const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);

//   // Filtering & Search
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState<TicketStatus | "All">("All");
//   const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "All">(
//     "All",
//   );
//   const [categoryFilter, setCategoryFilter] = useState<TicketCategory | "All">(
//     "All",
//   );
//   const [userTypeFilter, setUserTypeFilter] = useState<UserType | "All">("All");

//   // Modals / State drawers
//   const [activeTicketDetail, setActiveTicketDetail] =
//     useState<SupportTicket | null>(null);
//   const [selectedTicketForReply, setSelectedTicketForReply] =
//     useState<SupportTicket | null>(null);
//   const [replyMessage, setReplyMessage] = useState("");
//   const [isInternalNote, setIsInternalNote] = useState(false);
//   const [toastMessage, setToastMessage] = useState<{
//     msg: string;
//     type: "success" | "info" | "warning";
//   } | null>(null);

//   const triggerToast = (
//     msg: string,
//     type: "success" | "info" | "warning" = "info",
//   ) => {
//     setToastMessage({ msg, type });
//     setTimeout(() => setToastMessage(null), 3500);
//   };

//   // --- Handlers ---
//   const handleResolveTicket = (ticketId: string) => {
//     setTickets((prev) =>
//       prev.map((t) => (t.id === ticketId ? { ...t, status: "Resolved" } : t)),
//     );
//     if (activeTicketDetail?.id === ticketId) {
//       setActiveTicketDetail((prev) =>
//         prev ? { ...prev, status: "Resolved" } : null,
//       );
//     }
//     triggerToast(`Ticket ${ticketId} marked as Resolved.`, "success");
//   };

//   const handleEscalateTicket = (ticketId: string) => {
//     setTickets((prev) =>
//       prev.map((t) =>
//         t.id === ticketId ? { ...t, status: "Escalated", priority: "High" } : t,
//       ),
//     );
//     if (activeTicketDetail?.id === ticketId) {
//       setActiveTicketDetail((prev) =>
//         prev ? { ...prev, status: "Escalated", priority: "High" } : null,
//       );
//     }
//     triggerToast(`Ticket ${ticketId} escalated to Senior Support.`, "warning");
//   };

//   const handleSendReply = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!replyMessage.trim() || !selectedTicketForReply) return;

//     const newMessage: TicketMessage = {
//       id: `M_${Date.now()}`,
//       sender: "admin",
//       senderName: "System Admin",
//       text: replyMessage,
//       timestamp: "Just Now",
//       isInternal: isInternalNote,
//     };

//     setTickets((prev) =>
//       prev.map((t) => {
//         if (t.id === selectedTicketForReply.id) {
//           const updatedStatus = t.status === "Open" ? "In Progress" : t.status;
//           return {
//             ...t,
//             status: updatedStatus,
//             messages: [...t.messages, newMessage],
//           };
//         }
//         return t;
//       }),
//     );

//     if (activeTicketDetail?.id === selectedTicketForReply.id) {
//       setActiveTicketDetail((prev) =>
//         prev
//           ? {
//               ...prev,
//               status: prev.status === "Open" ? "In Progress" : prev.status,
//               messages: [...prev.messages, newMessage],
//             }
//           : null,
//       );
//     }

//     triggerToast(
//       isInternalNote
//         ? `Internal note added to ${selectedTicketForReply.id}`
//         : `Reply sent to ${selectedTicketForReply.userName}`,
//       "success",
//     );

//     setSelectedTicketForReply(null);
//     setReplyMessage("");
//     setIsInternalNote(false);
//   };

//   // Filter Computation
//   const filteredTickets = tickets.filter((t) => {
//     const matchesSearch =
//       t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (t.bookingId &&
//         t.bookingId.toLowerCase().includes(searchQuery.toLowerCase()));

//     const matchesStatus = statusFilter === "All" || t.status === statusFilter;
//     const matchesPriority =
//       priorityFilter === "All" || t.priority === priorityFilter;
//     const matchesCategory =
//       categoryFilter === "All" || t.category === categoryFilter;
//     const matchesUserType =
//       userTypeFilter === "All" || t.userType === userTypeFilter;

//     return (
//       matchesSearch &&
//       matchesStatus &&
//       matchesPriority &&
//       matchesCategory &&
//       matchesUserType
//     );
//   });

//   // Metrics
//   const totalOpen = tickets.filter((t) => t.status === "Open").length;
//   const totalInProgress = tickets.filter(
//     (t) => t.status === "In Progress",
//   ).length;
//   const totalEscalated = tickets.filter((t) => t.status === "Escalated").length;
//   const totalResolved = tickets.filter((t) => t.status === "Resolved").length;

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative">
//       {/* Toast Overlay */}
//       {toastMessage && (
//         <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
//           <div
//             className={`px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold border backdrop-blur-xl ${
//               toastMessage.type === "success"
//                 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
//                 : toastMessage.type === "warning"
//                   ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
//                   : "bg-purple-500/10 border-purple-500/30 text-purple-400"
//             }`}
//           >
//             <Zap className="w-4 h-4 shrink-0" />
//             <span>{toastMessage.msg}</span>
//           </div>
//         </div>
//       )}

//       <div className="max-w-[1500px] mx-auto space-y-8">
//         {/* Header Banner */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 uppercase">
//                 Support Desk & Dispute Resolution
//               </span>
//               <span className="text-xs text-slate-500 font-mono">
//                 • ROUTE: /admin/tickets
//               </span>
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
//               Help Desk Control Center
//               <LifeBuoy className="w-6 h-6 text-purple-400" />
//             </h1>
//             <p className="text-xs text-slate-400 mt-1 max-w-xl">
//               Manage incoming queries, platform disputes, payment refunds, and
//               account help reports from both customers and providers.
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => {
//                 setTickets(INITIAL_TICKETS);
//                 triggerToast("Support tickets queue synchronized", "info");
//               }}
//               className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-all flex items-center gap-2"
//             >
//               <RefreshCw className="w-3.5 h-3.5 text-purple-400" /> Sync Queue
//             </button>
//           </div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
//             <div>
//               <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
//                 Open Queries
//               </span>
//               <div className="text-3xl font-black text-purple-400 font-mono mt-1">
//                 {totalOpen}
//               </div>
//             </div>
//             <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl">
//               <Ticket className="w-6 h-6" />
//             </div>
//           </div>

//           <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
//             <div>
//               <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
//                 In Progress
//               </span>
//               <div className="text-3xl font-black text-amber-400 font-mono mt-1">
//                 {totalInProgress}
//               </div>
//             </div>
//             <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl">
//               <Clock className="w-6 h-6" />
//             </div>
//           </div>

//           <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
//             <div>
//               <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
//                 Escalated Disputes
//               </span>
//               <div className="text-3xl font-black text-red-400 font-mono mt-1">
//                 {totalEscalated}
//               </div>
//             </div>
//             <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl">
//               <AlertTriangle className="w-6 h-6" />
//             </div>
//           </div>

//           <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
//             <div>
//               <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
//                 Resolved
//               </span>
//               <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
//                 {totalResolved}
//               </div>
//             </div>
//             <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
//               <CheckCircle2 className="w-6 h-6" />
//             </div>
//           </div>
//         </div>

//         {/* Filter Controls Bar */}
//         <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
//             {/* Search Input */}
//             <div className="relative w-full lg:w-96">
//               <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search ticket ID, title, user or booking #..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
//               />
//             </div>

//             {/* Quick Status Buttons */}
//             <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
//               {(
//                 ["All", "Open", "In Progress", "Escalated", "Resolved"] as const
//               ).map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => setStatusFilter(status)}
//                   className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
//                     statusFilter === status
//                       ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
//                       : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
//                   }`}
//                 >
//                   {status}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Secondary Filters */}
//           <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80 text-xs">
//             <div className="flex items-center gap-1.5 text-slate-500 font-mono uppercase text-[10px]">
//               <Filter className="w-3.5 h-3.5" /> Filters:
//             </div>

//             {/* Priority Filter */}
//             <select
//               value={priorityFilter}
//               onChange={(e) => setPriorityFilter(e.target.value as any)}
//               className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300 focus:outline-none focus:border-purple-500"
//             >
//               <option value="All">Priority: All</option>
//               <option value="High">High Priority</option>
//               <option value="Medium">Medium Priority</option>
//               <option value="Low">Low Priority</option>
//             </select>

//             {/* Category Filter */}
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value as any)}
//               className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300 focus:outline-none focus:border-purple-500"
//             >
//               <option value="All">Category: All</option>
//               <option value="Billing & Refund">Billing & Refund</option>
//               <option value="Service Dispute">Service Dispute</option>
//               <option value="Technical Issue">Technical Issue</option>
//               <option value="Account & Verification">
//                 Account & Verification
//               </option>
//               <option value="General Query">General Query</option>
//             </select>

//             {/* User Type Filter */}
//             <select
//               value={userTypeFilter}
//               onChange={(e) => setUserTypeFilter(e.target.value as any)}
//               className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300 focus:outline-none focus:border-purple-500"
//             >
//               <option value="All">User Type: All</option>
//               <option value="Customer">Customer Tickets</option>
//               <option value="Provider">Provider Tickets</option>
//             </select>

//             {(priorityFilter !== "All" ||
//               categoryFilter !== "All" ||
//               userTypeFilter !== "All" ||
//               searchQuery) && (
//               <button
//                 onClick={() => {
//                   setPriorityFilter("All");
//                   setCategoryFilter("All");
//                   setUserTypeFilter("All");
//                   setSearchQuery("");
//                 }}
//                 className="text-red-400 hover:underline text-xs font-bold ml-auto"
//               >
//                 Reset Filters
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Tickets List View */}
//         <div className="space-y-4">
//           {filteredTickets.length === 0 ? (
//             <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
//               <LifeBuoy className="w-12 h-12 text-slate-600 mx-auto" />
//               <h3 className="text-base font-bold text-slate-300">
//                 No support tickets match your criteria
//               </h3>
//               <p className="text-xs text-slate-500">
//                 Try adjusting your active search or dropdown filters.
//               </p>
//             </div>
//           ) : (
//             filteredTickets.map((ticket) => (
//               <div
//                 key={ticket.id}
//                 className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700/80 transition-all flex flex-col lg:flex-row justify-between gap-6"
//               >
//                 {/* Left Section: Ticket Info */}
//                 <div className="flex-1 space-y-3">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <span className="text-xs font-mono font-bold bg-slate-950 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-md">
//                       {ticket.id}
//                     </span>

//                     <span
//                       className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
//                         ticket.priority === "High"
//                           ? "bg-red-500/10 text-red-400 border-red-500/30"
//                           : ticket.priority === "Medium"
//                             ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
//                             : "bg-blue-500/10 text-blue-400 border-blue-500/30"
//                       }`}
//                     >
//                       {ticket.priority} Priority
//                     </span>

//                     <span
//                       className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
//                         ticket.status === "Resolved"
//                           ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
//                           : ticket.status === "Escalated"
//                             ? "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse"
//                             : ticket.status === "In Progress"
//                               ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
//                               : "bg-purple-500/10 text-purple-400 border-purple-500/30"
//                       }`}
//                     >
//                       {ticket.status}
//                     </span>

//                     <span className="text-xs font-mono text-slate-500 border-l border-slate-800 pl-2">
//                       Category:{" "}
//                       <strong className="text-slate-300">
//                         {ticket.category}
//                       </strong>
//                     </span>
//                   </div>

//                   <div>
//                     <h3 className="text-base font-bold text-white hover:text-purple-300 transition-colors">
//                       {ticket.title}
//                     </h3>
//                     <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
//                       "{ticket.description}"
//                     </p>
//                   </div>

//                   {/* Context Meta */}
//                   <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
//                     <span className="flex items-center gap-1.5">
//                       <User className="w-3.5 h-3.5 text-purple-400" />
//                       <strong className="text-slate-200">
//                         {ticket.userName}
//                       </strong>{" "}
//                       ({ticket.userType})
//                     </span>

//                     {ticket.bookingId && (
//                       <span className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
//                         Booking:{" "}
//                         <span className="text-teal-400 font-bold">
//                           {ticket.bookingId}
//                         </span>
//                       </span>
//                     )}

//                     <span className="flex items-center gap-1 text-slate-500">
//                       <Clock className="w-3.5 h-3.5" /> {ticket.date}
//                     </span>

//                     <span className="flex items-center gap-1 text-slate-500 ml-auto">
//                       Assigned:{" "}
//                       <span className="text-slate-300 font-semibold">
//                         {ticket.assignedAdmin}
//                       </span>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Right Action Trigger Buttons */}
//                 <div className="flex lg:flex-col justify-end gap-2.5 min-w-[180px] shrink-0 border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
//                   <button
//                     onClick={() => setActiveTicketDetail(ticket)}
//                     className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-1.5"
//                   >
//                     <FileText className="w-4 h-4 text-purple-400" /> View Thread
//                   </button>

//                   <button
//                     onClick={() => setSelectedTicketForReply(ticket)}
//                     className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5"
//                   >
//                     <MessageSquare className="w-4 h-4" /> Reply User
//                   </button>

//                   {ticket.status !== "Resolved" && (
//                     <button
//                       onClick={() => handleResolveTicket(ticket.id)}
//                       className="py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 font-bold text-xs rounded-xl border border-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
//                     >
//                       <CheckCircle2 className="w-4 h-4" /> Resolve
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* REPLIES POPUP MODAL */}
//       {selectedTicketForReply && (
//         <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
//           <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
//             {/* Modal Header */}
//             <div className="flex items-start justify-between border-b border-slate-800 pb-4">
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded">
//                     {selectedTicketForReply.id}
//                   </span>
//                   <span className="text-xs text-slate-400 font-mono">
//                     {selectedTicketForReply.userType}:{" "}
//                     {selectedTicketForReply.userName}
//                   </span>
//                 </div>
//                 <h3 className="text-base font-bold text-white">
//                   Reply to Support Ticket
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setSelectedTicketForReply(null)}
//                 className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Original Query Preview */}
//             <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
//               <span className="font-bold text-slate-300 block">
//                 {selectedTicketForReply.title}
//               </span>
//               <p className="text-slate-400 italic leading-relaxed">
//                 "{selectedTicketForReply.description}"
//               </p>
//             </div>

//             {/* Response Mode Selector */}
//             <div className="flex items-center gap-3 text-xs bg-slate-950 p-1.5 rounded-xl border border-slate-800">
//               <button
//                 type="button"
//                 onClick={() => setIsInternalNote(false)}
//                 className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
//                   !isInternalNote
//                     ? "bg-purple-600 text-white"
//                     : "text-slate-400 hover:text-white"
//                 }`}
//               >
//                 Public Response (User visible)
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsInternalNote(true)}
//                 className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
//                   isInternalNote
//                     ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
//                     : "text-slate-400 hover:text-white"
//                 }`}
//               >
//                 <Lock className="w-3.5 h-3.5" /> Internal Admin Note
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSendReply} className="space-y-4">
//               <div>
//                 <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
//                   <CornerDownRight className="w-3.5 h-3.5 text-purple-400" />
//                   {isInternalNote
//                     ? "Write Internal Note (Staff only):"
//                     : "Write Official Response:"}
//                 </label>
//                 <textarea
//                   rows={4}
//                   required
//                   value={replyMessage}
//                   onChange={(e) => setReplyMessage(e.target.value)}
//                   placeholder={
//                     isInternalNote
//                       ? "Write private staff notes regarding this dispute or account check..."
//                       : "Type your official response to the user here..."
//                   }
//                   className={`w-full bg-slate-950 border rounded-2xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all resize-none ${
//                     isInternalNote
//                       ? "border-amber-500/40 focus:border-amber-400"
//                       : "border-slate-800 focus:border-purple-500"
//                   }`}
//                 ></textarea>
//               </div>

//               <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
//                 <button
//                   type="button"
//                   onClick={() => setSelectedTicketForReply(null)}
//                   className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center gap-1.5 ${
//                     isInternalNote
//                       ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/20"
//                       : "bg-purple-600 hover:bg-purple-500 shadow-purple-600/20"
//                   }`}
//                 >
//                   <Send className="w-3.5 h-3.5" />{" "}
//                   {isInternalNote ? "Save Internal Note" : "Send Response"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* FULL TICKET THREAD DETAIL DRAWER / MODAL */}
//       {activeTicketDetail && (
//         <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
//           <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
//             {/* Header */}
//             <div className="flex items-start justify-between border-b border-slate-800 pb-4 shrink-0">
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded">
//                     {activeTicketDetail.id}
//                   </span>
//                   <span className="text-xs font-mono text-slate-400">
//                     Category: {activeTicketDetail.category}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-black text-white">
//                   {activeTicketDetail.title}
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setActiveTicketDetail(null)}
//                 className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             {/* User Details & Status Bar */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs shrink-0 font-mono">
//               <div>
//                 <span className="text-slate-500 block text-[10px]">
//                   USER / TYPE
//                 </span>
//                 <span className="font-bold text-white">
//                   {activeTicketDetail.userName}
//                 </span>
//                 <span className="text-slate-400 block text-[10px]">
//                   ({activeTicketDetail.userType})
//                 </span>
//               </div>
//               <div>
//                 <span className="text-slate-500 block text-[10px]">
//                   CONTACT PHONE
//                 </span>
//                 <span className="font-bold text-slate-300">
//                   {activeTicketDetail.userPhone}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-slate-500 block text-[10px]">
//                   PRIORITY
//                 </span>
//                 <span
//                   className={`font-bold ${
//                     activeTicketDetail.priority === "High"
//                       ? "text-red-400"
//                       : "text-amber-400"
//                   }`}
//                 >
//                   {activeTicketDetail.priority}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-slate-500 block text-[10px]">STATUS</span>
//                 <span className="font-bold text-teal-400">
//                   {activeTicketDetail.status}
//                 </span>
//               </div>
//             </div>

//             {/* Thread Message History */}
//             <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
//               {activeTicketDetail.messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`p-4 rounded-2xl text-xs space-y-1.5 border ${
//                     msg.isInternal
//                       ? "bg-amber-500/5 border-amber-500/30 text-amber-200"
//                       : msg.sender === "admin"
//                         ? "bg-purple-900/20 border-purple-500/30 text-purple-100 ml-6"
//                         : "bg-slate-950 border-slate-800 text-slate-300 mr-6"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between font-mono text-[10px]">
//                     <span className="font-bold flex items-center gap-1.5">
//                       {msg.isInternal && (
//                         <Lock className="w-3 h-3 text-amber-400" />
//                       )}
//                       {msg.senderName} {msg.isInternal && "(Internal Note)"}
//                     </span>
//                     <span className="text-slate-500">{msg.timestamp}</span>
//                   </div>
//                   <p className="leading-relaxed whitespace-pre-wrap">
//                     {msg.text}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Drawer Bottom Actions */}
//             <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 shrink-0">
//               <div className="flex items-center gap-2">
//                 {activeTicketDetail.status !== "Escalated" && (
//                   <button
//                     onClick={() => handleEscalateTicket(activeTicketDetail.id)}
//                     className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
//                   >
//                     <AlertTriangle className="w-3.5 h-3.5" /> Escalate
//                   </button>
//                 )}
//                 {activeTicketDetail.status !== "Resolved" && (
//                   <button
//                     onClick={() => handleResolveTicket(activeTicketDetail.id)}
//                     className="px-3 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
//                   >
//                     <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
//                   </button>
//                 )}
//               </div>

//               <button
//                 onClick={() => {
//                   setSelectedTicketForReply(activeTicketDetail);
//                 }}
//                 className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
//               >
//                 <MessageSquare className="w-3.5 h-3.5" /> Reply to Thread
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Ticket,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MessageSquare,
  Send,
  User,
  Shield,
  X,
  FileText,
  CornerDownRight,
  Filter,
  UserCheck,
  Zap,
  Lock,
  ChevronRight,
  LifeBuoy,
  RefreshCw,
  TrendingUp,
  Loader2,
} from "lucide-react";

// --- Types ---
type TicketStatus = "Open" | "In Progress" | "Escalated" | "Resolved";
type TicketPriority = "High" | "Medium" | "Low";
type UserType = "Customer" | "Provider";
type TicketCategory =
  | "Billing & Refund"
  | "Service Dispute"
  | "Technical Issue"
  | "Account & Verification"
  | "General Query"
  | "Bookings & Schedules"
  | "Payments & Invoices"
  | "Safety & Security";

interface TicketMessage {
  id: string;
  sender: "user" | "admin" | "system";
  senderName: string;
  text: string;
  timestamp: string;
  isInternal?: boolean;
}

interface SupportTicket {
  id: string;
  title: string;
  category: TicketCategory;
  userType: UserType;
  userName: string;
  userEmail: string;
  userPhone: string;
  bookingId?: string;
  date: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedAdmin: string;
  description: string;
  messages: TicketMessage[];
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "All">(
    "All",
  );
  const [categoryFilter, setCategoryFilter] = useState<TicketCategory | "All">(
    "All",
  );
  const [userTypeFilter, setUserTypeFilter] = useState<UserType | "All">("All");

  // Modals / State drawers
  const [activeTicketDetail, setActiveTicketDetail] =
    useState<SupportTicket | null>(null);
  const [selectedTicketForReply, setSelectedTicketForReply] =
    useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    msg: string;
    type: "success" | "info" | "warning";
  } | null>(null);

  const triggerToast = (
    msg: string,
    type: "success" | "info" | "warning" = "info",
  ) => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- Fetch API Data ---
  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tickets");
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const mappedTickets: SupportTicket[] = result.data.map((item: any) => ({
          id: item.ticketId || item._id,
          title: item.title || "No Subject",
          category: item.category || "General Query",
          userType: item.userType || "Customer",
          userName: item.userName || "User",
          userEmail: item.userEmail || "",
          userPhone: item.userPhone || "N/A",
          bookingId: item.bookingId || undefined,
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recently",
          priority: item.priority || "Medium",
          status: item.status || "Open",
          assignedAdmin: item.assignedAdmin || "Unassigned",
          description: item.description || "",
          messages: item.messages || [
            {
              id: `msg_init_${item._id}`,
              sender: "user",
              senderName: item.userName || "User",
              text: item.description || "",
              timestamp: item.createdAt
                ? new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Initial Request",
            },
          ],
        }));

        setTickets(mappedTickets);
      } else {
        triggerToast("Failed to parse tickets data.", "warning");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      triggerToast("Failed to connect to backend server.", "warning");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // --- Action Handlers ---
  const handleResolveTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: "Resolved" } : t)),
    );
    if (activeTicketDetail?.id === ticketId) {
      setActiveTicketDetail((prev) =>
        prev ? { ...prev, status: "Resolved" } : null,
      );
    }
    triggerToast(`Ticket ${ticketId} marked as Resolved.`, "success");
  };

  const handleEscalateTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status: "Escalated", priority: "High" } : t,
      ),
    );
    if (activeTicketDetail?.id === ticketId) {
      setActiveTicketDetail((prev) =>
        prev ? { ...prev, status: "Escalated", priority: "High" } : null,
      );
    }
    triggerToast(`Ticket ${ticketId} escalated to Senior Support.`, "warning");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicketForReply) return;

    const newMessage: TicketMessage = {
      id: `M_${Date.now()}`,
      sender: "admin",
      senderName: "System Admin",
      text: replyMessage,
      timestamp: "Just Now",
      isInternal: isInternalNote,
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === selectedTicketForReply.id) {
          const updatedStatus = t.status === "Open" ? "In Progress" : t.status;
          return {
            ...t,
            status: updatedStatus,
            messages: [...t.messages, newMessage],
          };
        }
        return t;
      }),
    );

    if (activeTicketDetail?.id === selectedTicketForReply.id) {
      setActiveTicketDetail((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "Open" ? "In Progress" : prev.status,
              messages: [...prev.messages, newMessage],
            }
          : null,
      );
    }

    triggerToast(
      isInternalNote
        ? `Internal note added to ${selectedTicketForReply.id}`
        : `Reply sent to ${selectedTicketForReply.userName}`,
      "success",
    );

    setSelectedTicketForReply(null);
    setReplyMessage("");
    setIsInternalNote(false);
  };

  // Filter Computation
  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.bookingId &&
        t.bookingId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || t.priority === priorityFilter;
    const matchesCategory =
      categoryFilter === "All" || t.category === categoryFilter;
    const matchesUserType =
      userTypeFilter === "All" || t.userType === userTypeFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory &&
      matchesUserType
    );
  });

  // Metrics
  const totalOpen = tickets.filter((t) => t.status === "Open").length;
  const totalInProgress = tickets.filter(
    (t) => t.status === "In Progress",
  ).length;
  const totalEscalated = tickets.filter((t) => t.status === "Escalated").length;
  const totalResolved = tickets.filter((t) => t.status === "Resolved").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative">
      {/* Toast Overlay */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold border backdrop-blur-xl ${
              toastMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : toastMessage.type === "warning"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-purple-500/10 border-purple-500/30 text-purple-400"
            }`}
          >
            <Zap className="w-4 h-4 shrink-0" />
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      <div className="max-w-[1500px] mx-auto space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 uppercase">
                Support Desk & Dispute Resolution
              </span>
              <span className="text-xs text-slate-500 font-mono">
                • ROUTE: /admin/tickets
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Help Desk Control Center
              <LifeBuoy className="w-6 h-6 text-purple-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Manage incoming queries, platform disputes, payment refunds, and
              account help reports from both customers and providers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchTickets();
                triggerToast("Support tickets queue synchronized", "info");
              }}
              disabled={isLoading}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-purple-400 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />{" "}
              Sync Queue
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                Open Queries
              </span>
              <div className="text-3xl font-black text-purple-400 font-mono mt-1">
                {totalOpen}
              </div>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl">
              <Ticket className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                In Progress
              </span>
              <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                {totalInProgress}
              </div>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                Escalated Disputes
              </span>
              <div className="text-3xl font-black text-red-400 font-mono mt-1">
                {totalEscalated}
              </div>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                Resolved
              </span>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                {totalResolved}
              </div>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ticket ID, title, user or booking #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>

            {/* Quick Status Buttons */}
            <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {(
                ["All", "Open", "In Progress", "Escalated", "Resolved"] as const
              ).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    statusFilter === status
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 font-mono uppercase text-[10px]">
              <Filter className="w-3.5 h-3.5" /> Filters:
            </div>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="All">Priority: All</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="All">Category: All</option>
              <option value="Bookings & Schedules">Bookings & Schedules</option>
              <option value="Payments & Invoices">Payments & Invoices</option>
              <option value="Safety & Security">Safety & Security</option>
              <option value="Billing & Refund">Billing & Refund</option>
              <option value="Service Dispute">Service Dispute</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Account & Verification">
                Account & Verification
              </option>
              <option value="General Query">General Query</option>
            </select>

            {/* User Type Filter */}
            <select
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="All">User Type: All</option>
              <option value="Customer">Customer Tickets</option>
              <option value="Provider">Provider Tickets</option>
            </select>

            {(priorityFilter !== "All" ||
              categoryFilter !== "All" ||
              userTypeFilter !== "All" ||
              searchQuery) && (
              <button
                onClick={() => {
                  setPriorityFilter("All");
                  setCategoryFilter("All");
                  setUserTypeFilter("All");
                  setSearchQuery("");
                }}
                className="text-red-400 hover:underline text-xs font-bold ml-auto"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Tickets List View */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
              <p className="text-xs text-slate-400">
                Loading tickets from database...
              </p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
              <LifeBuoy className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">
                No support tickets match your criteria
              </h3>
              <p className="text-xs text-slate-500">
                Try adjusting your active search or dropdown filters.
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700/80 transition-all flex flex-col lg:flex-row justify-between gap-6"
              >
                {/* Left Section: Ticket Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-slate-950 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-md">
                      {ticket.id}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        ticket.priority === "High"
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : ticket.priority === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {ticket.priority} Priority
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        ticket.status === "Resolved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : ticket.status === "Escalated"
                            ? "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse"
                            : ticket.status === "In Progress"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                      }`}
                    >
                      {ticket.status}
                    </span>

                    <span className="text-xs font-mono text-slate-500 border-l border-slate-800 pl-2">
                      Category:{" "}
                      <strong className="text-slate-300">
                        {ticket.category}
                      </strong>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white hover:text-purple-300 transition-colors">
                      {ticket.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      "{ticket.description}"
                    </p>
                  </div>

                  {/* Context Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-400" />
                      <strong className="text-slate-200">
                        {ticket.userName}
                      </strong>{" "}
                      ({ticket.userType})
                    </span>

                    {ticket.bookingId && (
                      <span className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                        Booking:{" "}
                        <span className="text-teal-400 font-bold">
                          {ticket.bookingId}
                        </span>
                      </span>
                    )}

                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> {ticket.date}
                    </span>

                    <span className="flex items-center gap-1 text-slate-500 ml-auto">
                      Assigned:{" "}
                      <span className="text-slate-300 font-semibold">
                        {ticket.assignedAdmin}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Right Action Trigger Buttons */}
                <div className="flex lg:flex-col justify-end gap-2.5 min-w-[180px] shrink-0 border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
                  <button
                    onClick={() => setActiveTicketDetail(ticket)}
                    className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-purple-400" /> View Thread
                  </button>

                  <button
                    onClick={() => setSelectedTicketForReply(ticket)}
                    className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" /> Reply User
                  </button>

                  {ticket.status !== "Resolved" && (
                    <button
                      onClick={() => handleResolveTicket(ticket.id)}
                      className="py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 font-bold text-xs rounded-xl border border-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Resolve
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* REPLIES POPUP MODAL */}
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
                  Reply to Support Ticket
                </h3>
              </div>
              <button
                onClick={() => setSelectedTicketForReply(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Original Query Preview */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-300 block">
                {selectedTicketForReply.title}
              </span>
              <p className="text-slate-400 italic leading-relaxed">
                "{selectedTicketForReply.description}"
              </p>
            </div>

            {/* Response Mode Selector */}
            <div className="flex items-center gap-3 text-xs bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setIsInternalNote(false)}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                  !isInternalNote
                    ? "bg-purple-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Public Response (User visible)
              </button>
              <button
                type="button"
                onClick={() => setIsInternalNote(true)}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isInternalNote
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Lock className="w-3.5 h-3.5" /> Internal Admin Note
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSendReply} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <CornerDownRight className="w-3.5 h-3.5 text-purple-400" />
                  {isInternalNote
                    ? "Write Internal Note (Staff only):"
                    : "Write Official Response:"}
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={
                    isInternalNote
                      ? "Write private staff notes regarding this dispute or account check..."
                      : "Type your official response to the user here..."
                  }
                  className={`w-full bg-slate-950 border rounded-2xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all resize-none ${
                    isInternalNote
                      ? "border-amber-500/40 focus:border-amber-400"
                      : "border-slate-800 focus:border-purple-500"
                  }`}
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
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center gap-1.5 ${
                    isInternalNote
                      ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/20"
                      : "bg-purple-600 hover:bg-purple-500 shadow-purple-600/20"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />{" "}
                  {isInternalNote ? "Save Internal Note" : "Send Response"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL TICKET THREAD DETAIL DRAWER / MODAL */}
      {activeTicketDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded">
                    {activeTicketDetail.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Category: {activeTicketDetail.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">
                  {activeTicketDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTicketDetail(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User Details & Status Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs shrink-0 font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">
                  USER / TYPE
                </span>
                <span className="font-bold text-white">
                  {activeTicketDetail.userName}
                </span>
                <span className="text-slate-400 block text-[10px]">
                  ({activeTicketDetail.userType})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">
                  CONTACT PHONE
                </span>
                <span className="font-bold text-slate-300">
                  {activeTicketDetail.userPhone}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">
                  PRIORITY
                </span>
                <span
                  className={`font-bold ${
                    activeTicketDetail.priority === "High"
                      ? "text-red-400"
                      : "text-amber-400"
                  }`}
                >
                  {activeTicketDetail.priority}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">STATUS</span>
                <span className="font-bold text-teal-400">
                  {activeTicketDetail.status}
                </span>
              </div>
            </div>

            {/* Thread Message History */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {activeTicketDetail.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl text-xs space-y-1.5 border ${
                    msg.isInternal
                      ? "bg-amber-500/10 border-amber-500/30"
                      : msg.sender === "admin"
                        ? "bg-purple-500/10 border-purple-500/30 ml-6"
                        : "bg-slate-950 border-slate-800 mr-6"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold text-slate-300">
                      {msg.senderName} {msg.isInternal && "(Internal Note)"}
                    </span>
                    <span className="text-slate-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-300">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 shrink-0">
              <button
                onClick={() => handleEscalateTicket(activeTicketDetail.id)}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Escalate Ticket
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedTicketForReply(activeTicketDetail);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Reply Thread
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
