import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: "Aarav Mehra",
    role: "CEO, Nexo Developments",
    text: "Taj Interior Decor transformed our corporate lounge with an obsidian and rich copper-orange styling that completely redefined our brand aura. Extraordinary spatial design and pristine timing.",
    rating: 5,
    project: "Skyline Corporate Lounge"
  },
  {
    name: "Zara Henderson",
    role: "Private Homeowner",
    text: "The pumpkin velvet sofa pairing against raw charcoal stone flutes is a masterpiece. I look at my master bedroom every single day and love the Moody Minimalism layout they configured.",
    rating: 5,
    project: "Penthouse Master Suite"
  },
  {
    name: "Rohan & Priya Roy",
    role: "Founders, Cafe Terroir",
    text: "Their attention to smart under-cabinet lighting and quartzite veins in our kitchen was outstanding. We booked an Obsidian Signature Consultation and got Contractor-ready drawings within days.",
    rating: 5,
    project: "Bespoke Culinary Hall"
  }
];

interface TestimonialsProps {
  theme?: 'light' | 'dark';
}

export default function Testimonials({ theme = 'dark' }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - offset : scrollLeft + offset;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className={`py-24 border-t relative transition-colors duration-300 overflow-hidden ${
      theme === 'light' ? 'bg-white border-zinc-200/80' : 'bg-zinc-950 border-zinc-900'
    }`}>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>
 
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-xl text-left">
            <span className="text-orange-500 font-mono tracking-widest text-xs uppercase font-semibold">PATRON CORRESPONDENCE</span>
            <h2 className={`text-4xl font-bold tracking-tight mt-3 ${
              theme === 'light' ? 'text-zinc-950' : 'text-white'
            }`}>Sovereign Stories</h2>
            <p className={`mt-4 text-sm font-sans ${
              theme === 'light' ? 'text-zinc-650' : 'text-zinc-400'
            }`}>
              Hear from developers, luxury homeowners, and commercial managers who commissioned Taj to engineer their environments.
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className={`p-3 rounded-full border transition duration-300 cursor-pointer ${
                theme === 'light'
                  ? 'bg-zinc-50 hover:bg-zinc-150 border-zinc-200 text-zinc-800'
                  : 'bg-zinc-900 border-zinc-800 text-gold-500 hover:border-gold-500/40 hover:text-white'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-3 rounded-full border transition duration-300 cursor-pointer ${
                theme === 'light'
                  ? 'bg-zinc-900 hover:bg-zinc-805 text-white'
                  : 'bg-gold-500 border-gold-500 text-black hover:bg-gold-450'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
 
        {/* Horizontal scroll container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none scroll-smooth select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className={`w-[85vw] sm:w-[420px] md:w-[380px] flex-shrink-0 border rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-orange-500/20 transition-all duration-300 relative group snap-center ${
                theme === 'light' 
                  ? 'bg-zinc-50 border-zinc-200/80 hover:bg-zinc-100/55' 
                  : 'bg-zinc-900/40 border-zinc-900'
              }`}
            >
              <div className="absolute top-6 right-6 text-orange-500/10 group-hover:text-orange-500/20 transition-colors pointer-events-none">
                <Quote className="h-10 w-10 stroke-[1.5]" />
              </div>
 
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
 
                <p className={`font-sans text-xs md:text-sm leading-relaxed mb-6 italic select-text text-left ${
                  theme === 'light' ? 'text-zinc-700' : 'text-zinc-300'
                }`}>
                  "{review.text}"
                </p>
              </div>
 
              <div className={`pt-6 border-t flex items-center justify-between ${
                theme === 'light' ? 'border-zinc-200' : 'border-zinc-850'
              }`}>
                <div className="text-left">
                  <h4 className={`font-bold text-sm ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{review.name}</h4>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">{review.role}</p>
                </div>
                <span className={`font-mono text-[9px] px-2.5 py-1 rounded border ${
                  theme === 'light' 
                    ? 'bg-white text-orange-600 border-zinc-200' 
                    : 'bg-zinc-950 text-orange-400 border-zinc-900'
                }`}>
                  {review.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
