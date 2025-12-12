/**
 * @version 0.0.1
 * Admin Route - Requires admin role
 */
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/redux';

const AdminRoute = () => {
  const { userSession } = useAppSelector((state) => state.session);

  // Check if user is admin (adjust based on your user structure)
  const isAdmin = userSession?.user?.role === 'admin' || userSession?.user?.is_admin === true;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;