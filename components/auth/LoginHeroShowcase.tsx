// "use client";

// import React from "react";
// import {
//   Sparkles,
//   ShieldCheck,
//   Clock,
//   Activity,
//   ArrowUpRight,
//   CheckCircle2,
// } from "lucide-react";
// import { AccountType } from "../../types/auth";

// interface LoginHeroShowcaseProps {
//   mode: AccountType;
// }

// export default function LoginHeroShowcase({ mode }: LoginHeroShowcaseProps) {
//   return (
//     <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
//       {/* Background Glow Effects */}
//       <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
//       <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

//       {/* Brand Header */}
//       <div className="relative z-10 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
//             <Sparkles className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-lg font-black tracking-tight text-white">
//             HomeAssist
//           </span>
//         </div>

//         <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-slate-400 flex items-center gap-1.5">
//           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>{" "}
//           Systems Operational
//         </span>
//       </div>

//       {/* Center Dynamic Card */}
//       <div className="relative z-10 my-8 space-y-6">
//         {mode === "customer" ? (
//           <>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
//               <Clock className="w-3.5 h-3.5 text-blue-400" /> Welcome Back,
//               Valued Client
//             </div>

//             <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
//               Manage Your Service <br />
//               <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
//                 Requests & Trackers
//               </span>
//             </h2>

//             {/* Interactive Live Status Widget Mock */}
//             <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 backdrop-blur-md">
//               <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
//                 <div className="flex items-center gap-2">
//                   <Activity className="w-4 h-4 text-blue-400" />
//                   <span className="text-xs font-semibold text-slate-200">
//                     Active Service Tracker
//                   </span>
//                 </div>
//                 <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
//                   Technician En Route
//                 </span>
//               </div>
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-slate-400">Order #AS-8942</span>
//                 <span className="font-bold text-slate-200">
//                   AC Deep Maintenance
//                 </span>
//               </div>
//               <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
//                 <div className="bg-blue-500 h-full w-3/4 rounded-full"></div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold">
//               <Activity className="w-3.5 h-3.5 text-indigo-400" /> Service
//               Partner Console
//             </div>

//             <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
//               Access Your Daily <br />
//               <span className="bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
//                 Jobs & Payout Console
//               </span>
//             </h2>

//             {/* Provider Earnings Widget Mock */}
//             <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 backdrop-blur-md">
//               <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
//                 <span className="text-xs font-semibold text-slate-200">
//                   This Week's Earnings
//                 </span>
//                 <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
//                   +18.4% <ArrowUpRight className="w-3.5 h-3.5" />
//                 </span>
//               </div>
//               <div className="flex items-baseline justify-between">
//                 <span className="text-2xl font-black text-white">৳ 24,500</span>
//                 <span className="text-[10px] text-slate-400">
//                   14 Jobs Completed
//                 </span>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Bottom Trust Indicators */}
//       <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
//         <div className="flex items-center gap-2">
//           <CheckCircle2 className="w-4 h-4 text-blue-400" />
//           <span>Biometric & Passkey Enabled</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <ShieldCheck className="w-4 h-4 text-emerald-400" />
//           <span>SOC-2 Type II Certified</span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import {
  ShieldCheck,
  Star,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Award,
} from "lucide-react";
import { AccountType } from "../../types/auth";

interface LoginHeroShowcaseProps {
  mode: AccountType;
}

export default function LoginHeroShowcase({ mode }: LoginHeroShowcaseProps) {
  if (mode === "customer") {
    return (
      <div className="h-full bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl">
        {/* Background Decorative Lighting */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" /> Instant On-Demand Services
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
            Book verified home experts in seconds.
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-8">
            Access thousands of certified plumbers, electricians, appliance
            repairers, and cleaning professionals near your home.
          </p>

          {/* Interactive Stat Cards */}
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    30-Minute Arrival Time
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Emergency & scheduled visits
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400">
                Fast Response
              </span>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    4.9/5 Average Rating
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Over 50,000+ completed jobs
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-300">
                Verified Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Customer Guarantee Quote */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Every booking includes up to{" "}
            <span className="text-white font-bold">
              ৳10,000 Service Guarantee
            </span>{" "}
            against damages.
          </p>
        </div>
      </div>
    );
  }

  // Provider Mode View
  return (
    <div className="h-full bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl">
      {/* Background Decorative Lighting */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div>
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
          <TrendingUp className="w-3.5 h-3.5" /> Partner Growth Network
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
          Grow your business with verified leads.
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-8">
          Manage bookings, track live customer requests, and get payouts
          directly to your bank account with zero hassle.
        </p>

        {/* Provider Performance Metrics */}
        <div className="space-y-3">
          <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">
                  Direct Customer Requests
                </div>
                <div className="text-[10px] text-slate-500">
                  No middleman markups
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-400">Real-time</span>
          </div>

          <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">
                  Weekly Automated Payouts
                </div>
                <div className="text-[10px] text-slate-500">
                  Direct transfer to bKash or Bank
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400">
              Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Provider Trust Assurance */}
      <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <p className="text-[11px] text-slate-400 leading-normal">
          Join over{" "}
          <span className="text-white font-bold">
            2,500+ verified partner technicians
          </span>{" "}
          across Dhaka, Chittagong, and Rajshahi.
        </p>
      </div>
    </div>
  );
}
