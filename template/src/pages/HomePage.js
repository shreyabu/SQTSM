import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Slider from "react-slick";  // Import Slider from react-slick

// Import Slick CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


// Custom Arrow Components
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", right: "10px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

/** 
 * It's just a draft
 */
function HomePage() {

  // Settings for the carousel
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite looping of slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Scroll one slide at a time
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
        <div className="text-lg font-bold">personalized_advertisement_system</div>
        <div className="flex space-x-4">
          <Link to="/preferences" className="text-blue-500 hover:underline">My Preferences</Link>
          <Link to="/recommended-ads" className="text-blue-500 hover:underline">Recommended Ads</Link>
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input 
            type="text" 
            placeholder="Search..." 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {/* Cart */}
          <Link to="/cart" className="text-blue-500 hover:underline flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> {/* Cart Icon */}
            Cart (0)
          </Link>
        </div>
      </nav>

      {/* Carousel Section */}
      <section className="carousel-section">
        <Slider {...settings}>
          <div>
            <img src="path_to_image1.jpg" alt="Slide 1" className="w-full" />
          </div>
          <div>
            <img src="path_to_image2.jpg" alt="Slide 2" className="w-full" />
          </div>
          <div>
            <img src="path_to_image3.jpg" alt="Slide 3" className="w-full" />
          </div>
        </Slider>
      </section>

      {/* Main Content */}
      <main className="p-8">
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Recommended Ads</h1>
            <div className="flex flex-col space-y-2">
              <label><input type="checkbox" /> Checkbox 1</label>
              <label><input type="checkbox" /> Checkbox 2</label>
              <label><input type="checkbox" /> Checkbox 3</label>
              <label><input type="checkbox" /> Checkbox 4</label>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Call To Action</button>
        </section>

        {/* Advertisement Grid */}
        <section>
          <h2 className="text-2xl mb-4 font-semibold">Advertisements</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Example product card */}
            {[
              { name: 'Gym', price: '$30', description: 'Attributes' },
              { name: 'Bag', price: '$30', description: 'Attributes' },
              { name: 'Food', price: '$30', description: 'Attributes' },
              { name: 'Bag', price: '$30', description: 'Attributes' },
              { name: 'Bag', price: '$30', description: 'Attributes' },
              { name: 'Bag', price: '$30', description: 'Attributes' },
            ].map((ad, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-500 hover:underline">{ad.name}</h3>
                <p className="text-sm text-gray-500">{ad.description}</p>
                <p className="text-lg font-bold">{ad.price}</p>
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
              <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link>
              <Link to="/contact" className="text-blue-500 hover:underline">Contact Us</Link>
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
