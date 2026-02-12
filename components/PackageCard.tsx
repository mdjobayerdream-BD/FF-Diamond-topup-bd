
import React from 'react';
import { Package } from '../types';

interface PackageCardProps {
  pkg: Package;
  onSelect: (pkg: Package) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect }) => {
  const isMembership = pkg.type === 'MEMBERSHIP';
  
  return (
    <div 
      className="glass-card rounded-[1.5rem] p-6 transition-all duration-300 hover:scale-[1.03] group cursor-pointer border border-white/5 hover:border-emerald-500/40 relative overflow-hidden"
      onClick={() => onSelect(pkg)}
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/10 transition-colors"></div>

      <div className="relative z-10">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
              {pkg.deliveryTime}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
            <img 
              src={isMembership ? "https://static.wikia.nocookie.net/freefire/images/b/b3/Monthly_Membership_Icon.png" : "https://pngimg.com/uploads/diamond/diamond_PNG6682.png"} 
              className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
              alt="icon"
            />
          </div>
        </div>

        {/* Product Image Wrapper (EgyTopup Style) */}
        <div className="flex flex-col items-center mb-6 py-4 bg-slate-950/40 rounded-2xl border border-slate-800/50 group-hover:border-emerald-500/20 transition-colors">
          <h3 className="text-lg font-orbitron font-black text-white text-center px-2 mb-1 group-hover:text-emerald-400 transition-colors">
            {pkg.name}
          </h3>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Free Fire Bangladesh</p>
        </div>

        {/* Pricing */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-black text-white">৳{pkg.price}</span>
            <span className="text-xs text-slate-500 line-through">৳{Math.round(pkg.price * 1.4)}</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded mt-1">
            SAVE 40%
          </span>
        </div>

        {/* Buy Button */}
        <button className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-black text-sm uppercase tracking-tighter shadow-lg shadow-emerald-500/20 group-hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center space-x-2">
          <span>Buy Package</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
      
      {/* Glossy Overlay effect */}
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default PackageCard;
