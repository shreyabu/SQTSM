import React from 'react';

function ProductCard({ product, handleAddToCart }) {
  return (
    <div key={product.id} className="relative border p-4 rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-blue-500 hover:underline">
        {product.name}
      </h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      <button
        onClick={() => handleAddToCart(product.id)}
        className="absolute bottom-2 right-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
