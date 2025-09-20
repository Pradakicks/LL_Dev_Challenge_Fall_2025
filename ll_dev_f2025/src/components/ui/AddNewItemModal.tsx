'use client';

import React, { useState, useCallback } from 'react';
import { CreateTShirtItem, ProductColor, ProductSize } from '@/types';
import { validateTShirtItem, hasValidationErrors } from '@/lib/validation';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: CreateTShirtItem) => void;
}

/**
 * Modal for adding new inventory items with form validation
 */
export const AddNewItemModal: React.FC<AddNewItemModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState<CreateTShirtItem>({
    name: '',
    size: 'M',
    color: 'red',
    quantity: 0,
    requiredPcs: 24,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback((field: keyof CreateTShirtItem, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = validateTShirtItem(formData);
    setErrors(newErrors);
    return !hasValidationErrors(newErrors);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddItem(formData);
      // Reset form
      setFormData({
        name: '',
        size: 'M',
        color: 'red',
        quantity: 0,
        requiredPcs: 24,
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      size: 'M',
      color: 'red',
      quantity: 0,
      requiredPcs: 24,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Item</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name *"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Gildan T-Shirt - Red"
            error={errors.name}
          />

          <Select
            label="Size"
            value={formData.size}
            onChange={(e) => handleInputChange('size', e.target.value as ProductSize)}
            options={[
              { value: 'S', label: 'Small (S)' },
              { value: 'M', label: 'Medium (M)' },
              { value: 'L', label: 'Large (L)' },
              { value: 'XL', label: 'Extra Large (XL)' },
            ]}
            error={errors.size}
          />

          <Select
            label="Color"
            value={formData.color}
            onChange={(e) => handleInputChange('color', e.target.value as ProductColor)}
            options={[
              { value: 'red', label: 'Red' },
              { value: 'black', label: 'Black' },
              { value: 'white', label: 'White' },
            ]}
            error={errors.color}
          />

          <Input
            label="Current Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
            min="0"
            error={errors.quantity}
          />

          <Input
            label="Required Pieces"
            type="number"
            value={formData.requiredPcs}
            onChange={(e) => handleInputChange('requiredPcs', parseInt(e.target.value) || 0)}
            min="1"
            error={errors.requiredPcs}
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
            >
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
