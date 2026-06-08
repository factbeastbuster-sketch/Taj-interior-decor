import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { Focus, Maximize2, Zap, Palette, Map, MoveRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'living-room-1',
    title: 'The Gilded Sovereign Main Hall',
    description: 'A striking luxury lounge fusing back-lit fluted timber arches with graphite marble floors and custom-curated gold velvet lounges, optimized for rich contrast and intimate gatherings.',
    category: 'Living Room',
    style: 'Modern Luxury',
    image: '/src/assets/images/living_room_1780922335753.png',
    features: ['Matte graphite basalt stone floor tiles', '2400K direct glow warm golden cove LEDs', 'Bespoke classic gold silk-bouclé lounges', 'Charcoal oak architectural wall panelling']
  },
  {
    id: 'bedroom-1',
    title: 'Minimalist Gilded Obsidian Chamber',
    description: 'A dark-mode private retreat centered around a low-slung platform bed frame. Vertical pure gold LED channels slice through textured slate headboards to introduce high-design warmth.',
    category: 'Bedroom',
    style: 'Minimalist Gold',
    image: '/src/assets/images/bedroom_1780922356997.png',
    features: ['Low-profile black metallic custom bed frame', 'Slate grey raw silk high-density linens', 'Subtle 12V glowing custom-brass gold channels', 'Polished industrial concrete wall wash']
  },
  {
    id: 'kitchen-1',
    title: 'Obsidian & Gold Culinary Suite',
    description: 'Ultra-modern culinary quarters boasting custom matte black obsidian counter slabs lined with stunning golden veins and solid brass accents, offset by striking golden counter wash lights.',
    category: 'Kitchen',
    style: 'Imperial Gold',
    image: '/src/assets/images/kitchen_1780922378166.png',
    features: ['Rare black quartzite with genuine golden veins', 'Dimmable under-cabinet warm golden LED strip systems', 'Textured champagne-gold leather high counter stools', 'Fingerprint-resistant matte black titanium cabinets']
  },
  {
    id: 'office-1',
    title: 'The Brushed Brass Executive Study',
    description: 'A masculine executive workspace hosting hand-rubbed ebonized wood shelving towers, contrasted beautifully by a custom-minted brushed brass architect table lamp.',
    category: 'Office',
    style: 'Creative Studio',
    image: '/src/assets/images/office_1780922402050.png',
    features: ['Ebonized matte-black bespoke solid oak shelving', 'Ergonomic charcoal top-grain Italian leather work chair', 'Satin black double-thickness desk top', 'Brushed brass solid desk light fixture']
  }
];

interface PortfolioProps {
  onSelectStyle: (styleName: string, serviceType: string) => void;
  theme?: 'light' | 'dark';
}

export default function Portfolio({ onSelectStyle, theme = 'dark' }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office'>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className={`py-20 border-t relative overflow-hidden transition-colors duration-300 ${
      theme === 'light' ? 'bg-zinc-50 border-zinc-200/80' : 'bg-zinc-950 border-zinc-900'
    }`}>
      {/* Background gold circular glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-gold-500"></span>
              <span className="text-gold-500 font-mono tracking-widest text-xs uppercase font-semibold">PREVIEW THE EXTRAORDINARY</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-sans font-bold tracking-tight leading-none ${
              theme === 'light' ? 'text-zinc-950' : 'text-white'
            }`}>
              Signature Spaces
            </h2>
            <p className={`mt-3 font-sans leading-relaxed text-sm ${
              theme === 'light' ? 'text-zinc-600 font-medium' : 'text-zinc-400'
            }`}>
              Explore how we harness the luxury of black coal surfaces paired with the glowing, passionate energy of warm gold tones to engineer master-crafted spaces.
            </p>
          </div>

          {/* Filtering tabs */}
          <div className={`flex flex-wrap gap-1.5 border-b pb-2 ${theme === 'light' ? 'border-zinc-200' : 'border-zinc-900'}`}>
            {(['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs tracking-wider uppercase font-mono font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-black font-semibold shadow-lg shadow-gold-500/20'
                    : theme === 'light'
                      ? 'text-zinc-650 hover:text-zinc-900 hover:bg-zinc-200/50'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`group rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col justify-between hover:shadow-lg ${
                  theme === 'light'
                    ? 'bg-white border-zinc-200/80 hover:border-gold-500/30 hover:shadow-zinc-250/50 shadow-xs'
                    : 'bg-zinc-900/20 border-zinc-900 hover:border-gold-500/30'
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out brightness-[0.8] group-hover:brightness-95"
                  />
                  {/* Subtle shadow gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Absolute positioning badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/85 backdrop-blur-md border border-zinc-850 text-gold-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="bg-gold-500 font-mono text-[10px] text-black uppercase tracking-wider px-3 py-1.5 rounded-full font-bold shadow-xs">
                      {item.style}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveItem(item)}
                    className="absolute bottom-4 right-4 bg-zinc-950/90 hover:bg-gold-500 border border-zinc-805 hover:border-gold-500 hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className={`text-lg font-bold font-sans transition-colors duration-300 group-hover:text-gold-500 ${
                      theme === 'light' ? 'text-zinc-900' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`mt-2 text-xs font-sans leading-relaxed line-clamp-2 ${
                      theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  <div className={`mt-4 pt-4 border-t flex items-center justify-between ${
                    theme === 'light' ? 'border-zinc-150' : 'border-zinc-900/60'
                  }`}>
                    <button
                      onClick={() => setActiveItem(item)}
                      className={`font-mono text-xs tracking-wider uppercase font-semibold transition-colors flex items-center gap-1.5 group/btn cursor-pointer ${
                        theme === 'light' ? 'text-zinc-850 hover:text-gold-600' : 'text-gold-500 hover:text-gold-400'
                      }`}
                    >
                      Specifications <MoveRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => onSelectStyle(item.style, item.category)}
                      className={`font-mono text-xs tracking-wider uppercase font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                        theme === 'light' ? 'text-zinc-550 hover:text-gold-600' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Select Style <Zap className="h-3 w-3 text-gold-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`border rounded-3xl overflow-hidden max-w-2xl w-full relative z-10 shadow-2xl max-h-[85vh] flex flex-col ${
                theme === 'light' ? 'bg-white border-zinc-250 shadow-zinc-300/40' : 'bg-zinc-900 border-zinc-800 shadow-gold-500/5'
              }`}
            >
              <div className="overflow-y-auto">
                <div className="relative h-60 md:h-80 w-full bg-black">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[0.85]"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    theme === 'light' ? 'from-white via-transparent to-transparent' : 'from-zinc-900 via-transparent to-transparent'
                  }`} />
                  <button
                    onClick={() => setActiveItem(null)}
                    className="absolute top-4 right-4 bg-black/80 hover:bg-black/95 text-white rounded-full p-2 border border-zinc-800 hover:border-zinc-700 transition cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`border font-mono text-xs uppercase px-2.5 py-1 rounded ${
                      theme === 'light' 
                        ? 'bg-amber-50 border-gold-400/30 text-gold-800 font-semibold' 
                        : 'bg-gold-950/80 border-gold-500/30 text-gold-400'
                    }`}>
                      Category: {activeItem.category}
                    </span>
                    <span className={`border font-mono text-xs uppercase px-2.5 py-1 rounded ${
                      theme === 'light' 
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-800 font-semibold' 
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-300'
                    }`}>
                      Style Palette: {activeItem.style}
                    </span>
                  </div>

                  <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
                    theme === 'light' ? 'text-zinc-900' : 'text-white'
                  }`}>
                    {activeItem.title}
                  </h3>

                  <p className={`text-xs md:text-sm leading-relaxed mb-6 ${
                    theme === 'light' ? 'text-zinc-650' : 'text-zinc-400'
                  }`}>
                    {activeItem.description}
                  </p>

                  <div className={`border-t pt-5 ${theme === 'light' ? 'border-zinc-150' : 'border-zinc-800'}`}>
                    <h4 className="text-xs font-mono tracking-widest uppercase text-gold-600 dark:text-gold-500 font-bold mb-3 flex items-center gap-2">
                      <Focus className="h-4 w-4" /> Material & Design Architecture
                    </h4>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {activeItem.features.map((feature, idx) => (
                        <li key={idx} className={`flex items-start gap-2 text-xs ${
                          theme === 'light' ? 'text-zinc-700' : 'text-zinc-350'
                        }`}>
                          <span className="h-1.5 w-1.5 bg-gold-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking CTA trigger inside modal */}
                  <div className={`mt-8 pt-5 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                    theme === 'light' ? 'border-zinc-150' : 'border-zinc-800'
                  }`}>
                    <div className="text-[11px] text-zinc-500 font-mono">
                      Interested in this specific mood layout? Apply to start drafting:
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onSelectStyle(activeItem.style, activeItem.category);
                          setActiveItem(null);
                        }}
                        className="bg-gold-500 hover:bg-gold-400 text-black text-xs font-mono uppercase px-5 py-2.5 rounded-lg transition font-bold w-full sm:w-auto shadow-md cursor-pointer"
                      >
                        Apply to Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
