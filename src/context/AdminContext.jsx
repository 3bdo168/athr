// src/context/AdminContext.jsx
import { createContext, useState, useEffect } from 'react';
import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../firebase/helpers';
import { useAuth } from '../hooks/useAuth';
import { ADMIN_EMAIL } from '../config/constants';

const AdminContext = createContext();

const COLLECTIONS = {
  services: 'services',
  offers: 'offers',
  tasks: 'tasks',
  portfolioItems: 'portfolioItems',
  testimonials: 'testimonials',
};

export function AdminProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [services, setServices] = useState([]);
  const [offers, setOffers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // ── Fetch all data ONLY when the admin is logged in ──────
  useEffect(() => {
    // Wait until auth state is resolved
    if (authLoading) return;

    // Only fetch admin collections if the current user is the admin
    const isAdmin = user?.email === ADMIN_EMAIL;
    if (!isAdmin) {
      setLoadingData(false);
      return;
    }

    const fetchAll = async () => {
      try {
        const [s, o, t, p, test] = await Promise.all([
          getCollection(COLLECTIONS.services),
          getCollection(COLLECTIONS.offers),
          getCollection(COLLECTIONS.tasks),
          getCollection(COLLECTIONS.portfolioItems),
          getCollection(COLLECTIONS.testimonials),
        ]);
        setServices(s);
        setOffers(o);
        setTasks(t);
        setPortfolioItems(p);
        setTestimonials(test);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchAll();
  }, [user, authLoading]);

  // ── Generic CRUD factory ─────────────────────────────────
  // NOTE: useCallback cannot be called inside regular functions (Rules of Hooks)
  const makeAdd = (collectionName, setter) => async (data) => {
    const id = await addDocument(collectionName, data);
    setter(prev => [...prev, { ...data, id }]);
  };

  const makeUpdate = (collectionName, setter) => async (id, updates) => {
    await updateDocument(collectionName, id, updates);
    setter(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const makeDelete = (collectionName, setter) => async (id) => {
    await deleteDocument(collectionName, id);
    setter(prev => prev.filter(item => item.id !== id));
  };

  // ── Services ─────────────────────────────────────────────
  const addService = makeAdd(COLLECTIONS.services, setServices);
  const updateService = makeUpdate(COLLECTIONS.services, setServices);
  const deleteService = makeDelete(COLLECTIONS.services, setServices);

  // ── Offers ───────────────────────────────────────────────
  const addOffer = makeAdd(COLLECTIONS.offers, setOffers);
  const updateOffer = makeUpdate(COLLECTIONS.offers, setOffers);
  const deleteOffer = makeDelete(COLLECTIONS.offers, setOffers);

  // ── Tasks ────────────────────────────────────────────────
  const addTask = makeAdd(COLLECTIONS.tasks, setTasks);
  const updateTask = makeUpdate(COLLECTIONS.tasks, setTasks);
  const deleteTask = makeDelete(COLLECTIONS.tasks, setTasks);

  // ── Portfolio ────────────────────────────────────────────
  const addPortfolioItem = makeAdd(COLLECTIONS.portfolioItems, setPortfolioItems);
  const updatePortfolioItem = makeUpdate(COLLECTIONS.portfolioItems, setPortfolioItems);
  const deletePortfolioItem = makeDelete(COLLECTIONS.portfolioItems, setPortfolioItems);

  // ── Testimonials ─────────────────────────────────────────
  const addTestimonial = makeAdd(COLLECTIONS.testimonials, setTestimonials);
  const updateTestimonial = makeUpdate(COLLECTIONS.testimonials, setTestimonials);
  const deleteTestimonial = makeDelete(COLLECTIONS.testimonials, setTestimonials);

  const value = {
    loadingData,
    services, addService, updateService, deleteService,
    offers, addOffer, updateOffer, deleteOffer,
    tasks, addTask, updateTask, deleteTask,
    portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export { AdminContext };