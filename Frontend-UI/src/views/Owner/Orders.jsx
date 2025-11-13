import React, { useState } from 'react'

const Orders = () => {

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Preparing': 'bg-blue-100 text-blue-800',
            'Out for Delivery': 'bg-purple-100 text-purple-800',
            'Completed': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };
    const [orders, setOrders] = useState([
        { id: 'ORD001', customer: 'John Doe', status: 'Preparing', time: '10:30 AM', payment: 'Paid', total: 45.99, items: 'Burger, Fries, Coke' },
        { id: 'ORD002', customer: 'Jane Smith', status: 'Out for Delivery', time: '10:15 AM', payment: 'COD', total: 32.50, items: 'Pizza, Salad' },
        { id: 'ORD003', customer: 'Mike Johnson', status: 'Pending', time: '10:45 AM', payment: 'Paid', total: 28.75, items: 'Pasta, Garlic Bread' },
        { id: 'ORD004', customer: 'Sarah Williams', status: 'Completed', time: '9:30 AM', payment: 'Paid', total: 55.00, items: 'Sushi Platter' },
    ]);
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };
    return (

        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">Orders Management</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{order.items}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{order.time}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900">${order.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${order.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.payment}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        className="text-sm border rounded px-2 py-1"
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders