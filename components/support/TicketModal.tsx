"use client";

import React, { useState } from "react";
import { SupportTicketForm } from "@/types/support";
import { X, Send, AlertTriangle, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export const TicketModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<SupportTicketForm>({
    name: "",
    email: "",
    category: "Bookings & Schedules",
    priority: "Medium",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Map "Emergency" priority to "High" to align with database schema constraints
    const mappedPriority =
      formData.priority === "Emergency" ? "High" : formData.priority;
    const generatedTicketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload = {
      ticketId: generatedTicketId,
      title: formData.subject,
      category: formData.category,
      userType: "Customer",
      userName: formData.name,
      userEmail: formData.email,
      userPhone: "N/A",
      priority: mappedPriority,
      status: "Open",
      assignedAdmin: "Unassigned",
      description: formData.message,
    };

    try {
      console.log("Submitting payload:", payload);
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit support ticket.");
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        category: "Bookings & Schedules",
        priority: "Medium",
        subject: "",
        message: "",
      });

      onSubmitSuccess(
        `Support Ticket submitted successfully! Ticket ID: ${result.data?.ticketId || generatedTicketId}`,
      );
      onClose();
    } catch (err: any) {
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-white">
              Create Support Ticket
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Our support response team typically responds within 30 minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Error Notification */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-xs text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-mono mb-1">
                Your Name
              </label>
              <input
                required
                type="text"
                disabled={isSubmitting}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-mono mb-1">
                Email Address
              </label>
              <input
                required
                type="email"
                disabled={isSubmitting}
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-mono mb-1">
                Category
              </label>
              <select
                disabled={isSubmitting}
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300 focus:outline-none focus:border-blue-500 font-mono disabled:opacity-50"
              >
                <option value="Bookings & Schedules">
                  Bookings & Schedules
                </option>
                <option value="Payments & Invoices">Payments & Invoices</option>
                <option value="Safety & Security">Safety & Security</option>
                <option value="Technical Issue">Technical Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1">
                Priority Level
              </label>
              <select
                disabled={isSubmitting}
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as any })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300 focus:outline-none focus:border-blue-500 font-mono disabled:opacity-50"
              >
                <option value="Low">Low - General Query</option>
                <option value="Medium">Medium - Normal Issue</option>
                <option value="High">High - Important</option>
                <option value="Emergency">Emergency - Immediate Help</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">
              Subject
            </label>
            <input
              required
              type="text"
              disabled={isSubmitting}
              placeholder="Brief description of your issue"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">
              Detailed Message
            </label>
            <textarea
              required
              rows={4}
              disabled={isSubmitting}
              placeholder="Provide all relevant details, request IDs, or context..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Submit Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
