'use client';

import React, { useState, useEffect } from 'react';
import { TShirtItem, OrderItem, OrderStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { OrderNewItemModal } from './OrderNewItemModal';
import { saveToStorage, loadOrderData, STORAGE_KEYS } from '@/lib/storage';

interface OrderQueueProps {
  items: TShirtItem[];
  onOrderCompleted?: (itemId: number, quantity: number) => void;
  filterOrders?: (orders: OrderItem[]) => OrderItem[];
}

/**
 * Order queue component for managing and tracking orders with persistence
 */
export const OrderQueue = React.memo<OrderQueueProps>(({ items, onOrderCompleted, filterOrders }) => {
  // Start with empty array to prevent hydration mismatch
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [recentlyCompleted, setRecentlyCompleted] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load orders from localStorage after hydration
  useEffect(() => {
    const savedOrders = loadOrderData();
    setOrders(savedOrders);
    setIsHydrated(true);
  }, []);

  // Save orders to localStorage whenever they change (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(STORAGE_KEYS.ORDERS, orders);
    }
  }, [orders, isHydrated]);

  // Filter orders based on search term
  const filteredOrders = React.useMemo(() => {
    if (!filterOrders) return orders;
    return filterOrders(orders);
  }, [orders, filterOrders]);

  /**
   * Gets the appropriate styling for order status
   */
  const getStatusColor = (status: OrderStatus) => {
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

  /**
   * Gets the appropriate icon for order status
   */
  const getStatusIcon = (status: OrderStatus) => {
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

  /**
   * Handles creating a new order
   */
  const handleCreateOrder = (orderData: { item: TShirtItem; quantity: number }) => {
    const newOrder: OrderItem = {
      id: Date.now(), // Simple ID generation for demo
      item: orderData.item,
      quantity: orderData.quantity,
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
    };
    
    setOrders(prev => [...prev, newOrder]);
    setIsOrderModalOpen(false);
  };

  /**
   * Updates the status of an order
   */
  const updateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        // If order is being marked as completed, update inventory
        if (newStatus === 'completed' && order.status !== 'completed' && onOrderCompleted) {
          onOrderCompleted(order.item.id, order.quantity);
          setRecentlyCompleted(orderId);
          // Clear the recently completed indicator after 3 seconds
          setTimeout(() => setRecentlyCompleted(null), 3000);
        }
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  /**
   * Removes an order from the queue
   */
  const removeOrder = (orderId: number) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  // Show loading state until hydration is complete
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="sm" text="Loading orders..." />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Order Queue Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Queue</h3>
            <p className="text-sm text-gray-500">
              {filteredOrders.length !== orders.length 
                ? `Showing ${filteredOrders.length} of ${orders.length} orders`
                : 'Track and manage your orders'
              }
            </p>
          </div>
          <Button
            onClick={() => setIsOrderModalOpen(true)}
            variant="primary"
            size="md"
          >
            + New Order
          </Button>
        </div>

        {/* Order Statistics */}
        {filteredOrders.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="text-yellow-800 font-semibold text-lg">
                {filteredOrders.filter(o => o.status === 'pending').length}
              </div>
              <div className="text-yellow-600 text-sm">Pending</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-blue-800 font-semibold text-lg">
                {filteredOrders.filter(o => o.status === 'processing').length}
              </div>
              <div className="text-blue-600 text-sm">Processing</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="text-green-800 font-semibold text-lg">
                {filteredOrders.filter(o => o.status === 'completed').length}
              </div>
              <div className="text-green-600 text-sm">Completed</div>
            </div>
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div 
            key={order.id} 
            className={`border rounded-lg p-4 transition-all duration-300 ${
              recentlyCompleted === order.id 
                ? 'border-green-300 bg-green-50 shadow-md' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{order.item.name}</h4>
                <p className="text-sm text-gray-500">
                  {order.item.size} • {order.item.color}
                </p>
                {recentlyCompleted === order.id && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    ✅ Added {order.quantity} items to inventory!
                  </p>
                )}
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
                <Button
                  onClick={() => updateOrderStatus(order.id, 'processing')}
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  Start Processing
                </Button>
                <Button
                  onClick={() => removeOrder(order.id)}
                  variant="danger"
                  size="sm"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
            
            {order.status === 'processing' && (
              <div className="mt-3 flex gap-2">
                <Button
                  onClick={() => updateOrderStatus(order.id, 'completed')}
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  Mark Complete & Add to Inventory
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order.id, 'pending')}
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  Back to Pending
                </Button>
              </div>
            )}

            {order.status === 'completed' && (
              <div className="mt-3 flex gap-2">
                <Button
                  onClick={() => removeOrder(order.id)}
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  Remove Order
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {orders.length === 0 ? 'No orders yet' : 'No orders match your search'}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {orders.length === 0 
              ? 'Create your first order to get started' 
              : 'Try adjusting your search terms'
            }
          </p>
          {orders.length === 0 && (
            <Button
              onClick={() => setIsOrderModalOpen(true)}
              variant="primary"
            >
              Create New Order
            </Button>
          )}
        </div>
      )}

      {/* Order Modal */}
      <OrderNewItemModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onOrder={handleCreateOrder}
        availableItems={items}
      />
    </div>
  );
});
