import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { Product } from 'models/Product';
import { ProductCard } from 'components/ProductCard';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { CartDisplay } from 'components/CartDisplay';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useThemeStore } from 'hooks/useThemeStore';
import { useAuthStore } from 'hooks/useAuthStore';

// API fetching function
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function HomePage() {
  const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const theme = useThemeStore(state => state.theme); // Access theme for body class
  const router = useRouter();
  const { isSignedUp, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isSignedUp) {
      router.push('/signup');
    } else if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isSignedUp, isLoggedIn, router]);

  // Effect to apply dark class to body for global background
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark:bg-gray-900');
      document.body.classList.remove('bg-gray-50'); // remove light mode specific bg
    } else {
      document.body.classList.remove('dark:bg-gray-900');
      document.body.classList.add('bg-gray-50'); // ensure light mode bg
    }
  }, [theme]);


  return (
    <>
      <Head>
        <title>Interactive Product Page</title>
        <meta name="description" content="Product listing with cart and favorites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <header className="p-4 shadow-md bg-white dark:bg-gray-800">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Product Showcase
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const logout = require('hooks/useAuthStore').useAuthStore.getState().logout;
                  logout();
                  window.location.href = '/login';
                }}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() => {
                  const cartToggleEvent = new CustomEvent('toggleCart');
                  window.dispatchEvent(cartToggleEvent);
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cart
              </button>
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4">
          <div className="mb-8" id="cart-container">
            <CartDisplay />
          </div>

          {isLoading && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600 dark:text-gray-400">Loading products...</p>
              {/* You can add a spinner component here */}
            </div>
          )}

          {isError && (
            <div className="text-center py-10 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> Failed to fetch products: {error?.message}</span>
            </div>
          )}

          {products && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {products && products.length === 0 && !isLoading && (
             <div className="text-center py-10">
                <p className="text-xl text-gray-600 dark:text-gray-400">No products found.</p>
            </div>
          )}
        </main>

        <footer className="text-center p-4 mt-8 border-t dark:border-gray-700 text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Frontend Take-Home. Interactive Product Card.</p>
        </footer>
      </div>
    </>
  );
}
