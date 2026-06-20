import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, updateDoc, doc, increment } from 'firebase/firestore';

export default function AdBanner({ placement }) {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    // Check localStorage for dismissed ads { id: { timestamp, version } }
    try {
      const stored = JSON.parse(localStorage.getItem('dismissedAdsData') || '{}');
      return stored;
    } catch { return {}; }
  });

  // Fetch ALL ads and filter client-side (avoids composite index requirement)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'ads'), (snapshot) => {
      const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const activeAds = snapshot.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(ad => {
          if (ad.placement !== placement) return false;
          if (!ad.isActive) return false;
          if (ad.startDate && ad.startDate > now) return false;
          if (ad.endDate && ad.endDate < now) return false;
          return true;
        });
      setAds(activeAds);
    }, (error) => {
      console.error('AdBanner fetch error:', error);
    });

    return () => unsubscribe();
  }, [placement]);

  // Auto-rotate ads based on displayDuration
  useEffect(() => {
    if (ads.length <= 1) return;

    const currentAd = ads[currentIndex];
    const duration = (currentAd?.displayDuration || 10) * 1000;

    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % ads.length);
        setIsAnimating(false);
      }, 400);
    }, duration);

    return () => clearTimeout(timer);
  }, [ads, currentIndex]);

  // Track ad click
  const handleClick = useCallback(async (ad) => {
    try {
      await updateDoc(doc(db, 'ads', ad.id), {
        clicks: increment(1)
      });
    } catch (e) {
      console.error('Click track error:', e);
    }
  }, []);

  // Dismiss ad and save to localStorage
  const handleDismiss = (adId) => {
    const adData = ads.find(a => a.id === adId);
    const version = adData?.version || 1;
    
    const newDismissed = { 
      ...dismissed, 
      [adId]: { timestamp: Date.now(), version } 
    };
    
    setDismissed(newDismissed);
    localStorage.setItem('dismissedAdsData', JSON.stringify(newDismissed));
  };

  // Filter out dismissed ads based on snooze setting and version
  const visibleAds = ads.filter(ad => {
    const dismissMeta = dismissed[ad.id];
    if (!dismissMeta) return true; // Never dismissed
    
    // If the admin forcefully bumped the version, it should reappear immediately
    if (ad.version && ad.version > dismissMeta.version) return true;
    
    // Otherwise, check if snooze duration has passed
    const snoozeMs = (ad.snoozeHours ?? 24) * 3600 * 1000;
    if (Date.now() - dismissMeta.timestamp > snoozeMs) return true;
    
    return false; // Still within snooze period
  });

  // Nothing to show
  if (!visibleAds.length) return null;

  const safeIndex = currentIndex % visibleAds.length;
  const currentAd = visibleAds[safeIndex];
  if (!currentAd) return null;

  return (
    <div 
      className="relative w-full overflow-hidden my-6 px-4 md:px-0"
      style={{ animation: 'adSlideIn 0.6s ease-out' }}
    >
      {/* Ad Container */}
      <a
        href={currentAd.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick(currentAd)}
        className={`block relative group rounded-2xl overflow-hidden border border-gray-800/50 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 ${isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
        style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}
      >
        {/* Gradient Background (fallback if no image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-gray-900 to-purple-950/90" />
        
        {/* Background Image */}
        {currentAd.imageUrl && (
          <div className="absolute inset-0">
            <img 
              src={currentAd.imageUrl} 
              alt={currentAd.title} 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
              style={{ transition: 'opacity 0.5s ease, transform 8s ease' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 flex items-center justify-between min-h-[120px]">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                {currentAd.badgeText || 'Sponsored'}
              </span>
              {visibleAds.length > 1 && (
                <span className="text-[9px] font-bold text-gray-500">
                  {safeIndex + 1}/{visibleAds.length}
                </span>
              )}
            </div>
            
            <h3 className="text-white font-bold text-lg md:text-xl mb-1 drop-shadow-lg">
              {currentAd.title}
            </h3>
            
            <p className="text-blue-300/80 text-sm font-medium flex items-center gap-1 group-hover:text-blue-200 transition-colors">
              Learn more
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </p>
          </div>

          {currentAd.imageUrl && (
            <div className="hidden md:block w-20 h-20 rounded-xl overflow-hidden border-2 border-white/10 shadow-lg shadow-black/30 ml-4 shrink-0">
              <img src={currentAd.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Progress bar */}
        {visibleAds.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-800/50">
            <div 
              key={safeIndex}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ animation: `adProgress ${currentAd.displayDuration || 10}s linear` }}
            />
          </div>
        )}
      </a>

      {/* Dismiss Button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleDismiss(currentAd.id); }}
        className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-gray-400 hover:text-white transition-all text-xs backdrop-blur-sm border border-gray-700/50"
        title="Dismiss ad"
      >
        ✕
      </button>

      {/* Dots */}
      {visibleAds.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5">
          {visibleAds.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setIsAnimating(false);
                }, 300);
              }}
              className={`rounded-full transition-all ${
                i === safeIndex 
                  ? 'w-5 h-2 bg-blue-500' 
                  : 'w-2 h-2 bg-gray-500/50 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes adSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes adProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
