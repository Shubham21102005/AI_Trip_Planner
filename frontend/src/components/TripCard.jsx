import { Eye, Trash2, MapPin } from 'lucide-react';

const TripCard = ({ trip, onView, onDelete }) => {
  const { location, budget, duration, people } = trip;

  // Generate a unique gradient based on location for visual consistency
  const locationGradients = {
    Paris: 'from-blue-500/20 to-purple-500/20',
    Tokyo: 'from-rose-500/20 to-amber-500/20',
    NewYork: 'from-indigo-500/20 to-sky-500/20',
    Bali: 'from-emerald-500/20 to-teal-500/20',
    Rome: 'from-amber-500/20 to-orange-500/20',
    Default: 'from-slate-700/20 to-slate-800/20'
  };
  
  const gradientClass = locationGradients[location.split(',')[0]] || locationGradients.Default;

  return (
    <div className="relative group">
      {/* Animated background layer */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-all duration-500 -z-10`}></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
      
      {/* Main card */}
      <div className="relative bg-gradient-to-br from-slate-800/80 to-gray-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl shadow-slate-900/30 p-5 transition-all duration-300 hover:border-slate-600/70 hover:shadow-sky-900/30 group-hover:-translate-y-1">
        {/* Location header with gradient text */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              {location}
            </h2>
          </div>
          
          {/* People count with animation */}
          <div className="relative flex items-center px-2 py-1 bg-slate-800/60 rounded-full border border-slate-700/50 group-hover:bg-slate-800/80 transition-colors">
            <span className="text-xs font-medium text-slate-300">{people}</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Trip details grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 group-hover:border-sky-500/30 transition-colors">
            <p className="text-xs text-slate-400 font-medium mb-1">Budget</p>
            <p className="text-sm font-medium text-slate-200">{budget}</p>
          </div>
          
          <div className="p-3 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 group-hover:border-amber-500/30 transition-colors">
            <p className="text-xs text-slate-400 font-medium mb-1">Duration</p>
            <p className="text-sm font-medium text-slate-200">{duration} day{duration > 1 ? 's' : ''}</p>
          </div>
          
          <div className="p-3 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 group-hover:border-purple-500/30 transition-colors">
            <p className="text-xs text-slate-400 font-medium mb-1">Season</p>
            <p className="text-sm font-medium text-slate-200">Spring</p>
          </div>
          
          <div className="p-3 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 group-hover:border-emerald-500/30 transition-colors">
            <p className="text-xs text-slate-400 font-medium mb-1">Status</p>
            <p className="text-sm font-medium text-emerald-400">Planned</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between border-t border-slate-700/50 pt-4">
          <button
            onClick={() => onView(trip._id)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600/60 to-cyan-600/60 rounded-lg text-slate-200 font-medium hover:from-sky-600/80 hover:to-cyan-600/80 transition-all group/button"
          >
            <Eye className="w-4 h-4 transition-transform group-hover/button:scale-110" />
            <span>View Details</span>
          </button>

          <button
            onClick={() => onDelete(trip._id)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-700/60 to-pink-700/60 rounded-lg text-slate-200 font-medium hover:from-rose-700/80 hover:to-pink-700/80 transition-all group/button"
          >
            <Trash2 className="w-4 h-4 transition-transform group-hover/button:scale-110" />
            <span>Delete</span>
          </button>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default TripCard;