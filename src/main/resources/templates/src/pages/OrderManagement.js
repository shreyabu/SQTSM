import React, { useState, useEffect } from 'react';
import api from '../api/api';
import OrderList from '../components/OrderList';
import { toast } from 'react-toastify';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchOrders = (page) => {
        const token = localStorage.getItem('token');
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
        fetchOrders(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
            <OrderList
                orders={orders}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isAdmin={true}
            />
        </div>
    );
}

export default OrderManagement;
