import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, User, Settings, LogOut, Coffee } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-autumn-white border-b border-autumn-light-gray shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-autumn-warm rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-autumn-red">VoyageAI</h1>
              <p className="text-xs text-autumn-brown">Your AI Travel Companion</p>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Welcome Message */}
            <div className="hidden md:block text-right">
              <p className="text-sm text-autumn-brown">Welcome back,</p>
              <p className="text-autumn-red font-medium">{user?.fullName}</p>
            </div>

            {/* Profile Button */}
            <button className="p-2 bg-autumn-orange/10 hover:bg-autumn-orange/20 rounded-xl text-autumn-brown hover:text-autumn-red transition-colors">
              <User className="w-5 h-5" />
            </button>

            {/* Settings Button */}
            <button className="p-2 bg-autumn-coral/10 hover:bg-autumn-coral/20 rounded-xl text-autumn-brown hover:text-autumn-red transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-autumn-red/10 hover:bg-autumn-red/20 text-autumn-red hover:text-autumn-coral rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 