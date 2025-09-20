'use client';

import React, { useState, useCallback } from 'react';
import { TShirtItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

interface OrderNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrder: (orderData: { item: TShirtItem; quantity: number }) => void;
  availableItems: TShirtItem[];
}

/**
 * Modal for creating new orders from available inventory items
 */
export const OrderNewItemModal: React.FC<OrderNewItemModalProps> = ({ 
  isOpen, 
  onClose, 
  onOrder, 
  availableItems 
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedItem = availableItems.find(item => item.id.toString() === selectedItemId);

  const handleInputChange = useCallback((field: string, value: string | number) => {
    if (field === 'item') {
      setSelectedItemId(value as string);
    } else if (field === 'quantity') {
      setQuantity(value as number);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!selectedItemId) {
      newErrors.item = 'Please select an item to order';
    }

    if (quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (quantity > 1000) {
      newErrors.quantity = 'Quantity cannot exceed 1000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedItemId, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && selectedItem) {
      onOrder({
        item: selectedItem,
        quantity: quantity,
      });
      
      // Reset form
      setSelectedItemId('');
      setQuantity(1);
      setErrors({});
    }
  };

  const handleClose = () => {
    setSelectedItemId('');
    setQuantity(1);
    setErrors({});
    onClose();
  };

  // Create options for the item selector
  const itemOptions = availableItems.map(item => ({
    value: item.id.toString(),
    label: `${item.name} (${item.size}, ${item.color}) - Stock: ${item.quantity}`,
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Create New Order</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Select Item *"
            value={selectedItemId}
            onChange={(e) => handleInputChange('item', e.target.value)}
            options={itemOptions}
            placeholder="Choose an item to order"
            error={errors.item}
          />

          {selectedItem && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Item Details</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Name:</span> {selectedItem.name}</p>
                <p><span className="font-medium">Size:</span> {selectedItem.size}</p>
                <p><span className="font-medium">Color:</span> {selectedItem.color}</p>
                <p><span className="font-medium">Current Stock:</span> {selectedItem.quantity}</p>
                <p><span className="font-medium">Required Pieces:</span> {selectedItem.requiredPcs}</p>
              </div>
            </div>
          )}

          <Input
            label="Order Quantity *"
            type="number"
            value={quantity}
            onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
            min="1"
            max="1000"
            error={errors.quantity}
            helperText="Enter the quantity you want to order"
          />

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={!selectedItem}
            >
              Create Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
