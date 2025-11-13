import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Home, Package, MenuSquare, DollarSign, Store, Truck, Star, Users, Bell, Settings, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import UserButton from './UserButton';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
 
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'John Doe', status: 'Preparing', time: '10:30 AM', payment: 'Paid', total: 45.99, items: 'Burger, Fries, Coke' },
    { id: 'ORD002', customer: 'Jane Smith', status: 'Out for Delivery', time: '10:15 AM', payment: 'COD', total: 32.50, items: 'Pizza, Salad' },
    { id: 'ORD003', customer: 'Mike Johnson', status: 'Pending', time: '10:45 AM', payment: 'Paid', total: 28.75, items: 'Pasta, Garlic Bread' },
    { id: 'ORD004', customer: 'Sarah Williams', status: 'Completed', time: '9:30 AM', payment: 'Paid', total: 55.00, items: 'Sushi Platter' },
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Classic Burger', category: 'Main Course', price: 12.99, stock: 'Available', image: '🍔' },
    { id: 2, name: 'Margherita Pizza', category: 'Main Course', price: 15.99, stock: 'Available', image: '🍕' },
    { id: 3, name: 'Caesar Salad', category: 'Appetizers', price: 8.99, stock: 'Available', image: '🥗' },
    { id: 4, name: 'Chocolate Cake', category: 'Desserts', price: 6.99, stock: 'Out of Stock', image: '🍰' },
  ]);

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);

  // Sample data for charts
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

  const topDishes = [
    { name: 'Burger', orders: 89 },
    { name: 'Pizza', orders: 76 },
    { name: 'Pasta', orders: 65 },
    { name: 'Sushi', orders: 54 },
  ];

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

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

  const StatCard = ({ icon: Icon, title, value, subtitle, trend }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${trend === 'up' ? 'bg-green-100' : 'bg-blue-100'}`}>
          <Icon className={`${trend === 'up' ? 'text-green-600' : 'text-blue-600'}`} size={24} />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center text-sm">
          <TrendingUp className="text-green-500 mr-1" size={16} />
          <span className="text-green-500 font-semibold">+12%</span>
          <span className="text-gray-500 ml-1">vs last week</span>
        </div>
      )}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );

  const renderOrders = () => (
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
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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
  );

  const renderMenu = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Menu Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add New Item
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="text-6xl text-center mb-3">{item.image}</div>
              <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">Category: {item.category}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-green-600">${item.price}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.stock === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.stock}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200">
                  Edit
                </button>
                <button className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinancial = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={DollarSign} title="Total Revenue" value="$15,420" subtitle="This Month" />
        <StatCard icon={TrendingUp} title="Profit" value="$8,234" subtitle="After expenses" />
        <StatCard icon={XCircle} title="Refunds" value="$342" subtitle="8 orders" />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Sales Report</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700">Gross Sales</span>
            <span className="font-semibold">$17,830</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700">Platform Commission (15%)</span>
            <span className="font-semibold text-red-600">-$2,674</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700">Delivery Costs</span>
            <span className="font-semibold text-red-600">-$1,394</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700">Refunds</span>
            <span className="font-semibold text-red-600">-$342</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-green-50 px-3 rounded">
            <span className="font-semibold text-gray-800">Net Profit</span>
            <span className="font-bold text-green-600 text-xl">$13,420</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRestaurant = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-6">Restaurant Settings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-semibold">Restaurant Status</p>
              <p className="text-sm text-gray-600">Control order acceptance</p>
            </div>
            <button
              onClick={() => setIsRestaurantOpen(!isRestaurantOpen)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isRestaurantOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isRestaurantOpen ? 'Open' : 'Closed'}
            </button>
          </div>
          <div className="py-3 border-b">
            <p className="font-semibold mb-2">Operating Hours</p>
            <p className="text-gray-700">Monday - Friday: 10:00 AM - 10:00 PM</p>
            <p className="text-gray-700">Saturday - Sunday: 9:00 AM - 11:00 PM</p>
          </div>
          <div className="py-3 border-b">
            <p className="font-semibold mb-2">Delivery Radius</p>
            <p className="text-gray-700">5 km from restaurant location</p>
          </div>
          <div className="py-3">
            <p className="font-semibold mb-2">Contact Information</p>
            <p className="text-gray-700">Phone: (555) 123-4567</p>
            <p className="text-gray-700">Email: contact@restaurant.com</p>
            <p className="text-gray-700">Address: 123 Food Street, City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
      <div className="space-y-4">
        {[
          { name: 'John Doe', rating: 5, comment: 'Amazing food! Fast delivery and great quality.', date: '2 hours ago' },
          { name: 'Jane Smith', rating: 4, comment: 'Good food but delivery was slightly delayed.', date: '5 hours ago' },
          { name: 'Mike Johnson', rating: 5, comment: 'Best pizza in town! Will order again.', date: '1 day ago' },
        ].map((review, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold">{review.name}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <button className="text-blue-600 text-sm mt-2 hover:underline">Reply</button>
          </div>
        ))}
      </div>
    </div>
  );

  const menuItems_nav = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'orders', icon: Package, label: 'Orders' },
    { id: 'menu', icon: MenuSquare, label: 'Menu' },
    { id: 'financial', icon: DollarSign, label: 'Financial' },
    { id: 'restaurant', icon: Store, label: 'Restaurant' },
    { id: 'delivery', icon: Truck, label: 'Delivery' },
    { id: 'reviews', icon: Star, label: 'Reviews' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🍽️</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Foody Zone</h1>
              
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div onClick={()=>setActiveTab('notifications')} className="relative">
              <Bell className="text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
            <div>
              <UserButton ismobile={true}/>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-4">
            {menuItems_nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'menu' && renderMenu()}
          {activeTab === 'financial' && renderFinancial()}
          {activeTab === 'restaurant' && renderRestaurant()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'delivery' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Delivery Management</h3>
              <p className="text-gray-600">Delivery agent management and tracking coming soon...</p>
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Customer Management</h3>
              <p className="text-gray-600">Customer data and analytics coming soon...</p>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Notifications Center</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">New Order Received</p>
                    <p className="text-sm text-gray-600">Order #ORD003 from Mike Johnson</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="text-yellow-600 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Low Stock Alert</p>
                    <p className="text-sm text-gray-600">Chocolate Cake is out of stock</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
              <p className="text-gray-600">Profile settings and preferences coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;