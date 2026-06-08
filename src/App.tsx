import React, { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio';
import BookingSystem from './components/BookingSystem';
import Testimonials from './components/Testimonials';
import AIConsultant from './components/AIConsultant';
import { 
  Compass, 
  MapPin, 
  PhoneCall, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  ChevronRight, 
  ExternalLink,
  Crown,
  Menu,
  X,
  Check,
  Grid,
  Layers,
  Scissors,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sun,
  Moon,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appliedStyle, setAppliedStyle] = useState("");
  const [appliedServiceType, setAppliedServiceType] = useState("");
  const [showToast, setShowToast] = useState(false);
  
  // Initialize theme from storage (defaults to dark for moody luxury but supports bright/clean light mode)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('taj-theme');
      return (saved as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('taj-theme', nextTheme);
  };

  // When a user selects a style/service from the portfolio
  const handleApplyPresetToBooking = (styleName: string, serviceName: string) => {
    setAppliedStyle(styleName);
    setAppliedServiceType(serviceName);
    setShowToast(true);
    
    // Auto-scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Hide toast after a few seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-gold-600 selection:text-black overflow-x-hidden transition-colors duration-300 ${
      theme === 'light' ? 'bg-zinc-50 text-zinc-900' : 'bg-black text-zinc-100'
    }`}>
      
      {/* Toast Notification for applied booking presets */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 z-50 border px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-sans text-xs sm:text-sm max-w-sm sm:max-w-md ${
              theme === 'light' ? 'bg-white border-gold-500 text-zinc-800' : 'bg-zinc-900 border-gold-500 text-white'
            }`}
          >
            <div className="h-6 w-6 rounded-full bg-gold-950/40 border border-gold-500 flex items-center justify-center flex-shrink-0">
              <Check className="h-3.5 w-3.5 text-gold-400" />
            </div>
            <div>
              <span className="font-bold text-gold-400">Selection Applied! </span> 
              Your consultation inquiry of <span className="font-semibold">{appliedServiceType}</span> is queued. Scroll below to finalize.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Minimal Navigation Header */}
      <header className={`sticky top-0 z-[100] backdrop-blur-md border-b transition-colors duration-300 ${
        theme === 'light' ? 'bg-white/90 border-zinc-200/80 shadow-xs' : 'bg-black/85 border-zinc-900'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
          
          {/* Logo Brand */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 group font-sans">
            <div className="h-10 w-10 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/10 group-hover:scale-105 transition duration-500">
              <Crown className="h-5 w-5 text-black" />
            </div>
            <div>
              <span className={`text-xl font-sans font-extrabold tracking-tight block leading-none ${
                theme === 'light' ? 'text-zinc-900' : 'text-white'
              }`}>TAJ</span>
              <span className="text-[9px] font-mono tracking-widest text-gold-500 uppercase font-semibold">INTERIOR DECOR</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider font-semibold uppercase">
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className={`${theme === 'light' ? 'text-zinc-650 hover:text-gold-600' : 'text-zinc-400 hover:text-white'} transition duration-300`}>Services</a>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={`${theme === 'light' ? 'text-zinc-650 hover:text-gold-600' : 'text-zinc-400 hover:text-white'} transition duration-300`}>Finishes</a>
            <a href="#ai-consultant" onClick={(e) => handleNavClick(e, 'ai-consultant')} className={`${theme === 'light' ? 'text-zinc-650 hover:text-gold-600' : 'text-zinc-400 hover:text-white'} transition duration-300`}>AI Consultant</a>
            <a href="#process" onClick={(e) => handleNavClick(e, 'process')} className={`${theme === 'light' ? 'text-zinc-650 hover:text-gold-600' : 'text-zinc-400 hover:text-white'} transition duration-300`}>Our Process</a>
            <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className={`${theme === 'light' ? 'text-zinc-650 hover:text-gold-600' : 'text-zinc-400 hover:text-white'} transition duration-300`}>Testimonials</a>
          </nav>

          {/* Booking CTA Button (Desktop) & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg border transition duration-300 cursor-pointer ${
                theme === 'light' 
                  ? 'bg-zinc-100 border-zinc-200 text-zinc-850 hover:bg-zinc-200/80' 
                  : 'bg-zinc-900 border-zinc-800 text-gold-500 hover:border-gold-500/40 hover:text-white'
              }`}
              title="Toggle theme mode"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, 'booking')}
              className={`font-mono text-xs tracking-wider uppercase px-5 py-2.5 rounded-lg font-bold transition duration-300 ${
                theme === 'light'
                  ? 'bg-zinc-900 hover:bg-gold-500 text-white hover:text-black border border-zinc-900 hover:border-gold-500'
                  : 'bg-zinc-900 border border-zinc-800 hover:border-gold-500/40 text-gold-500'
              }`}
            >
              Consultation
            </a>
          </div>

          {/* Mobile Theme Toggle & Menu Toggle Button (Touch targets increased to 44px) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg border transition duration-300 cursor-pointer ${
                theme === 'light' 
                  ? 'bg-zinc-100 border-zinc-200 text-zinc-800' 
                  : 'bg-zinc-900 border-zinc-800 text-gold-500'
              }`}
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                theme === 'light' 
                  ? 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-200' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel - Absolute overlay configuration prevents clipping and overlapping */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full left-0 right-0 z-50 border-b px-6 py-6 space-y-4 font-mono text-xs tracking-wider shadow-2xl ${
                theme === 'light' 
                  ? 'bg-white border-zinc-200 text-zinc-900' 
                  : 'bg-zinc-950 border-zinc-900 text-zinc-200'
              }`}
            >
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className={`block transition-all font-bold py-2 ${theme === 'light' ? 'text-zinc-700 hover:text-gold-600' : 'text-zinc-300 hover:text-gold-400'}`}
              >
                Services
              </a>
              <a
                href="#portfolio"
                onClick={(e) => handleNavClick(e, 'portfolio')}
                className={`block transition-all font-bold py-2 ${theme === 'light' ? 'text-zinc-700 hover:text-gold-600' : 'text-zinc-300 hover:text-gold-400'}`}
              >
                Finishes
              </a>
              <a
                href="#ai-consultant"
                onClick={(e) => handleNavClick(e, 'ai-consultant')}
                className={`block transition-all font-bold py-2 ${theme === 'light' ? 'text-zinc-700 hover:text-gold-600' : 'text-zinc-300 hover:text-gold-400'}`}
              >
                AI Consultant
              </a>
              <a
                href="#process"
                onClick={(e) => handleNavClick(e, 'process')}
                className={`block transition-all font-bold py-2 ${theme === 'light' ? 'text-zinc-700 hover:text-gold-600' : 'text-zinc-300 hover:text-gold-400'}`}
              >
                Our Process
              </a>
              <a
                href="#testimonials"
                onClick={(e) => handleNavClick(e, 'testimonials')}
                className={`block transition-all font-bold py-2 ${theme === 'light' ? 'text-zinc-700 hover:text-gold-600' : 'text-zinc-300 hover:text-gold-400'}`}
              >
                Testimonials
              </a>
              <div className={`pt-4 border-t ${theme === 'light' ? 'border-zinc-200' : 'border-zinc-905'}`}>
                <a
                  href="#booking"
                  onClick={(e) => handleNavClick(e, 'booking')}
                  className="block text-center bg-gold-500 hover:bg-gold-400 text-black font-mono text-xs tracking-wider uppercase py-3 rounded-lg font-bold transition duration-300 cursor-pointer"
                >
                  Book Appointment
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Showcase Splash Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16">
        
        {/* Living Room Background Image with dark or light high-key mask overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/living_room_1780922335753.png"
            alt="Taj Living Room Design"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.32] scale-102 transition duration-500"
          />
          <div className={`absolute inset-0 transition-colors duration-300 ${
            theme === 'light' 
              ? 'bg-gradient-to-t from-zinc-50 via-zinc-50/70 to-zinc-50/30' 
              : 'bg-gradient-to-t from-black via-black/40 to-transparent'
          }`} />
          <div className={`absolute inset-0 transition-colors duration-300 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-zinc-50 via-transparent to-zinc-50 opacity-90'
              : 'bg-gradient-to-r from-black via-transparent to-black opacity-80'
          }`} />
        </div>

        {/* Ambient floating details */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center md:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Core typography details */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full backdrop-blur-md ${
                theme === 'light' ? 'bg-amber-100/50 border-gold-500/35' : 'bg-gold-950/40 border-gold-500/20'
              }`}>
                <Sparkles className="h-4 w-4 text-gold-500" />
                <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                  theme === 'light' ? 'text-gold-800' : 'text-gold-400'
                }`}>Luxury Interior Design & Finishing Solutions</span>
              </div>

              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight leading-none transition-colors duration-300 ${
                theme === 'light' ? 'text-zinc-900' : 'text-white'
              }`}>
                Transform <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600">
                  Your Space
                </span>
              </h1>

              <p className={`font-sans text-xs sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0 transition-colors duration-300 ${
                theme === 'light' ? 'text-zinc-650 font-medium' : 'text-zinc-350'
              }`}>
                Premium interior finishes, custom vinyl & wooden flooring, false ceilings, luxury wall coverings, custom blinds, and cabinetry designed and installed with flawless craft.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#booking"
                  className="bg-gold-500 hover:bg-gold-400 text-black font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-xl transition duration-300 shadow-xl shadow-gold-500/10 text-center flex items-center justify-center gap-2 group"
                >
                  Get A Free Quote <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#services"
                  className={`font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition duration-300 text-center border ${
                    theme === 'light'
                      ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 shadow-sm'
                      : 'border-zinc-850 hover:border-zinc-800 bg-zinc-950/50 hover:bg-zinc-950 text-zinc-350 hover:text-white'
                  }`}
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* Right pillar badge card for social proof */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className={`backdrop-blur-sm border p-8 rounded-3xl space-y-6 max-w-sm ml-auto transition-all ${
                theme === 'light' 
                  ? 'bg-white/80 border-zinc-200 shadow-md shadow-zinc-200/40' 
                  : 'bg-zinc-900/40 border-zinc-900'
              }`}>
                <div className="text-gold-500">
                  <Crown className="h-8 w-8 stroke-[1.5]" />
                </div>
                
                <h3 className={`text-lg font-sans font-bold tracking-tight ${
                  theme === 'light' ? 'text-zinc-900' : 'text-white'
                }`}>Practical & Beautiful</h3>
                
                <p className={`text-xs leading-relaxed font-sans ${
                  theme === 'light' ? 'text-zinc-550' : 'text-zinc-500'
                }`}>
                  We don't just draft visual designs—our skilled team takes precise measurements, supplies top-grade materials, and implements the final installation with swift, guaranteed support.
                </p>

                <div className={`pt-4 border-t space-y-2.5 font-mono text-[10px] ${
                  theme === 'light' ? 'border-zinc-150 text-zinc-700' : 'border-zinc-800 text-zinc-400'
                }`}>
                  <div className="flex justify-between">
                    <span>1. FINEST PRODUCTS</span>
                    <span className="text-gold-600 font-bold">Flooring, Blinds & Panels</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2. EXPERT INSTALLATION</span>
                    <span className="text-gold-600 font-bold">Fast, Dust-Free Fit</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating properties indicator foot banner */}
        <div className={`absolute bottom-0 left-0 right-0 py-5 border-t z-10 transition-colors duration-300 ${
          theme === 'light' ? 'bg-white border-zinc-200/80 shadow-xs' : 'bg-zinc-950 border-zinc-900'
        }`}>
          <div className={`max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left divide-y md:divide-y-0 md:divide-x font-sans ${
            theme === 'light' ? 'divide-zinc-200' : 'divide-zinc-900'
          }`}>
            <div className="pt-2 md:pt-0">
              <span className="text-[9px] text-zinc-500 block uppercase font-mono tracking-wider">PREMIUM FLOORING</span>
              <span className={`text-sm font-bold mt-1 block ${theme === 'light' ? 'text-zinc-850' : 'text-white'}`}>Vinyl, SPC & Wooden</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-[9px] text-zinc-500 block uppercase font-mono tracking-wider">WINDOW FINISHING</span>
              <span className={`text-sm font-bold mt-1 block ${theme === 'light' ? 'text-zinc-850' : 'text-white'}`}>Zebra Blinds & Shades</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-[9px] text-zinc-500 block uppercase font-mono tracking-wider">DURABLE MATERIALS</span>
              <span className={`text-sm font-bold mt-1 block ${theme === 'light' ? 'text-zinc-850' : 'text-white'}`}>100% Quality Inspected</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-[9px] text-zinc-500 block uppercase font-mono tracking-wider">SUPPORT & MAINTENANCE</span>
              <span className={`text-sm font-bold mt-1 block ${theme === 'light' ? 'text-zinc-850' : 'text-white'}`}>Post-Install Warranty</span>
            </div>
          </div>
        </div>

      </section>

      {/* Services Grid Section : "Browse by what your space needs" */}
      <section id="services" className={`py-24 border-t relative transition-colors duration-300 ${
        theme === 'light' ? 'bg-white border-zinc-200/80' : 'bg-zinc-950 border-zinc-900'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[2px] w-6 bg-gold-500"></span>
              <span className="text-gold-500 font-mono tracking-widest text-xs uppercase font-bold">OUR SPECIALTIES</span>
              <span className="h-[2px] w-6 bg-gold-500"></span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-sans font-bold tracking-tight ${
              theme === 'light' ? 'text-zinc-950' : 'text-white'
            }`}>
              Browse by what your space needs
            </h2>
            <p className={`mt-4 text-sm md:text-base font-sans ${
              theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'
            }`}>
              From foundational floors to bespoke lighting structures and tailored cabinetry fittings, explore our premium catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div 
              onClick={() => handleApplyPresetToBooking('Wood & Vinyl Swatches', 'Flooring & Swatch Survey')}
              className={`border p-8 rounded-3xl transition-all duration-300 group hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                theme === 'light' 
                  ? 'bg-zinc-50 hover:bg-zinc-100/55 border-zinc-200/80 hover:border-gold-500/30' 
                  : 'bg-zinc-900/40 border-zinc-850 hover:border-gold-500/20'
              }`}
            >
              <div className="h-12 w-12 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-105 transition-transform">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 font-sans transition-colors group-hover:text-gold-600 ${
                theme === 'light' ? 'text-zinc-900 font-bold' : 'text-white'
              }`}>Premium Flooring</h3>
              <p className={`text-xs leading-relaxed font-sans mb-4 transition-colors ${
                theme === 'light' ? 'text-zinc-600' : 'text-zinc-500'
              }`}>
                Anti-scratch PVC Vinyl planks, click-lock SPC Flooring, solid hardwood, gym rubber mats, and seamless epoxy coatings. Beautiful textures made for heavy footwork.
              </p>
              <div className="text-[10px] font-mono flex flex-wrap gap-2 mb-5">
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>SPC Click</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>PVC Vinyl</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Hardwood</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-gold-600 dark:text-gold-500 font-bold tracking-wider flex items-center gap-1 group-hover:scale-[1.02] transition-transform">
                Book Swatch Survey <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Service 2 */}
            <div 
              onClick={() => handleApplyPresetToBooking('Zebra & Vertical Blinds', 'Complete Space Layout Inquiry')}
              className={`border p-8 rounded-3xl transition-all duration-300 group hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                theme === 'light' 
                  ? 'bg-zinc-50 hover:bg-zinc-100/55 border-zinc-200/80 hover:border-gold-500/30' 
                  : 'bg-zinc-900/40 border-zinc-850 hover:border-gold-500/20'
              }`}
            >
              <div className="h-12 w-12 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-105 transition-transform">
                <Scissors className="h-6 w-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 font-sans transition-colors group-hover:text-gold-600 ${
                theme === 'light' ? 'text-zinc-900 font-bold' : 'text-white'
              }`}>Window Blinds & Treatments</h3>
              <p className={`text-xs leading-relaxed font-sans mb-4 transition-colors ${
                theme === 'light' ? 'text-zinc-600' : 'text-zinc-500'
              }`}>
                Premium Zebra blinds, light-filtering roller shades, automatic motorized systems, and luxury vertical blinds that offer accurate lighting level control with visual privacy.
              </p>
              <div className="text-[10px] font-mono flex flex-wrap gap-2 mb-5">
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Zebra Blinds</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Motorized</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Sleek Louvers</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-gold-600 dark:text-gold-500 font-bold tracking-wider flex items-center gap-1 group-hover:scale-[1.02] transition-transform">
                Book Swatch Survey <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Service 3 */}
            <div 
              onClick={() => handleApplyPresetToBooking('3D Fluted wall designs', 'Complete Space Layout Inquiry')}
              className={`border p-8 rounded-3xl transition-all duration-300 group hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                theme === 'light' 
                  ? 'bg-zinc-50 hover:bg-zinc-100/55 border-zinc-200/80 hover:border-gold-500/30' 
                  : 'bg-zinc-900/40 border-zinc-850 hover:border-gold-500/20'
              }`}
            >
              <div className="h-12 w-12 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-105 transition-transform">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 font-sans transition-colors group-hover:text-gold-600 ${
                theme === 'light' ? 'text-zinc-900 font-bold' : 'text-white'
              }`}>Fluted Wall Panels & Paper</h3>
              <p className={`text-xs leading-relaxed font-sans mb-4 transition-colors ${
                theme === 'light' ? 'text-zinc-650' : 'text-zinc-500'
              }`}>
                Polished charcoal panel cladding, high-density PS fluted profiles, modern 3D feature walls, and luxury imported wallpapers with moisture resistance.
              </p>
              <div className="text-[10px] font-mono flex flex-wrap gap-2 mb-5">
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Fluted Clad</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>3D Textures</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Wallpapers</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-gold-600 dark:text-gold-500 font-bold tracking-wider flex items-center gap-1 group-hover:scale-[1.02] transition-transform">
                Book Wall Design Survey <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Service 4 */}
            <div 
              onClick={() => handleApplyPresetToBooking('Gypsum False Ceiling coves', 'Ceiling & Light Assessment')}
              className={`border p-8 rounded-3xl transition-all duration-300 group hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                theme === 'light' 
                  ? 'bg-zinc-50 hover:bg-zinc-100/55 border-zinc-200/80 hover:border-gold-500/30' 
                  : 'bg-zinc-900/40 border-zinc-850 hover:border-gold-500/20'
              }`}
            >
              <div className="h-12 w-12 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-105 transition-transform">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 font-sans transition-colors group-hover:text-gold-600 ${
                theme === 'light' ? 'text-zinc-900 font-bold' : 'text-white'
              }`}>False Ceilings & Lighting</h3>
              <p className={`text-xs leading-relaxed font-sans mb-4 transition-colors ${
                theme === 'light' ? 'text-zinc-650' : 'text-zinc-500'
              }`}>
                Contemporary gypsum board ceilings, structural metal channel frames, hidden golden LED coving layouts, and accent downlighting that elevates any living hall or room.
              </p>
              <div className="text-[10px] font-mono flex flex-wrap gap-2 mb-5">
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Gypsum Plaster</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>LED Cove</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Spotlights</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-gold-600 dark:text-gold-500 font-bold tracking-wider flex items-center gap-1 group-hover:scale-[1.02] transition-transform">
                Book Ceiling Survey <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Service 5 */}
            <div 
              onClick={() => handleApplyPresetToBooking('Sleek Laminate counters', 'Complete Space Layout Inquiry')}
              className={`border p-8 rounded-3xl transition-all duration-300 group hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                theme === 'light' 
                  ? 'bg-zinc-50 hover:bg-zinc-100/55 border-zinc-200/80 hover:border-gold-500/30' 
                  : 'bg-zinc-900/40 border-zinc-850 hover:border-gold-500/20'
              }`}
            >
              <div className="h-12 w-12 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-105 transition-transform">
                <Crown className="h-6 w-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 font-sans transition-colors group-hover:text-gold-600 ${
                theme === 'light' ? 'text-zinc-900 font-bold' : 'text-white'
              }`}>Kitchen & Cabinets</h3>
              <p className={`text-xs leading-relaxed font-sans mb-4 transition-colors ${
                theme === 'light' ? 'text-zinc-650' : 'text-zinc-500'
              }`}>
                Fitted modular kitchens carrying sleek acrylic sheets, fingerprint-resistant laminates, silent hydraulic runner drawers, and stone counter slab styling.
              </p>
              <div className="text-[10px] font-mono flex flex-wrap gap-2 mb-5">
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Acrylic Sheets</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Soft-Close</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Quartz Stone</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-gold-600 dark:text-gold-500 font-bold tracking-wider flex items-center gap-1 group-hover:scale-[1.02] transition-transform">
                Book Layout Survey <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>            {/* Service 6 */}
            <div 
              onClick={() => handleApplyPresetToBooking('Custom cushioned bed heads', 'Complete Space Layout Inquiry')}
              className={`border p-8 rounded-3xl transition-all duration-300 group hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                theme === 'light' 
                  ? 'bg-zinc-50 hover:bg-zinc-100/55 border-zinc-200/80 hover:border-gold-500/30' 
                  : 'bg-zinc-900/40 border-zinc-850 hover:border-gold-500/20'
              }`}
            >
              <div className="h-12 w-12 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-105 transition-transform">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 font-sans transition-colors group-hover:text-gold-600 ${
                theme === 'light' ? 'text-zinc-900 font-bold' : 'text-white'
              }`}>Bespoke Finished Furniture</h3>
              <p className={`text-xs leading-relaxed font-sans mb-4 transition-colors ${
                theme === 'light' ? 'text-zinc-650' : 'text-zinc-500'
              }`}>
                Tailored bouclé sofas, heavy timber dining tables, master vanity cabinets, and customized cushioned velvet headboards manufactured to fit your space layout.
              </p>
              <div className="text-[10px] font-mono flex flex-wrap gap-2 mb-5">
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Luxury Bed</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Dining Set</span>
                <span className={`px-2.5 py-1 rounded-md ${theme === 'light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-950 text-zinc-400'}`}>Bespoke Sofa</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-gold-600 dark:text-gold-500 font-bold tracking-wider flex items-center gap-1 group-hover:scale-[1.02] transition-transform">
                Book Furniture Survey <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <a
              href="#booking"
              className={`inline-flex items-center gap-2 text-xs font-mono tracking-wider font-bold px-6 py-3 rounded-xl transition ${
                theme === 'light'
                  ? 'text-gold-600 border border-zinc-200 bg-zinc-150/50 hover:border-gold-500/50 hover:bg-zinc-50 hover:shadow-xs'
                  : 'text-gold-500 border border-zinc-900 hover:border-gold-500/40 bg-zinc-900/20'
              }`}
            >
              Request Free Site Measurement Inquiry <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </section>

      {/* Portfolio Showcase section */}
      <Portfolio onSelectStyle={handleApplyPresetToBooking} theme={theme} />

      {/* AI Design Core Consultant */}
      <AIConsultant onApplyStyle={handleApplyPresetToBooking} theme={theme} />

      {/* Section: Simple 4-Step Finishing Process */}
      <section id="process" className={`py-24 border-t relative transition-colors duration-300 ${
        theme === 'light' ? 'bg-zinc-100/50 border-zinc-200/80' : 'bg-zinc-900/20 border-zinc-900'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-gold-600 dark:text-gold-500 font-mono tracking-widest text-xs uppercase font-bold block mb-3">HOW WE ACHIEVE EXCELLENCE</span>
            <h2 className={`text-3xl md:text-4xl font-sans font-bold tracking-tight transition-colors duration-300 ${
              theme === 'light' ? 'text-zinc-950' : 'text-white'
            }`}>Our 4-Step Finishing Process</h2>
            <p className={`text-xs sm:text-sm mt-3 font-sans transition-colors duration-300 ${
              theme === 'light' ? 'text-zinc-600 font-medium' : 'text-zinc-400'
            }`}>
              From our first call to the final flawless touch, we maintain clear deadlines, clean installations, and transparent budgeting goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative text-center md:text-left animate-fade-in">
              <div className="h-10 w-10 bg-gold-500 text-black font-mono font-bold rounded-full flex items-center justify-center text-sm shadow-lg shadow-gold-500/10 mb-5 mx-auto md:mx-0">
                01
              </div>
              <h3 className={`text-base font-bold font-sans mb-2 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>On-Site Consultation</h3>
              <p className={`text-xs font-sans leading-relaxed transition-colors ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                We assess your building walls, examine structural angles, take 100% precise laser measurements of the area, and understand your lifestyle parameters.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center md:text-left animate-fade-in">
              <div className="h-10 w-10 bg-gold-500 text-black font-mono font-bold rounded-full flex items-center justify-center text-sm shadow-lg shadow-gold-500/10 mb-5 mx-auto md:mx-0">
                02
              </div>
              <h3 className={`text-base font-bold font-sans mb-2 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Tactile Swatch Selection</h3>
              <p className={`text-xs font-sans leading-relaxed transition-colors ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Browse real high-spec catalogs, feel heavy vinyl sheets, SPC core weights, false ceiling plaster blocks, and fluted panel timber textures under actual room lighting.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center md:text-left animate-fade-in">
              <div className="h-10 w-10 bg-gold-500 text-black font-mono font-bold rounded-full flex items-center justify-center text-sm shadow-lg shadow-gold-500/10 mb-5 mx-auto md:mx-0">
                03
              </div>
              <h3 className={`text-base font-bold font-sans mb-2 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Design & Estimator Mapping</h3>
              <p className={`text-xs font-sans leading-relaxed transition-colors ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Map customized placements with piece-by-piece cost specifications. No hidden charges—everything is planned to accommodate your budget levels perfectly.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center md:text-left animate-fade-in">
              <div className="h-10 w-10 bg-gold-500 text-black font-mono font-bold rounded-full flex items-center justify-center text-sm shadow-lg shadow-gold-500/10 mb-5 mx-auto md:mx-0">
                04
              </div>
              <h3 className={`text-base font-bold font-sans mb-2 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Skilled Fit & Finish</h3>
              <p className={`text-xs font-sans leading-relaxed transition-colors ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Our trained handymen carry out fast, low-dust floor layouts, precision blind fittings, plaster alignments, and final spot polishing with an active finish warranty.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Scheduling Booking Calendar */}
      <BookingSystem 
        initialServiceType={appliedServiceType} 
        initialStyle={appliedStyle}
        theme={theme}
        onBookingCreated={() => {
          // Can hook into general booking success triggers
        }}
      />

      {/* Patron Stories */}
      <Testimonials theme={theme} />

      {/* Business Details Informational Footer */}
      <footer className={`pt-20 pb-12 border-t font-sans transition-colors duration-300 ${
        theme === 'light' ? 'bg-white border-zinc-200' : 'bg-zinc-950 border-zinc-900'
      }`}>
        <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b ${
          theme === 'light' ? 'border-zinc-200' : 'border-zinc-900'
        }`}>
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-gold-500" />
              <span className={`font-sans font-bold text-lg ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Taj Interior Decor</span>
            </div>
            <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-zinc-550' : 'text-zinc-500'}`}>
              Engineering luxurious residential and commercial spaces. PVC/SPC floors, false ceilings, wallpapers, premium wall panels, blinds and cabinetry tailored and fitted beautifully.
            </p>
          </div>

          {/* Column 2: Studio coordinates */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-gold-600 uppercase font-bold">The Studio Coordinates</h4>
            <ul className={`space-y-2.5 text-xs ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Suite 450, Sovereign Avenue, Obsidian Regency, New Delhi 110001</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-gold-500 flex-shrink-0" />
                <span>+91 98110 TAJDECOR</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Operational hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-gold-600 uppercase font-bold">Operational Hours</h4>
            <ul className={`space-y-2.5 text-xs ${theme === 'light' ? 'text-zinc-650' : 'text-zinc-400'}`}>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-500 flex-shrink-0" />
                <span>Tuesday - Friday: 10AM - 7PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-500 flex-shrink-0" />
                <span>Saturday - Sunday: 11AM - 5PM</span>
              </li>
              <li className="text-[10px] text-zinc-500 font-mono">CLOSED MONDAYS</li>
            </ul>
          </div>

          {/* Column 4: Design manifesto */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-gold-600 uppercase font-bold">Manifesto Shield</h4>
            <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-zinc-550' : 'text-zinc-500'}`}>
              We stand against average neutral walls and cookie-cutter room presets. We design custom contrasts for patrons who cherish depth, illumination levels, and individualistic expression.
            </p>
          </div>

        </div>

        {/* Copy, credits and references */}
        <div className={`max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono gap-4 ${
          theme === 'light' ? 'text-zinc-450' : 'text-zinc-600'
        }`}>
          <span>&copy; {new Date().getFullYear()} Taj Interior Decor Private Limited. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#portfolio" className="hover:text-gold-600 transition">Theme Specifications</a>
            <span>•</span>
            <a href="#booking" className="hover:text-gold-600 transition">Calendar Terms</a>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Floating Button */}
      <a
        href="https://wa.me/919811082533"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 stroke-[2.2]" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] group-hover:ml-2 transition-all duration-300 ease-out font-sans text-xs font-semibold whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

    </div>
  );
}
