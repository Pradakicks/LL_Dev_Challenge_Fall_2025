'use client';

import { useState } from 'react';

// Sample data for T-shirt inventory
const tshirtData = [
  { id: 1, name: 'Gildan T-Shirt - Red', size: 'M', color: 'red', quantity: 13 },
  { id: 2, name: 'Gildan T-Shirt - Red', size: 'L', color: 'red', quantity: 46 },
  { id: 3, name: 'Gildan T-Shirt - Black', size: 'S', color: 'black', quantity: 21 },
  { id: 4, name: 'Gildan T-Shirt - Black', size: 'M', color: 'black', quantity: 34 },
  { id: 5, name: 'Gildan T-Shirt - Black', size: 'L', color: 'black', quantity: 27 },
  { id: 6, name: 'Gildan T-Shirt - White', size: 'S', color: 'white', quantity: 34 },
  { id: 7, name: 'Gildan T-Shirt - White', size: 'M', color: 'white', quantity: 51 },
  { id: 8, name: 'Gildan T-Shirt - White', size: 'L', color: 'white', quantity: 29 },
];

export default function Home() {
  const [inventory, setInventory] = useState(tshirtData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');

  const updateQuantity = (id: number, newQuantity: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ));
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-gray-50 flex flex-col items-center py-6 space-y-6">
        {/* Navigation Icons */}
        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/>
          </svg>
        </div>
        
        <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
            <path d="M14 2v6h6"/>
            <path d="M16 13H8"/>
            <path d="M16 17H8"/>
            <path d="M10 9H8"/>
          </svg>
        </div>
        
        <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/>
          </svg>
        </div>
        
        {/* Bottom Profile Section */}
        <div className="mt-auto flex flex-col items-center space-y-2">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-yellow-400 rounded flex items-center justify-center relative overflow-hidden">
            {/* Diagonal pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent transform rotate-45 scale-150"></div>
            <span className="text-white font-bold text-lg relative z-10">L</span>
          </div>
          
          {/* User Profile */}
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-gray-800 font-bold text-sm">L</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                Materials <span className="text-gray-500 font-normal text-2xl">/ Blanks</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="mb-8 flex items-center space-x-4">
              <div className="relative flex-1 max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Materials"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
              
              {/* Filter and Sort Icons */}
              <div className="flex space-x-3">
                <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3V4zm0 5h18v2H3V9zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
                  </svg>
                </button>
                <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-4">
              {filteredInventory.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  {/* T-shirt Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${
                    item.color === 'red' ? 'bg-red-500' :
                    item.color === 'black' ? 'bg-black' :
                    'bg-white border-2 border-gray-300'
                  }`}>
                    <svg className={`w-7 h-7 ${item.color === 'white' ? 'text-gray-600' : 'text-white'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 6h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8zm2 2v6h8v-6H8z"/>
                    </svg>
                  </div>
                  
                  {/* Product Name */}
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold text-lg">
                      {item.name} / {item.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Inventory Panel */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-8">
            {/* Tabs */}
            <div className="flex mb-8">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-6 py-3 text-sm font-semibold rounded-l-lg transition-colors ${
                  activeTab === 'inventory'
                    ? 'bg-white text-gray-800 border border-gray-300 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab('order')}
                className={`px-6 py-3 text-sm font-semibold rounded-r-lg transition-colors ${
                  activeTab === 'order'
                    ? 'bg-white text-gray-800 border border-gray-300 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Order Queue
              </button>
            </div>

            {/* Add New Button */}
            <div className="relative mb-8">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-sm">
                + Add New
              </button>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                <span className="text-gray-800 font-bold text-sm">L</span>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="space-y-6">
              {filteredInventory.map((item) => (
                <div key={item.id} className="flex items-center justify-center">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
                    >
                      <span className="text-gray-600 font-medium text-lg">-</span>
                    </button>
                    
                    <div className="text-center">
                      <div className="w-14 h-10 bg-amber-100 rounded flex items-center justify-center">
                        <span className="text-gray-800 font-semibold text-lg">{item.quantity}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">24 PCS</p>
                    </div>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
                    >
                      <span className="text-gray-600 font-medium text-lg">+</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
