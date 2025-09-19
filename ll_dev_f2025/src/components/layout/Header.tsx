'use client';

export const Header = () => {
  return (
    <div className="h-16 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-yellow-400 rounded flex items-center justify-center relative overflow-hidden">
        {/* Diagonal pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent transform rotate-45 scale-150"></div>
        <div className="w-6 h-6 bg-white rounded-sm relative z-10"></div>
      </div>
      
      {/* User Profile */}
      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};
