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
    <div className="product-details">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl font-semibold text-blue-500">{product.price}</p>
      <p className="text-lg">{product.description}</p>
    </div>
  );
}

export default ProductDetails;
