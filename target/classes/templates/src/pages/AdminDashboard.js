import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import OrderManagement from './OrderManagement'; // Order 管理界面组件
import ProductManagement from './ProductManagement'; // Product 管理界面组件
import AdsManagement from './AdsManagement'; // Ads 管理界面组件
import PromotionManagement from './PromotionManagement'; // 促销活动管理界面组件
import Layout from '../components/Layout';

function AdminDashboard() {
    const [selectedPage, setSelectedPage] = useState('Order'); // 默认显示 Order 页面
    const navigate = useNavigate();

    const handlePageChange = (e) => {
        setSelectedPage(e.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        navigate('/login');
        toast.success('Logged out successfully!');
    };

    return (
        <Layout>
            <div className="p-8 flex-grow flex flex-col">
                {/* Header */}
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
                        <option value="Promotion">Promotion Management</option>
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
                {/* Main Content */}
                <main className="p-8">
                    <div className="min-h-[80vh]">
                        {selectedPage === 'Order' && <OrderManagement />}
                        {selectedPage === 'Product' && <ProductManagement />}
                        {selectedPage === 'Ads' && <AdsManagement />}
                        {selectedPage === 'Promotion' && <PromotionManagement />}
                    </div>
                </main>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
