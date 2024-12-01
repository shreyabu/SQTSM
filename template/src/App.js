import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage'; // Import the new CategoryPage component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:id"  // Define route for Product Details
          element={<ProductDetails />}  // Component to show product details
        />
        <Route
          path="/category/:categoryName"  // Route for Category Pages
          element={<CategoryPage />}  // Component to show products by category
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
