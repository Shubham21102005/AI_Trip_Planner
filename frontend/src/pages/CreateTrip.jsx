import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Users, Calendar, DollarSign, Loader2 } from 'lucide-react';

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    location: '',
    budget: 'moderate',
    people: 2,
    duration: 7
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock location suggestions - in a real app, you'd use a location API
  const mockLocations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'London, UK',
    'Rome, Italy',
    'Barcelona, Spain',
    'Amsterdam, Netherlands',
    'Prague, Czech Republic',
    'Vienna, Austria',
    'Budapest, Hungary',
    'Bali, Indonesia',
    'Bangkok, Thailand',
    'Singapore',
    'Dubai, UAE',
    'Sydney, Australia',
    'Melbourne, Australia',
    'Toronto, Canada',
    'Vancouver, Canada',
    'San Francisco, USA',
    'Los Angeles, USA',
    'Miami, USA',
    'Chicago, USA',
    'Seattle, USA',
    'Boston, USA',
    'Washington DC, USA'
  ];

  const handleLocationChange = (value) => {
    setFormData(prev => ({ ...prev, location: value }));
    
    if (value.length > 2) {
      const filtered = mockLocations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({ ...prev, location }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/trips/create`,
        formData,
        { withCredentials: true }
      );
      
      // Navigate to the created trip
      navigate(`/trip/${response.data.trip._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1120] via-[#0d1c3a] to-[#1a2d4d] p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl text-slate-400 hover:text-cyan-400 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Create New Trip
            </h1>
            <p className="text-slate-400 mt-1">Plan your next adventure with AI</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-slate-900/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-900/40 border border-rose-700/50 rounded-xl text-rose-200 text-center">
                {error}
              </div>
            )}

            {/* Location Input */}
            <div className="relative">
              <label className="block text-slate-300 mb-3 text-sm font-medium">
                <MapPin className="w-4 h-4 inline mr-2" />
                Destination
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="Where do you want to go?"
                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                required
              />
              
              {/* Location Suggestions */}
              {showSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                  {locationSuggestions.map((location, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleLocationSelect(location)}
                      className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center gap-3"
                    >
                      <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{location}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Budget Selection */}
            <div>
              <label className="block text-slate-300 mb-3 text-sm font-medium">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Budget Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'cheap', label: 'Budget', color: 'from-emerald-600 to-teal-600' },
                  { value: 'moderate', label: 'Moderate', color: 'from-blue-600 to-indigo-600' },
                  { value: 'luxury', label: 'Luxury', color: 'from-purple-600 to-pink-600' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, budget: option.value }))}
                    className={`p-4 rounded-xl border transition-all ${
                      formData.budget === option.value
                        ? `bg-gradient-to-r ${option.color} border-transparent text-white shadow-lg`
                        : 'bg-slate-800/70 border-slate-700/50 text-slate-300 hover:border-slate-600/70'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-slate-300 mb-3 text-sm font-medium">
                <Users className="w-4 h-4 inline mr-2" />
                Number of People
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, people: Math.max(1, prev.people - 1) }))}
                  className="w-10 h-10 bg-slate-800/70 border border-slate-700/50 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-slate-200 min-w-[3rem] text-center">
                  {formData.people}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, people: prev.people + 1 }))}
                  className="w-10 h-10 bg-slate-800/70 border border-slate-700/50 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-slate-300 mb-3 text-sm font-medium">
                <Calendar className="w-4 h-4 inline mr-2" />
                Trip Duration (days)
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, duration: Math.max(1, prev.duration - 1) }))}
                  className="w-10 h-10 bg-slate-800/70 border border-slate-700/50 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-slate-200 min-w-[3rem] text-center">
                  {formData.duration}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, duration: prev.duration + 1 }))}
                  className="w-10 h-10 bg-slate-800/70 border border-slate-700/50 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.location}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 rounded-xl text-white font-medium transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-900/30 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Trip...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                    <path d="M16 17H7"></path>
                    <path d="M17 21H9"></path>
                    <path d="M13 17v4"></path>
                    <path d="M9 13v-1"></path>
                    <path d="M15 13v-1"></path>
                  </svg>
                  <span>Create Trip with AI</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip; 