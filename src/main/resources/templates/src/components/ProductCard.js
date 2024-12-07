import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

function ProductCard({ product}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product) => {
    const productId = product.id;
    const quantity = product.quantity;
    api
      .post('/cart', { productId, quantity }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => {
        toast.success('Item added to cart successfully!');
      })
      .catch((error) => {
        toast.error('Failed to add item to cart');
        console.error(error);
      });
  };

  return (
    <div
      className="relative border p-4 rounded-lg shadow-md cursor-pointer flex flex-col justify-between h-96"
      onClick={handleCardClick}
    >
      <div className="w-full h-2/3 overflow-hidden rounded-md mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-blue-500 hover:underline">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 truncate">
          {product.description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold text-gray-800">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
