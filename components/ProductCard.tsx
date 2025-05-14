// components/ProductCard.tsx
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../models/Product';
import { useFavorites } from '../hooks/useFavorites';
import { useCartStore } from '../hooks/useCartStore';
import { QuantitySelector } from './QuantitySelector';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isFavorite, toggleFavorite } = useFavorites(product.id);
  const { addToCart, items, incrementQuantity, decrementQuantity } = useCartStore();
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  const cartItem = items.find(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setShowQuantitySelector(true);
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="rounded-t-lg"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors
            ${isFavorite ? 'text-red-500 bg-red-100 dark:bg-red-900' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-1 truncate text-gray-800 dark:text-gray-100" title={product.title}>
          {product.title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 h-16 overflow-y-auto custom-scrollbar">
          {product.description}
        </p>
      </div>

      <div className="mt-auto">
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">${product.price.toFixed(2)}</p>

        {cartItem && showQuantitySelector ? (
          <QuantitySelector
            quantity={cartItem.quantity}
            onIncrement={() => incrementQuantity(product.id)}
            onDecrement={() => decrementQuantity(product.id)}
            productId={product.id}
          />
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <ShoppingCart size={18} className="mr-2" /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
