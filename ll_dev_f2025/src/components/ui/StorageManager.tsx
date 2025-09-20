'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { clearAllStorage, getStorageInfo, isStorageAvailable } from '@/lib/storage';

interface StorageManagerProps {
  onDataCleared?: () => void;
}

/**
 * Component for managing localStorage data
 */
export const StorageManager: React.FC<StorageManagerProps> = ({ onDataCleared }) => {
  const [storageInfo, setStorageInfo] = useState({ used: 0, available: 0, percentage: 0 });
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    setIsAvailable(isStorageAvailable());
    setStorageInfo(getStorageInfo());
  }, []);

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This will reset inventory, orders, and navigation state.')) {
      clearAllStorage();
      setStorageInfo(getStorageInfo());
      onDataCleared?.();
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isAvailable) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">Storage Unavailable</h3>
        <p className="text-sm text-yellow-700">
          LocalStorage is not available in this browser. Data will not persist across sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-sm font-medium text-gray-800 mb-3">Data Storage</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Storage Used:</span>
          <span className="font-medium text-gray-800">
            {formatBytes(storageInfo.used)} / {formatBytes(storageInfo.available)}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
          />
        </div>
        
        <div className="text-xs text-gray-500">
          {storageInfo.percentage.toFixed(1)}% of available storage used
        </div>
        
        <Button
          onClick={handleClearData}
          variant="danger"
          size="sm"
          className="w-full"
        >
          Clear All Data
        </Button>
        
        <p className="text-xs text-gray-500">
          This will reset inventory quantities, orders, and navigation state to defaults.
        </p>
      </div>
    </div>
  );
};
