// ==========================================
// File: components/dashboard/UserDashboard.tsx
// ==========================================

"use client";

import React, { useState } from "react";
import { ServiceRequest, ServiceStatus } from "@/types/dashboard";
import { INITIAL_ORDERS, fontCategoryList } from "@/data/mockData";
import { StatusTracker } from "./StatusTracker";
import { NewOrderModal } from "./NewOrderModal";
import {
  LayoutDashboard,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Wrench,
  MapPin,
  Calendar,
  Phone,
  User,
  ShieldCheck,
  CreditCard,
  Banknote,
  Search,
  Sparkles,
  AlertCircle,
  Star,
  FileText,
  RotateCcw,
} from "lucide-react";

export default function UserDashboard() {
  const [orders, setOrders] = useState<ServiceRequest[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<
    "active" | "history" | "categories" | "payment"
  >("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Cancel order handler
  const handleCancelOrder = (orderId: string) => {
    const orderToCancel = orders.find((o) => o.id === orderId);

    // Check if provider is already on the way or beyond
    if (
      orderToCancel &&
      ["On the Way", "In Progress", "Completed"].includes(orderToCancel.status)
    ) {
      alert(
        "Cancellation is not allowed once the provider is on the way or actively working.",
      );
      return;
    }

    if (confirm("Are you sure you want to cancel this service request?")) {
      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === orderId
            ? { ...ord, status: "Cancelled" as ServiceStatus }
            : ord,
        ),
      );
    }
  };

  // Simulate provider updating job status for hackathon demo
  const handleSimulateStatusAdvance = (orderId: string) => {
    const flow: ServiceStatus[] = [
      "Requested",
      "Accepted",
      "On the Way",
      "In Progress",
      "Completed",
    ];
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const currentIdx = flow.indexOf(ord.status);
          if (currentIdx !== -1 && currentIdx < flow.length - 1) {
            const nextStatus = flow[currentIdx + 1];
            return {
              ...ord,
              status: nextStatus,
              paymentStatus:
                nextStatus === "Completed" ? "Paid" : ord.paymentStatus,
            };
          }
        }
        return ord;
      }),
    );
  };

  const handleAddNewOrder = (newOrder: ServiceRequest) => {
    setOrders([newOrder, ...orders]);
    setActiveTab("active");
  };

  const activeOrders = orders.filter(
    (o) => o.status !== "Completed" && o.status !== "Cancelled",
  );
  const historyOrders = orders.filter(
    (o) => o.status === "Completed" || o.status === "Cancelled",
  );

  // Helper to determine if an order can be cancelled
  const canCancel = (status: ServiceStatus) => {
    return status === "Requested" || status === "Accepted";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Dashboard Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Customer Dashboard
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono"></span>
              </h1>
              <p className="text-xs text-slate-400">
                Manage your home services, track real-time technicians & view
                billing history.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-mono transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Book New Service
          </button>
        </div>

        {/* Overview Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Active Requests
              </span>
              <div className="text-2xl font-black text-blue-400 font-mono mt-1">
                {activeOrders.length}
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Completed Requests
              </span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {orders.filter((o) => o.status === "Completed").length}
              </div>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Cancelled
              </span>
              <div className="text-2xl font-black text-red-400 font-mono mt-1">
                {orders.filter((o) => o.status === "Cancelled").length}
              </div>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
              <XCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Default Payment
              </span>
              <div className="text-xs font-bold text-slate-200 mt-1 flex items-center gap-1 font-mono">
                <Banknote className="w-4 h-4 text-emerald-400" /> Cash on
                Delivery
              </div>
            </div>
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "active"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Clock className="w-4 h-4" /> Active Requests ({activeOrders.length}
            )
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "history"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" /> Order History (
            {historyOrders.length})
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "categories"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Wrench className="w-4 h-4" /> All Available Services
          </button>

          <button
            onClick={() => setActiveTab("payment")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "payment"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Banknote className="w-4 h-4" /> Payment Preferences
          </button>
        </div>

        {/* TAB 1: ACTIVE REQUESTS */}
        {activeTab === "active" && (
          <div className="space-y-6">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800">
                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-300">
                  No Active Service Requests
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  You don't have any ongoing bookings right now.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Book a Service Now
                </button>
              </div>
            ) : (
              activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-bold text-blue-400">
                          {order.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">
                          {order.createdAt}
                        </span>
                        {order.urgency === "Emergency" && (
                          <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold">
                            EMERGENCY (+৳200)
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">
                        {order.serviceTitle}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {order.serviceCategory}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Interactive Hackathon Simulation Button */}
                      <button
                        onClick={() => handleSimulateStatusAdvance(order.id)}
                        className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                        title="Simulate provider changing status for evaluation"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Advance Status
                      </button>

                      {/* Cancel Button Option - Conditionally Rendered */}
                      {canCancel(order.status) ? (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel Job
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-3 py-1.5 bg-slate-800/40 border border-slate-800 text-slate-500 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-not-allowed"
                          title="Provider is already en route or working. Cannot cancel."
                        >
                          <XCircle className="w-3.5 h-3.5 opacity-50" /> Cannot
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress View */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      Live Dispatch Progress Tracking
                    </span>
                    <StatusTracker status={order.status} />
                  </div>

                  {/* Provider & Job Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Assigned Technician */}
                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.provider.avatar}
                          alt={order.provider.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-200">
                            {order.provider.name}
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {order.provider.expertise}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                            <span className="text-amber-400 font-bold">
                              ⭐ {order.provider.rating}
                            </span>
                            <span>•</span>
                            <span className="text-slate-300">
                              {order.provider.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Slot & Payment summary */}
                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-blue-400" />{" "}
                          Schedule:
                        </span>
                        <span className="font-mono">
                          {order.date} ({order.timeSlot})
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-blue-400" />{" "}
                          Location:
                        </span>
                        <span className="truncate max-w-[200px]">
                          {order.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Banknote className="w-3.5 h-3.5 text-emerald-400" />{" "}
                          Payment ({order.paymentMethod}):
                        </span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          ৳{order.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ORDER HISTORY */}
        {activeTab === "history" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">
              Service Request History
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Technician</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {historyOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center p-6 text-slate-500"
                      >
                        No historical records found.
                      </td>
                    </tr>
                  ) : (
                    historyOrders.map((ord) => (
                      <tr
                        key={ord.id}
                        className="hover:bg-slate-950/50 transition-colors"
                      >
                        <td className="p-3 font-mono font-bold text-blue-400">
                          {ord.id}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-200">
                            {ord.serviceTitle}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {ord.serviceCategory}
                          </div>
                        </td>
                        <td className="p-3">{ord.provider.name}</td>
                        <td className="p-3 font-mono">{ord.date}</td>
                        <td className="p-3 font-mono">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3 font-mono">
                          {ord.status === "Completed" ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                              Completed
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                              Cancelled
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-100">
                          ৳{ord.totalAmount}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ALL SERVICES CATALOG */}
        {activeTab === "categories" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">
                Automated Service Catalog
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {fontCategoryList
                .filter((cat) =>
                  cat.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((category) => (
                  <div
                    key={category}
                    className="p-5 bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl transition-all group cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-200 text-sm">
                      {category}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Verified providers available
                    </p>
                    <button className="mt-4 w-full py-1.5 bg-slate-950 hover:bg-blue-600 hover:text-white border border-slate-800 text-slate-300 font-mono text-[11px] font-bold rounded-xl transition-colors">
                      Book Now →
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: PAYMENT PREFERENCES */}
        {activeTab === "payment" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Payment Method Options
                </h3>
                <p className="text-xs text-slate-400">
                  Configure default payment method for all service requests.
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Banknote className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-emerald-300">
                    Cash on Delivery (Default Selected)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Pay directly to technician after service verification.
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-bold">
                DEFAULT ACTIVE
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-300">
                Other Available Payment Gateways
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center opacity-70">
                  <span className="text-xs font-bold text-pink-400 block">
                    bKash
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Digital Wallet
                  </span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center opacity-70">
                  <span className="text-xs font-bold text-orange-400 block">
                    Nagad
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Digital Wallet
                  </span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center opacity-70">
                  <span className="text-xs font-bold text-blue-400 block">
                    Debit / Credit Card
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Visa / Mastercard
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Component */}
        <NewOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmitOrder={handleAddNewOrder}
        />
      </div>
    </div>
  );
}
