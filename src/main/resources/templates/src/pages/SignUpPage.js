import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/api';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [errors, setErrors] = useState({}); // 用于存储错误信息

  const navigate = useNavigate();

  // Fetch categories for preferences
  useEffect(() => {
    api
      .get('/categories')
      .then((response) => {
        setPreferences(response.data);
      })
      .catch((error) => {
        toast.error('Failed to load categories');
        console.error(error);
      });
  }, []);

  // Handle user registration
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        username,
        password,
        preferences: selectedPreferences,
      });

      if (response.status === 200 || response.status === 201) {
        // Save user info and token to localStorage
        const { user, token } = response.data;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('token', token);

        toast.success(`Welcome to join us ${user.username}`);
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response.data) {
        setErrors(error.response.data);
      } else {
        toast.error(error.response.data.error);
      }
    }
  };

  const handlePreferenceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPreferences([...selectedPreferences, value]);
    } else {
      setSelectedPreferences(selectedPreferences.filter((pref) => pref !== value));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`w-full px-3 py-2 mt-1 text-gray-900 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Username must be 3-10 characters and contain no special characters.
            </p>
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 mt-1 text-gray-900 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be 6-12 characters and contain no special characters.
            </p>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 mt-1 text-gray-900 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferences</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferences.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedPreferences.includes(option)}
                    onChange={handlePreferenceChange}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
