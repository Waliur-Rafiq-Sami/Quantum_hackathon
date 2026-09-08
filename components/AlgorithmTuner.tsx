// "use client";

// import React from "react";
// import { Sliders, Cpu } from "lucide-react";
// import { AlgorithmWeights, Provider } from "../types/service";

// interface AlgorithmTunerProps {
//   weights: AlgorithmWeights;
//   setWeights: React.Dispatch<React.SetStateAction<AlgorithmWeights>>;
//   providers: Provider[];
// }

// export default function AlgorithmTuner({
//   weights,
//   setWeights,
//   providers,
// }: AlgorithmTunerProps) {
//   const handleSliderChange = (key: keyof AlgorithmWeights, val: number) => {
//     setWeights((prev) => ({ ...prev, [key]: val }));
//   };

//   return (
//     <section id="algorithm-tuner" className="py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-12 gap-8 items-center">
//           {/* Left Controls */}
//           <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
//             <div className="flex items-center gap-2 mb-4">
//               <Cpu className="w-5 h-5 text-blue-400" />
//               <h3 className="font-bold text-white text-base">
//                 Algorithm Parameter Tuning
//               </h3>
//             </div>
//             <p className="text-xs text-slate-400 mb-6">
//               Adjust algorithm weightings in real-time to observe how the
//               ranking and match scores shift across candidates.
//             </p>

//             <div className="space-y-4 text-xs">
//               <div>
//                 <div className="flex justify-between text-slate-300 font-medium mb-1">
//                   <span>Proximity / Distance Weight</span>
//                   <span className="font-mono text-blue-400">
//                     {weights.distance}%
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={weights.distance}
//                   onChange={(e) =>
//                     handleSliderChange("distance", Number(e.target.value))
//                   }
//                   className="w-full accent-blue-500"
//                 />
//               </div>

//               <div>
//                 <div className="flex justify-between text-slate-300 font-medium mb-1">
//                   <span>Rating & Feedback Weight</span>
//                   <span className="font-mono text-amber-400">
//                     {weights.rating}%
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={weights.rating}
//                   onChange={(e) =>
//                     handleSliderChange("rating", Number(e.target.value))
//                   }
//                   className="w-full accent-amber-500"
//                 />
//               </div>

//               <div>
//                 <div className="flex justify-between text-slate-300 font-medium mb-1">
//                   <span>Price Competitiveness Weight</span>
//                   <span className="font-mono text-emerald-400">
//                     {weights.price}%
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={weights.price}
//                   onChange={(e) =>
//                     handleSliderChange("price", Number(e.target.value))
//                   }
//                   className="w-full accent-emerald-500"
//                 />
//               </div>

//               <div>
//                 <div className="flex justify-between text-slate-300 font-medium mb-1">
//                   <span>Earliest Availability Window</span>
//                   <span className="font-mono text-indigo-400">
//                     {weights.speed}%
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={weights.speed}
//                   onChange={(e) =>
//                     handleSliderChange("speed", Number(e.target.value))
//                   }
//                   className="w-full accent-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right Dynamic Rankings Table */}
//           <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-2xl">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-xs font-mono font-bold text-slate-400 uppercase">
//                 Live Provider Reranking
//               </span>
//               <span className="text-xs text-blue-400 font-mono">
//                 Formula: ∑ (Factor × Weight)
//               </span>
//             </div>

//             <div className="space-y-3">
//               {providers.map((p, idx) => (
//                 <div
//                   key={p.id}
//                   className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px]">
//                       #{idx + 1}
//                     </span>
//                     <div>
//                       <div className="font-bold text-slate-100">{p.name}</div>
//                       <div className="text-[10px] text-slate-400">
//                         {p.distanceKm} km • ⭐ {p.rating} • ৳{p.baseCharge}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-right">
//                     <span className="text-sm font-bold text-blue-400 font-mono">
//                       {p.matchScore}%
//                     </span>
//                     <span className="block text-[10px] text-slate-500">
//                       Calculated Match
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
