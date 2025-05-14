import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../hooks/useAuthStore';
import { useThemeStore } from '../hooks/useThemeStore';
import { Moon, Sun } from 'lucide-react';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { isSignedUp, isLoggedIn, login } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSignedUp) {
      router.push('/signup');
    }
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isSignedUp, isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
      return;
    }
    router.push('/');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
          <div className="flex justify-between items-center mb-6 relative">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Login</h2>
            <div className="space-x-4 absolute top-0 right-0 flex items-center">
              <button
                onClick={() => router.push('/signup')}
                className="text-blue-600 dark:text-blue-400 underline mr-4"
                type="button"
              >
                Sign Up
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded bg-gray-300 dark:bg-gray-700"
                type="button"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
