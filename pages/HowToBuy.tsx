
import React from 'react';

const HowToBuy: React.FC = () => {
  const steps = [
    {
      title: "Select Package",
      desc: "Browse our diamond or membership packages and click 'Buy Package' on your preferred deal.",
      icon: "💎"
    },
    {
      title: "Login/Register",
      desc: "If you're not logged in, you'll be prompted to enter your phone number to track your orders.",
      icon: "🔐"
    },
    {
      title: "Enter Game UID",
      desc: "Provide your Free Fire Player UID carefully. This is where your diamonds will be sent.",
      icon: "🎮"
    },
    {
      title: "Make Payment",
      desc: "Send the total amount to our bKash, Nagad, or Binance ID using the instructions provided.",
      icon: "💸"
    },
    {
      title: "Submit TrxID",
      desc: "Enter your sender number and Transaction ID (TrxID) and click 'Place Order'.",
      icon: "✅"
    },
    {
      title: "Wait & Enjoy",
      desc: "Our team will verify the payment and deliver your diamonds within 5-10 minutes!",
      icon: "🚀"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-4">HOW TO <span className="text-emerald-500">BUY</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">Follow these simple steps to get your diamonds instantly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="glass-card p-8 rounded-3xl border border-slate-800 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
            <div className="text-4xl mb-6">{step.icon}</div>
            <div className="flex items-center mb-4">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-sm mr-3">
                {idx + 1}
              </span>
              <h3 className="text-xl font-orbitron font-bold text-white uppercase">{step.title}</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 glass-card p-8 md:p-12 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 text-center">
        <h3 className="text-2xl font-orbitron font-black text-white mb-4">STILL CONFUSED?</h3>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">Watch our video tutorial or contact our 24/7 support team for assistance.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-emerald-500 px-8 py-4 rounded-2xl font-bold text-white shadow-xl shadow-emerald-500/20 hover:scale-105 transition">Watch Tutorial</button>
          <button className="bg-slate-800 px-8 py-4 rounded-2xl font-bold text-white border border-slate-700 hover:bg-slate-700 transition">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;
