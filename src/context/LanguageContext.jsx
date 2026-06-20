import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('ather-lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const isAr = lang === 'ar';

  // Persist language choice
  useEffect(() => {
    try { localStorage.setItem('ather-lang', lang); } catch {}
  }, [lang]);

  // Set document direction + lang attribute
  useEffect(() => {
    document.documentElement.dir  = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    // Add/remove Arabic font class
    if (isAr) {
      document.documentElement.classList.add('font-ar');
    } else {
      document.documentElement.classList.remove('font-ar');
    }
  }, [lang, isAr]);

  // Translation function
  const t = (key) => {
    const entry = translations[key];
    if (!entry) return key; // fallback to key if not found
    return entry[lang] || entry.en || key;
  };

  // Toggle language
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isAr, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export { LanguageContext };
