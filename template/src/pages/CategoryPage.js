import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


import PhoneImage from '../images/Smartphone.jpg';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchProducts = async () => {
      const allProducts = [
        { id: 6, name: 'Laptop', price: '$1000', category: 'electronics', image: '/path-to-laptop-image' },
        { id: 7, name: 'Phone', price: '$800', category: 'electronics', image: PhoneImage },
        { id: 8, name: 'Refrigerator', price: '$1200', category: 'home-kitchen', image: '/path-to-refrigerator-image' },
      ];
      setProducts(allProducts.filter(product => product.category === categoryName));
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{categoryName} Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
              </Link>
              <p className="text-sm">{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
