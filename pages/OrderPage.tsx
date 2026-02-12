
import React, { useState } from 'react';
import { store } from '../store';
import { Package, Order, OrderStatus, User, PackageType } from '../types';

interface OrderPageProps {
  pkg: Package;
  user: User;
  onOrderSuccess: (order: Order) => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ pkg, user, onOrderSuccess }) => {
  const settings = store.getSettings();
  const serviceCharge = Math.ceil((pkg.price * settings.serviceChargePercent) / 100);
  const totalPayable = pkg.price + serviceCharge;

  const [formData, setFormData] = useState({
    playerUid: '',
    playerName: '',
    loginMethod: 'Facebook',
    loginEmail: '',
    loginPassword: '',
    backupCode: '',
    paymentMethod: 'bKash',
    senderNumber: '',
    transactionId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        userId: user.id,
        playerUid: pkg.type === PackageType.IN_GAME ? formData.loginEmail : formData.playerUid,
        playerName: pkg.type === PackageType.IN_GAME ? `Login: ${formData.loginMethod}` : (formData.playerName || 'Customer'),
        packageId: pkg.id,
        packageName: pkg.name,
        amount: pkg.amount,
        price: pkg.price,
        serviceCharge,
        totalPayable,
        paymentMethod: formData.paymentMethod,
        senderNumber: formData.senderNumber,
        transactionId: formData.transactionId,
        status: OrderStatus.PENDING,
        createdAt: new Date().toISOString(),
        loginMethod: pkg.type === PackageType.IN_GAME ? formData.loginMethod : undefined,
        loginEmail: pkg.type === PackageType.IN_GAME ? formData.loginEmail : undefined,
        loginPassword: pkg.type === PackageType.IN_GAME ? formData.loginPassword : undefined,
        backupCode: pkg.type === PackageType.IN_GAME ? formData.backupCode : undefined,
      };

      store.addOrder(newOrder);
      setPlacedOrder(newOrder);
      setShowSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (showSuccess && placedOrder) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="glass-card max-w-lg w-full rounded-3xl p-8 border border-emerald-500/30 text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-orbitron font-black text-white mb-2 uppercase">Order Placed!</h2>
          <p className="text-slate-400 mb-8 text-sm">Your order ID: <span className="text-emerald-400 font-mono font-bold">{placedOrder.id}</span></p>
          <button 
            onClick={() => onOrderSuccess(placedOrder)}
            className="w-full py-4 bg-emerald-500 rounded-xl text-white font-black hover:scale-[1.02] transition"
          >
            Track in Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details Column */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-3xl p-8 border border-slate-800 sticky top-24">
            <h2 className="text-xl font-orbitron font-bold text-white mb-6 uppercase">Order Info</h2>
            <div className="bg-slate-900 rounded-2xl p-4 flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">💎</div>
              <div>
                <p className="text-white font-bold">{pkg.name}</p>
                <p className="text-xs text-slate-500">Fast Delivery: {pkg.deliveryTime}</p>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-white">৳{pkg.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service Fee</span>
                <span className="text-white">৳{serviceCharge}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-black text-emerald-500">৳{totalPayable}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form Column */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Account Details */}
            <div className="glass-card rounded-3xl p-8 border border-slate-800">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">1</div>
                <h3 className="text-lg font-orbitron font-bold text-white uppercase">Account Details</h3>
              </div>

              {pkg.type === PackageType.IN_GAME ? (
                <div className="space-y-6">
                   <div className="grid grid-cols-3 gap-3">
                      {['Facebook', 'Gmail', 'VK'].map(method => (
                        <button 
                          key={method}
                          type="button"
                          onClick={() => setFormData({...formData, loginMethod: method})}
                          className={`py-3 rounded-xl border font-bold text-xs transition-all ${formData.loginMethod === method ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}
                        >
                          {method}
                        </button>
                      ))}
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="text" placeholder="Email / Phone" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-emerald-500 outline-none" value={formData.loginEmail} onChange={e => setFormData({...formData, loginEmail: e.target.value})} />
                      <input required type="password" placeholder="Password" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-emerald-500 outline-none" value={formData.loginPassword} onChange={e => setFormData({...formData, loginPassword: e.target.value})} />
                   </div>
                   <input type="text" placeholder="Backup Codes (Required for Gmail)" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-emerald-500 outline-none" value={formData.backupCode} onChange={e => setFormData({...formData, backupCode: e.target.value})} />
                   <p className="text-[10px] text-slate-500 italic">* Gmail লগইনের জন্য অবশ্যই ২-৩টি ব্যাকআপ কোড দিন।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Player UID</label>
                    <input required type="text" placeholder="e.g. 12345678" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-emerald-500 outline-none" value={formData.playerUid} onChange={e => setFormData({...formData, playerUid: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Account Name (Optional)</label>
                    <input type="text" placeholder="Game Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-emerald-500 outline-none" value={formData.playerName} onChange={e => setFormData({...formData, playerName: e.target.value})} />
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className="glass-card rounded-3xl p-8 border border-slate-800">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">2</div>
                <h3 className="text-lg font-orbitron font-bold text-white uppercase">Payment</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-8">
                {['bKash', 'Nagad', 'Binance'].map(method => (
                  <button key={method} type="button" onClick={() => setFormData({...formData, paymentMethod: method})} className={`py-3 rounded-xl border font-bold text-xs transition-all ${formData.paymentMethod === method ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 text-slate-500'}`}>
                    {method}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 mb-8 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Send Money to:</p>
                  <p className="text-lg font-black text-white">{formData.paymentMethod === 'bKash' ? settings.bkashNumber : formData.paymentMethod === 'Nagad' ? settings.nagadNumber : settings.binanceId}</p>
                </div>
                <button type="button" onClick={() => navigator.clipboard.writeText(formData.paymentMethod === 'bKash' ? settings.bkashNumber : formData.paymentMethod === 'Nagad' ? settings.nagadNumber : settings.binanceId)} className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">COPY</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="tel" placeholder="Sender Number" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 text-white outline-none" value={formData.senderNumber} onChange={e => setFormData({...formData, senderNumber: e.target.value})} />
                <input required type="text" placeholder="Transaction ID (TrxID)" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 text-white outline-none" value={formData.transactionId} onChange={e => setFormData({...formData, transactionId: e.target.value})} />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className={`w-full py-5 rounded-2xl text-white font-black text-lg shadow-2xl transition-all ${isSubmitting ? 'bg-slate-700 cursor-not-allowed' : 'bg-emerald-500 hover:scale-[1.01] hover:shadow-emerald-500/20'}`}>
              {isSubmitting ? 'Verifying...' : 'Submit Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
