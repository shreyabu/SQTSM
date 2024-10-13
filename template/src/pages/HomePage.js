import React from 'react';
import { Link } from 'react-router-dom';

/** 
 * It's just a draft
 */
function HomePage() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
        <div className="text-lg font-bold">SQTSM</div>
        <div className="flex space-x-4">
          <Link to="/preferences" className="text-blue-500 hover:underline">My Preferences</Link>
          <Link to="/recommended-ads" className="text-blue-500 hover:underline">Recommended Ads</Link>
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        </div>
        <div className="flex items-center">
          <Link to="/cart" className="text-blue-500 hover:underline">
            <i className="fas fa-shopping-cart"></i> Cart (0)
          </Link>
        </div>
      </nav>

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
