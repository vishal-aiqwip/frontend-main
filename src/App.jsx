import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Loader } from './components';
import { Toaster } from './components';
import { ToastConfig } from './config';
import { Wrapper } from './lib/Wrapper';
import { ThemeProvider } from './lib/themeProvider';
import Navigation from './navigation';
import { persistor, store } from './redux';
import './styles/app.css';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 1
    }
  }
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Wrapper>
              <ErrorBoundary>
                <Navigation />
              </ErrorBoundary>
              <Toaster {...ToastConfig} />
            </Wrapper>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
