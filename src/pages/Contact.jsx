import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Contact() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false,
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      navigate('/success');
    } catch (err) {
      console.error('Error saving message:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <SEO title="Contact Us" description="Get in touch with Ather Agency. Let's discuss your project and take your brand to the next level." path="/contact" />
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary-600 dark:text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
            {t('contact.tag')}
          </p>
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {[
            { icon: '📧', label: t('contact.email'), value: 'atheragancy@gmail.com' },
            { icon: '📱', label: t('contact.phone'), value: '01140507026' },
            { icon: '📍', label: t('contact.address'), value: 'Tanta, Egypt' },
          ].map((contact, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl mb-3">{contact.icon}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">{contact.label}</p>
              <p className="text-gray-900 dark:text-white font-semibold">{contact.value}</p>
            </div>
          ))}
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-xl mb-8 text-center font-medium animate-fade-in">
            {t('contact.success')}
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl mb-8 text-center font-medium animate-fade-in">
            {t('contact.error')}
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('contact.fullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500
                             focus:border-primary-600 focus:outline-none transition-colors"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('contact.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500
                             focus:border-primary-600 focus:outline-none transition-colors"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('contact.phone')}</label>
                <input
                  type="tel" name="phone" value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500
                             focus:border-primary-600 focus:outline-none transition-colors"
                  placeholder={t('contact.phonePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('contact.company')}</label>
                <input
                  type="text" name="company" value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500
                             focus:border-primary-600 focus:outline-none transition-colors"
                  placeholder={t('contact.companyPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {t('contact.message')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message" value={formData.message}
                onChange={handleChange} required rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500
                           focus:border-primary-600 focus:outline-none transition-colors resize-none"
                placeholder={t('contact.messagePlaceholder')}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary-600 text-white font-semibold py-3.5 rounded-lg
                         hover:bg-primary-700 transition-colors duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t('contact.sending')}
                </>
              ) : t('contact.send')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}