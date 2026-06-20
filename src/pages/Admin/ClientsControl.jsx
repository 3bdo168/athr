import { useState, useEffect } from 'react';
import { getAllClients, updateClientStatus, deleteDocument, clearClientChanges } from '../../firebase/helpers';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

export default function ClientsControl() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { user, loading: authLoading } = useAuth();

  const fetchClients = async () => {
    try {
      const data = await getAllClients();
      setClients(data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.email !== 'abdelrahmanmo147@gmail.com') {
      setLoading(false);
      return;
    }
    fetchClients();
  }, [user, authLoading]);

  const handleApprove = async (uid) => {
    try {
      await updateClientStatus(uid, 'approved');
      setClients(prev => prev.map(c => c.id === uid ? { ...c, status: 'approved' } : c));
      toast.success('Client approved ✅');
    } catch (err) {
      toast.error('Failed to approve client');
    }
  };

  const handleReject = async (uid) => {
    try {
      await updateClientStatus(uid, 'rejected');
      setClients(prev => prev.map(c => c.id === uid ? { ...c, status: 'rejected' } : c));
      toast.success('Client rejected');
    } catch (err) {
      toast.error('Failed to reject client');
    }
  };

  const handleDelete = async (uid) => {
    if (!confirm('Are you sure you want to delete this client? This cannot be undone.')) return;
    try {
      await deleteDocument('clients', uid);
      setClients(prev => prev.filter(c => c.id !== uid));
      toast.success('Client deleted');
    } catch (err) {
      toast.error('Failed to delete client');
    }
  };

  const handleClearChanges = async (uid) => {
    try {
      await clearClientChanges(uid);
      setClients(prev => prev.map(c => c.id === uid ? { ...c, changedFields: [] } : c));
      toast.success('Changes reviewed ✓');
    } catch (err) {
      toast.error('Failed to clear changes');
    }
  };

  const filteredClients = clients.filter(c => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = !search || 
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search);
    return matchesFilter && matchesSearch;
  });

  const pendingCount = clients.filter(c => c.status === 'pending').length;
  const approvedCount = clients.filter(c => c.status === 'approved').length;
  const rejectedCount = clients.filter(c => c.status === 'rejected').length;
  const changedCount = clients.filter(c => c.changedFields?.length > 0).length;

  const statusConfig = {
    pending:  { color: 'text-amber-400 bg-amber-600/15 border-amber-500/20', dot: 'bg-amber-500' },
    approved: { color: 'text-emerald-400 bg-emerald-600/15 border-emerald-500/20', dot: 'bg-emerald-500' },
    rejected: { color: 'text-red-400 bg-red-600/15 border-red-500/20', dot: 'bg-red-500' },
  };

  const changeLabels = {
    name: '✏️ Name changed',
    phone: '📱 Phone changed',
    photoURL: '📷 Photo changed',
  };

  const filterTabs = [
    { key: 'all',      label: 'All',       count: clients.length },
    { key: 'pending',  label: 'Pending',   count: pendingCount },
    { key: 'approved', label: 'Approved',  count: approvedCount },
    { key: 'rejected', label: 'Rejected',  count: rejectedCount },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-3 border-blue-600/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-[0.2em] text-xs mb-3">
          <span className="w-8 h-[2px] bg-blue-600" />
          Client Management
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          Clients
          {pendingCount > 0 && (
            <span className="ml-3 text-base align-middle bg-amber-600/15 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 font-bold">
              {pendingCount} pending
            </span>
          )}
          {changedCount > 0 && (
            <span className="ml-2 text-base align-middle bg-violet-600/15 text-violet-400 px-3 py-1 rounded-full border border-violet-500/20 font-bold">
              {changedCount} updated
            </span>
          )}
        </h1>
        <p className="text-gray-400">Review and manage client registrations</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
              filter === tab.key
                ? 'bg-blue-600/10 border-blue-500/30 ring-1 ring-blue-500/20'
                : 'bg-gray-900/40 border-gray-800/50 hover:border-gray-700'
            }`}
          >
            <p className="text-2xl font-bold text-white mb-1">{tab.count}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{tab.label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3.5 rounded-2xl bg-gray-900/40 border border-gray-800/50 text-white placeholder-gray-500 focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
        />
      </div>

      {/* Client List */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/20 rounded-3xl border border-dashed border-gray-800/50">
          <p className="text-5xl mb-4 opacity-20">👥</p>
          <h3 className="text-white font-bold mb-1">No clients found</h3>
          <p className="text-gray-500 text-sm">
            {filter !== 'all' ? 'Try changing the filter' : 'Clients will appear here when they sign up'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClients.map((client) => {
            const hasChanges = client.changedFields?.length > 0;

            return (
              <div
                key={client.id}
                className={`group p-6 rounded-2xl bg-gray-900/40 backdrop-blur-xl border transition-all duration-200 ${
                  hasChanges
                    ? 'border-violet-500/30 ring-1 ring-violet-500/10'
                    : 'border-gray-800/50 hover:border-gray-700/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {client.photoURL ? (
                        <img src={client.photoURL} alt="" className="w-12 h-12 rounded-xl border-2 border-gray-700 shadow-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-xl">
                          👤
                        </div>
                      )}
                      {/* Photo changed badge */}
                      {client.changedFields?.includes('photoURL') && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-500 border-2 border-gray-900 flex items-center justify-center">
                          <span className="text-[8px]">📷</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base mb-0.5 flex items-center gap-2">
                        {client.name || 'No Name'}
                        {client.changedFields?.includes('name') && (
                          <span className="text-[10px] font-bold text-violet-400 bg-violet-600/15 px-2 py-0.5 rounded-full border border-violet-500/20 animate-pulse">
                            UPDATED
                          </span>
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span>📧 {client.email}</span>
                        <span className="flex items-center gap-1" dir="ltr">
                          📱 {client.phone || 'N/A'}
                          {client.changedFields?.includes('phone') && (
                            <span className="text-[10px] font-bold text-violet-400 bg-violet-600/15 px-1.5 py-0.5 rounded-full border border-violet-500/20 animate-pulse">
                              NEW
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status + Actions */}
                  <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
                    {/* Changed Fields Alert */}
                    {hasChanges && (
                      <div className="flex items-center gap-2">
                        <div className="flex flex-wrap gap-1">
                          {client.changedFields.map((field) => (
                            <span key={field} className="text-[10px] font-bold text-violet-300 bg-violet-600/10 px-2 py-1 rounded-lg border border-violet-500/20">
                              {changeLabels[field] || field}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => handleClearChanges(client.id)}
                          className="px-3 py-1.5 rounded-lg bg-violet-600/15 text-violet-400 border border-violet-500/20 text-[10px] font-bold hover:bg-violet-600/25 transition-all"
                          title="Mark as reviewed"
                        >
                          ✓ Reviewed
                        </button>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${statusConfig[client.status]?.color || statusConfig.pending.color}`}>
                      <div className={`w-2 h-2 rounded-full ${statusConfig[client.status]?.dot || statusConfig.pending.dot} ${client.status === 'pending' ? 'animate-pulse' : ''}`} />
                      {client.status || 'pending'}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {client.status !== 'approved' && (
                        <button
                          onClick={() => handleApprove(client.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 text-xs font-bold hover:bg-emerald-600/25 transition-all"
                        >
                          ✅ Approve
                        </button>
                      )}
                      {client.status !== 'rejected' && (
                        <button
                          onClick={() => handleReject(client.id)}
                          className="px-4 py-2 rounded-xl bg-red-600/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-600/20 transition-all"
                        >
                          ❌ Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="px-3 py-2 rounded-xl bg-gray-800/50 text-gray-500 border border-gray-700/50 text-xs font-bold hover:text-red-400 hover:border-red-500/30 transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
