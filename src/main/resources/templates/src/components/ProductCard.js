import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, handleAddToCart }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="relative border p-4 h-150 rounded-lg shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded-md mb-4"
      />

      <h3 className="text-lg font-semibold text-blue-500 hover:underline">
        {product.name}
      </h3>

      <p className="text-sm text-gray-500 line-clamp-2 truncate">
        {product.description}
      </p>

      <p className="absolute bottom-2 left-2 text-lg font-bold text-gray-800">
        ${product.price.toFixed(2)}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(product.id);
        }}
        className="absolute bottom-2 right-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
