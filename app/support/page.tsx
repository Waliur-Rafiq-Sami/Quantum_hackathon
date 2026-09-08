"use client";

import React, { useState, useMemo } from "react";
import { FAQ_DATA, SUPPORT_CATEGORIES } from "@/data/mockSupport";
import { FAQItem } from "@/types/support";
import { TicketModal } from "@/components/support/TicketModal";
import {
  HelpCircle,
  Search,
  MessageSquare,
  PhoneCall,
  Mail,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Calendar,
  CreditCard,
  User,
  Check,
  LifeBuoy,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("faq-1");

  // Modal & Toast states
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Calendar":
        return <Calendar className="w-6 h-6 text-blue-400" />;
      case "CreditCard":
        return <CreditCard className="w-6 h-6 text-emerald-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-purple-400" />;
      case "User":
        return <User className="w-6 h-6 text-amber-400" />;
      default:
        return <HelpCircle className="w-6 h-6 text-blue-400" />;
    }
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative">
        {/* Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-medium px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs border border-emerald-400/30 animate-bounce">
            <Check className="w-4 h-4" />
            {notification}
          </div>
        )}

        <div className="max-w-7xl mx-auto space-y-10">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
              <LifeBuoy className="w-3.5 h-3.5" /> 24/7 Customer Help Desk
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              How can we help you today?
            </h1>

            {/* Centralized Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search help topics, FAQs, billing queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-xl"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
            </div>
          </div>

          {/* Quick Knowledge Base Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUPPORT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.title)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedCategory === cat.title
                    ? "bg-slate-900 border-blue-500/60 ring-2 ring-blue-500/20"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
                }`}
              >
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 w-fit">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{cat.articleCount} Articles</span>
                  <span className="text-blue-400 hover:underline">
                    Explore →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* FAQ Accordion Section */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  Frequently Asked Questions
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Quick answers to common questions about our platform.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedCategory === "All"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                {SUPPORT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.title)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedCategory === cat.title
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat.title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No matching FAQ items found for your search query.
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="border border-slate-800/80 rounded-2xl bg-slate-950/60 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaqId(isExpanded ? null : faq.id)
                        }
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                      >
                        <span className="text-sm font-bold text-slate-200">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="p-4 sm:p-5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-900 bg-slate-950/90">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Still Need Help / Direct Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-3 flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl w-fit mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">
                  Create a Ticket
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Submit a detailed request for technical or billing issues.
                </p>
              </div>
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg text-center"
              >
                Open Ticket
              </button>
            </div>

            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-3 flex flex-col justify-between">
              <div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl w-fit mb-3">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">
                  Emergency Hotline
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Direct phone line for active service emergencies.
                </p>
              </div>
              <a
                href="tel:+8801700000000"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs transition-all text-center block"
              >
                Call +880 1700-000000
              </a>
            </div>

            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-3 flex flex-col justify-between">
              <div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl w-fit mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">
                  Email Us
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Send us an email and we'll reply within 24 hours.
                </p>
              </div>
              <a
                href="mailto:support@serviceapp.com"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs transition-all text-center block"
              >
                support@serviceapp.com
              </a>
            </div>
          </div>
        </div>

        {/* Ticket Modal */}
        <TicketModal
          isOpen={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
          onSubmitSuccess={showToast}
        />
      </div>
    </>
  );
}
