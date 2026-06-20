import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export default function OffersControl() {
  const { offers, addOffer, updateOffer, deleteOffer } = useAdmin();
  const [newOffer, setNewOffer] = useState({ title: '', description: '', discount: '', expiry: '' });
  const [showForm, setShowForm] = useState(false);

  const handleAddOffer = () => {
    if (!newOffer.title.trim() || !newOffer.discount.trim()) return;
    addOffer({ ...newOffer, createdDate: new Date().toISOString().split('T')[0] });
    setNewOffer({ title: '', description: '', discount: '', expiry: '' });
    setShowForm(false);
  };

  const toggleOfferStatus = (id, currentStatus) => {
    updateOffer(id, { status: currentStatus === 'Active' ? 'Inactive' : 'Active' });
  };

  const inputCls = "w-full px-5 py-3.5 bg-gray-800/40 border border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-white text-sm transition-all";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-xl">🎁</div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Campaign Center</h1>
          </div>
          <p className="text-gray-400 text-sm">Create and launch professional sales promotions and limited-time offers.</p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
            showForm 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20'
          }`}
        >
          {showForm ? '✕ Hide Form' : '+ New Promotion'}
        </button>
      </div>

      {/* Add Form - Refined Premium Card */}
      {showForm && (
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] border border-gray-800 p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
          
          <h2 className="relative z-10 text-2xl font-bold text-white mb-8">Launch New Campaign</h2>
          <div className="relative z-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Campaign Title</label>
                <input className={inputCls} placeholder="e.g. Ramadan Special Offer"
                  value={newOffer.title} onChange={e => setNewOffer({ ...newOffer, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Discount Amount</label>
                <input className={inputCls} placeholder="e.g. 25% OFF or 1,000 EGP"
                  value={newOffer.discount} onChange={e => setNewOffer({ ...newOffer, discount: e.target.value })} />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Detailed Description</label>
              <textarea
                className={`${inputCls} resize-none`} rows={3}
                placeholder="Briefly explain the offer terms and benefit..."
                value={newOffer.description} onChange={e => setNewOffer({ ...newOffer, description: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-end pt-4 border-t border-gray-800/60">
              <div className="md:col-span-1">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Expiration Date</label>
                <input type="date" className={inputCls}
                  value={newOffer.expiry} onChange={e => setNewOffer({ ...newOffer, expiry: e.target.value })} />
              </div>
              <div className="md:col-span-2 flex gap-4">
                <button onClick={handleAddOffer}
                  className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                  Launch Offer
                </button>
                <button onClick={() => setShowForm(false)}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-black uppercase tracking-widest text-xs rounded-2xl transition-all active:scale-95">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offers List - Refined Card Layout */}
      {offers.length === 0 ? (
        <div className="text-center py-32 bg-gray-900/20 rounded-[3rem] border border-dashed border-gray-800">
          <p className="text-5xl mb-6 opacity-30">🎁</p>
          <h3 className="text-xl font-bold text-white mb-2">No active campaigns</h3>
          <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">It's time to boost your sales! Create your first promotional offer to engage your clients.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {offers.map(offer => (
            <div key={offer.id} className="group bg-gray-900/30 backdrop-blur-sm rounded-[2.5rem] border border-gray-800 hover:border-blue-500/30 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-indigo-600/20 border border-indigo-500/10 flex items-center justify-center text-xl shadow-inner">🎟️</div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{offer.title}</h3>
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                        offer.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-gray-800 text-gray-500 border-transparent'
                      }`}>
                        {offer.status}
                      </span>
                    </div>
                  </div>
                  {offer.description && (
                    <p className="text-gray-400 text-[15px] leading-relaxed mb-6 italic border-l-2 border-gray-800 pl-4">{offer.description}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-800/60">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1.5">Value</p>
                      <p className="text-sm font-bold text-white">{offer.discount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1.5">Validity</p>
                      <p className="text-sm font-bold text-red-400/80">{offer.expiry || 'Open Ended'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1.5">Established</p>
                      <p className="text-sm font-bold text-gray-500">{offer.createdDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 min-w-[160px]">
                  <button onClick={() => toggleOfferStatus(offer.id, offer.status)}
                    className={`w-full py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      offer.status === 'Active'
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20'
                    }`}>
                    {offer.status === 'Active' ? 'Set Inactive' : 'Set Active'}
                  </button>
                  <button onClick={() => deleteOffer(offer.id)}
                    className="w-full py-3.5 bg-gray-800/40 hover:bg-red-500/10 text-gray-600 hover:text-red-500 rounded-xl transition-all duration-300 text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-red-500/20">
                    Terminate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}