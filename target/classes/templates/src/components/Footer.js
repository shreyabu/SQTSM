import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 p-4 mt-8 shadow-inner">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-blue-500 hover:underline">
              Contact Us
            </Link>
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <p>
          Accepted Payments: <i className="fab fa-cc-visa"></i>{' '}
          <i className="fab fa-cc-amex"></i>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
