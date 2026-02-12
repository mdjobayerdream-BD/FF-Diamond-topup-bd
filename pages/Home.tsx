
import React, { useState } from 'react';
import { store } from '../store';
import { Package, PackageType } from '../types';
import PackageCard from '../components/PackageCard';

interface HomeProps {
  onSelectPackage: (pkg: Package) => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectPackage, onNavigate }) => {
  const packages = store.getPackages();
  const [filter, setFilter] = useState<PackageType>(PackageType.DIAMOND);

  const filteredPackages = packages.filter(p => p.type === filter);

  const categories = [
    { type: PackageType.DIAMOND, label: 'UID TOPUP', icon: '🎮' },
    { type: PackageType.IN_GAME, label: 'IN-GAME', icon: '👤' },
    { type: PackageType.MEMBERSHIP, label: 'SUBSCRIPTIONS', icon: '🌟' },
  ];

  return (
    <div className="pb-20">
      {/* Professional Hero Section - EgyTopup Style */}
      <section className="relative h-[400px] md:h-[550px] overflow-hidden bg-[#0a0518] flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.1)_0%,_transparent_60%)]"></div>
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        </div>
        
        <div className="relative z-20 flex flex-col items-center text-center px-4 w-full">
          <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
             <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Official Bangladesh Partner</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white font-orbitron tracking-tight mb-4 drop-shadow-2xl">
            TOPUP <span className="text-emerald-500">EXPERIENCE</span>
          </h1>
          
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base mb-10 leading-relaxed">
            Instant diamond delivery, lowest rates, and premium support. Join over 50,000+ happy players in Bangladesh.
          </p>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-emerald-500 text-white font-black rounded-xl shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95"
            >
              SHOP DIAMONDS
            </button>
            <button 
              onClick={() => onNavigate('how-to')}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              ORDER GUIDE
            </button>
          </div>
        </div>

        {/* Decorative Character Renders */}
        <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-10 flex justify-end opacity-20 md:opacity-40 lg:opacity-60 overflow-hidden">
           <img 
            src="https://static.wikia.nocookie.net/freefire/images/b/b3/Alok_Render.png" 
            alt="Gaming Hero" 
            className="h-[120%] object-contain animate-float"
          />
        </div>
      </section>

      {/* Modern Category Selector Bar */}
      <section id="shop-section" className="max-w-7xl mx-auto px-4 mt-12 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-orbitron font-black text-white mb-1 uppercase">Game Selection</h2>
            <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap items-center bg-slate-900/50 p-1 rounded-2xl border border-slate-800 backdrop-blur-sm gap-1">
            {categories.map((cat) => (
              <button
                key={cat.type}
                onClick={() => setFilter(cat.type)}
                className={`flex items-center space-x-2 px-6 py-3.5 rounded-xl text-xs font-black transition-all duration-300 ${filter === cat.type ? 'category-tab-active text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}
              >
                <span>{cat.icon}</span>
                <span className="tracking-tighter">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelectPackage} />
          ))}
        </div>
      </section>

      {/* Features Grid - EgyTopup inspired icons */}
      <section className="max-w-7xl mx-auto px-4 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Safe & Secure', desc: 'Secure payment gateway', icon: '🛡️' },
            { title: 'Quick Delivery', desc: 'Instant 2-5 min processing', icon: '⚡' },
            { title: 'Best Prices', desc: 'Competitive market rates', icon: '💰' },
            { title: '24/7 Support', desc: 'Active customer care', icon: '🎧' },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-slate-800/50 flex items-start space-x-4">
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase">{feature.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
