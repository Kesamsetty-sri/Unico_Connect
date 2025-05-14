// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { useThemeStore } from '../hooks/useThemeStore'; // Import for initial theme load

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize theme on app load to ensure 'dark' class is set on <html>
  // This is crucial if using Zustand's persist with `onRehydrateStorage`
  const initializeTheme = useThemeStore(state => state.setTheme); // Get only the setTheme function
  const currentTheme = useThemeStore(state => state.theme); // Get the current theme

  useEffect(() => {
    // This effect ensures the theme is applied on initial load.
    // Zustand's persist middleware with onRehydrateStorage should handle this,
    // but this is an extra check / explicit initialization.
    const storedThemeState = localStorage.getItem('theme-preference');
    let themeToSet: 'light' | 'dark' = 'light'; // default

    if (storedThemeState) {
        try {
            const parsedState = JSON.parse(storedThemeState);
            if (parsedState.state && parsedState.state.theme) {
                themeToSet = parsedState.state.theme;
            }
        } catch (error) {
            console.error("Failed to parse theme from localStorage", error);
        }
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Fallback to system preference if nothing is stored
        // themeToSet = 'dark'; // Uncomment if you want to default to system preference
    }

    initializeTheme(themeToSet); // Set it in Zustand and apply class
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', themeToSet === 'dark');
    }
  }, [initializeTheme]);


  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
