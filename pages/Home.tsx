
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

  return (
    <div className="pb-20">
      {/* Hero Banner Section - Matches your uploaded image */}
      <section className="relative h-[500px] md:h-[650px] overflow-hidden bg-[#0b061a] flex items-center justify-center">
        {/* Animated Purple Aura/Flame Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#6b21a8_0%,_transparent_50%)] opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b061a] via-transparent to-[#0b061a] opacity-80"></div>
          
          {/* Stylized background text as seen in your image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none overflow-hidden">
            <span className="text-[20vw] font-black font-orbitron text-purple-500 whitespace-nowrap">JIOFFTOPUP JIOFFTOPUP</span>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 w-full">
          {/* Top Brand Name - Stylized as requested */}
          <div className="absolute top-[-80px] md:top-[-120px] left-4 md:left-12">
            <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
              Jio<span className="text-emerald-400">FF</span>Topup
            </h2>
          </div>

          {/* Main Visual: ID CODE TOPUP */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Floating Diamonds (from image) */}
              <img src="https://pngimg.com/uploads/diamond/diamond_PNG6682.png" className="absolute -left-12 top-0 w-12 h-12 md:w-16 md:h-16 animate-bounce drop-shadow-[0_0_10px_#0ea5e9]" alt="" />
              <img src="https://pngimg.com/uploads/diamond/diamond_PNG6682.png" className="absolute -right-16 top-1/2 w-10 h-10 md:w-14 md:h-14 animate-pulse delay-700 drop-shadow-[0_0_10px_#0ea5e9]" alt="" />
              
              <h3 className="text-5xl md:text-8xl font-black text-white font-orbitron tracking-tighter mb-[-10px] md:mb-[-20px] drop-shadow-2xl">
                ID CODE
              </h3>
            </div>
            <h1 className="text-8xl md:text-[160px] font-black text-[#facc15] font-orbitron tracking-tighter italic drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] leading-[0.85]">
              TOPUP
            </h1>
            
            {/* Small diamond at bottom center */}
            <img src="https://pngimg.com/uploads/diamond/diamond_PNG6682.png" className="mt-8 w-6 h-6 animate-pulse" alt="" />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => onNavigate('topup')}
              className="px-12 py-4 bg-[#facc15] text-black font-black text-xl rounded-xl shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              SHOP NOW
            </button>
            <button 
              onClick={() => onNavigate('how-to')}
              className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              HOW TO BUY
            </button>
          </div>
        </div>

        {/* The character visual from your theme (Sukuna-style character) */}
        <div className="absolute bottom-0 right-0 md:right-[10%] w-full h-full pointer-events-none z-10 flex justify-end opacity-20 md:opacity-40 lg:opacity-60 overflow-hidden">
           <img 
            src="https://static.wikia.nocookie.net/freefire/images/b/b3/Alok_Render.png" 
            alt="Sukuna Aesthetic" 
            className="h-[110%] object-contain translate-x-1/4 filter contrast-125 brightness-75 hue-rotate-[270deg]"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-purple-500 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-orbitron font-black text-white ml-2">
              SELECT <span className="text-purple-500">PACKAGE</span>
            </h2>
            <p className="text-slate-500 text-sm ml-2 mt-1 uppercase tracking-widest font-bold">Best deals on Free Fire Bangladesh</p>
          </div>
          
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800">
            <button 
              onClick={() => setFilter(PackageType.DIAMOND)}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${filter === PackageType.DIAMOND ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
            >
              DIAMONDS
            </button>
            <button 
              onClick={() => setFilter(PackageType.MEMBERSHIP)}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${filter === PackageType.MEMBERSHIP ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
            >
              MEMBERSHIP
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelectPackage} />
          ))}
        </div>
      </section>

      {/* Support Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
          </div>
          <div className="relative z-10 md:flex items-center justify-between">
            <div className="max-w-xl">
              <h3 className="text-3xl font-orbitron font-black text-white mb-4">NEED ANY HELP?</h3>
              <p className="text-slate-300 text-lg mb-8">Our dedicated support team is available 24/7 to help you with your order or any issues you face.</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/8801619789895" target="_blank" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center transition shadow-xl shadow-emerald-500/20">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Support
                </a>
                <a href="https://t.me/freefiretopupstore" target="_blank" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center transition shadow-xl shadow-sky-500/20">
                   Telegram Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
