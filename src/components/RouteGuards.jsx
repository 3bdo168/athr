// src/components/RouteGuards.jsx
// Route guard components that enforce admin/client access based on email + Firestore status.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useClientAuth } from '../hooks/useClientAuth';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="w-12 h-12 border-3 border-blue-600/30 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

/**
 * AdminRoute — only allows the admin email through.
 * Any other authenticated user is sent to /client/pending.
 * Unauthenticated users go to /admin/login.
 */
export function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/client/pending" replace />;

  return children;
}

/**
 * ClientRoute — only allows authenticated NON-admin users.
 * Also checks the client's Firestore status to redirect to the right page.
 *   - pending  → /client/pending
 *   - rejected → /client/pending  (PendingApproval handles both states)
 *   - approved → renders children
 */
export function ClientRoute({ children }) {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { clientProfile, loading: clientLoading } = useClientAuth();

  if (authLoading || clientLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/client/login" replace />;
  if (isAdmin) return <Navigate to="/admin" replace />;

  // Client exists but not approved
  if (!clientProfile || clientProfile.status !== 'approved') {
    return <Navigate to="/client/pending" replace />;
  }

  return children;
}
