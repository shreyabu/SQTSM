import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Slider from 'react-slick'; 

function HomePage() {
  const [ads, setAds] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch data from the backend
  useEffect(() => {
    api
      .get('/')
      .then((response) => {
        const { ads, products, message } = response.data;
        setAds(ads);
        setProducts(products);
        setMessage(message);
      })
      .catch((error) => {
        console.error('Failed to fetch home page data:', error);
      });
  }, []);

  // 轮播图配置
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
        <div className="text-lg font-bold">SQTSM</div>
        <div className="flex space-x-4">
          <a href="/preferences" className="text-blue-500 hover:underline">My Preferences</a>
          <a href="/recommended-ads" className="text-blue-500 hover:underline">Recommended Ads</a>
          <a href="/" className="text-blue-500 hover:underline">Home</a>
        </div>
        <div className="flex items-center">
          <a href="/cart" className="text-blue-500 hover:underline">
            <i className="fas fa-shopping-cart"></i> Cart (0)
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        {/* Advertisements Carousel */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Recommended Ads</h2>
          <Slider {...sliderSettings}>
            {ads.map((ad) => (
              <div key={ad.id} className="p-4">
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-60 object-cover rounded-md"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">{ad.title}</h3>
                  <p className="text-gray-500">{ad.description}</p>
                  <p className="text-lg font-bold">${ad.price}</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Recommended Products</h2>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg shadow-md">
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold text-blue-500 hover:underline">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 mt-8 shadow-inner">
        <div className="flex justify-between items-center">
          <div>
            <p>Site Name</p>
            <div className="flex space-x-4">
              <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
              <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a>
              <a href="/contact" className="text-blue-500 hover:underline">Contact Us</a>
            </div>
          </div>
          <div className="text-right">
            <p>Stay In Touch! Join our Newsletter:</p>
            <form className="flex space-x-2 mt-2">
              <input
                type="email"
                placeholder="Enter Email"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-4">
          <p>Accepted Payments: <i className="fab fa-cc-visa"></i> <i className="fab fa-cc-amex"></i></p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
