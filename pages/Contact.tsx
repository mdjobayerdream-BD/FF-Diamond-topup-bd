
import React from 'react';
import { store } from '../store';

const Contact: React.FC = () => {
  const settings = store.getSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-4">GET IN <span className="text-emerald-500">TOUCH</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">We are here to help you 24/7 with any queries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-all">
            <h3 className="text-xl font-orbitron font-bold text-white mb-6 uppercase">Direct Support</h3>
            <div className="space-y-6">
              <a 
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                className="flex items-center p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group hover:bg-emerald-500 transition-colors"
              >
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-emerald-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-white transition-colors">WhatsApp Support</p>
                  <p className="text-xs text-slate-400 group-hover:text-emerald-100 transition-colors">Instant chat with our agents</p>
                </div>
              </a>

              <a 
                href={`https://t.me/${settings.telegram}`}
                target="_blank"
                className="flex items-center p-4 bg-sky-500/10 rounded-2xl border border-sky-500/20 group hover:bg-sky-500 transition-colors"
              >
                <div className="w-12 h-12 bg-sky-500 text-white rounded-xl flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.37-.49 1.02-.73 4-1.74 6.67-2.88 8.01-3.44 3.81-1.58 4.61-1.85 5.13-1.86.11 0 .37.03.54.17.14.11.18.27.2.37.02.08.03.22.02.32z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-white transition-colors">Telegram Support</p>
                  <p className="text-xs text-slate-400 group-hover:text-sky-100 transition-colors">Join our telegram channel</p>
                </div>
              </a>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-orbitron font-bold text-white mb-6 uppercase">Operating Hours</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Order Processing</span>
                <span className="text-emerald-400 font-bold">24 Hours / 7 Days</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Live Support</span>
                <span className="text-white font-bold">9:00 AM - 12:00 AM</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Response Time</span>
                <span className="text-white font-bold">&lt; 10 Minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 md:p-10 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-orbitron font-bold text-white mb-8 uppercase">Send a Message</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Your Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email/Phone</label>
              <input 
                type="text" 
                placeholder="How should we reach you?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Subject</label>
              <input 
                type="text" 
                placeholder="What is this about?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message</label>
              <textarea 
                rows={5} 
                placeholder="Write your message here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition resize-none"
              ></textarea>
            </div>
            <button className="w-full py-4 bg-emerald-500 rounded-xl font-bold text-white shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
