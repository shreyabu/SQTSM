import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api
      .get(`/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        toast.error('Failed to load product details');
        console.error(error);
      });
  }, [productId]);

  const handleAddToCart = () => {
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

  if (!product) {
    return (
      <Layout>
        <main className="p-8">
          <p>Loading...</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="p-8">
        <div className="flex space-x-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-1/2 h-auto object-cover rounded-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-blue-500 mb-4">${product.price.toFixed(2)}</p>
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="text-lg font-medium">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border px-2 py-1 rounded-md text-center"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ProductDetailsPage;
