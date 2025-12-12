/**
 * @version 0.0.1
 * Public Route - Redirects to home if already authenticated
 */
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/redux';

const PublicRoute = () => {
  const { userSession } = useAppSelector((state) => state.session);

  // If user is already authenticated, redirect to dashboard
  if (userSession) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;