import React, { useState, useEffect } from 'react';
import { Booking } from '../types';
import { Calendar, Clock, DollarSign, User, Mail, Phone, FileText, CheckCircle2, Shield, AlertTriangle, Trash2, Hourglass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingSystemProps {
  initialServiceType?: string;
  initialStyle?: string;
  onBookingCreated?: () => void;
  theme?: 'light' | 'dark';
}

const SERVICE_TIERS = [
  {
    name: "Flooring & Swatch Survey",
    price: 0,
    time: "45 min",
    features: ["Physical floor sample catalogs", "Moisture level & straightness test", "SPC Click, PVC Vinyl & wood options", "Free accurate measurements list"]
  },
  {
    name: "Ceiling & Light Assessment",
    price: 0,
    time: "60 min",
    features: ["Laser height mapping", "Gypsum frame channel calculation", "Hidden warm glow LED coving paths", "Spotlight arrangement diagram"]
  },
  {
    name: "Complete Space Layout Inquiry",
    price: 45,
    time: "2 Hours",
    features: ["Wallpaper & textured panel swatches", "Window zebra blinds system demo", "Fitted modular kitchen review", "Comprehensive piece estimate"]
  }
];

const TIME_SLOTS = [
  "09:30 AM - 11:00 AM",
  "11:30 AM - 01:00 PM",
  "02:00 PM - 03:30 PM",
  "04:00 PM - 05:30 PM"
];

export default function BookingSystem({ initialServiceType = "", initialStyle = "", onBookingCreated, theme = 'dark' }: BookingSystemProps) {
  // Wizard state: 1 - Service, 2 - Date & Time, 3 - Budget & Details, 4 - Success
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [budget, setBudget] = useState<number>(8500);
  
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  const [localBookings, setLocalBookings] = useState<Booking[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  // Load bookings from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('taj_decor_bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalBookings(parsed);
      } catch (e) {
        console.error("Error parsing bookings from storage", e);
      }
    }
  }, []);

  // Update selection if user applied it from the portfolio component
  useEffect(() => {
    if (initialServiceType) {
      // Guess tier from category or map category
      if (initialServiceType.includes("Living") || initialServiceType.includes("Kitchen")) {
        setSelectedService("Ceiling & Light Assessment");
      } else {
        setSelectedService("Flooring & Swatch Survey");
      }
      setAdditionalNotes(`Inquired style inspiration: ${initialStyle || 'Gold-Black Luxury'}`);
    }
  }, [initialServiceType, initialStyle]);

  const saveBookingsToStorage = (updatedList: Booking[]) => {
    localStorage.setItem('taj_decor_bookings', JSON.stringify(updatedList));
    setLocalBookings(updatedList);
    if (onBookingCreated) {
      onBookingCreated();
    }
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTimeSlot || !clientName || !clientEmail || !clientPhone) {
      alert("Please fill in all core fields to secure your scheduling slot.");
      return;
    }

    const newBooking: Booking = {
      id: "taj-" + Math.random().toString(36).substr(2, 9),
      clientName,
      clientEmail,
      clientPhone,
      serviceType: selectedService,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      budget,
      additionalNotes: additionalNotes + (initialStyle ? ` | Theme: ${initialStyle}` : ""),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const newList = [newBooking, ...localBookings];
    saveBookingsToStorage(newList);
    setActiveBooking(newBooking);
    setStep(4);
  };

  const handleCancelBooking = (id: string) => {
    const newList = localBookings.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b);
    saveBookingsToStorage(newList);
    if (activeBooking?.id === id) {
      setActiveBooking(prev => prev ? { ...prev, status: 'cancelled' } : null);
    }
  };

  const resetWizard = () => {
    setSelectedService("");
    setSelectedDate("");
    setSelectedTimeSlot("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setAdditionalNotes("");
    setStep(1);
  };

  return (
    <section id="booking" className={`py-24 border-t relative transition-colors duration-300 ${
      theme === 'light' ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-900'
    }`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 font-sans">
          <span className="text-gold-600 dark:text-gold-500 font-mono tracking-widest text-xs uppercase font-semibold">SECURE YOUR APPOINTMENT</span>
          <h2 className={`text-4xl font-bold tracking-tight mt-3 ${
            theme === 'light' ? 'text-zinc-950' : 'text-white'
          }`}>Book Consultation</h2>
          <p className={`mt-4 text-sm md:text-base ${
            theme === 'light' ? 'text-zinc-650' : 'text-zinc-400'
          }`}>
            Select standard layouts, choose time windows, set project budgets, and secure real-time consult calendars directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-sans">
          
          {/* Main Scheduling Wizard Card */}
          <div className={`rounded-3xl p-6 md:p-8 border relative overflow-hidden transition-all lg:col-span-8 ${
            theme === 'light' 
              ? 'bg-white border-zinc-200/80 shadow-lg shadow-zinc-200/20' 
              : 'bg-zinc-900/60 border-zinc-900 shadow-2xl'
          }`}>
            
            {/* Step Indicators */}
            {step < 4 && (
              <div className={`flex justify-between items-center mb-8 border-b pb-6 font-mono ${
                theme === 'light' ? 'border-zinc-200' : 'border-zinc-800'
              }`}>
                {[
                  { label: "1. Service", desc: "Select tier" },
                  { label: "2. Date & Time", desc: "Choose calendar" },
                  { label: "3. Briefing", desc: "Specify budget" }
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      step >= idx + 1
                        ? 'bg-gold-500 text-black shadow-md shadow-gold-500/30'
                        : theme === 'light'
                          ? 'bg-zinc-200 text-zinc-550 border border-zinc-300'
                          : 'bg-zinc-850 text-zinc-500 border border-zinc-800'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="hidden sm:block text-left">
                      <div className={`text-xs font-semibold ${
                        step >= idx + 1 
                          ? theme === 'light' ? 'text-zinc-900' : 'text-white' 
                          : 'text-zinc-550'
                      }`}>{s.label}</div>
                      <div className="text-[10px] text-zinc-550">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 1: Select Service Tier */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6 text-left"
                >
                  <h3 className={`text-lg font-sans font-bold mb-4 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Choose Your Consultation Focus</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                    {SERVICE_TIERS.map((tier) => (
                      <div
                        key={tier.name}
                        onClick={() => setSelectedService(tier.name)}
                        className={`cursor-pointer group p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                          selectedService === tier.name
                            ? theme === 'light'
                              ? 'bg-amber-50/40 border-gold-500 shadow-sm'
                              : 'bg-gold-950/20 border-gold-500 shadow-inner'
                            : theme === 'light'
                              ? 'bg-zinc-50 border-zinc-200 hover:border-gold-500/30 hover:bg-zinc-100/50'
                              : 'bg-zinc-950/40 border-zinc-850 hover:border-zinc-805 hover:bg-zinc-900/55'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] uppercase tracking-wider font-mono text-gold-600 dark:text-gold-500 font-bold">{tier.time}</span>
                            {selectedService === tier.name && <CheckCircle2 className="h-4 w-4 text-gold-500" />}
                          </div>
                          <h4 className={`text-base font-bold group-hover:text-gold-600 transition-colors ${
                            theme === 'light' ? 'text-zinc-900' : 'text-white'
                          }`}>{tier.name}</h4>
                          <ul className="mt-4 space-y-2">
                            {tier.features.slice(0, 3).map((f, i) => (
                              <li key={i} className="text-[11px] flex items-center gap-1.5 leading-relaxed">
                                <span className="h-1.5 w-1.5 bg-gold-400 rounded-full flex-shrink-0" />
                                <span className={theme === 'light' ? 'text-zinc-700 font-medium' : 'text-zinc-300'}>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={`mt-6 pt-3 border-t flex items-baseline gap-1 ${
                          theme === 'light' ? 'border-zinc-200' : 'border-zinc-900'
                        }`}>
                          <span className={`text-lg font-bold ${theme === 'light' ? 'text-zinc-900 font-extrabold' : 'text-white'}`}>${tier.price}</span>
                          <span className="text-[10px] text-zinc-550 font-mono">USD</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-6 font-mono">
                    <button
                      onClick={() => selectedService ? setStep(2) : alert("Please select a tier option to proceed.")}
                      disabled={!selectedService}
                      className={`text-xs uppercase px-6 py-3.5 rounded-xl flex items-center gap-2 transition duration-300 font-semibold cursor-pointer ${
                        selectedService
                          ? 'bg-gold-500 text-black hover:bg-gold-400 shadow-lg shadow-gold-500/10'
                          : 'bg-zinc-205 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      Next: Choose Date & Hour
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time slot Selection */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6 text-left"
                >
                  <h3 className={`text-lg font-sans font-bold mb-4 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Select Target Appointments</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date picker */}
                    <div className={`p-5 rounded-2xl border ${
                      theme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950/60 border-zinc-850'
                    }`}>
                      <label className="block text-xs font-mono tracking-wider text-gold-600 dark:text-gold-400 uppercase mb-3 font-semibold">Select Day</label>
                      <div className="relative text-left">
                        <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-zinc-450" />
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/25 ${
                            theme === 'light' 
                              ? 'bg-white border-zinc-300 text-zinc-800' 
                              : 'bg-zinc-900 border-zinc-800 text-white'
                          }`}
                        />
                      </div>
                      <p className="mt-3 text-[10px] text-zinc-500 leading-relaxed font-sans">
                        We prioritize appointments and host custom-curated consultations Tuesday through Sunday.
                      </p>
                    </div>

                    {/* Time Slots */}
                    <div className={`p-5 rounded-2xl border ${
                      theme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950/60 border-zinc-850'
                    }`}>
                      <label className="block text-xs font-mono tracking-wider text-gold-600 dark:text-gold-400 uppercase mb-3 font-semibold">Select Slot</label>
                      <div className="space-y-2.5">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-mono font-medium border flex justify-between items-center transition-all cursor-pointer ${
                              selectedTimeSlot === slot
                                ? 'bg-gold-500/10 border-gold-500 text-gold-600 dark:text-white font-semibold'
                                : theme === 'light'
                                  ? 'bg-white border-zinc-250 text-zinc-700 hover:bg-zinc-100'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            <span>{slot}</span>
                            <Clock className={`h-3.5 w-3.5 ${selectedTimeSlot === slot ? 'text-gold-500' : 'text-zinc-500'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 font-mono">
                    <button
                      onClick={() => setStep(1)}
                      className={`border text-xs uppercase px-5 py-3 rounded-xl transition cursor-pointer ${
                        theme === 'light'
                          ? 'border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          : 'border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Back: Service
                    </button>
                    <button
                      onClick={() => (selectedDate && selectedTimeSlot) ? setStep(3) : alert("Please select a date and an hours slot.")}
                      disabled={!selectedDate || !selectedTimeSlot}
                      className={`text-xs uppercase px-6 py-3.5 rounded-xl flex items-center gap-2 transition duration-300 font-semibold cursor-pointer ${
                        (selectedDate && selectedTimeSlot)
                          ? 'bg-gold-500 text-black hover:bg-gold-400 shadow-lg shadow-gold-500/10'
                          : 'bg-zinc-205 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      Next: Contact Brief
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Budget and client Details */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Details input */}
                    <div className="space-y-4">
                      <h4 className={`text-sm font-bold mb-1 uppercase tracking-wider font-mono ${theme === 'light' ? 'text-zinc-850' : 'text-white'}`}>Contact Info</h4>
                      
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border text-sm rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/25 ${
                            theme === 'light' 
                              ? 'bg-white border-zinc-250 text-zinc-805' 
                              : 'bg-zinc-950 border-zinc-800 text-white'
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                        <input
                          type="email"
                          required
                          placeholder="Your Email Address"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border text-sm rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/25 ${
                            theme === 'light' 
                              ? 'bg-white border-zinc-250 text-zinc-805' 
                              : 'bg-zinc-950 border-zinc-800 text-white'
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                        <input
                          type="tel"
                          required
                          placeholder="Your Phone Number"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border text-sm rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/25 ${
                            theme === 'light' 
                              ? 'bg-white border-zinc-250 text-zinc-805' 
                              : 'bg-zinc-950 border-zinc-800 text-white'
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <FileText className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Style preferences or notes"
                          value={additionalNotes}
                          onChange={(e) => setAdditionalNotes(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border text-sm rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/25 ${
                            theme === 'light' 
                              ? 'bg-white border-zinc-250 text-zinc-805' 
                              : 'bg-zinc-950 border-zinc-800 text-white'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Interactive Budget Planner Slider */}
                    <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                      theme === 'light' ? 'bg-zinc-50 border-zinc-200 shadow-xs' : 'bg-zinc-950/60 border-zinc-850'
                    }`}>
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-xs font-mono tracking-wider text-gold-600 dark:text-gold-400 uppercase font-semibold">Project Budget Goal</label>
                          <span className={`text-lg font-mono font-bold ${theme === 'light' ? 'text-zinc-900 font-extrabold' : 'text-white'}`}>${budget.toLocaleString()}</span>
                        </div>

                        <input
                          type="range"
                          min="300"
                          max="12000"
                          step="100"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          className="w-full accent-gold-500 h-1.5 bg-zinc-300 dark:bg-zinc-840 rounded-lg cursor-pointer"
                        />

                        {/* Estimates Calculator depending on slider level */}
                        <div className="mt-6 space-y-3 font-sans">
                          <h5 className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest text-left">Taj Design Capability Estimator:</h5>
                          
                          <div className={`p-3 rounded-lg border flex items-center justify-between gap-1.5 ${
                            theme === 'light' ? 'bg-white border-zinc-200' : 'bg-zinc-900/80 border-zinc-850/60'
                          }`}>
                            <span className="text-xs text-zinc-500">Estimated Scope:</span>
                            <span className={`text-xs font-semibold text-right ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                              {budget < 1500 ? "Zebra blinds (3 rooms) or vinyl floor" : budget < 5500 ? "Premium SPC flooring + False Ceiling coves" : "Full House premium panels, papers & SPC flooring layout"}
                            </span>
                          </div>

                          <div className={`p-3 rounded-lg border flex items-center justify-between ${
                            theme === 'light' ? 'bg-white border-zinc-200' : 'bg-zinc-900/80 border-zinc-850/60'
                          }`}>
                            <span className="text-xs text-zinc-500">Coverage Support Limit:</span>
                            <span className="text-xs font-mono text-gold-600 dark:text-gold-400 font-bold">
                              Up to {Math.max(120, Math.floor(budget / 3.8))} sq ft fitted
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-3 bg-gold-950/10 rounded-xl border border-gold-500/10 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-gold-500 flex-shrink-0" />
                        <p className="text-[10px] text-zinc-500 leading-tight font-sans">
                          We promise full secure data privacy. Your contact coordinates are used only for consultation reminders.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`flex justify-between pt-6 border-t font-mono text-xs ${
                    theme === 'light' ? 'border-zinc-200' : 'border-zinc-850'
                  }`}>
                    <button
                      onClick={() => setStep(2)}
                      className={`border text-xs uppercase px-5 py-3 rounded-xl transition cursor-pointer ${
                        theme === 'light'
                          ? 'border-zinc-255 text-zinc-650 hover:bg-zinc-100'
                          : 'border-zinc-800 hover:border-zinc-700 text-zinc-405 hover:text-white'
                      }`}
                    >
                      Back: Calendar
                    </button>
                    <button
                      onClick={handleCreateBooking}
                      disabled={!clientName || !clientEmail || !clientPhone}
                      className={`uppercase px-7 py-4 rounded-xl flex items-center gap-2 transition duration-300 font-bold cursor-pointer ${
                        (clientName && clientEmail && clientPhone)
                          ? 'bg-gold-500 text-black hover:bg-gold-400 shadow-lg shadow-gold-500/30'
                          : 'bg-zinc-205 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      Confirm Booking & Lock Slot
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success Screen */}
              {step === 4 && activeBooking && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="mx-auto h-16 w-16 bg-gold-950/40 border border-gold-500/30 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-gold-500" />
                  </div>

                  <div>
                    <h3 className={`text-2xl font-bold font-sans ${theme === 'light' ? 'text-zinc-950' : 'text-white'}`}>Your Consultation is Scheduled!</h3>
                    <p className={`mt-2 text-sm max-w-md mx-auto font-sans ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Thank you, {activeBooking.clientName}. A calendar invitation and design briefing form have been dispatched to **{activeBooking.clientEmail}**.
                    </p>
                  </div>

                  {/* Summary slip */}
                  <div className={`border rounded-2xl p-5 max-w-md mx-auto text-left font-mono text-xs space-y-3 divide-y ${
                    theme === 'light' 
                      ? 'bg-zinc-50 border-zinc-200 divide-zinc-200/80 shadow-sm' 
                      : 'bg-zinc-950/80 border-zinc-850 divide-zinc-900'
                  }`}>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500">BOOKING REFERENCE:</span>
                      <span className={`font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{activeBooking.id}</span>
                    </div>
                    <div className="flex justify-between pt-2 pb-1.5">
                      <span className="text-zinc-500">SERVICE:</span>
                      <span className="text-gold-600 dark:text-gold-400 font-bold">{activeBooking.serviceType}</span>
                    </div>
                    <div className="flex justify-between pt-2 pb-1.5">
                      <span className="text-zinc-500">DATE & HOUR SLOT:</span>
                      <span className={theme === 'light' ? 'text-zinc-800 font-semibold' : 'text-white'}>{activeBooking.date} @ {activeBooking.timeSlot}</span>
                    </div>
                    <div className="flex justify-between pt-2 pb-1.5">
                      <span className="text-zinc-500">ALLOCATED BUDGET:</span>
                      <span className={`font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>${activeBooking.budget.toLocaleString()} USD</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-4 font-mono text-xs">
                    <button
                      onClick={resetWizard}
                      className="bg-gold-500 hover:bg-gold-400 text-black uppercase px-5 py-3.5 rounded-xl transition font-semibold cursor-pointer"
                    >
                      Book Another Space
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className={`border uppercase px-5 py-3.5 rounded-xl transition cursor-pointer ${
                        theme === 'light'
                          ? 'border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          : 'border-zinc-805 hover:border-zinc-700 text-zinc-405 hover:text-white'
                      }`}
                    >
                      Dismiss View
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Pillar panel: My active Bookings drawer */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Design Shield Info box */}
            <div className={`p-5 rounded-3xl border text-left ${
              theme === 'light' 
                ? 'bg-zinc-50 border-zinc-200 shadow-xs' 
                : 'bg-zinc-900/30 border-zinc-900'
            }`}>
              <h4 className={`text-sm font-bold font-sans flex items-center gap-2 mb-3 ${
                theme === 'light' ? 'text-zinc-900' : 'text-white'
              }`}>
                <Shield className="h-4 w-4 text-gold-500" />
                The Taj Experience
              </h4>
              <p className={`text-xs leading-relaxed font-sans ${theme === 'light' ? 'text-zinc-650' : 'text-zinc-400'}`}>
                Every customized blueprint begins with our premium consultation. We explore tactile textures, fabric logs, spatial dynamics and budget allocations directly on location or tele-conference.
              </p>
            </div>

            {/* Bookings Tracker Drawer */}
            <div className={`border rounded-3xl p-5 shadow-xl transition-colors text-left ${
              theme === 'light' ? 'bg-white border-zinc-200 shadow-zinc-200/20' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <div className={`flex items-center justify-between mb-4 pb-3 border-b ${
                theme === 'light' ? 'border-zinc-150' : 'border-zinc-850'
              }`}>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  theme === 'light' ? 'text-zinc-800' : 'text-white'
                }`}>Active Schedules</span>
                <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${
                  theme === 'light' 
                    ? 'bg-zinc-100 text-gold-700 border-zinc-250 font-bold' 
                    : 'bg-zinc-950 text-gold-400 border-zinc-800'
                }`}>
                  {localBookings.length} Saved
                </span>
              </div>

              {localBookings.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Clock className="h-8 w-8 text-zinc-300 dark:text-zinc-700 mx-auto" />
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-550 font-mono uppercase">No bookings on this browser.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                  {localBookings.map((b) => (
                    <div
                      key={b.id}
                      className={`p-4 rounded-xl border font-sans text-xs flex flex-col justify-between space-y-3 ${
                        b.status === 'cancelled'
                          ? 'bg-zinc-100/40 border-zinc-200/60 text-zinc-400 opacity-60'
                          : theme === 'light'
                            ? 'bg-zinc-50 border-zinc-250 hover:border-gold-500/20 text-zinc-800 shadow-xs'
                            : 'bg-zinc-950 border-zinc-850/80 hover:border-zinc-805 text-zinc-305'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-1 gap-2 text-left">
                          <span className={`font-bold text-xs truncate max-w-[150px] font-sans ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{b.serviceType}</span>
                          <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-950/50 font-bold'
                              : 'bg-red-950/40 text-red-650 dark:text-red-400 border border-red-950/50 font-bold'
                          }`}>
                            {b.status}
                          </span>
                        </div>

                        <div className="space-y-1 font-mono text-[10px] text-zinc-550 dark:text-zinc-400 mt-2">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 text-gold-500" />
                            <span>{b.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-gold-500" />
                            <span>{b.timeSlot}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="h-3 w-3 text-gold-500" />
                            <span>Budget Limit: ${b.budget.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {b.status === 'confirmed' && (
                        <div className={`flex items-center justify-between pt-2 border-t ${
                          theme === 'light' ? 'border-zinc-150' : 'border-zinc-900'
                        }`}>
                          <span className="text-[9px] text-zinc-500 font-mono uppercase flex items-center gap-1">
                            <Hourglass className="h-2.5 w-2.5 animate-spin text-gold-500" /> active
                          </span>
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="text-red-600 hover:text-red-500 font-mono text-[9px] uppercase tracking-wider font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" /> Cancel Slot
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
