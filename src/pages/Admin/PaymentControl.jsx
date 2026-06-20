import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function PaymentControl() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [paymentData, setPaymentData] = useState({
    vodafone: '',
    instapay: '',
    instructions: 'Please transfer the exact down payment amount and keep the receipt. Then click on the WhatsApp button below to notify us.'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'payment'));
        if (snap.exists()) {
          setPaymentData(snap.data());
        }
      } catch (err) {
        setError('Failed to load settings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      await setDoc(doc(db, 'settings', 'payment'), paymentData);
      setSuccess('Payment settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save settings: ' + err.message);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Methods</h1>
          <p className="text-gray-400">Manage Vodafone Cash numbers and InstaPay handles.</p>
        </div>
        <div className="text-4xl">💳</div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 max-w-3xl">
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg flex items-center justify-between">
                <span>{success}</span>
                <span className="text-xl">✅</span>
              </div>
            )}
            
            {error && (
               <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
                 {error}
               </div>
            )}

            {/* Vodafone Cash */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">V</div>
                Vodafone Cash Number
              </label>
              <input 
                type="text" 
                name="vodafone"
                value={paymentData.vodafone}
                onChange={handleChange}
                placeholder="e.g. 01000000000"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">This number will receive WhatsApp notifications too, so make sure it is a valid WhatsApp number.</p>
            </div>

            {/* InstaPay */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">IP</div>
                InstaPay Handle
              </label>
              <input 
                type="text" 
                name="instapay"
                value={paymentData.instapay}
                onChange={handleChange}
                placeholder="e.g. agency@instapay"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* General Instructions */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Payment Instructions (displayed to clients)
              </label>
              <textarea 
                name="instructions"
                value={paymentData.instructions}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <button 
                type="submit" 
                disabled={saving}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                Save Settings
              </button>
            </div>
            
          </form>
        )}
      </div>
    </div>
  );
}
