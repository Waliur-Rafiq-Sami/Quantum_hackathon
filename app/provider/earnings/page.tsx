"use client";

import React, { useState, useMemo } from "react";
import {
  Banknote,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building,
  CreditCard,
  Plus,
  Download,
  Filter,
  Search,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  RefreshCw,
  X,
  Check,
  ArrowDownLeft,
} from "lucide-react";

// --- Types ---
interface PayoutTransaction {
  id: string;
  date: string;
  time: string;
  amount: number;
  fee: number;
  netAmount: number;
  method: "bKash" | "Nagad" | "Bank Transfer" | "Rocket";
  accountDetails: string;
  status: "Completed" | "Processing" | "Failed";
}

interface PaymentMethod {
  id: string;
  type: "bKash" | "Nagad" | "Bank Transfer" | "Rocket";
  accountName: string;
  accountNumber: string;
  bankName?: string;
  isDefault: boolean;
}

// --- Initial Mock Data ---
const INITIAL_TRANSACTIONS: PayoutTransaction[] = [
  {
    id: "TXN-90821",
    date: "2026-03-05",
    time: "14:30",
    amount: 5500,
    fee: 0,
    netAmount: 5500,
    method: "bKash",
    accountDetails: "+880 1712-345678",
    status: "Completed",
  },
  {
    id: "TXN-88410",
    date: "2026-03-01",
    time: "10:15",
    amount: 12000,
    fee: 0,
    netAmount: 12000,
    method: "Bank Transfer",
    accountDetails: "DBBL - **** 4920",
    status: "Completed",
  },
  {
    id: "TXN-87201",
    date: "2026-02-22",
    time: "18:45",
    amount: 3200,
    fee: 0,
    netAmount: 3200,
    method: "Nagad",
    accountDetails: "+880 1819-876543",
    status: "Completed",
  },
  {
    id: "TXN-85112",
    date: "2026-02-14",
    time: "11:20",
    amount: 8500,
    fee: 0,
    netAmount: 8500,
    method: "bKash",
    accountDetails: "+880 1712-345678",
    status: "Completed",
  },
];

const INITIAL_METHODS: PaymentMethod[] = [
  {
    id: "PM-1",
    type: "bKash",
    accountName: "Rahim Electronics",
    accountNumber: "01712345678",
    isDefault: true,
  },
  {
    id: "PM-2",
    type: "Bank Transfer",
    accountName: "Rahim Center Pvt Ltd",
    accountNumber: "210.120.4920",
    bankName: "Dutch-Bangla Bank PLC",
    isDefault: false,
  },
  {
    id: "PM-3",
    type: "Nagad",
    accountName: "Abdur Rahim",
    accountNumber: "01819876543",
    isDefault: false,
  },
];

const WEEKLY_EARNINGS = [
  { day: "Mon", amount: 2400 },
  { day: "Tue", amount: 3800 },
  { day: "Wed", amount: 1900 },
  { day: "Thu", amount: 4500 },
  { day: "Fri", amount: 5200 },
  { day: "Sat", amount: 6100 },
  { day: "Sun", amount: 3100 },
];

const CATEGORY_BREAKDOWN = [
  { name: "AC Repair & Maintenance", percentage: 45, amount: 12150 },
  { name: "Refrigerator Servicing", percentage: 30, amount: 8100 },
  { name: "Washing Machine Repair", percentage: 15, amount: 4050 },
  { name: "TV & Electronics Fix", percentage: 10, amount: 2700 },
];

export default function EarningsPayoutPage() {
  // Financial State
  const [availableBalance, setAvailableBalance] = useState<number>(8450);
  const [pendingBalance, setPendingBalance] = useState<number>(2200);
  const [lifetimeEarnings, setLifetimeEarnings] = useState<number>(142800);

  // Data States
  const [transactions, setTransactions] =
    useState<PayoutTransaction[]>(INITIAL_TRANSACTIONS);
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(INITIAL_METHODS);

  // UI States
  const [notification, setNotification] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal States
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);

  // Withdraw Form State
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [selectedMethodId, setSelectedMethodId] = useState<string>(
    paymentMethods.find((m) => m.isDefault)?.id || paymentMethods[0]?.id || "",
  );
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState(false);

  // Add Method Form State
  const [newMethodType, setNewMethodType] = useState<
    "bKash" | "Nagad" | "Bank Transfer" | "Rocket"
  >("bKash");
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newBankName, setNewBankName] = useState("");

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesStatus =
        filterStatus === "All" || txn.status === filterStatus;
      const matchesSearch =
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.accountDetails.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [transactions, filterStatus, searchQuery]);

  // Handle Cash Out Submit
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      showToast("⛔ Please enter a valid withdrawal amount.");
      return;
    }

    if (amountNum > availableBalance) {
      showToast("⛔ Withdrawal amount exceeds your available balance!");
      return;
    }

    if (amountNum < 500) {
      showToast("⛔ Minimum withdrawal amount is ৳500.");
      return;
    }

    setIsProcessingWithdraw(true);

    setTimeout(() => {
      const targetMethod = paymentMethods.find(
        (m) => m.id === selectedMethodId,
      );
      const newTxn: PayoutTransaction = {
        id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        amount: amountNum,
        fee: 0,
        netAmount: amountNum,
        method: targetMethod?.type || "bKash",
        accountDetails:
          targetMethod?.type === "Bank Transfer"
            ? `${targetMethod.bankName} - ${targetMethod.accountNumber}`
            : targetMethod?.accountNumber || "",
        status: "Processing",
      };

      setTransactions((prev) => [newTxn, ...prev]);
      setAvailableBalance((prev) => prev - amountNum);
      setIsProcessingWithdraw(false);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount("");
      showToast(
        `✅ Payout request of ৳${amountNum.toLocaleString()} submitted successfully!`,
      );
    }, 1200);
  };

  // Handle Add New Payment Method
  const handleAddMethodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountName || !newAccountNumber) {
      showToast("⛔ Please complete all required fields.");
      return;
    }

    const newMethod: PaymentMethod = {
      id: `PM-${Date.now()}`,
      type: newMethodType,
      accountName: newAccountName,
      accountNumber: newAccountNumber,
      bankName: newMethodType === "Bank Transfer" ? newBankName : undefined,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods((prev) => [...prev, newMethod]);
    if (!selectedMethodId) setSelectedMethodId(newMethod.id);

    setIsAddMethodModalOpen(false);
    setNewAccountName("");
    setNewAccountNumber("");
    setNewBankName("");
    showToast(`✅ Added new ${newMethodType} account successfully!`);
  };

  // Set Default Method
  const handleSetDefaultMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === id,
      })),
    );
    setSelectedMethodId(id);
    showToast("✅ Default payout method updated.");
  };

  const maxWeeklyAmount = Math.max(...WEEKLY_EARNINGS.map((w) => w.amount));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-medium px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs border border-slate-700 animate-bounce max-w-md">
          <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                FINANCIAL DISPATCH HUB
              </span>
              <span className="text-xs text-slate-500 font-mono">
                • BAUST CSE FEST 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Earnings & Instant Payouts
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Track completed job earnings, process instant cash-outs to mobile
              banking or bank accounts, and manage payout methods.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <ArrowUpRight className="w-4 h-4" /> Request Cash Out
            </button>
          </div>
        </div>

        {/* Top Financial Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/20 border border-emerald-500/30 rounded-3xl relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet className="w-24 h-24 text-emerald-400" />
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Available Balance
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-2">
              ৳{availableBalance.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Ready for
              instant cash out
            </p>
          </div>

          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl shadow-xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Pending Clearances
            </span>
            <div className="text-3xl font-black text-amber-400 font-mono mt-2">
              ৳{pendingBalance.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> Clears upon customer
              approval
            </p>
          </div>

          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl shadow-xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Lifetime Earnings
            </span>
            <div className="text-3xl font-black text-blue-400 font-mono mt-2">
              ৳{lifetimeEarnings.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-400" /> Across 42
              completed jobs
            </p>
          </div>

          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Primary Payout Account
              </span>
              <div className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-2">
                {paymentMethods.find((m) => m.isDefault)?.type ===
                "Bank Transfer" ? (
                  <Building className="w-4 h-4 text-purple-400" />
                ) : (
                  <Wallet className="w-4 h-4 text-pink-400" />
                )}
                {paymentMethods.find((m) => m.isDefault)?.accountName ||
                  "None Set"}
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {paymentMethods.find((m) => m.isDefault)?.accountNumber}
              </p>
            </div>
            <button
              onClick={() => setIsAddMethodModalOpen(true)}
              className="text-[11px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 mt-3"
            >
              <Plus className="w-3.5 h-3.5" /> Manage / Add Method
            </button>
          </div>
        </div>

        {/* Analytics & Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Revenue Bar Graph */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Weekly
                  Earnings Overview
                </h3>
                <p className="text-xs text-slate-400">
                  Income generated per day this week
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                Total: ৳
                {WEEKLY_EARNINGS.reduce(
                  (a, b) => a + b.amount,
                  0,
                ).toLocaleString()}
              </span>
            </div>

            {/* Visual Custom SVG/Tailwind Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2">
              {WEEKLY_EARNINGS.map((item, idx) => {
                const heightPercent = Math.round(
                  (item.amount / maxWeeklyAmount) * 100,
                );
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                  >
                    <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ৳{item.amount}
                    </div>
                    <div className="w-full bg-slate-800/80 rounded-t-xl h-full flex items-end p-1">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-lg group-hover:brightness-125 transition-all duration-300"
                      ></div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Earnings by
                Service
              </h3>
              <p className="text-xs text-slate-400">
                Revenue split across service types
              </p>
            </div>

            <div className="space-y-4">
              {CATEGORY_BREAKDOWN.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-300">
                      {cat.name}
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      ৳{cat.amount.toLocaleString()} ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction History & Search/Filters */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-400" /> Payout & Cash
                Out Ledger
              </h3>
              <p className="text-xs text-slate-400">
                Detailed record of all cash withdrawal requests and bank
                dispatches.
              </p>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search ID or Method..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-48"
                />
              </div>

              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
                {["All", "Completed", "Processing", "Failed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      filterStatus === status
                        ? "bg-slate-800 text-white shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Payout Method</th>
                  <th className="py-3 px-4">Account</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-slate-500"
                    >
                      No payout records found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => (
                    <tr
                      key={txn.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-4 font-mono font-bold text-slate-200">
                        {txn.id}
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        <div>{txn.date}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {txn.time}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-300">
                          {txn.method}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-400">
                        {txn.accountDetails}
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-bold text-emerald-400 text-sm">
                        ৳{txn.netAmount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            txn.status === "Completed"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : txn.status === "Processing"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {txn.status === "Completed" && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {txn.status === "Processing" && (
                            <Clock className="w-3 h-3" />
                          )}
                          {txn.status === "Failed" && (
                            <XCircle className="w-3 h-3" />
                          )}
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- CASH OUT WITHDRAWAL MODAL --- */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white">
                Request Cash Out
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Transfer your available earnings directly to your mobile wallet
                or bank account.
              </p>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Available for Withdrawal:
                  <span className="text-emerald-400 font-bold ml-1">
                    ৳{availableBalance.toLocaleString()}
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    placeholder="Enter amount (min ৳500)"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-8 pr-4 py-3 text-sm text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-2">
                  Select Payout Destination
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setSelectedMethodId(method.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selectedMethodId === method.id
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3 text-xs">
                        {method.type === "Bank Transfer" ? (
                          <Building className="w-4 h-4 text-purple-400 shrink-0" />
                        ) : (
                          <Wallet className="w-4 h-4 text-pink-400 shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-slate-200">
                            {method.type} - {method.accountName}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">
                            {method.bankName
                              ? `${method.bankName} (${method.accountNumber})`
                              : method.accountNumber}
                          </div>
                        </div>
                      </div>
                      {selectedMethodId === method.id && (
                        <Check className="w-4 h-4 text-emerald-400" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="text-emerald-400 font-bold">FREE (৳0)</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span className="text-slate-200 font-bold">
                    Instant to 2 Hours
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingWithdraw}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessingWithdraw ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    "Confirm Cash Out"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD PAYMENT METHOD MODAL --- */}
      {isAddMethodModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddMethodModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white">
                Add Payment Account
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Link a mobile wallet or bank account for instant payouts.
              </p>
            </div>

            <form
              onSubmit={handleAddMethodSubmit}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-mono text-slate-400 block mb-1">
                  Account Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["bKash", "Nagad", "Rocket", "Bank Transfer"] as const).map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setNewMethodType(type)}
                        className={`py-2 px-1 rounded-xl border font-bold text-[11px] transition-all ${
                          newMethodType === type
                            ? "bg-teal-600 text-white border-teal-500"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {type}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="font-mono text-slate-400 block mb-1">
                  Account Name / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahim Electronics"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              {newMethodType === "Bank Transfer" && (
                <div>
                  <label className="font-mono text-slate-400 block mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dutch-Bangla Bank PLC"
                    value={newBankName}
                    onChange={(e) => setNewBankName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="font-mono text-slate-400 block mb-1">
                  Account Number / Mobile No.
                </label>
                <input
                  type="text"
                  placeholder={
                    newMethodType === "Bank Transfer"
                      ? "e.g. 210.120.4920"
                      : "e.g. 01712345678"
                  }
                  value={newAccountNumber}
                  onChange={(e) => setNewAccountNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddMethodModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
