import { useState } from 'react';
import { Home, Package, MenuSquare, DollarSign, Store, Truck, Star, Users, Bell, Settings, AlertCircle } from 'lucide-react';
import UserButton from '../Components/UserButton';
import Orders from '../views/Owner/Orders';
import Overview from '../views/Owner/Overview';
import Menu from '../views/Owner/Menu';
import Financial from '../views/Owner/Financial';
import Restaurant from '../views/Owner/Restaurant';
import Reviews from '../views/Owner/Reviews';
import { useSelector } from 'react-redux';
import ShopRegistrationFrom from '../views/Owner/ShopRegistrationForm';

const OwnerDashboard = () => {
  
  const { Shopdata,ShopRegister } = useSelector(state => state.Owner)
  const [activeTab, setActiveTab] = useState('overview');


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
          <div>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 capitalize text-center text-blue-700 ">Rahul Kumar Shop</h2>
            </div>
          <div className="flex items-center gap-4">
            <div onClick={() => setActiveTab('notifications')} className="relative">
              <Bell className="text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
            <div>
              <UserButton ismobile={true} />
            </div>
          </div>
        </div>
      </header>
      {(Shopdata && !ShopRegister) ? (<>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-fit md:w-64 bg-white shadow-lg min-h-screen">
            <nav className="p-4">
              {menuItems_nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-fit md:w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium hidden md:block">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
          {/* Main Content */}

          <main className="flex-1 p-6">
            
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'orders' && <Orders />}
            {activeTab === 'menu' && <Menu />}
            {activeTab === 'financial' && <Financial />}
            {activeTab === 'restaurant' && <Restaurant />}
            {activeTab === 'reviews' && <Reviews />}
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
        </>
        ): <ShopRegistrationFrom />}

    </div>
  );
};

export default OwnerDashboard;