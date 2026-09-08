"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { CustomerFormData } from "../../types/auth";

export default function CustomerSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "Dhanmondi, Dhaka",
    password: "",
    agreeTerms: false,
  });

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "bg-slate-800" };
    if (pass.length < 6)
      return { score: 33, label: "Weak", color: "bg-red-500" };
    if (pass.length < 10)
      return { score: 66, label: "Medium", color: "bg-amber-500" };
    return { score: 100, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("Please accept the Terms of Service to create your account.");
      return;
    }
    alert(
      `Customer account successfully initialized for ${formData.fullName}! Redirecting to Dashboard...`,
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {/* Full Name */}
      <div>
        <label className="block text-slate-300 font-medium mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <input
            type="text"
            required
            placeholder="e.g. Tanvir Hossain"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
          <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="tanvir@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              required
              placeholder="+880 1700-000000"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Preferred Location */}
      <div>
        <label className="block text-slate-300 font-medium mb-1.5">
          Primary Service Area
        </label>
        <div className="relative">
          <input
            type="text"
            required
            placeholder="e.g. Dhanmondi, Gulshan, Uttara"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
          <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-slate-300 font-medium mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-10 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
          <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Password Strength Gauge */}
        {formData.password && (
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{ width: `${strength.score}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Security Level</span>
              <span className="font-bold">{strength.label}</span>
            </div>
          </div>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start gap-2 pt-1">
        <input
          type="checkbox"
          id="termsCustomer"
          checked={formData.agreeTerms}
          onChange={(e) =>
            setFormData({ ...formData, agreeTerms: e.target.checked })
          }
          className="mt-0.5 rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-blue-500/20"
        />
        <label
          htmlFor="termsCustomer"
          className="text-slate-400 text-[11px] leading-relaxed"
        >
          I agree to the{" "}
          <a href="#" className="text-blue-400 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-400 underline">
            Privacy Policy
          </a>
          .
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 text-xs mt-2"
      >
        Create Customer Account <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
