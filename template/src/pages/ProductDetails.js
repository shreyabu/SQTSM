import React from 'react';
import { useParams } from 'react-router-dom';

import BagImage from '../images/Bag.jpg';
import ShoesImage from '../images/Shoes.jpg';
import WatchImage from '../images/Watch.jpg';
import LeatherBagImage from '../images/Leatherbag.jpg';
import GymDumbbellImage from '../images/GymDumbbell.jpg';

const products = [
  { id: 1, name: 'Bag', price: '$30', description: 'A stylish bag', image: BagImage },
  { id: 2, name: 'Shoes', price: '$50', description: 'Comfortable shoes', image: ShoesImage },
  { id: 3, name: 'Watch', price: '$120', description: 'Elegant wristwatch', image: WatchImage },
  { id: 4, name: 'Gym Dumbbell', price: '$30', description: 'Attributes', image: GymDumbbellImage },
  { id: 5, name: 'Bag', price: '$30', description: 'Attributes', image: LeatherBagImage }
];

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const product = products.find((p) => p.id === parseInt(id)); // Find the product by ID

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row items-center">
        {/* Ensure image displays correctly */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 max-h-[500px] object-cover rounded-lg mb-4 md:mb-0"
        />
        <div className="md:ml-8">
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-blue-500">{product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
