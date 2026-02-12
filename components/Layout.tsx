
import React, { useState, useEffect } from 'react';
import { store } from '../store';
import { User, SiteSettings } from '../types';
import { ADMIN_UID } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentPage }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(store.getCurrentUser());
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());

  const handleLogout = () => {
    store.setCurrentUser(null);
    setCurrentUser(null);
    onNavigate('home');
  };

  const Marquee = 'marquee' as any;

  return (
    <div className="min-h-screen flex flex-col bg-[#070312]">
      {/* Professional Notice Bar */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/20 py-2.5 overflow-hidden">
        <Marquee className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em]">
          {settings.noticeText} • FASTEST DELIVERY GUARANTEED • TRUSTED BY THOUSANDS
        </Marquee>
      </div>

      {/* Premium Navigation */}
      <nav className="bg-[#0a0518]/90 sticky top-0 z-50 backdrop-blur-lg border-b border-white/5 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] mr-3 group-hover:scale-110 transition-transform">
              J
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-orbitron font-black text-white tracking-tighter leading-none">
                Jio<span className="text-emerald-500">FF</span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Topup Bangladesh</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'How to Buy', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => onNavigate(item.toLowerCase().replace(/ /g, '-'))} 
                className={`text-xs font-black uppercase tracking-widest transition-colors ${currentPage === item.toLowerCase().replace(/ /g, '-') ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
            
            <div className="h-6 w-px bg-slate-800 mx-2"></div>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onNavigate('dashboard')} 
                  className="flex items-center space-x-2 text-xs font-black text-slate-300 hover:text-emerald-400 uppercase tracking-widest transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  <span>Orders</span>
                </button>
                {currentUser.uid === ADMIN_UID && (
                  <button onClick={() => onNavigate('admin')} className="px-5 py-2.5 rounded-xl border border-emerald-500/50 text-emerald-400 text-xs font-black hover:bg-emerald-500 hover:text-white transition uppercase tracking-widest">Admin</button>
                )}
                <button onClick={handleLogout} className="text-xs font-black text-red-500 hover:text-red-400 uppercase tracking-widest transition">Sign Out</button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')} 
                className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-xl text-xs font-black text-white shadow-xl shadow-emerald-500/20 transition uppercase tracking-widest active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

          <button onClick={() => onNavigate('menu')} className="md:hidden text-slate-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#05020d] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-xl mr-3">J</div>
                <span className="text-2xl font-orbitron font-black text-white">JioFFTopup</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-8">
                The most trusted gaming top-up platform in Bangladesh. We provide instant delivery for Free Fire Diamonds, Memberships, and more with 100% account safety.
              </p>
              <div className="flex space-x-3">
                {['bKash', 'Nagad', 'Rocket', 'Binance'].map(p => (
                   <div key={p} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Products</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition">Diamond Topup</button></li>
                <li><button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition">In-Game Packages</button></li>
                <li><button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition">Level Up Pass</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Support</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><button onClick={() => onNavigate('how-to')} className="hover:text-emerald-400 transition">How to Buy</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition">Help Center</button></li>
                <li><button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-400 transition">Track Order</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-slate-600 uppercase tracking-widest">
            <p>&copy; 2024 JioFFTopup Store. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-6 md:mt-0">
               <a href="#" className="hover:text-emerald-400">Privacy</a>
               <a href="#" className="hover:text-emerald-400">Terms</a>
               <a href="#" className="hover:text-emerald-400">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-40">
        <a 
          href={`https://wa.me/${settings.whatsapp}`}
          target="_blank"
          className="w-16 h-16 bg-[#25D366] rounded-2xl shadow-2xl flex items-center justify-center text-white transform hover:scale-110 hover:rotate-6 transition-all duration-300"
        >
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.284l-.549 2.008 2.056-.54c.939.533 1.891.815 2.969.817l.003.001c3.181 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.77-5.694-5.77zM12.031 0C5.394 0 .012 5.378.012 12.01c0 2.113.547 4.17 1.587 6.007L0 24l6.131-1.609c1.802 1.01 3.847 1.542 5.892 1.545h.008c6.643 0 12.019-5.38 12.022-12.013.001-3.21-1.246-6.228-3.513-8.495A11.957 11.957 0 0012.031 0z"/></svg>
        </a>
      </div>
    </div>
  );
};

export default Layout;
