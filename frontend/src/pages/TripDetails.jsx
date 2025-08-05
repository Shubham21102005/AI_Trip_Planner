
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Users, Calendar, DollarSign, Hotel, Map, Star, Loader2, Trash2 } from 'lucide-react';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/trips/${id}`, {
          withCredentials: true
        });
        setTrip(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch trip details');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND}/trips/${id}`, {
          withCredentials: true
        });
        navigate('/dashboard');
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete trip');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c1120] via-[#0d1c3a] to-[#1a2d4d] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center animate-pulse">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-ping-slow">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c1120] via-[#0d1c3a] to-[#1a2d4d] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-rose-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c1120] via-[#0d1c3a] to-[#1a2d4d] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-slate-400 text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Trip Not Found</h2>
          <p className="text-slate-400 mb-6">The trip you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1120] via-[#0d1c3a] to-[#1a2d4d] p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl text-slate-400 hover:text-cyan-400 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {trip.location}
              </h1>
              <p className="text-slate-400 mt-1">Your AI-generated travel plan</p>
            </div>
          </div>
          
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600/60 to-pink-600/60 hover:from-rose-600/80 hover:to-pink-600/80 border border-rose-700/50 rounded-xl text-slate-200 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Trip</span>
          </button>
        </div>

        {/* Trip Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <h3 className="text-slate-300 font-medium">Destination</h3>
            </div>
            <p className="text-xl font-bold text-slate-200">{trip.location}</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h3 className="text-slate-300 font-medium">Budget</h3>
            </div>
            <p className="text-xl font-bold text-slate-200 capitalize">{trip.budget}</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="text-slate-300 font-medium">Travelers</h3>
            </div>
            <p className="text-xl font-bold text-slate-200">{trip.people}</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-amber-400" />
              <h3 className="text-slate-300 font-medium">Duration</h3>
            </div>
            <p className="text-xl font-bold text-slate-200">{trip.duration} days</p>
          </div>
        </div>

        {/* Hotel Recommendations */}
        {trip.hotels && trip.hotels.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Hotel className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-slate-200">Hotel Recommendations</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trip.hotels.map((hotel, index) => (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-200">{hotel.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm text-slate-300">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-3">{hotel.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-400">${hotel.price}/night</span>
                    <span className="text-sm text-slate-500">{hotel.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Day-by-Day Itinerary */}
        {trip.itinerary && trip.itinerary.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Map className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-slate-200">Day-by-Day Itinerary</h2>
            </div>
            
            <div className="space-y-6">
              {trip.itinerary.map((day, index) => (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-200">Day {index + 1}</h3>
                      {day.bestTimeToVisit && (
                        <p className="text-sm text-slate-400">Best time to visit: {day.bestTimeToVisit}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {day.places && day.places.map((place, placeIndex) => (
                      <div key={placeIndex} className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-200 mb-1">{place.placeName}</h4>
                          <p className="text-slate-400 text-sm mb-2">{place.placeDetails}</p>
                          <div className="flex flex-wrap gap-2">
                            {place.travelTime && (
                              <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                                🚗 {place.travelTime}
                              </span>
                            )}
                            {place.ticketPrice && (
                              <span className="text-xs text-emerald-500 bg-slate-800/50 px-2 py-1 rounded">
                                💰 ${place.ticketPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback for trips without AI-generated content */}
        {(!trip.hotels || trip.hotels.length === 0) && (!trip.itinerary || trip.itinerary.length === 0) && (
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 text-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/80 border border-slate-700/50 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 17H7"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 21H9"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 17v4"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13v-1"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13v-1"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-300 mb-2">AI Planning in Progress</h3>
            <p className="text-slate-500 mb-6">
              Your trip is being planned by our AI. Check back soon for hotel recommendations and a detailed itinerary!
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails; 