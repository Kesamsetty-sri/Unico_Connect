// components/ThemeSwitcher.tsx
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../hooks/useThemeStore';
import { useEffect, useState } from 'react';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false); // To avoid hydration mismatch

  useEffect(() => {
    setMounted(true);
    // Initialize theme from localStorage if it wasn't set by onRehydrateStorage
    // This is a fallback and ensures the class is set on initial client render
    const storedTheme = localStorage.getItem('theme-preference');
    if (storedTheme) {
        const currentTheme = JSON.parse(storedTheme).state.theme;
        if (currentTheme && typeof window !== 'undefined') {
            document.documentElement.classList.toggle('dark', currentTheme === 'dark');
            // Sync Zustand store if it's somehow out of sync (shouldn't happen with persist)
            if (theme !== currentTheme) {
                setTheme(currentTheme);
            }
        }
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches && theme !== 'dark') {
        // Fallback to system preference if no theme is stored and current theme is light
        // setTheme('dark'); // Optional: default to system preference
    }

  }, [setTheme, theme]);

  if (!mounted) {
    // Render a placeholder or null during server-side rendering / initial client mount before theme is determined
    return <div style={{width: '40px', height: '40px'}}></div>; // Placeholder to prevent layout shift
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon size={24} className="text-gray-700" /> : <Sun size={24} className="text-yellow-400"/>}
    </button>
  );
};
