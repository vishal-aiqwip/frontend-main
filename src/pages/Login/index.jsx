/**
 * @version 0.0.1
 * Login Page with shadcn form
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux';
import { login, loadingStart, loadingStop } from '@/redux';
import { API } from '@/services';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';


//-------------------Zod validation Schema-------------------//

const loginSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

//-------------------Login Form-------------------//

const Login = () => {
  //-------------- State & Variables --------------//
  const navigate = useNavigate();
  const dispatch = useAppDispatch();




  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  //-------------- Submit Event Handler --------------//
  const onSubmit = async (data) => {
    try {
      dispatch(loadingStart('screen'));
      const response = await API.Login(
        data,
        'Login successful!',
        'Logging in...'
      );

      if (response) {
      

        // Save session to localStorage
        // setSession(response?.data as SessionData);
        // Update Redux store
        dispatch(login(response?.data as SessionData));
        dispatch(loadingStop());
        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
      } else {
        form.setError('root', {
          message: 'Invalid email or password',
        });
        dispatch(loadingStop());
      }
    } catch (err) {
      form.setError('root', {
        message: 'An error occurred. Please try again.',
      });
      dispatch(loadingStop());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {form.formState.errors.root && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;