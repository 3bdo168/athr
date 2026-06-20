import { useState, useRef } from 'react';
import { useClientAuth } from '../../hooks/useClientAuth';
import { updateClientProfile, compressProfilePhoto } from '../../firebase/helpers';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ClientSettings() {
  const { clientUser, clientProfile, refreshProfile } = useClientAuth();
  const [name, setName] = useState(clientProfile?.name || '');
  const [phone, setPhone] = useState(clientProfile?.phone || '');
  const [photoPreview, setPhotoPreview] = useState(clientProfile?.photoURL || '');
  const [photoFile, setPhotoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSaving(true);
    try {
      let photoURL = clientProfile?.photoURL || '';

      // Compress and convert photo to base64 if selected
      if (photoFile) {
        photoURL = await compressProfilePhoto(photoFile);
      }

      await updateClientProfile(clientUser.uid, {
        name: name.trim(),
        phone: phone.trim(),
        photoURL,
      }, clientProfile);

      await refreshProfile();
      setPhotoFile(null);
      toast.success('Profile updated successfully! ✅');
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = 
    name.trim() !== (clientProfile?.name || '') ||
    phone.trim() !== (clientProfile?.phone || '') ||
    photoFile !== null;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-[0.2em] text-xs mb-3">
            <span className="w-8 h-[2px] bg-blue-600" />
            Account Settings
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Edit Profile</h1>
          <p className="text-gray-400 text-sm">Update your personal information and profile picture</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800/60 p-8 mb-6">
          {/* Photo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group mb-4">
              <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-gray-700 shadow-xl bg-gray-800">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-gray-500">
                    👤
                  </div>
                )}
              </div>
              {/* Upload overlay */}
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 rounded-3xl bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer"
              >
                <span className="text-white text-sm font-semibold">📷 Change</span>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Upload new photo
            </button>
            <p className="text-xs text-gray-500 mt-1">Max 5MB • JPG, PNG, WebP</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3.5 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📱 Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 1XX XXX XXXX"
                className="w-full px-4 py-3.5 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                dir="ltr"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📧 Email (from Google)
              </label>
              <input
                type="email"
                value={clientProfile?.email || ''}
                disabled
                className="w-full px-4 py-3.5 rounded-xl bg-gray-800/30 border border-gray-800 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-600 mt-1">Email cannot be changed as it's linked to your Google account</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg shadow-blue-600/20"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                '💾 Save Changes'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
