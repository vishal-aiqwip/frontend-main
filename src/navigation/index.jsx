

/**
 * @version 0.0.1
 * Updated On : 03 Dec, 2025
 * This is a navigation.
 * It handles all routes with lazy loading
 */
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@/components';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Lazy load pages
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));


const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    
        children: [
          { path: '/dashboard', element: <Home /> },
          // Add more protected routes here
          // {
          //   element: <AdminRoute />,
          //   children: [
          //     { path: '/admin/dashboard', element: <AdminDashboard /> },
          //   ],
          // },
        ],
    
  },
  { path: '*', element: <NotFound /> },
]);

export default function Navigation() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}