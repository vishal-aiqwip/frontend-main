/**
 * @version 0.0.1
 * Home Page - Protected route
 */
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '@/redux';
import { logout } from '@/redux';
import { persistor } from '@/redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  //-------------- State & Variables --------------//
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userSession } = useAppSelector((state) => state.session);

  return (
    <DashboardLayout>

    <div className="min-h-screen bg-background p-8  relative w-full">
      
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome to your dashboard
            </p>
          </div>
         
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">User Information</h2>
          <div className='overflow-auto rounded-md bg-muted p-4 text-sm w-full '>

          <pre className="rounded-md bg-muted p-4 text-sm  ">
            {JSON.stringify(userSession, null, 2)}
          </pre>
          </div>
        </div>
     
    </div>
    </DashboardLayout>
  );
};

export default Home;

