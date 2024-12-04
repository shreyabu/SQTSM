import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Slider from 'react-slick';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HomePage() {
  const [ads, setAds] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    api
      .get('/')
      .then((response) => {
        const { ads, products } = response.data;
        setAds(ads);
        setProducts(products);
      })
      .catch((error) => {
        toast.error('Failed to load data. Please try again.');
        console.error('Failed to fetch home page data:', error);
      });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleAdClick = (adId) => {
    api
      .put(`/ad/click/${adId}`)
      .then(() => {
        console.log('Ad click count updated.');
      })
      .catch((error) => {
        console.error('Failed to update ad click count:', error);
        toast.error('Failed to register ad click.');
      });
    navigate(`/ad/${adId}`);
  };

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

  return (
    <Layout>
      <main className="p-8">
        {/* Advertisement Section */}
        <section className="mb-8">
          <Slider {...sliderSettings}>
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="p-4 cursor-pointer"
                onClick={() => handleAdClick(ad.id)}
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-80 object-cover rounded-md"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">{ad.title}</h3>
                  <p className="text-gray-500">{ad.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Picked For You</h2>
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

export default HomePage;
