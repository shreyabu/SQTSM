import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import Layout from '../components/Layout';

function OrderDetailsPage() {
    const { orderNumber } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        api
            .get(`/order/${orderNumber}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((response) => {
                setOrder(response.data);
            })
            .catch((error) => {
                console.error('Failed to fetch order details:', error);
            });
    }, [orderNumber]);

    if (!order) {
        return (
            <Layout>
                <main className="p-8">
                    <p>Loading...</p>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="p-8">
                <h1 className="text-3xl font-bold mb-4">Order Details</h1>
                <div className="mb-4">
                    <p>
                        <strong>Order Number:</strong> {order.orderNumber}
                    </p>
                    <p>
                        <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                    </p>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Items</h2>
                <table className="w-full border-collapse border border-gray-200 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Product</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item) => (
                            <tr key={item.productId}>
                                <td className="border px-4 py-2">{item.productName}</td>
                                <td className="border px-4 py-2">{item.quantity}</td>
                                <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
                                <td className="border px-4 py-2">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </Layout>
    );
}

export default OrderDetailsPage;
