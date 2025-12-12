/**
 * @version 0.0.1
 * Protected Route - Requires authentication
 */
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/redux';

const ProtectedRoute = () => {
  const { userSession } = useAppSelector((state) => state.session);

  // If user is not authenticated, redirect to login
  if (!userSession) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;