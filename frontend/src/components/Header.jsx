import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-slate-800/80 to-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* App Logo/Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M16 17H7"></path>
                <path d="M17 21H9"></path>
                <path d="M13 17v4"></path>
                <path d="M9 13v-1"></path>
                <path d="M15 13v-1"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TripPlanner AI
            </h1>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Profile Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl text-slate-300 transition-all group">
              <User className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
              <span className="text-sm font-medium">{user?.fullName || 'User'}</span>
            </button>

            {/* Settings Button */}
            <button className="p-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl text-slate-400 hover:text-cyan-400 transition-all">
              <Settings className="w-4 h-4" />
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600/60 to-pink-600/60 hover:from-rose-600/80 hover:to-pink-600/80 border border-rose-700/50 rounded-xl text-slate-200 transition-all group"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 