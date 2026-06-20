import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ClientAuthProvider } from "./context/ClientAuthContext";
import AdminLayout from "./components/layout/AdminLayout";
import ClientLayout from "./components/layout/ClientLayout";
import { AdminRoute, ClientRoute } from "./components/RouteGuards";
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import CaseStudy from "./pages/CaseStudy";
import Checkout from "./pages/Checkout";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";

import SocialMediaManagement from "./pages/Services/SocialMediaManagement";
import WebDesign from "./pages/Services/WebDesign";
import VideoEditing from "./pages/Services/VideoEditing";
import Posters from "./pages/Services/Posters";

import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import Tasks from "./pages/Admin/Tasks";
import ServicesControl from "./pages/Admin/ServicesControl";
import OffersControl from "./pages/Admin/OffersControl";
import PortfolioControl from "./pages/Admin/PortfolioControl";
import TestimonialsControl from "./pages/Admin/TestimonialsControl";
import Messages from "./pages/Admin/Messages";
import Orders from "./pages/Admin/Orders";
import PricingControl from "./pages/Admin/PricingControl";
import PaymentControl from "./pages/Admin/PaymentControl";
import AdsControl from "./pages/Admin/AdsControl";
import ClientsControl from "./pages/Admin/ClientsControl";
import WaitlistControl from "./pages/Admin/WaitlistControl";

import ClientLogin from "./pages/Client/ClientLogin";
import PendingApproval from "./pages/Client/PendingApproval";
import ClientDashboard from "./pages/Client/ClientDashboard";
import ClientSettings from "./pages/Client/ClientSettings";
import ClientProjects from "./pages/Client/ClientProjects";
import ClientAssets from "./pages/Client/ClientAssets";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path="/portfolio/:projectId" element={<Layout><CaseStudy /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/success" element={<Layout><Success /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/services/social-media" element={<Layout><SocialMediaManagement /></Layout>} />
        <Route path="/services/web-design" element={<Layout><WebDesign /></Layout>} />
        <Route path="/services/video-editing" element={<Layout><VideoEditing /></Layout>} />
        <Route path="/services/posters" element={<Layout><Posters /></Layout>} />

        {/* Client routes */}
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/pending" element={<PendingApproval />} />
        <Route path="/client" element={<ClientRoute><ClientLayout><ClientDashboard /></ClientLayout></ClientRoute>} />
        <Route path="/client/settings" element={<ClientRoute><ClientLayout><ClientSettings /></ClientLayout></ClientRoute>} />
        <Route path="/client/projects" element={<ClientRoute><ClientLayout><ClientProjects /></ClientLayout></ClientRoute>} />
        <Route path="/client/assets" element={<ClientRoute><ClientLayout><ClientAssets /></ClientLayout></ClientRoute>} />

        {/* Admin routes — all protected by AdminRoute (email check) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminRoute><AdminLayout><Dashboard /></AdminLayout></AdminRoute>} />
        <Route path="/admin/clients" element={<AdminRoute><AdminLayout><ClientsControl /></AdminLayout></AdminRoute>} />
        <Route path="/admin/tasks" element={<AdminRoute><AdminLayout><Tasks /></AdminLayout></AdminRoute>} />
        <Route path="/admin/services" element={<AdminRoute><AdminLayout><ServicesControl /></AdminLayout></AdminRoute>} />
        <Route path="/admin/offers" element={<AdminRoute><AdminLayout><OffersControl /></AdminLayout></AdminRoute>} />
        <Route path="/admin/portfolio" element={<AdminRoute><AdminLayout><PortfolioControl /></AdminLayout></AdminRoute>} />
        <Route path="/admin/messages" element={<AdminRoute><AdminLayout><Messages /></AdminLayout></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminLayout><Orders /></AdminLayout></AdminRoute>} />
        <Route path="/admin/pricing" element={<AdminRoute><AdminLayout><PricingControl /></AdminLayout></AdminRoute>} />
        <Route path="/admin/payment" element={<AdminRoute><AdminLayout><PaymentControl /></AdminLayout></AdminRoute>} />
        <Route path="/admin/testimonials" element={<AdminRoute><AdminLayout><TestimonialsControl /></AdminLayout></AdminRoute>} />
        <Route path="/admin/ads" element={<AdminRoute><AdminLayout><AdsControl /></AdminLayout></AdminRoute>} />
        <Route path="/admin/waitlist" element={<AdminRoute><AdminLayout><WaitlistControl /></AdminLayout></AdminRoute>} />

        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <AdminProvider>
                <ClientAuthProvider>
                  <AppRoutes />
                </ClientAuthProvider>
              </AdminProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;