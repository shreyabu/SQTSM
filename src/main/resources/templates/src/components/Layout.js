import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-screen-xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
