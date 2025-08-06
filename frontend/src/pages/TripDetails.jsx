import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Users, Calendar, DollarSign, Hotel, Map, Star, Loader2, Trash2, Coffee } from 'lucide-react';

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
      <div className="min-h-screen bg-autumn-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-autumn-warm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
          <p className="text-autumn-brown">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-autumn-gradient flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-rose-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-autumn-red mb-2">Error</h2>
          <p className="text-autumn-brown mb-6">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-autumn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-autumn-gradient flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-autumn-brown text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-autumn-red mb-2">Trip Not Found</h2>
          <p className="text-autumn-brown mb-6">The trip you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-autumn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-autumn-gradient">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 bg-autumn-orange/10 hover:bg-autumn-orange/20 rounded-xl text-autumn-brown hover:text-autumn-red transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-autumn-red">
                {trip.location}
              </h1>
              <p className="text-autumn-brown">Your AI-generated travel plan</p>
            </div>
          </div>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-autumn-coral/10 hover:bg-autumn-coral/20 text-autumn-coral hover:text-autumn-red rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Trip</span>
          </button>
        </div>

        {/* Trip Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="autumn-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-autumn-coral" />
              <h3 className="text-autumn-brown font-medium">Destination</h3>
            </div>
            <p className="text-xl font-bold text-autumn-red">{trip.location}</p>
          </div>

          <div className="autumn-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-autumn-orange" />
              <h3 className="text-autumn-brown font-medium">Budget</h3>
            </div>
            <p className="text-xl font-bold text-autumn-red capitalize">{trip.budget}</p>
          </div>

          <div className="autumn-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-autumn-red" />
              <h3 className="text-autumn-brown font-medium">Travelers</h3>
            </div>
            <p className="text-xl font-bold text-autumn-red">{trip.people}</p>
          </div>

          <div className="autumn-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-autumn-brown" />
              <h3 className="text-autumn-brown font-medium">Duration</h3>
            </div>
            <p className="text-xl font-bold text-autumn-red">{trip.duration} days</p>
          </div>
        </div>

        {/* Hotel Recommendations */}
        {trip.hotels && trip.hotels.length > 0 && (
          <div className="autumn-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Hotel className="w-6 h-6 text-autumn-coral" />
              <h2 className="text-2xl font-bold text-autumn-red">Hotel Recommendations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trip.hotels.map((hotel, index) => (
                <div
                  key={index}
                  className="bg-autumn-white border border-autumn-light-gray rounded-2xl p-6 hover:border-autumn-orange transition-all cursor-pointer"
                  onClick={() => {
                    const query = `${hotel.name} ${trip.location}`.split(' ').join('+');
                    window.open(`https://www.google.com/search?q=${query}`, '_blank');
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-autumn-red">{hotel.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-autumn-orange fill-current" />
                      <span className="text-sm text-autumn-brown">{hotel.rating}</span>
                    </div>
                  </div>

                  <p className="text-autumn-brown text-sm mb-3">{hotel.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-autumn-coral">${hotel.price}/night</span>
                    <span className="text-sm text-autumn-gray">{hotel.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Day-by-Day Itinerary */}
        {trip.itinerary && trip.itinerary.length > 0 && (
          <div className="autumn-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Map className="w-6 h-6 text-autumn-red" />
              <h2 className="text-2xl font-bold text-autumn-red">Day-by-Day Itinerary</h2>
            </div>

            <div className="space-y-6">
              {trip.itinerary.map((day, index) => (
                <div key={index} className="bg-autumn-white border border-autumn-light-gray rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-autumn-warm flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-autumn-red">Day {index + 1}</h3>
                      {day.bestTimeToVisit && (
                        <p className="text-sm text-autumn-brown">Best time to visit: {day.bestTimeToVisit}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {day.places && day.places.map((place, placeIndex) => (
                      <div key={placeIndex} className="flex items-start gap-4 p-4 bg-autumn-light-gray/50 rounded-xl">
                        <div className="w-3 h-3 rounded-full bg-autumn-coral mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-autumn-red mb-1">{place.placeName}</h4>
                          <p className="text-autumn-brown text-sm mb-2">{place.placeDetails}</p>
                          <div className="flex flex-wrap gap-2">
                            {place.travelTime && (
                              <span className="text-xs text-autumn-gray bg-autumn-white px-2 py-1 rounded">
                                🚗 {place.travelTime}
                              </span>
                            )}
                            {place.ticketPrice && (
                              <span className="text-xs text-autumn-coral bg-autumn-white px-2 py-1 rounded">
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

        {/* Fallback for missing content */}
        {(!trip.hotels || trip.hotels.length === 0) && (!trip.itinerary || trip.itinerary.length === 0) && (
          <div className="autumn-card p-8 text-center">
            <div className="w-24 h-24 bg-autumn-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Coffee className="h-12 w-12 text-autumn-coral" />
            </div>
            <h3 className="text-xl font-medium text-autumn-red mb-2">AI Planning in Progress</h3>
            <p className="text-autumn-brown mb-6">
              Your trip is being planned by our AI. Check back soon for hotel recommendations and a detailed itinerary!
            </p>
            <div className="flex items-center justify-center gap-2 text-autumn-brown">
              <div className="w-2 h-2 bg-autumn-coral rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-autumn-coral rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-autumn-coral rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
