/**
 * @version 0.0.1
 * Login Page with shadcn form
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/redux';
import { loadingStart, loadingStop, login } from '@/redux';
import { API } from '@/services';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useErrorLog } from '@/hooks';

//-------------------Zod validation Schema-------------------//

const loginSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email address.'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
});

//-------------------Login Form-------------------//

const Login = () => {
  //-------------- State & Variables --------------//
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleError = useErrorLog('pages/Login');

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });


    // ------------------- TanStack Mutation ------------------- //
    const loginMutation = useMutation({
      mutationFn: (data) =>
        API.Login(data, 'Login successful!', 'Logging in...'),
  
      onSuccess: (response) => {
        dispatch(login(response.data));
        navigate('/dashboard', { replace: true });
        console.log(response);
      },
  
      onError: () => {
        form.setError('root', {
          message: 'Invalid email or password'
        });
        handleError(error);
      }
    });

  //-------------- Submit Event Handler --------------//
  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };
  // const onSubmit = async (data) => {
  //   try {
  //     // dispatch(loadingStart('screen'));
  //     const response = await API.Login(data, 'Login successful!', 'Logging in...');

  //     if (response) {
  //       // Save session to localStorage
  //       dispatch(login(response?.data));
  //       // Redirect to dashboard
  //       navigate('/dashboard', { replace: true });
  //     } else {
  //       form.setError('root', {
  //         message: 'Invalid email or password'
  //       });
  //       dispatch(loadingStop());
  //     }
  //   } catch (err) {
  //     form.setError('root', {
  //       message: 'An error occurred. Please try again.'
  //     });
  //     dispatch(loadingStop());
  //   }
  // };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="bg-card w-full max-w-md space-y-8 rounded-lg border p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to your account to continue</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {form.formState.errors.root && (
              <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
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
                    <div className="relative">
                      <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        {...field}
                      />
                    </div>
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
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="pr-10 pl-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
