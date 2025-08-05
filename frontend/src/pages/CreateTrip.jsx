import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Users, Calendar, DollarSign, Coffee, Search } from 'lucide-react';

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    location: '',
    budget: 'moderate',
    people: 2,
    duration: 3
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const navigate = useNavigate();

  // Mock location suggestions
  const locationSuggestions = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'Bali, Indonesia',
    'Rome, Italy',
    'Barcelona, Spain',
    'Amsterdam, Netherlands',
    'Prague, Czech Republic',
    'Vienna, Austria',
    'Budapest, Hungary'
  ];

  const filteredSuggestions = locationSuggestions.filter(location =>
    location.toLowerCase().includes(formData.location.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'location') {
      setShowSuggestions(value.length > 0);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, location: suggestion }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/trips/create`, formData, {
        withCredentials: true
      });
      navigate(`/trip/${response.data.trip._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-autumn-gradient">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-autumn-orange/10 hover:bg-autumn-orange/20 rounded-xl text-autumn-brown hover:text-autumn-red transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-autumn-red">Plan Your Adventure</h1>
            <p className="text-autumn-brown">Let AI create your perfect travel itinerary</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="autumn-card p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-autumn-coral/10 border border-autumn-coral/20 rounded-xl text-autumn-coral text-sm">
                {error}
              </div>
            )}

            {/* Location Input */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-autumn-brown mb-3">
                Where would you like to go?
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-autumn-gray" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="autumn-input w-full pl-10"
                  placeholder="Enter destination (e.g., Paris, France)"
                  autoComplete="off"
                />
              </div>
              
              {/* Location Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="mt-2 bg-autumn-white border border-autumn-light-gray rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-autumn-orange/10 text-autumn-brown hover:text-autumn-red transition-colors flex items-center gap-3"
                    >
                      <MapPin className="w-4 h-4 text-autumn-gray" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Budget Selection */}
            <div>
              <label className="block text-sm font-medium text-autumn-brown mb-3">
                What's your budget?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'cheap', label: 'Budget', icon: '💰', description: 'Affordable options' },
                  { value: 'moderate', label: 'Moderate', icon: '💎', description: 'Balanced comfort' },
                  { value: 'luxury', label: 'Luxury', icon: '👑', description: 'Premium experience' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, budget: option.value }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.budget === option.value
                        ? 'border-autumn-coral bg-autumn-coral/10 text-autumn-coral'
                        : 'border-autumn-light-gray bg-autumn-white text-autumn-brown hover:border-autumn-orange hover:bg-autumn-orange/5'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs opacity-75">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* People and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of People */}
              <div>
                <label className="block text-sm font-medium text-autumn-brown mb-3">
                  How many travelers?
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, people: Math.max(1, prev.people - 1) }))}
                    className="w-10 h-10 bg-autumn-orange/10 hover:bg-autumn-orange/20 rounded-lg flex items-center justify-center text-autumn-orange hover:text-autumn-red transition-colors"
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-autumn-brown" />
                    <span className="text-xl font-bold text-autumn-red">{formData.people}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, people: prev.people + 1 }))}
                    className="w-10 h-10 bg-autumn-orange/10 hover:bg-autumn-orange/20 rounded-lg flex items-center justify-center text-autumn-orange hover:text-autumn-red transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-autumn-brown mb-3">
                  How many days?
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, duration: Math.max(1, prev.duration - 1) }))}
                    className="w-10 h-10 bg-autumn-coral/10 hover:bg-autumn-coral/20 rounded-lg flex items-center justify-center text-autumn-coral hover:text-autumn-red transition-colors"
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-autumn-brown" />
                    <span className="text-xl font-bold text-autumn-red">{formData.duration}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, duration: prev.duration + 1 }))}
                    className="w-10 h-10 bg-autumn-coral/10 hover:bg-autumn-coral/20 rounded-lg flex items-center justify-center text-autumn-coral hover:text-autumn-red transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.location}
              className="w-full btn-autumn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Your Adventure...
                </>
              ) : (
                <>
                  <Coffee className="w-5 h-5" />
                  Create My Adventure
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