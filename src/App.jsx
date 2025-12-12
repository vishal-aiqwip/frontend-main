import './styles/app.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import { Loader } from './components';
import Navigation from './navigation';
import { Wrapper } from './lib/Wrapper';
import { Toaster } from './components';
import { ToastConfig } from './config';
import { ThemeProvider } from './lib/themeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Wrapper>
          
          <Navigation />
          <Toaster {...ToastConfig} />
          </Wrapper>
        </ThemeProvider>
        </QueryClientProvider>

      </PersistGate>
    </Provider>
  )
}

export default App
