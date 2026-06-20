import { auth, db, googleProvider } from './config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// Auth helper functions
export const registerUser = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const observeAuthState = (callback) => {
  if (!auth) {
    console.warn('Firebase auth not initialized');
    // Return a dummy unsubscribe function
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

// Firestore helper functions

// ── Get all docs from a collection ──────────────────────────
export const getCollection = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ── Get single doc ───────────────────────────────────────────
export const getDocument = async (collectionName, docId) => {
  const ref = doc(db, collectionName, docId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

// ── Add new doc (auto ID) ────────────────────────────────────
export const addDocument = async (collectionName, data) => {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

// ── Set doc (custom ID) ──────────────────────────────────────
export const setDocument = async (collectionName, docId, data) => {
  const ref = doc(db, collectionName, docId);
  await setDoc(ref, { ...data, createdAt: serverTimestamp() });
};

// ── Update doc ───────────────────────────────────────────────
export const updateDocument = async (collectionName, docId, data) => {
  const ref = doc(db, collectionName, docId);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
};

// ── Delete doc ───────────────────────────────────────────────
export const deleteDocument = async (collectionName, docId) => {
  const ref = doc(db, collectionName, docId);
  await deleteDoc(ref);
};

// ── Query with filters ───────────────────────────────────────
export const queryCollection = async (collectionName, filters = [], order = null) => {
  let q = collection(db, collectionName);
  const constraints = filters.map(({ field, op, value }) => where(field, op, value));
  if (order) constraints.push(orderBy(order.field, order.direction || "asc"));
  q = query(q, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ── Client Auth (Google Sign-In) ─────────────────────────────
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

// ── Client Profile Management ────────────────────────────────
export const createClientProfile = async (uid, data) => {
  const ref = doc(db, 'clients', uid);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    return { id: existing.id, ...existing.data() };
  }
  const profileData = {
    ...data,
    status: 'pending', // pending | approved | rejected
    role: 'client',
    createdAt: serverTimestamp(),
  };
  await setDoc(ref, profileData);
  return { id: uid, ...profileData };
};

export const getClientProfile = async (uid) => {
  const ref = doc(db, 'clients', uid);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const updateClientStatus = async (uid, status) => {
  const ref = doc(db, 'clients', uid);
  await updateDoc(ref, { status, updatedAt: serverTimestamp() });
};

export const getAllClients = async () => {
  const snapshot = await getDocs(collection(db, 'clients'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ── Client Profile Update (with change tracking) ────────────
export const updateClientProfile = async (uid, updates, oldProfile) => {
  const ref = doc(db, 'clients', uid);
  
  // Track which fields changed
  const changedFields = [];
  if (updates.name && updates.name !== oldProfile.name) changedFields.push('name');
  if (updates.phone && updates.phone !== oldProfile.phone) changedFields.push('phone');
  if (updates.photoURL && updates.photoURL !== oldProfile.photoURL) changedFields.push('photoURL');

  // Merge with existing changedFields (if any previous unreviewed changes)
  const existingChanged = oldProfile.changedFields || [];
  const allChanged = [...new Set([...existingChanged, ...changedFields])];

  await updateDoc(ref, {
    ...updates,
    changedFields: allChanged,
    updatedAt: serverTimestamp(),
  });
};

// ── Clear changed fields (admin reviewed) ────────────────────
export const clearClientChanges = async (uid) => {
  const ref = doc(db, 'clients', uid);
  await updateDoc(ref, { changedFields: [], updatedAt: serverTimestamp() });
};

// ── Compress & convert profile photo to base64 (no Storage needed) ───
export const compressProfilePhoto = (file, maxSize = 200) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale down to maxSize x maxSize
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG base64 at 80% quality (~10-30KB)
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};