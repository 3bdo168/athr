import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export default function ServicesControl() {
  const { services, addService, updateService, deleteService } = useAdmin();
  const [newService, setNewService] = useState({ name: '', price: '', status: 'Active' });
  const [showForm, setShowForm] = useState(false);

  const handleAddService = () => {
    if (!newService.name.trim() || !newService.price.trim()) return;
    addService({ ...newService, clients: 0 });
    setNewService({ name: '', price: '', status: 'Active' });
    setShowForm(false);
  };

  const toggleServiceStatus = (id, currentStatus) => {
    // Cycle: Active → Busy → Inactive → Active
    const next = currentStatus === 'Active' ? 'Busy' : currentStatus === 'Busy' ? 'Inactive' : 'Active';
    updateService(id, { status: next });
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/40 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200";

  const statusConfig = {
    Active:   { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: '●', label: 'Active', dot: 'bg-emerald-500' },
    Busy:     { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: '🔥', label: 'High Load', dot: 'bg-amber-500' },
    Inactive: { badge: 'bg-gray-800 text-gray-500 border-transparent', icon: '○', label: 'Inactive', dot: 'bg-gray-600' },
  };

  const nextStatusLabel = { Active: 'Set High Load 🔥', Busy: 'Set Inactive', Inactive: 'Set Active' };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Services Library</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Manage service availability. Use{' '}
            <span className="text-amber-400 font-bold">🔥 High Load</span>{' '}
            when your team is fully booked — clients will see a waitlist option.
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 ${
            showForm 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
          }`}
        >
          {showForm ? '✕ Close' : '+ Register Service'}
        </button>
      </div>

      {/* Busy services alert banner */}
      {services.some(s => s.status === 'Busy') && (
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-4 mb-8">
          <span className="text-xl mt-0.5">🔥</span>
          <div>
            <p className="font-bold text-amber-400 text-sm mb-1">High Load Services</p>
            <p className="text-amber-300/70 text-xs">
              {services.filter(s => s.status === 'Busy').map(s => s.name).join(', ')} {services.filter(s => s.status === 'Busy').length === 1 ? 'is' : 'are'} currently at capacity. Clients can join the waitlist from the Pricing page. Check <span className="font-bold">Waitlist</span> in the nav to see leads.
            </p>
          </div>
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 mb-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-white mb-6">Register New Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-end">
            <div className="lg:col-span-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ml-1">Service Title</label>
              <input 
                className={inputCls} 
                placeholder="e.g. SEO Optimization"
                value={newService.name} 
                onChange={e => setNewService({ ...newService, name: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ml-1">Starting Price</label>
              <input 
                className={inputCls} 
                placeholder="e.g. 5,000 EGP/mo"
                value={newService.price} 
                onChange={e => setNewService({ ...newService, price: e.target.value })} 
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleAddService} 
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                Register
              </button>
              <button 
                onClick={() => setShowForm(false)} 
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="grid gap-4">
        {services.map(service => {
          const cfg = statusConfig[service.status] || statusConfig.Active;
          const isBusy = service.status === 'Busy';

          return (
            <div 
              key={service.id} 
              className={`group backdrop-blur-sm border p-6 rounded-2xl transition-all duration-300 ${
                isBusy
                  ? 'bg-amber-900/10 border-amber-600/30 hover:border-amber-500/50'
                  : 'bg-gray-900/30 hover:bg-gray-800/40 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                    isBusy
                      ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
                      : service.status === 'Active' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {isBusy ? '🔥' : service.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1">{service.name}</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <span className="text-blue-500 font-black">PRICE:</span> {service.price}
                      </span>
                      <span className="flex items-center gap-1.5 border-l border-gray-800 pl-4">
                        <span className="text-blue-500 font-black">CLIENTS:</span> {service.clients ?? 0}
                      </span>
                      {isBusy && (
                        <span className="flex items-center gap-1 text-amber-400 border-l border-gray-800 pl-4">
                          <span className="animate-pulse">●</span> Waitlist accepting signups
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 pt-6 md:pt-0 border-t md:border-t-0 border-gray-800">
                  <div className="flex flex-col items-end mr-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleServiceStatus(service.id, service.status)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                        isBusy
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : service.status === 'Active'
                          ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                      }`}
                    >
                      {nextStatusLabel[service.status]}
                    </button>
                    
                    <button 
                      onClick={() => deleteService(service.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800/50 text-gray-600 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                      title="Delete Service"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {services.length === 0 && (
          <div className="text-center py-24 bg-gray-900/20 rounded-3xl border border-dashed border-gray-800/60">
            <div className="text-4xl mb-4 opacity-30">📂</div>
            <h3 className="text-xl font-bold text-white mb-2">No services registered</h3>
            <p className="text-gray-500 max-w-xs mx-auto text-sm">Add your agency's services to start managing and tracking client requests.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="mt-8 px-6 py-2.5 bg-blue-600/10 border border-blue-600/20 text-blue-500 hover:bg-blue-600/20 rounded-xl font-bold text-sm transition-all"
            >
              + Register First Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
