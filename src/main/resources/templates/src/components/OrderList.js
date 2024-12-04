import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

function OrderList({ orders, currentPage, totalPages, onPageChange, isAdmin }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-between min-h-[480px]">
            <div>
                <table className="w-full border-collapse border border-gray-200 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">ORDER</th>
                            {isAdmin && <th className="border px-4 py-2">USER</th>}
                            <th className="border px-4 py-2">ITEMS NUMBER</th>
                            <th className="border px-4 py-2">DATE</th>
                            <th className="border px-4 py-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const totalItems = order.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                            );

                            return (
                                <tr key={order.orderNumber}>
                                    <td
                                        className="border px-4 py-2 text-blue-500 hover:underline cursor-pointer"
                                        onClick={() => navigate(`/orders/${order.orderNumber}`)}
                                    >
                                        {order.orderNumber}
                                    </td>
                                    {isAdmin && <td className="border px-4 py-2">{order.username}</td>}
                                    <td className="border px-4 py-2">{totalItems}</td>
                                    <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}

OrderList.propTypes = {
    orders: PropTypes.arrayOf(
        PropTypes.shape({
            orderNumber: PropTypes.string.isRequired,
            username: PropTypes.string,
            items: PropTypes.array.isRequired,
            createdAt: PropTypes.string.isRequired,
            totalPrice: PropTypes.number.isRequired,
        })
    ),
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
};

export default OrderList;
