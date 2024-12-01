import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import fashionSaleImage from '../images/Fashionsale.jpg';
import BlackFridaySaleImage from '../images/BlackFridaySale.jpg';
import FinalSaleImage from '../images/FinalSale.jpg';
import BagImage from '../images/Bag.jpg';
import ShoesImage from '../images/Shoes.jpg';
import WatchImage from '../images/Watch.jpg';
import LeatherBagImage from '../images/Leatherbag.jpg';
import GymDumbbellImage from '../images/GymDumbbell.jpg';


const categories = [
  { name: 'Electronics', link: '/category/electronics' },
  { name: 'Fashion', link: '/category/fashion' },
  { name: 'Home & Kitchen', link: '/category/home-kitchen' },
  { name: 'Books', link: '/category/books' },
  { name: 'Toys', link: '/category/toys' },
  { name: 'Sports', link: '/category/sports' },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block", background: "gray", right: "10px" }} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block", background: "gray", left: "10px", zIndex: 1 }} onClick={onClick} />
  );
}

function HomePage() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to toggle sidebar visibility

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle the visibility of the sidebar
  };

  return (
    <div className="flex">
      {/* Sidebar with Categories - This is hidden by default */}
      {isSidebarVisible && (
      <div className="w-1/4 bg-gray-200 p-4 h-screen sticky top-0">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={category.link} 
              className="block text-blue-500 hover:text-blue-700 p-2 rounded-md hover:bg-gray-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      )}

      {/* Main Content Section */}
      <div className="w-full p-4">
        {/* Navigation Bar */}
        <nav className="bg-gray-100 p-4 shadow-md flex justify-between items-center mb-6">
          <div className="text-lg font-bold">personalized_advertisement_system</div>
          <div className="flex space-x-4">
            <Link to="/preferences" className="text-blue-500 hover:underline">My Preferences</Link>
            <Link to="/recommended-ads" className="text-blue-500 hover:underline">Recommended Ads</Link>
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Toggle Sidebar Button */}
            <button onClick={toggleSidebar} className="text-xl">
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Search Bar */}
            <input 
              type="text" 
              placeholder="Search..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {/* Cart */}
            <Link to="/cart" className="text-blue-500 hover:underline flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Cart (0)
            </Link>
          </div>
        </nav>

        {/* Carousel Section */}
        <section className="carousel-section mb-6">
          <Slider {...settings}>
            <div><img src={fashionSaleImage} alt="Slide 1" className="w-full h-[600px] object-cover" /></div>
            <div><img src={BlackFridaySaleImage} alt="Slide 2" className="w-full h-[600px] object-cover" /></div>
            <div><img src={FinalSaleImage} alt="Slide 3" className="w-full h-[600px] max-object-cover" /></div>
          </Slider>
          {/* Overlaying Product Grid */}
          <div className="top-20 left-0 w-full">
          <div className="grid grid-cols-3 gap-6 px-8">
            {[ // Array of products
              { id: 1, name: 'Bag', price: '$30', image: BagImage, discount: '29% off' },
              { id: 2, name: 'Shoes', price: '$50', image: ShoesImage, discount: '15% off' },
              { id: 3, name: 'Watch', price: '$120', image: WatchImage, discount: '20% off' },
            ].map((product, index) => (
              <div key={index} className="bg-white border p-4 rounded-lg shadow-lg text-center">
                {/* Make the image clickable, navigate to the product page dynamically */}
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded-lg mb-4 hover:opacity-75" />
                </Link>

                {/* Make the name clickable, navigate to the product page dynamically */}
                <Link to={`/product/${product.id}`} className="text-lg font-bold text-blue-500 hover:underline">
                  {product.name}
                </Link>

                <p className="text-sm text-gray-500">{product.discount}</p>
                <p className="text-xl font-semibold text-blue-500">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* Main Content Section */}
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
            {[ // Array of advertisements
              { id: 4, name: 'Gym Dumbbell', price: '$30', description: 'Attributes', image: GymDumbbellImage },
              { id: 5, name: 'Bag', price: '$30', description: 'Attributes', image: LeatherBagImage }
            ].map((product, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md">
                {/* Wrap image and name in a Link to navigate to the product page dynamically */}
                <Link to={`/product/${product.id}`}>
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4 hover:opacity-75"
                  />
                  {/* Product Name */}
                  <h3 className="text-lg font-semibold text-blue-500 hover:underline">{product.name}</h3>
                </Link>

                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-lg font-bold">{product.price}</p>
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
        </div>
        );
        }

export default HomePage;
