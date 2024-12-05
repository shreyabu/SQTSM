import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';
import AdsManagement from './AdsManagement';
import Layout from '../components/Layout';

function AdminDashboard() {
    const [selectedPage, setSelectedPage] = useState('Order');
    const navigate = useNavigate();

    const handlePageChange = (e) => {
        setSelectedPage(e.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logged out successfully!');
    };

    return (
        <Layout>
            <div className="p-8">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <select
                        value={selectedPage}
                        onChange={handlePageChange}
                        className="border border-gray-300 rounded-md px-4 py-2"
                    >
                        <option value="Order">Order Management</option>
                        <option value="Product">Product Management</option>
                        <option value="Ads">Ads Management</option>
                    </select>
                </header>

                <div className="flex items-center mt-6 space-x-2">
                    <i className="fas fa-user text-gray-700"></i>
                    <button
                        onClick={handleLogout}
                        className="text-gray-700 underline hover:text-gray-900 transition"
                    >
                        Log out
                    </button>
                </div>
                <main className="p-8">
                    <div className="min-h-[80vh]">
                        {selectedPage === 'Order' && <OrderManagement />}
                        {selectedPage === 'Product' && <ProductManagement />}
                        {selectedPage === 'Ads' && <AdsManagement />}
                    </div>
                </main>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
