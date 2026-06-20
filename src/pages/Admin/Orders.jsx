import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.email !== 'abdelrahmanmo147@gmail.com') {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
        setLoading(false);
      },
      (err) => {
        console.error("Orders listener error:", err);
        setError("Missing permissions. Please update Firestore Rules.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, authLoading]);

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteDoc(doc(db, 'orders', id));
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_payment': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'payment_received': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in_progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const formatStatus = (status) => {
    return status ? status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-lg mx-auto mt-12 bg-red-900/20 border border-red-500/30 rounded-2xl text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <h2 className="text-xl font-bold text-red-500 mb-2">Access Denied</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <p className="text-sm text-gray-500">
          Make sure you have added the rules for <code className="bg-black px-2 py-1 rounded">/orders</code> in your Firebase Console.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
          <p className="text-gray-400">Track incoming project requests and payments.</p>
        </div>
        <div className="text-4xl">🛒</div>
      </div>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
             No orders found. When a client fills the checkout form, it will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-900/50 border-b border-gray-700 text-sm md:text-base">
                <tr>
                  <th className="p-4 font-semibold text-gray-300">Client</th>
                  <th className="p-4 font-semibold text-gray-300">Package</th>
                  <th className="p-4 font-semibold text-gray-300">Down Payment</th>
                  <th className="p-4 font-semibold text-gray-300">Date</th>
                  <th className="p-4 font-semibold text-gray-300">Status</th>
                  <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 text-sm md:text-base">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-white">{order.name}</div>
                      <div className="text-gray-400 text-sm flex gap-2 mt-1">
                        <a href={`https://wa.me/2${order.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          {order.whatsapp}
                        </a>
                        {order.industry && <span>• {order.industry}</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-300">{order.package}</span>
                      <div className="text-xs text-gray-500 mt-1">Expected: {order.expectedTotal} EGP</div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-green-400">{order.downPaymentAmount || '0'} EGP</span>
                    </td>
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                      {order.createdAt ? new Date(order.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                    </td>
                    <td className="p-4">
                      <select 
                        value={order.status || 'pending_payment'}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-semibold appearance-none cursor-pointer outline-none ${getStatusColor(order.status || 'pending_payment')}`}
                      >
                        <option value="pending_payment" className="bg-gray-800 text-white">Pending Payment</option>
                        <option value="payment_received" className="bg-gray-800 text-white">Payment Received</option>
                        <option value="in_progress" className="bg-gray-800 text-white">In Progress</option>
                        <option value="completed" className="bg-gray-800 text-white">Completed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                        title="Delete order"
                      >
                       🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
