'use client';

import React from 'react';
import { TShirtItem } from '@/types';
import { ICONS, COLORS, LAYOUT } from '@/lib/constants';

interface OrderQueueProps {
  items: TShirtItem[];
}

interface OrderItem {
  id: number;
  item: TShirtItem;
  quantity: number;
  status: 'pending' | 'processing' | 'completed';
  orderDate: string;
}

// Mock order data - in a real app this would come from an API
const mockOrders: OrderItem[] = [
  {
    id: 1,
    item: { id: 1, name: 'Classic T-Shirt', size: 'M', color: 'red', quantity: 50 },
    quantity: 25,
    status: 'pending',
    orderDate: '2024-01-15',
  },
  {
    id: 2,
    item: { id: 2, name: 'Classic T-Shirt', size: 'L', color: 'black', quantity: 30 },
    quantity: 15,
    status: 'processing',
    orderDate: '2024-01-14',
  },
  {
    id: 3,
    item: { id: 3, name: 'Classic T-Shirt', size: 'S', color: 'white', quantity: 40 },
    quantity: 20,
    status: 'completed',
    orderDate: '2024-01-13',
  },
];

export const OrderQueue = React.memo<OrderQueueProps>(({ items }) => {
  const getStatusColor = (status: OrderItem['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: OrderItem['status']) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '🔄';
      case 'completed':
        return '✅';
      default:
        return '❓';
    }
  };

  return (
    <div className="space-y-4">
      {/* Order Queue Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Queue</h3>
        <p className="text-sm text-gray-500">Manage pending and processing orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {mockOrders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{order.item.name}</h4>
                <p className="text-sm text-gray-500">
                  {order.item.size} • {order.item.color}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                <span className="mr-1">{getStatusIcon(order.status)}</span>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Quantity:</span> {order.quantity}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(order.orderDate).toLocaleDateString()}
              </div>
            </div>
            
            {order.status === 'pending' && (
              <div className="mt-3 flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                  Start Processing
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
              </div>
            )}
            
            {order.status === 'processing' && (
              <div className="mt-3 flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 transition-colors">
                  Mark Complete
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-300 transition-colors">
                  View Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockOrders.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">📦</div>
          <p className="text-gray-500 text-sm">No orders in queue</p>
        </div>
      )}
    </div>
  );
});
