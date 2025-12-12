/**
 * @version 0.0.1
 * Home Page - Protected route
 */
import { Loader } from '@/components';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useAppSelector } from '@/redux';
import { API } from '@/services';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  //-------------- State & Variables --------------//
  const { userSession } = useAppSelector((state) => state.session);

  //----------------- Fetch users with TanStack Query--------------//
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => API.GetAllUser({}, false, false), // Pass empty params, no toasts
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    select: (data) => data?.data || data
  });


  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background p-8 relative w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome to your dashboard
            </p>
          </div>
        </div>

        {/* Users List Section */}
        <div className="rounded-lg border bg-card p-6 shadow-sm mb-6">
          <h2 className="mb-4 text-xl font-semibold">Users List</h2>
          
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          )}

          {isError && (
            <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
              Error: {error?.message || 'Failed to load users'}
            </div>
          )}

          {users && !isLoading && !isError && (
            <div className="space-y-2">
              {users.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No users found
                </p>
              ) : (
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id || user._id || Math.random()}
                      className="flex items-center justify-between p-3 rounded-md border"
                    >
                      <div>
                        <p className="font-medium capitalize">
                          {user.name || user.username ||  user.first_name + ' ' + user.last_name || 'Unknown User'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email || 'No email'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Session Info */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">User Information</h2>
          <div className="overflow-auto rounded-md bg-muted p-4 text-sm w-full">
            <pre className="rounded-md bg-muted p-4 text-sm">
              {JSON.stringify(userSession, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;

