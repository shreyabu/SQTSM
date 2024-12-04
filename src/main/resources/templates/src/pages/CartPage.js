import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/api';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Fetch cart items for the current page
    const fetchCartItems = async (page) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication token is missing.');
                return;
            }

            const response = await api.get('/cart', {
                params: { page, size: 5 },
                headers: { Authorization: `Bearer ${token}` },
            });

            setCartItems(response.data.content);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.number);
            calculateTotalPrice(response.data.content);
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
            toast.error('Failed to load cart.');
        }
    };

    // Calculate total price of items in the cart
    const calculateTotalPrice = (items) => {
        const total = items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );
        setTotalPrice(total);
    };

    // Handle quantity changes for a cart item
    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            toast.error('Quantity cannot be less than 1.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await api.put(
                `/cart`,
                { productId, quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedItems = cartItems.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );

            setCartItems(updatedItems);
            calculateTotalPrice(updatedItems);
            toast.success('Cart updated successfully.');
        } catch (error) {
            console.error('Failed to update cart item:', error);
            toast.error('Failed to update cart.');
        }
    };

    // Handle removing a cart item
    const handleRemoveItem = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/cart/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const updatedItems = cartItems.filter(
                (item) => item.product.id !== productId
            );

            setCartItems(updatedItems);
            calculateTotalPrice(updatedItems);
            toast.success('Item removed successfully.');
        } catch (error) {
            console.error('Failed to remove cart item:', error);
            toast.error('Failed to remove item.');
        }
    };

    // Handle checkout
    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post(
                '/order',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201 || response.status === 200) {
                toast.success('Order created successfully!');
                fetchCartItems(currentPage);
            }
        } catch (error) {
            console.error('Failed to create order:', error);
            toast.error('Failed to checkout. Please try again.');
        }
    };

    // Fetch items when the current page changes
    useEffect(() => {
        fetchCartItems(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchCartItems(page);
        }
    };

    return (
        <Layout>
            <div className="p-8 flex flex-col items-center">
                <div className="w-[800px]">
                    <h1 className="text-3xl font-bold mb-4">My Cart</h1>
                    {cartItems.length > 0 ? (
                        <div>
                            <table className="w-full border-collapse border border-gray-200 text-center mb-4">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2">Product</th>
                                        <th className="border px-4 py-2">Quantity</th>
                                        <th className="border px-4 py-2">Price</th>
                                        <th className="border px-4 py-2">Total</th>
                                        <th className="border px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.product.id}>
                                            <td className="border px-4 py-2">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                    <div>
                                                        <p className="font-medium">
                                                            {item.product.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {item.product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border px-4 py-2">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            item.product.id,
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="w-16 border rounded-md text-center"
                                                />
                                            </td>
                                            <td className="border px-4 py-2">
                                                ${item.product.price.toFixed(2)}
                                            </td>
                                            <td className="border px-4 py-2">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        handleRemoveItem(item.product.id)
                                                    }
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    Total: ${totalPrice.toFixed(2)}
                                </h2>
                                <button
                                    onClick={handleCheckout}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Checkout
                                </button>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-500">Your cart is empty.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
