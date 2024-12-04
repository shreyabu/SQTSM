import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

function AdDetailsPage({ updateCartCount }) {
  const { adId } = useParams();
  const [ad, setAd] = useState(null);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    api
      .get(`/ad/${adId}`)
      .then((response) => {
        const ad = response.data;
        setAd(ad);
        setProducts(ad.products);
      })
      .catch((error) => {
        console.error('Failed to fetch ad details:', error);
      });
  }, [adId]);

  const handleAddToCart = (productId) => {
    if (!user) {
      toast.error('Please log in to add items to the cart.');
      return;
    }

    api
      .post(
        '/cart',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .then(() => {
        toast.success('Item added to cart successfully!');
      })
      .catch((error) => {
        console.error('Failed to add item to cart:', error);
        toast.error('Failed to add item to cart.');
      });
  };

  if (!ad) {
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
        <section className="mb-8">
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-80 object-cover rounded-md mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">{ad.title}</h1>
          <p className="text-gray-600 mb-4">{ad.description}</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default AdDetailsPage;
