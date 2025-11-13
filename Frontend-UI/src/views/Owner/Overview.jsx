import { Package, DollarSign, Clock, Star } from 'lucide-react';
import React from 'react'
import StatCard from './StatCard';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Overview = () => {


    const topDishes = [
        { name: 'Burger', orders: 89 },
        { name: 'Pizza', orders: 76 },
        { name: 'Pasta', orders: 65 },
        { name: 'Sushi', orders: 54 },
    ];
    const revenueData = [
        { day: 'Mon', revenue: 1200 },
        { day: 'Tue', revenue: 1900 },
        { day: 'Wed', revenue: 1600 },
        { day: 'Thu', revenue: 2100 },
        { day: 'Fri', revenue: 2800 },
        { day: 'Sat', revenue: 3200 },
        { day: 'Sun', revenue: 2900 },
    ];
    const orderStatusData = [
        { name: 'Completed', value: 145, color: '#10b981' },
        { name: 'Pending', value: 12, color: '#f59e0b' },
        { name: 'Cancelled', value: 8, color: '#ef4444' },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-fit">
                <StatCard icon={Package} title="Total Orders Today" value="47" subtitle="12 pending" trend="up" />
                <StatCard icon={DollarSign} title="Revenue Today" value="$1,842" subtitle="$15,420 this week" trend="up" />
                <StatCard icon={Clock} title="Avg Delivery Time" value="28 min" subtitle="Target: 30 min" />
                <StatCard icon={Star} title="Customer Rating" value="4.8" subtitle="Based on 234 reviews" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Weekly Revenue</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={orderStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                                {orderStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Dishes */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Top Selling Dishes</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={topDishes}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

    )
}

export default Overview