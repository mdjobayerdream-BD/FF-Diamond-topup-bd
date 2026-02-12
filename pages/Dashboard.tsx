
import React, { useState } from 'react';
import { store } from '../store';
import { User, Order, OrderStatus } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const allOrders = store.getOrders();
  const userOrders = allOrders.filter(o => o.userId === user.id);
  const totalSpent = userOrders
    .filter(o => o.status === OrderStatus.COMPLETED)
    .reduce((sum, o) => sum + o.totalPayable, 0);

  const [activeTab, setActiveTab] = useState<'orders' | 'payments'>('orders');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'text-amber-400 bg-amber-400/20 border-amber-400/30';
      case OrderStatus.PROCESSING: return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case OrderStatus.COMPLETED: return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      case OrderStatus.CANCELLED: return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-emerald-500 mb-4 border-2 border-slate-700 shadow-xl">
                {user.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <p className="text-slate-500 text-sm mb-6">{user.phone}</p>
              
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Total Orders</p>
                  <p className="text-lg font-bold text-white">{userOrders.length}</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Total Spent</p>
                  <p className="text-lg font-bold text-emerald-500">৳{totalSpent}</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="glass-card rounded-3xl overflow-hidden border border-slate-800">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center px-6 py-4 transition font-bold ${activeTab === 'orders' ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500' : 'text-slate-400 hover:bg-slate-800/50'}`}
            >
              My Orders
            </button>
            <button 
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center px-6 py-4 transition font-bold ${activeTab === 'payments' ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500' : 'text-slate-400 hover:bg-slate-800/50'}`}
            >
              Payment History
            </button>
            <button className="w-full flex items-center px-6 py-4 text-slate-400 hover:bg-slate-800/50 transition">
              Profile Settings
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-orbitron font-bold text-white">
              {activeTab === 'orders' ? 'Order History' : 'Payment Records'}
            </h2>
          </div>

          {userOrders.length > 0 ? (
            <div className="space-y-4">
              {userOrders.map(order => (
                <div key={order.id} className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition group relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-5">
                      <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center p-3 border border-slate-800 shadow-inner">
                        <img 
                          src={order.packageName.toLowerCase().includes('diamond') ? "https://pngimg.com/uploads/diamond/diamond_PNG6682.png" : "https://static.wikia.nocookie.net/freefire/images/b/b3/Monthly_Membership_Icon.png"} 
                          alt="pkg"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-black text-white">{order.packageName}</h4>
                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Order ID:</span>
                          <span className="text-xs font-mono text-emerald-400 font-black bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 shadow-sm">{order.id}</span>
                        </div>
                        {activeTab === 'orders' ? (
                          <p className="text-xs text-slate-400">Player UID: <span className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded ml-1">{order.playerUid}</span></p>
                        ) : (
                          <p className="text-xs text-slate-400">Method: <span className="text-emerald-500 font-bold">{order.paymentMethod}</span> • TrxID: <span className="text-slate-300 font-mono">{order.transactionId}</span></p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end space-y-3">
                      <div className={`px-5 py-2 rounded-full border text-xs font-black uppercase tracking-widest shadow-xl ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                      <div className="flex flex-col items-start md:items-end">
                        <p className="text-2xl font-black text-white">৳{order.totalPayable}</p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-20 border border-slate-800 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 text-slate-700">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Records Found</h3>
              <p className="text-slate-500 max-w-sm mb-8">You haven't made any transactions yet. Start topping up your game account today!</p>
              <button className="bg-emerald-500 px-8 py-3 rounded-xl font-bold text-white shadow-xl shadow-emerald-500/20">Go Shop</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
