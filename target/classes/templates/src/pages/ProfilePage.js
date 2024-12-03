import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import OrderList from '../components/OrderList';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [preferences, setPreferences] = useState([]);
    const [updatedPreferences, setUpdatedPreferences] = useState([]);
    const [showPreferenceModal, setShowPreferenceModal] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setUpdatedPreferences(userData.preferences || []);
        }
    }, []);

    const fetchPreferences = () => {
        if (!token) {
            toast.error('Authentication token is missing');
            return;
        }

        api
            .get('/user/getPreferences', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPreferences(response.data);
                setUpdatedPreferences(response.data);
            })
            .catch((error) => {
                toast.error('Failed to fetch preferences');
                console.error(error);
            });
    };

    const fetchOrders = (page) => {

        if (!token) {
            toast.error('Authentication token is missing');
            return;
        }

        api
            .get('/order', {
                params: {
                    page,
                    size: 8,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setOrders(response.data.content);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.number);
            })
            .catch((error) => {
                toast.error('Failed to fetch orders');
                console.error(error);
            });
    };

    useEffect(() => {
        fetchPreferences();
        fetchOrders(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const fetchCategories = () => {
        api
            .get('/categories')
            .then((response) => {
                setAllCategories(response.data);
            })
            .catch((error) => {
                toast.error('Failed to load categories');
                console.error(error);
            });
    };

    const handleSavePreferences = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Authentication token is missing');
            return;
        }

        api
            .put(
                '/user/editPreferences',
                {
                    preferences: updatedPreferences,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                toast.success('Preferences updated');
                const updatedUser = {
                    ...user,
                    preferences: updatedPreferences,
                };
                localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setShowPreferenceModal(false);
            })
            .catch((error) => {
                toast.error('Failed to update preferences.');
                console.error(error);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        navigate('/login');
        toast.success('Logged out successfully!');
    };

    return (
        <Layout>
            <main className="p-8 flex-grow flex flex-col items-center">
                <div className="w-[800px] min-h-[80vh]">
                    <div>
                        <div className="flex items-center mb-4">
                            <h1 className="text-3xl font-bold">Profile</h1>
                            {user && (
                                <button
                                    onClick={() => {
                                        fetchCategories();
                                        setShowPreferenceModal(true);
                                    }}
                                    className="ml-2 text-blue-600 hover:text-blue-400 focus:outline-none transition"
                                >
                                    <i className="fas fa-edit text-lg"></i>
                                </button>
                            )}
                        </div>

                        {user && (
                            <div className="mb-8">
                                <div className="mt-4">
                                    <label className="block font-medium">My Preferences:</label>
                                    <p>{user.preferences.join(',') || 'No preferences set'}</p>
                                </div>

                                <div className="flex items-center mt-6 space-x-2">
                                    <i className="fas fa-user text-gray-700"></i>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-700 underline hover:text-gray-900 transition"
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}
                        <h2 className="text-xl font-semibold mb-4">Order History</h2>
                        <OrderList
                            orders={orders}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            isAdmin={user?.role === 'ADMIN'}
                        />
                    </div>
                </div>
            </main>
            {showPreferenceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
                        <h2 className="text-lg font-bold mb-4">Edit Preferences</h2>
                        <div className="flex flex-wrap gap-2">
                            {allCategories.map((category) => (
                                <label key={category} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={category}
                                        checked={updatedPreferences.includes(category)}
                                        onChange={(e) => {
                                            const { value, checked } = e.target;
                                            if (checked) {
                                                setUpdatedPreferences([...updatedPreferences, value]);
                                            } else {
                                                setUpdatedPreferences(updatedPreferences.filter((pref) => pref !== value));
                                            }
                                        }}
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={handleSavePreferences}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowPreferenceModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ProfilePage;
