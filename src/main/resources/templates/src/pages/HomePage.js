import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Slider from 'react-slick';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import { toast } from 'react-toastify';

function HomePage() {
  const [ads, setAds] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch ads from the `/home/ads` endpoint
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchAds = async () => {
      try {
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
        const response = await api.get('/home/ads', config);
        setAds(response.data);
      } catch (error) {
        toast.error('Failed to load ads. Please try again.');
        console.error('Failed to fetch ads:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
        const response = await api.get('/home/products', config);
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to load products. Please try again.');
        console.error('Failed to fetch products:', error);
      }
    };

    fetchAds();
    fetchProducts();
  }, []);

  // Slider settings for the ad carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Handle ad click event
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
    window.open(`/ad/${adId}`, '_blank');
  };

  return (
    <Layout>
      <main className="p-8">
        {/* Ads Section */}
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
          <h2 className="text-3xl font-bold mb-4">Picked For You!</h2>
          <p className="text-gray-500 mb-4">
            Check out products we picked just for you!
          </p>
          <ProductList
            products={products}
          />
        </section>
      </main>
    </Layout>
  );
}

export default HomePage;
