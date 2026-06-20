import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  onSnapshot,
  increment,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function AdsControl() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    linkUrl: "",
    imageUrl: "",
    placement: "home_top",
    startDate: "",
    endDate: "",
    displayDuration: 10,
    snoozeHours: 24,
    badgeText: "Sponsored",
    isActive: true,
    clicks: 0,
    version: 1,
  });

  const placements = [
    { id: "home_top", label: "🏠 Home Page (Top - Hero)" },
    { id: "home_middle", label: "🏠 Home Page (Middle)" },
    { id: "home_bottom", label: "🏠 Home Page (Bottom)" },
    { id: "services_top", label: "⚙️ Services Page (Top)" },
    { id: "pricing_top", label: "💰 Pricing Page (Top)" },
    { id: "pricing_bottom", label: "💰 Pricing Page (Bottom)" },
    { id: "portfolio_top", label: "🖼️ Portfolio Page (Top)" },
    { id: "portfolio_bottom", label: "🖼️ Portfolio Page (Bottom)" },
    { id: "checkout_sidebar", label: "🛒 Checkout Page (Sidebar)" },
    { id: "all_pages_popup", label: "🌐 All Pages (Popup)" },
  ];
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.email !== 'abdelrahmanmo147@gmail.com') {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "ads"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setAds(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (error) => {
        console.error("Firestore Ads Error:", error);
        toast.error("Failed to load ads: " + error.message);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [user, authLoading]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      toast.error("Cloudinary is not configured. Add env variables first.");
      return;
    }

    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );

      const uploadedImage = await res.json();

      if (uploadedImage.secure_url) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: uploadedImage.secure_url,
        }));
        toast.success("✅ Image uploaded!");
      } else {
        throw new Error(uploadedImage.error?.message || "Upload error");
      }
    } catch (error) {
      toast.error("Upload failed: " + error.message);
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async () => {
    if (!formData.title.trim()) {
      toast.error("❌ Please enter a Campaign Title");
      return;
    }
    if (!formData.linkUrl.trim()) {
      toast.error("❌ Please enter a Target Link URL");
      return;
    }
    if (!isValidHttpUrl(formData.linkUrl.trim())) {
      toast.error("❌ Please enter a valid URL (http/https)");
      return;
    }
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      toast.error("❌ End date cannot be before start date");
      return;
    }

    setPublishing(true);
    try {
      await addDoc(collection(db, "ads"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      toast.success("🎉 Ad published successfully!");
      setIsModalOpen(false);
      setFormData({
        title: "",
        linkUrl: "",
        imageUrl: "",
        placement: "home_top",
        startDate: "",
        endDate: "",
        displayDuration: 10,
        snoozeHours: 24,
        badgeText: "Sponsored",
        isActive: true,
        clicks: 0,
        version: 1,
      });
    } catch (error) {
      console.error("PUBLISH ERROR:", error);
      toast.error("❌ Publish failed: " + error.message);
    } finally {
      setPublishing(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "ads", id), { isActive: !currentStatus });
      toast.success(`Ad ${!currentStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      toast.error("Failed to update: " + error.message);
    }
  };

  // ✅ FIX 1: increment متعمل import صح دلوقتي
  const forceResetAd = async (id) => {
    try {
      await updateDoc(doc(db, "ads", id), { version: increment(1) });
      toast.success("🔄 Ad forced to show for everyone again!");
    } catch (error) {
      toast.error("Failed to reset: " + error.message);
    }
  };

  const resetClicks = async (id) => {
    if (!window.confirm("Reset clicks to 0?")) return;
    try {
      await updateDoc(doc(db, "ads", id), { clicks: 0 });
      toast.success("Clicks reset to 0");
    } catch (error) {
      toast.error("Failed: " + error.message);
    }
  };

  // ✅ FIX 2: deleteAd فانكشن جديدة كاملة
  const deleteAd = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await deleteDoc(doc(db, "ads", id));
      toast.success("🗑️ Ad deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete: " + error.message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-medium">
            Loading Ad Manager...
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            📢 Ad Management
          </h1>
          <p className="text-gray-500 text-sm">
            Control promotional banners & popups across the website.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <span>➕</span> Create New Ad
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-white">{ads.length}</p>
          <p className="text-xs font-bold text-gray-500 uppercase mt-1">
            Total Ads
          </p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-emerald-400">
            {ads.filter((a) => a.isActive).length}
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase mt-1">
            Active
          </p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-blue-400">
            {ads.reduce((sum, a) => sum + (a.clicks || 0), 0)}
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase mt-1">
            Total Clicks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ads.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <p className="text-5xl mb-4">📢</p>
            <p className="text-gray-400 font-medium">No ads created yet.</p>
            <p className="text-gray-600 text-sm mt-2">
              Click "Create New Ad" to get started.
            </p>
          </div>
        ) : (
          ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-gray-900/50 border border-gray-800 p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center hover:border-gray-700 transition-colors"
            >
              {ad.imageUrl ? (
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full md:w-48 h-32 object-cover rounded-xl border border-gray-800"
                />
              ) : (
                <div className="w-full md:w-48 h-32 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 text-sm italic">
                  No Image
                </div>
              )}

              <div className="flex-1 w-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {ad.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
                        {placements.find((p) => p.id === ad.placement)?.label ||
                          ad.placement}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                        ⏱ {ad.displayDuration || 10}s display
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 py-1 rounded">
                        ♻️ V{ad.version || 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => forceResetAd(ad.id)}
                      title="Force ad to show again for users who closed it"
                      className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                    >
                      🔄
                    </button>
                    <button
                      onClick={() => resetClicks(ad.id)}
                      title="Reset Clicks to 0"
                      className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                    >
                      0
                    </button>
                    <button
                      onClick={() => toggleStatus(ad.id, ad.isActive)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${ad.isActive ? "bg-emerald-500" : "bg-gray-700"}`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${ad.isActive ? "left-7" : "left-1"}`}
                      />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">
                      Clicks
                    </p>
                    <p className="text-white font-mono">{ad.clicks || 0}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">
                      Duration
                    </p>
                    <p className="text-white font-mono text-sm">
                      {ad.displayDuration || 10}s
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">
                      Start
                    </p>
                    <p className="text-white font-mono text-sm">
                      {ad.startDate || "Now"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">
                      End
                    </p>
                    <p className="text-white font-mono text-sm">
                      {ad.endDate || "Ongoing"}
                    </p>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => deleteAd(ad.id)}
                      className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Ad Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold text-white mb-6">
              ✨ Create New Ad
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                    placeholder="e.g. Ramadan Offer"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Target Link URL *
                  </label>
                  <input
                    type="text"
                    value={formData.linkUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, linkUrl: e.target.value })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Banner Image
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                    placeholder="Paste an Image URL or upload a file below"
                  />
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-600 uppercase">
                    <hr className="flex-1 border-gray-800" /> OR UPLOAD FILE{" "}
                    <hr className="flex-1 border-gray-800" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:uppercase file:bg-blue-600/10 file:text-blue-500 hover:file:bg-blue-600/20 cursor-pointer"
                  />
                </div>
                {uploading && (
                  <p className="text-blue-500 text-xs mt-2 font-bold animate-pulse">
                    ⏳ Uploading image to Cloudinary...
                  </p>
                )}
                {formData.imageUrl && (
                  <div className="mt-4 relative">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="h-28 rounded-lg border border-gray-800 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: "" })}
                      className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Placement & Duration Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Placement Zone
                  </label>
                  <select
                    value={formData.placement}
                    onChange={(e) =>
                      setFormData({ ...formData, placement: e.target.value })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  >
                    {placements.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Display Duration (seconds)
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="300"
                    value={formData.displayDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayDuration: parseInt(e.target.value) || 10,
                      })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                    placeholder="10"
                  />
                  <p className="text-gray-600 text-xs mt-1">
                    How long to show this ad before rotating to next (3–300s)
                  </p>
                </div>
              </div>

              {/* Dates & Badge */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={formData.badgeText}
                    onChange={(e) =>
                      setFormData({ ...formData, badgeText: e.target.value })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                    placeholder="e.g. Sponsored"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Hide If Closed For (Hours)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.snoozeHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        snoozeHours: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                    placeholder="24"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={uploading || publishing}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all font-display flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  {publishing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    "🚀 Publish Ad"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all font-display"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
