import React from 'react'
import StatCard from './StatCard'
import { DollarSign, TrendingUp, XCircle } from 'lucide-react'

const Financial = () => {
  return (
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

  )
}

export default Financial