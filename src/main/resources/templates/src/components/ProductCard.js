import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, handleAddToCart }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="relative border p-4 rounded-lg shadow-md cursor-pointer flex flex-col justify-between h-96"
      onClick={handleCardClick}
    >
      {/* 图片部分 */}
      <div className="w-full h-2/3 overflow-hidden rounded-md mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 商品标题和描述 */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-blue-500 hover:underline">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 truncate">
          {product.description}
        </p>
      </div>

      {/* 底部价格和按钮 */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold text-gray-800">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.id);
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
