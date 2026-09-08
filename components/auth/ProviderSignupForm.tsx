// "use client";

// import React, { useState } from "react";
// import {
//   Briefcase,
//   Mail,
//   Phone,
//   MapPin,
//   Lock,
//   UploadCloud,
//   ShieldCheck,
//   ArrowRight,
//   DollarSign,
//   CheckCircle2,
// } from "lucide-react";
// import { ProviderFormData } from "../../types/auth";

// export default function ProviderSignupForm() {
//   const [uploadedFile, setUploadedFile] = useState<string | null>(null);
//   const [formData, setFormData] = useState<ProviderFormData>({
//     fullName: "",
//     businessName: "",
//     email: "",
//     phone: "",
//     expertiseCategory: "Appliance & Gadget Repair",
//     serviceArea: "Dhanmondi & Mirpur Zone",
//     baseCharge: "1000",
//     password: "",
//     agreeTerms: false,
//   });

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setUploadedFile(e.target.files[0].name);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.agreeTerms) {
//       alert("Please accept the Partner Agreement to proceed.");
//       return;
//     }
//     alert(
//       `Technician verification submitted for ${formData.fullName} (${formData.expertiseCategory}). Account pending background check.`,
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 text-xs">
//       {/* Full Name & Business Name */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div>
//           <label className="block text-slate-300 font-medium mb-1.5">
//             Full Name
//           </label>
//           <input
//             type="text"
//             required
//             placeholder="e.g. Rahim Uddin"
//             value={formData.fullName}
//             onChange={(e) =>
//               setFormData({ ...formData, fullName: e.target.value })
//             }
//             className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
//           />
//         </div>

//         <div>
//           <label className="block text-slate-300 font-medium mb-1.5">
//             Business / Trade Name
//           </label>
//           <input
//             type="text"
//             required
//             placeholder="e.g. Rahim Electronics"
//             value={formData.businessName}
//             onChange={(e) =>
//               setFormData({ ...formData, businessName: e.target.value })
//             }
//             className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
//           />
//         </div>
//       </div>

//       {/* Expertise & Base Fee */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div>
//           <label className="block text-slate-300 font-medium mb-1.5">
//             Primary Expertise
//           </label>
//           <select
//             value={formData.expertiseCategory}
//             onChange={(e) =>
//               setFormData({ ...formData, expertiseCategory: e.target.value })
//             }
//             className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 outline-none transition-all"
//           >
//             <option value="Appliance & Gadget Repair">
//               Appliance & Gadget Repair
//             </option>
//             <option value="Plumbing Services">Plumbing Services</option>
//             <option value="Electrical Systems">Electrical Systems</option>
//             <option value="Deep Cleaning & Pest Control">
//               Deep Cleaning & Pest Control
//             </option>
//             <option value="Home Care & Carpentry">Home Care & Carpentry</option>
//             <option value="Relocation & Shifting">Relocation & Shifting</option>
//             <option value="On-Demand Car Care">On-Demand Car Care</option>
//             <option value="At-Home Personal Care">At-Home Personal Care</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-slate-300 font-medium mb-1.5">
//             Base Visit Charge (৳)
//           </label>
//           <div className="relative">
//             <input
//               type="number"
//               required
//               placeholder="1000"
//               value={formData.baseCharge}
//               onChange={(e) =>
//                 setFormData({ ...formData, baseCharge: e.target.value })
//               }
//               className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
//             />
//             <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
//           </div>
//         </div>
//       </div>

//       {/* Email & Phone */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div>
//           <label className="block text-slate-300 font-medium mb-1.5">
//             Work Email
//           </label>
//           <input
//             type="email"
//             required
//             placeholder="provider@service.com"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
//           />
//         </div>

//         <div>
//           <label className="block text-slate-300 font-medium mb-1.5">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             required
//             placeholder="+880 1800-000000"
//             value={formData.phone}
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//             className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
//           />
//         </div>
//       </div>

//       {/* Verification Document Upload Dropzone */}
//       <div>
//         <label className="block text-slate-300 font-medium mb-1.5">
//           National ID / Trade License Verification
//         </label>
//         <label className="flex flex-col items-center justify-center p-4 bg-slate-900/60 border-2 border-dashed border-slate-800 hover:border-indigo-500/60 rounded-xl cursor-pointer transition-all group">
//           <input
//             type="file"
//             onChange={handleFileUpload}
//             accept="image/*,.pdf"
//             className="hidden"
//           />
//           {uploadedFile ? (
//             <div className="flex items-center gap-2 text-emerald-400 font-semibold">
//               <CheckCircle2 className="w-4 h-4" /> {uploadedFile}
//             </div>
//           ) : (
//             <div className="text-center space-y-1">
//               <UploadCloud className="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors mx-auto" />
//               <div className="text-slate-300 font-medium">
//                 Click to upload NID or Trade Document
//               </div>
//               <div className="text-[10px] text-slate-500">
//                 Supports PNG, JPG, or PDF (Max 5MB)
//               </div>
//             </div>
//           )}
//         </label>
//       </div>

//       {/* Password */}
//       <div>
//         <label className="block text-slate-300 font-medium mb-1.5">
//           Account Password
//         </label>
//         <input
//           type="password"
//           required
//           placeholder="At least 8 characters"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//           className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
//         />
//       </div>

//       {/* Terms Checkbox */}
//       <div className="flex items-start gap-2 pt-1">
//         <input
//           type="checkbox"
//           id="termsProvider"
//           checked={formData.agreeTerms}
//           onChange={(e) =>
//             setFormData({ ...formData, agreeTerms: e.target.checked })
//           }
//           className="mt-0.5 rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-indigo-500/20"
//         />
//         <label
//           htmlFor="termsProvider"
//           className="text-slate-400 text-[11px] leading-relaxed"
//         >
//           I confirm that all credentials submitted are authentic and agree to
//           the{" "}
//           <a href="#" className="text-indigo-400 underline">
//             Provider Partner Terms
//           </a>
//           .
//         </label>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 text-xs mt-2"
//       >
//         Submit Provider Application <ArrowRight className="w-4 h-4" />
//       </button>
//     </form>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  ArrowRight,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import { ProviderFormData } from "../../types/auth";

export default function ProviderSignupForm() {
  const router = useRouter();
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProviderFormData>({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    expertiseCategory: "Appliance & Gadget Repair",
    serviceArea: "Dhanmondi & Mirpur Zone",
    baseCharge: "1000",
    password: "",
    agreeTerms: false,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileObject(file);
      setUploadedFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.agreeTerms) {
      alert("Please accept the Partner Agreement to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append("role", "provider");
      payload.append("fullName", formData.fullName);
      payload.append("businessName", formData.businessName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("expertiseCategory", formData.expertiseCategory);
      payload.append("baseCharge", formData.baseCharge);
      payload.append("password", formData.password);

      if (fileObject) {
        payload.append("document", fileObject);
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application.");
      }

      alert(data.message);
      router.push("/login"); // Redirect to login
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
          {errorMessage}
        </div>
      )}

      {/* Full Name & Business Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rahim Uddin"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Business / Trade Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rahim Electronics"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Expertise & Base Fee */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Primary Expertise
          </label>
          <select
            value={formData.expertiseCategory}
            onChange={(e) =>
              setFormData({ ...formData, expertiseCategory: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 outline-none transition-all"
          >
            <option value="Appliance & Gadget Repair">
              Appliance & Gadget Repair
            </option>
            <option value="Plumbing Services">Plumbing Services</option>
            <option value="Electrical Systems">Electrical Systems</option>
            <option value="Deep Cleaning & Pest Control">
              Deep Cleaning & Pest Control
            </option>
            <option value="Home Care & Carpentry">Home Care & Carpentry</option>
            <option value="Relocation & Shifting">Relocation & Shifting</option>
            <option value="On-Demand Car Care">On-Demand Car Care</option>
            <option value="At-Home Personal Care">At-Home Personal Care</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Base Visit Charge (৳)
          </label>
          <div className="relative">
            <input
              type="number"
              required
              placeholder="1000"
              value={formData.baseCharge}
              onChange={(e) =>
                setFormData({ ...formData, baseCharge: e.target.value })
              }
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
            <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Work Email
          </label>
          <input
            type="email"
            required
            placeholder="provider@service.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="+880 1800-000000"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Verification Document Upload Dropzone */}
      <div>
        <label className="block text-slate-300 font-medium mb-1.5">
          National ID / Trade License Verification
        </label>
        <label className="flex flex-col items-center justify-center p-4 bg-slate-900/60 border-2 border-dashed border-slate-800 hover:border-indigo-500/60 rounded-xl cursor-pointer transition-all group">
          <input
            type="file"
            onChange={handleFileUpload}
            accept="image/*,.pdf"
            className="hidden"
          />
          {uploadedFileName ? (
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> {uploadedFileName}
            </div>
          ) : (
            <div className="text-center space-y-1">
              <UploadCloud className="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors mx-auto" />
              <div className="text-slate-300 font-medium">
                Click to upload NID or Trade Document
              </div>
              <div className="text-[10px] text-slate-500">
                Supports PNG, JPG, or PDF (Max 5MB)
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Password */}
      <div>
        <label className="block text-slate-300 font-medium mb-1.5">
          Account Password
        </label>
        <input
          type="password"
          required
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition-all"
        />
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start gap-2 pt-1">
        <input
          type="checkbox"
          id="termsProvider"
          checked={formData.agreeTerms}
          onChange={(e) =>
            setFormData({ ...formData, agreeTerms: e.target.checked })
          }
          className="mt-0.5 rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
        />
        <label
          htmlFor="termsProvider"
          className="text-slate-400 text-[11px] leading-relaxed cursor-pointer"
        >
          I confirm that all credentials submitted are authentic and agree to
          the{" "}
          <a href="#" className="text-indigo-400 underline">
            Provider Partner Terms
          </a>
          .
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 text-xs mt-2 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading
          ? "Submitting Application..."
          : "Submit Provider Application"}{" "}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
