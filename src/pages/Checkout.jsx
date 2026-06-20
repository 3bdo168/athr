import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { db } from '../firebase/config';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const { dark } = useTheme();
  const { t, lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    industry: '',
  });

  const searchParams = new URLSearchParams(location.search);
  const totalParam = searchParams.get('total') || '0';
  const planParam = searchParams.get('plan') || 'Custom Package';

  const handleNotifyAdmin = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    // Save to Firestore first
    try {
      await addDoc(collection(db, 'orders'), {
        ...formData,
        package: planParam,
        expectedTotal: totalParam,
        createdAt: serverTimestamp(),
        status: 'pending_contact'
      });
    } catch (err) {
      console.error('Failed to save order to database:', err);
      // Even if saving fails, we proceed to WhatsApp to not block the user
    }

    const message = `*New Order Request* 🚀\n\n*Name:* ${formData.name}\n*WhatsApp:* ${formData.whatsapp}\n*Industry:* ${formData.industry}\n*Package:* ${planParam}\n*Price:* ~${totalParam} EGP\n\n_I would like to start this project._`;
    const encodedMessage = encodeURIComponent(message);
    
    // Always open WhatsApp chat with this specific admin number as requested
    const adminContactNumber = "01140507026";
    const cleanPhone = adminContactNumber.replace(/\D/g, ''); 
    const whatsappUrl = `https://wa.me/2${cleanPhone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    navigate('/success');
  };

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-20">
      <SEO 
        title="Checkout" 
        description="Secure your project with Ather Agency." 
        path="/checkout" 
      />
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-display font-black text-gray-900 dark:text-white mb-4">
              {t('checkout.title') || "Order Request"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {t('checkout.subtitle') || "Submit your details to request this package. Our team will contact you shortly to start the project."}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          
          <motion.div 
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="Mohamed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry (Optional)</label>
                    <input 
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                      placeholder="e.g. Real Estate"
                    />
                  </div>
                </div>
              </div>
            </div>


          </motion.div>

          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gray-900 text-white rounded-3xl p-8 sticky top-24 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>📑</span> Order Summary
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-start pb-4 border-b border-gray-800">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Package / Plan</p>
                    <p className="font-bold text-lg">{planParam}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <p className="text-gray-400">Total Price Approx.</p>
                  <p className="font-medium text-gray-300">~{totalParam} EGP</p>
                </div>


              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleNotifyAdmin}
                  disabled={!formData.name || !formData.whatsapp}
                  data-cursor="CLICK"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-blue-600/20"
                >
                  Submit Order & Contact Admin
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">Clicking this will open WhatsApp to notify us of your request so we can start the project.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
