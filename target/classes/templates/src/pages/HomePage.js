import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Slider from 'react-slick';
import Layout from '../components/Layout';

function HomePage() {
  const [ads, setAds] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get('/')
      .then((response) => {
        const { ads, products } = response.data;
        setAds(ads);
        setProducts(products);
      })
      .catch((error) => {
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

  return (
    <Layout>
      <main className="p-8">
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

        <section>
          <h2 className="text-3xl font-bold mb-4">Recommended Products</h2>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-blue-500 hover:underline">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default HomePage;
