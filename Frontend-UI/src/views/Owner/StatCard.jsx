import { TrendingUp } from 'lucide-react'
import React from 'react'

const StatCard = ({ icon: Icon, title, value, subtitle, trend }) => {
    return (
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

    )
}

export default StatCard