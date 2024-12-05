import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Slider from 'react-slick';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

function HomePage() {
  const [ads, setAds] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    let token = null;

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      token = localStorage.getItem('token');
    }

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    api
      .get('/', config)
      .then((response) => {
        const { ads, products, totalPages } = response.data;
        setAds(ads);
        setProducts(products);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        toast.error('Failed to load data. Please try again.');
        console.error('Failed to fetch home page data:', error);
      });
  }, []);

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    api
      .get(`/products?page=${nextPage}`)
      .then((response) => {
        setProducts([...products, ...response.data.content]);
        setCurrentPage(nextPage);
      })
      .catch((error) => {
        console.error('Failed to load more products:', error);
        toast.error('Failed to load more products.');
      });
  };

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
    window.open(`/ad/${adId}`, '_blank');
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

        <section>
          <h2 className="text-3xl font-bold mb-4">Picked For You!</h2>
          <p className="text-gray-500 mb-4">
            Check out products we picked just for you!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
          {currentPage < totalPages - 1 && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMoreProducts}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}

export default HomePage;
