import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Loader2, Copy, Check, ChevronRight, Paintbrush, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { DesignAdviceResponse } from '../types';

interface AIConsultantProps {
  onApplyStyle: (styleName: string, serviceType: string) => void;
  theme?: 'light' | 'dark';
}

const ROOM_OPTIONS = ["Living Room", "Bedroom", "Kitchen", "Office"];

const MOOD_OPTIONS = [
  { name: "Modern Luxury", desc: "Sleek obsidian panels with warm classic gold coving" },
  { name: "Minimalist Gold", desc: "Raw slate graphite with pure gold LED channels" },
  { name: "Imperial Gold", desc: "Deep polished black marble carrying glowing amber veins" },
  { name: "Creative Studio", desc: "Matte carbon finishes and solid brushed brass accents" }
];

export default function AIConsultant({ onApplyStyle, theme = 'dark' }: AIConsultantProps) {
  const [roomType, setRoomType] = useState<string>("Living Room");
  const [primaryMood, setPrimaryMood] = useState<string>("Modern Luxury");
  const [approxBudget, setApproxBudget] = useState<number>(12000);
  const [roomDescription, setRoomDescription] = useState<string>(
    "A cozy space with 9-foot ceilings. I would love comfortable custom-built features and excellent warm light levels."
  );
  
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<DesignAdviceResponse | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomDescription.trim()) {
      alert("Please describe your space to help us tailor our recommendations.");
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType,
          primaryMood,
          roomDescription,
          approxBudget
        })
      });

      if (!res.ok) {
        throw new Error("Failed to secure consult blueprint");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      alert("We encountered an error generating your custom blueprint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const renderers = {
    h1: ({ children }: any) => <h3 className="text-base sm:text-lg font-bold text-gold-500 uppercase font-sans mt-5 mb-2 border-b border-zinc-800 pb-1.5">{children}</h3>,
    h2: ({ children }: any) => <h4 className="text-sm sm:text-base font-bold text-gold-500 font-sans mt-4 mb-2">{children}</h4>,
    h3: ({ children }: any) => <h5 className="text-xs sm:text-sm font-bold text-zinc-200 dark:text-zinc-100 font-sans mt-3 mb-1">{children}</h5>,
    p: ({ children }: any) => <p className={`text-xs sm:text-sm leading-relaxed mb-3.5 ${theme === 'light' ? 'text-zinc-700' : 'text-zinc-300'}`}>{children}</p>,
    ul: ({ children }: any) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-xs sm:text-sm">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-xs sm:text-sm">{children}</ol>,
    li: ({ children }: any) => <li className={`leading-relaxed ${theme === 'light' ? 'text-zinc-700' : 'text-zinc-300'}`}>{children}</li>,
    strong: ({ children }: any) => <strong className="font-bold text-gold-600 dark:text-gold-400">{children}</strong>,
  };

  return (
    <section id="ai-consultant" className={`py-24 border-t relative transition-colors duration-300 ${
      theme === 'light' ? 'bg-zinc-100/30 border-zinc-200/80' : 'bg-black border-zinc-900'
    }`}>
      {/* Background gold circular glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-3">
            <Sparkles className="h-4 w-4 text-gold-500" />
            <span className="text-gold-600 dark:text-gold-500 font-mono text-[10px] uppercase tracking-wider font-bold">GEMINI 2.5 DESIGN CORE</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-sans font-bold tracking-tight ${
            theme === 'light' ? 'text-zinc-950' : 'text-white'
          }`}>
            Taj AI Interior Consultant
          </h2>
          <p className={`mt-4 text-xs sm:text-sm font-sans ${
            theme === 'light' ? 'text-zinc-650' : 'text-zinc-400'
          }`}>
            Describe your dimensional goals, select architectural textures, and generate an instantaneous tactile blueprint complete with color values and shopping budgets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-sans">
          
          {/* Form input details */}
          <div className={`lg:col-span-5 rounded-3xl p-6 md:p-8 border ${
            theme === 'light' 
              ? 'bg-white border-zinc-200/80 shadow-md shadow-zinc-200/20' 
              : 'bg-zinc-900/40 border-zinc-900'
          }`}>
            <form onSubmit={handleConsult} className="space-y-6 text-left">
              
              {/* Room category Choice */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-gold-600 dark:text-gold-400 uppercase mb-3 font-semibold">1. Select Room Focus</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {ROOM_OPTIONS.map((room) => (
                    <button
                      key={room}
                      type="button"
                      onClick={() => setRoomType(room)}
                      className={`py-2.5 px-4 rounded-xl border text-xs font-mono transition-all cursor-pointer text-center ${
                        roomType === room
                          ? 'bg-gold-500 text-black border-gold-500 font-bold shadow-md shadow-gold-500/10'
                          : theme === 'light'
                            ? 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-800'
                            : 'bg-zinc-950/40 border-zinc-850 hover:border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aesthetic Vibe slider choice */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-gold-600 dark:text-gold-400 uppercase mb-3 font-semibold">2. Architectural Mood Selection</label>
                <div className="space-y-2">
                  {MOOD_OPTIONS.map((mood) => (
                    <button
                      key={mood.name}
                      type="button"
                      onClick={() => setPrimaryMood(mood.name)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                        primaryMood === mood.name
                          ? 'bg-gold-500/10 border-gold-500 text-gold-500 font-semibold'
                          : theme === 'light'
                            ? 'bg-zinc-50 border-zinc-250 hover:bg-zinc-100 text-zinc-800'
                            : 'bg-zinc-950/20 border-zinc-850/80 hover:border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold leading-none mb-1">{mood.name}</div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{mood.desc}</div>
                      </div>
                      {primaryMood === mood.name && (
                        <div className="h-1.5 w-1.5 bg-gold-500 rounded-full flex-shrink-0 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono tracking-widest text-gold-600 dark:text-gold-400 uppercase font-semibold">3. Estimator Target Budget</label>
                  <span className={`text-sm font-mono font-bold ${theme === 'light' ? 'text-zinc-900 font-bold' : 'text-white'}`}>${approxBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="40000"
                  step="500"
                  value={approxBudget}
                  onChange={(e) => setApproxBudget(Number(e.target.value))}
                  className="w-full accent-gold-500 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Free Text Description area */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-gold-600 dark:text-gold-400 uppercase mb-2 font-semibold">4. Describe Current Room Details</label>
                <textarea
                  rows={4}
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  placeholder="Tell us about the current floors, layout, windows, ceiling lighting goals, or any specific furniture features..."
                  className={`w-full p-4.5 rounded-xl border text-xs leading-relaxed focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/25 ${
                    theme === 'light' 
                      ? 'bg-zinc-50 border-zinc-250 text-zinc-800 placeholder-zinc-400' 
                      : 'bg-zinc-955 border-zinc-800 text-zinc-100 placeholder-zinc-650'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-500 hover:bg-gold-400 text-black font-mono text-xs uppercase tracking-widest font-bold py-4 rounded-xl shadow-lg hover:shadow-gold-500/10 transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    Sculpting custom blueprint...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Draft Design Blueprint
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Consultation response details */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              
              {/* Initial empty default visual card state */}
              {!loading && !response && (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`border rounded-3xl p-10 text-center min-h-[450px] flex flex-col justify-center items-center relative ${
                    theme === 'light' ? 'bg-white border-zinc-200/80 shadow-xs' : 'bg-zinc-900/10 border-zinc-900'
                  }`}
                >
                  <div className="h-16 w-16 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 mb-6 font-semibold">
                    <Paintbrush className="h-7 w-7 stroke-[1.25]" />
                  </div>
                  <h3 className={`text-lg font-sans font-bold tracking-tight mb-2 ${
                    theme === 'light' ? 'text-zinc-900' : 'text-zinc-100'
                  }`}>No Current Consult Blueprint Enrolled</h3>
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
                    Choose from our luxury palettes, input your room measurements and constraints, and hit "Draft Design Blueprint" to let Taj's design core compute custom recommendations instantly.
                  </p>
                </motion.div>
              )}

              {/* Loader breathing view state */}
              {loading && (
                <motion.div
                  key="loader-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`border rounded-3xl p-10 text-center min-h-[450px] flex flex-col justify-center items-center space-y-6 ${
                    theme === 'light' ? 'bg-white border-zinc-200/80 shadow-xs' : 'bg-zinc-900/10 border-zinc-900'
                  }`}
                >
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border border-gold-500/20 flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-gold-500" />
                    </div>
                    <div className="absolute inset-0 bg-gold-500/10 rounded-full animate-ping pointer-events-none scale-102"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`text-base font-bold font-sans ${theme === 'light' ? 'text-zinc-800' : 'text-white'}`}>Analyzing Spatial Aesthetics</h3>
                    <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest max-w-[280px]">
                      mapping gold values & shadow depths
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Real Response blueprint data card */}
              {response && (
                <motion.div
                  key="response-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 text-left"
                >
                  
                  {/* Markdown Advice sheet */}
                  <div className={`p-6 md:p-8 border rounded-3xl shadow-xl transition-all ${
                    theme === 'light' ? 'bg-white border-zinc-200/80' : 'bg-zinc-900/30 border-zinc-900'
                  }`}>
                    
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800/20 dark:border-zinc-850">
                      <Paintbrush className="h-4.5 w-4.5 text-gold-500" />
                      <h4 className={`text-xs font-mono uppercase font-bold tracking-widest ${
                        theme === 'light' ? 'text-zinc-800' : 'text-gold-500'
                      }`}>
                        Taj Architectural Consultation
                      </h4>
                    </div>

                    <div className="markdown-body select-text">
                      <Markdown components={renderers}>{response.advice}</Markdown>
                    </div>

                  </div>

                  {/* Dynamic Color Palette Swatches */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono tracking-widest text-gold-600 dark:text-gold-500 uppercase font-semibold">Custom Mood board Swatches</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {response.colorPalette.map((color) => (
                        <div
                          key={color.name}
                          onClick={() => handleCopyColor(color.hex)}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition relative group overflow-hidden ${
                            theme === 'light' 
                              ? 'bg-white hover:bg-zinc-50 border-zinc-200' 
                              : 'bg-zinc-900/30 border-zinc-900 hover:border-zinc-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="h-8 w-8 rounded-full border border-white/20 shadow-lg flex-shrink-0" style={{ backgroundColor: color.hex }} />
                            <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-black/85 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer">
                              {copiedColor === color.hex ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                            </button>
                          </div>
                          <div className={`text-xs font-bold truncate ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{color.name}</div>
                          <div className="text-[10px] font-mono text-gold-600 dark:text-gold-500 font-semibold mb-1">{color.hex}</div>
                          <div className="text-[10px] text-zinc-500 leading-tight line-clamp-2">{color.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shopping Estimator list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono tracking-widest text-gold-600 dark:text-gold-500 uppercase font-semibold">Curated Shopping Blueprint</h4>
                    
                    <div className={`border rounded-2xl overflow-hidden font-sans text-xs ${
                      theme === 'light' ? 'bg-white border-zinc-200 shadow-xs' : 'bg-zinc-900/20 border-zinc-900'
                    }`}>
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className={`border-b font-mono font-semibold uppercase text-[10px] ${
                            theme === 'light' ? 'bg-zinc-50 border-zinc-200 text-zinc-550' : 'bg-zinc-950/80 border-zinc-900 text-zinc-500'
                          }`}>
                            <th className="p-4">Item Details</th>
                            <th className="p-4 text-center">Priority</th>
                            <th className="p-4 text-right">Est. Cost</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/60 dark:divide-zinc-850/50">
                          {response.shoppingList.map((shop, i) => (
                            <tr key={i} className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-900/25 transition-colors ${
                              theme === 'light' ? 'text-zinc-750' : 'text-zinc-350'
                            }`}>
                              <td className="p-4 font-medium flex items-center gap-2">
                                <ShoppingBag className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                                <span className={theme === 'light' ? 'text-zinc-800' : 'text-white'}>{shop.item}</span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider ${
                                  shop.priority === 'High'
                                    ? 'bg-red-950/40 text-red-400 border border-red-950/50 font-bold'
                                    : shop.priority === 'Medium'
                                      ? 'bg-amber-950/40 text-gold-450 border border-gold-950/50 font-bold'
                                      : 'bg-zinc-950 text-zinc-500 border border-zinc-850/60'
                                }`}>
                                  {shop.priority}
                                </span>
                              </td>
                              <td className={`p-4 text-right font-mono font-bold ${
                                theme === 'light' ? 'text-zinc-900' : 'text-white'
                              }`}>
                                ${shop.estimatedCost} USD
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Integration CTA to scheduling system */}
                  <div className={`p-6 rounded-3xl border border-gold-500/20 text-left flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative ${
                    theme === 'light' 
                      ? 'bg-amber-50/20 border-gold-300 shadow-sm' 
                      : 'bg-gold-950/10 border-gold-500/20'
                  }`}>
                    <div className="absolute top-0 right-0 h-24 w-24 bg-gold-500/5 rounded-full blur-xl pointer-events-none"></div>
                    
                    <div className="space-y-1 sm:max-w-md">
                      <div className="flex items-center gap-2">
                        <Coins className="h-4.5 w-4.5 text-gold-500" />
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-gold-600 dark:text-gold-400">RECOMMENDED SERVICE TIER</span>
                      </div>
                      <h4 className={`text-base font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                        {response.suggestedBookingService || "Custom Site Survey"}
                      </h4>
                      <p className={`text-xs ${theme === 'light' ? 'text-zinc-650' : 'text-zinc-400'}`}>
                        Our design engine recommended linking this layout directly into our appointment matrix. Let's arrange physical catalogs.
                      </p>
                    </div>

                    <button
                      onClick={() => onApplyStyle(primaryMood, response.suggestedBookingService || "Flooring & Swatch Survey")}
                      className="bg-gold-500 hover:bg-gold-400 text-black font-semibold font-mono text-xs uppercase px-5 py-3 rounded-lg transition duration-300 w-full sm:w-auto shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Apply To Booking <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
