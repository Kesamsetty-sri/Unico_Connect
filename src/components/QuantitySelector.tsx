// components/QuantitySelector.tsx
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  productId: number; // To ensure a unique key if multiple selectors are on a page
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  productId,
}) => {
  return (
    <div className="flex items-center space-x-2 my-2">
      <button
        onClick={onDecrement}
        aria-label={`Decrease quantity of product ${productId}`}
        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Minus size={16} />
      </button>
      <span className="text-lg font-medium w-8 text-center dark:text-gray-200">{quantity}</span>
      <button
        onClick={onIncrement}
        aria-label={`Increase quantity of product ${productId}`}
        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};
