// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
// import SocialAuthButtons from "./SocialAuthButtons";
// import { AccountType } from "../../types/auth";

// interface LoginFormProps {
//   mode: AccountType;
// }

// export default function LoginForm({ mode }: LoginFormProps) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Simulate API Auth Request
//     setTimeout(() => {
//       setIsLoading(false);
//       alert(
//         `Successfully logged in as ${mode === "customer" ? "Customer" : "Service Provider"} (${email})!`,
//       );
//     }, 1000);
//   };

//   return (
//     <div className="space-y-5 text-xs">
//       {/* Social Logins */}
//       {/* <SocialAuthButtons /> */}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Email Address Input */}
//         <div>
//           <label className="block text-slate-300 font-medium mb-1.5">
//             {mode === "customer"
//               ? "Email or Phone Number"
//               : "Work / Business Email"}
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               required
//               placeholder={
//                 mode === "customer"
//                   ? "tanvir@example.com or +8801700..."
//                   : "provider@service.com"
//               }
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
//             />
//             <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
//           </div>
//         </div>

//         {/* Password Input */}
//         <div>
//           <div className="flex items-center justify-between mb-1.5">
//             <label className="block text-slate-300 font-medium">Password</label>
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 alert(
//                   "Password reset link sent to your registered email address.",
//                 );
//               }}
//               className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline transition-colors"
//             >
//               Forgot password?
//             </a>
//           </div>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-10 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
//             />
//             <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
//             >
//               {showPassword ? (
//                 <EyeOff className="w-4 h-4" />
//               ) : (
//                 <Eye className="w-4 h-4" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Remember Me Toggle */}
//         <div className="flex items-center justify-between pt-1">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={rememberMe}
//               onChange={(e) => setRememberMe(e.target.checked)}
//               className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-blue-500/20"
//             />
//             <span className="text-slate-400 text-[11px]">
//               Remember this device for 30 days
//             </span>
//           </label>

//           <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
//             <ShieldCheck className="w-3.5 h-3.5" /> 2FA Protected
//           </span>
//         </div>

//         {/* Submit Action Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs mt-3 ${
//             mode === "customer"
//               ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 shadow-blue-600/25"
//               : "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/25"
//           } ${isLoading ? "opacity-75 cursor-wait" : ""}`}
//         >
//           {isLoading ? (
//             <span className="flex items-center gap-2">
//               <svg
//                 className="animate-spin h-4 w-4 text-white"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   fill="none"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 />
//               </svg>
//               Authenticating...
//             </span>
//           ) : (
//             <>
//               Sign In to{" "}
//               {mode === "customer" ? "Customer Portal" : "Provider Console"}
//               <ArrowRight className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { AccountType } from "../../types/auth";

interface LoginFormProps {
  mode: AccountType;
}

export default function LoginForm({ mode }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: mode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed.");
      }

      // --- SAVE TO LOCALSTORAGE ---
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userData", JSON.stringify(data.user));

      // Optional: Save remember me status
      if (formData.rememberMe) {
        localStorage.setItem("savedEmail", formData.email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // Redirect user to appropriate dashboard
      if (data.user.role === "customer") {
        router.push("/dashboard");
      } else {
        router.push("/provider");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium animate-fadeIn">
          {errorMessage}
        </div>
      )}

      {/* Email Address */}
      <div>
        <label className="block text-slate-300 font-medium mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            required
            placeholder={
              mode === "customer"
                ? "tanvir@example.com"
                : "provider@service.com"
            }
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
          <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-slate-300 font-medium">Password</label>
          <a
            href="#"
            className="text-[11px] text-blue-400 hover:underline font-medium"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••••••"
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
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 text-slate-400 text-[11px] cursor-pointer">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) =>
              setFormData({ ...formData, rememberMe: e.target.checked })
            }
            className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-blue-500/20"
          />
          Remember my session on this device
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 ${
          mode === "customer"
            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 shadow-blue-600/25"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/25"
        } text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs mt-2 ${
          isLoading ? "opacity-70 cursor-wait" : ""
        }`}
      >
        {isLoading ? (
          "Authenticating..."
        ) : (
          <>
            Sign In to{" "}
            {mode === "customer" ? "Customer Portal" : "Provider Dashboard"}{" "}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure 256-Bit
        Encrypted Sign-In
      </div>
    </form>
  );
}
