/**
 * @version 0.0.1
 * Home Page - Protected route
 */
import { useAppDispatch, useAppSelector } from '@/redux';
import { logout } from '@/redux';
import { persistor } from '@/redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userSession } = useAppSelector((state) => state.session);

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome to your dashboard
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Logout
          </button>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">User Information</h2>
          <pre className="overflow-auto rounded-md bg-muted p-4 text-sm">
            {JSON.stringify(userSession, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Home;

