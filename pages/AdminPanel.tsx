
import React, { useState } from 'react';
import { store } from '../store';
import { Package, Order, OrderStatus, SiteSettings, PackageType } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'packages' | 'settings'>('orders');
  const [orders, setOrders] = useState<Order[]>(store.getOrders());
  const [packages, setPackages] = useState<Package[]>(store.getPackages());
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPkg, setNewPkg] = useState<Partial<Package>>({
    name: '',
    price: 0,
    amount: 0,
    type: PackageType.DIAMOND,
    deliveryTime: '5-10 Min'
  });

  const handleUpdateStatus = (id: string, status: OrderStatus) => {
    store.updateOrderStatus(id, status);
    setOrders(store.getOrders());
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      store.deletePackage(id);
      setPackages(store.getPackages());
    }
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg: Package = {
      id: 'pkg-' + Date.now(),
      name: newPkg.name || '',
      price: Number(newPkg.price) || 0,
      amount: Number(newPkg.amount) || 0,
      type: newPkg.type || PackageType.DIAMOND,
      deliveryTime: newPkg.deliveryTime || '5-10 Min'
    };
    store.addPackage(pkg);
    setPackages(store.getPackages());
    setShowAddModal(false);
    setNewPkg({ name: '', price: 0, amount: 0, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' });
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    const updated = packages.map(p => p.id === id ? { ...p, price: newPrice } : p);
    store.updatePackages(updated);
    setPackages(updated);
  };

  const saveSettings = () => {
    store.updateSettings(settings);
    alert('Settings Saved Successfully!');
  };

  // Stats calculation
  const totalRevenue = orders.filter(o => o.status === OrderStatus.COMPLETED).reduce((acc, o) => acc + o.totalPayable, 0);
  const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-orbitron font-black text-white">ADMIN <span className="text-emerald-500">DASHBOARD</span></h1>
          <p className="text-slate-500 text-sm">Welcome back, Super Admin</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition flex-shrink-0 ${activeTab === 'orders' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Manage Orders
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition flex-shrink-0 ${activeTab === 'packages' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Edit Packages
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition flex-shrink-0 ${activeTab === 'settings' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Site Settings
          </button>
        </div>
      </div>

      {/* Basic Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6 rounded-3xl border border-slate-800">
          <p className="text-xs text-slate-500 font-bold uppercase mb-1">Total Revenue</p>
          <h3 className="text-3xl font-black text-emerald-500">৳{totalRevenue}</h3>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-slate-800">
          <p className="text-xs text-slate-500 font-bold uppercase mb-1">Total Orders</p>
          <h3 className="text-3xl font-black text-white">{orders.length}</h3>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-slate-800">
          <p className="text-xs text-slate-500 font-bold uppercase mb-1">Pending Orders</p>
          <h3 className="text-3xl font-black text-amber-500">{pendingOrders}</h3>
        </div>
      </div>

      {activeTab === 'orders' && (
        <div className="glass-card rounded-3xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Player UID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Package</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Payment</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{order.id}</div>
                      <div className="text-[10px] text-slate-600">{new Date(order.createdAt).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-emerald-400">{order.playerUid}</div>
                      <div className="text-xs text-slate-500">{order.playerName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-white">{order.packageName}</div>
                      <div className="text-xs text-slate-500">৳{order.totalPayable}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-white">{order.paymentMethod}</div>
                      <div className="text-[10px] text-slate-500">{order.transactionId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter
                        ${order.status === OrderStatus.COMPLETED ? 'bg-emerald-500/20 text-emerald-400' : 
                          order.status === OrderStatus.PENDING ? 'bg-amber-500/20 text-amber-400' : 
                          order.status === OrderStatus.CANCELLED ? 'bg-red-500/20 text-red-400' : 
                          'bg-blue-500/20 text-blue-400'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {order.status === OrderStatus.PENDING && (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(order.id, OrderStatus.COMPLETED)}
                              className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(order.id, OrderStatus.CANCELLED)}
                              className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-500 px-6 py-3 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/20"
            >
              Add New Package
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className="glass-card rounded-2xl p-6 border border-slate-800 group relative">
                <button 
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-white pr-8">{pkg.name}</h4>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">{pkg.type}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Price (BDT)</label>
                    <input 
                      type="number"
                      value={pkg.price}
                      onChange={(e) => handleUpdatePrice(pkg.id, Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-2xl glass-card rounded-3xl p-8 border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Global Site Settings</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">bKash Personal Number</label>
                <input 
                  type="text"
                  value={settings.bkashNumber}
                  onChange={(e) => setSettings({...settings, bkashNumber: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">Nagad Personal Number</label>
                <input 
                  type="text"
                  value={settings.nagadNumber}
                  onChange={(e) => setSettings({...settings, nagadNumber: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">Binance Pay ID</label>
              <input 
                type="text"
                value={settings.binanceId}
                onChange={(e) => setSettings({...settings, binanceId: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">Notice Bar Message</label>
              <textarea 
                rows={3}
                value={settings.noticeText}
                onChange={(e) => setSettings({...settings, noticeText: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">WhatsApp Support</label>
                <input 
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">Telegram Username</label>
                <input 
                  type="text"
                  value={settings.telegram}
                  onChange={(e) => setSettings({...settings, telegram: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                />
              </div>
            </div>
            <button 
              onClick={saveSettings}
              className="w-full py-4 bg-emerald-500 rounded-xl font-bold text-white shadow-lg hover:bg-emerald-600 transition"
            >
              Save All Changes
            </button>
          </div>
        </div>
      )}

      {/* Add Package Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-lg w-full rounded-3xl p-8 border border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white uppercase">Add New Package</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-white">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form onSubmit={handleAddPackage} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Package Name</label>
                <input required type="text" value={newPkg.name} onChange={e => setNewPkg({...newPkg, name: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white" placeholder="e.g. 100 Diamonds" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Price (BDT)</label>
                  <input required type="number" value={newPkg.price} onChange={e => setNewPkg({...newPkg, price: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Diamond Amount</label>
                  <input required type="number" value={newPkg.amount} onChange={e => setNewPkg({...newPkg, amount: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Type</label>
                <select value={newPkg.type} onChange={e => setNewPkg({...newPkg, type: e.target.value as PackageType})} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white">
                  <option value={PackageType.DIAMOND}>Diamond</option>
                  <option value={PackageType.MEMBERSHIP}>Membership</option>
                </select>
              </div>
              <button type="submit" className="w-full py-4 bg-emerald-500 rounded-xl font-bold text-white shadow-lg mt-4">Save Package</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
