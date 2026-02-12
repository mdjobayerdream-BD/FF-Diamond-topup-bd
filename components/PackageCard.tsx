
import React from 'react';
import { Package } from '../types';

interface PackageCardProps {
  pkg: Package;
  onSelect: (pkg: Package) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect }) => {
  return (
    <div 
      className="glass-card rounded-[2rem] p-8 transition-all duration-500 hover:scale-[1.05] group cursor-pointer border border-white/5 hover:border-purple-500/60 relative overflow-hidden hover-glow"
      onClick={() => onSelect(pkg)}
    >
      {/* Background Radial Glow Effect on Hover */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Background Decorative "ID CODE" Logo Watermark (Requested Feature) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 flex flex-col items-center justify-center select-none rotate-[-15deg]">
        <span className="text-4xl font-black font-orbitron whitespace-nowrap">ID CODE</span>
        <span className="text-6xl font-black font-orbitron text-yellow-500">TOPUP</span>
        <span className="text-xs font-black font-orbitron text-white mt-2">JIOFFTOPUP</span>
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-900/80 flex items-center justify-center p-3 border border-slate-800 shadow-inner group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-500">
            <img 
              src={pkg.type === 'DIAMOND' ? "https://pngimg.com/uploads/diamond/diamond_PNG6682.png" : "https://static.wikia.nocookie.net/freefire/images/b/b3/Monthly_Membership_Icon.png"} 
              alt={pkg.name}
              className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-purple-500/20 mb-2 group-hover:bg-purple-500/20 transition-colors">
                {pkg.deliveryTime}
              </span>
              {pkg.type === 'DIAMOND' && (
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-tighter">ID Code</span>
              )}
          </div>
        </div>
        
        <h3 className="text-xl font-orbitron font-black text-white mb-2 group-hover:text-purple-400 transition-colors">
          {pkg.name}
        </h3>
        
        <div className="flex items-baseline space-x-3 mb-8">
          <p className="text-4xl font-black text-white">
            <span className="text-yellow-500 text-lg mr-1">৳</span>{pkg.price}
          </p>
          <p className="text-sm text-slate-500 line-through font-bold">৳{Math.round(pkg.price * 1.3)}</p>
        </div>

        <button className="w-full py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black text-sm uppercase tracking-widest group-hover:bg-purple-600 group-hover:border-purple-400 group-hover:shadow-[0_10px_20px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center justify-center space-x-3">
          <span>Buy Package</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
      
      {/* Bottom Animated Glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
    </div>
  );
};

export default PackageCard;
