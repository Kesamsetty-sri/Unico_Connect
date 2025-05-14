// components/CartDisplay.tsx
import { useCartStore } from '../hooks/useCartStore';
import { ShoppingCart } from 'lucide-react';

export const CartDisplay: React.FC = () => {
  const { getTotalItems, getTotalPrice, items } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <ShoppingCart size={24} className="mr-2" /> Cart Summary
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">
            Total Items: <span className="font-bold">{totalItems}</span>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2 mb-3 max-h-60 overflow-y-auto custom-scrollbar">
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center text-sm p-2 bg-white dark:bg-gray-800 rounded shadow-sm">
                <span className="font-medium text-gray-700 dark:text-gray-200 truncate w-3/5" title={item.title}>{item.title} (x{item.quantity})</span>
                <span className="text-gray-600 dark:text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-3 dark:border-gray-600">
            <p className="text-lg font-bold text-right text-gray-800 dark:text-gray-100">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
