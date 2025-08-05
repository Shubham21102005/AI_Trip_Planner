import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import TripCard from '../components/TripCard';
import { Plus, MapPin, Coffee } from 'lucide-react';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/trips/saved`, {
        withCredentials: true
      });
      setTrips(response.data);
    } catch (error) {
      setError('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/trips/${tripId}`, {
        withCredentials: true
      });
      fetchTrips(); // Refresh the list
    } catch (error) {
      setError('Failed to delete trip');
    }
  };

  return (
    <div className="min-h-screen bg-autumn-gradient">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-autumn-warm rounded-2xl flex items-center justify-center">
              <Coffee className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-autumn-red mb-4">
            Your Travel Adventures
          </h1>
          <p className="text-xl text-autumn-brown max-w-2xl mx-auto">
            Discover your saved trips and create new adventures with AI-powered planning
          </p>
        </div>

        {/* Create New Trip Button */}
        <div className="text-center mb-12">
          <Link
            to="/create-trip"
            className="inline-flex items-center gap-3 btn-autumn-primary text-lg px-8 py-4"
          >
            <Plus className="w-6 h-6" />
            Plan New Adventure
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-autumn-coral/10 border border-autumn-coral/20 rounded-xl text-autumn-coral text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-autumn-brown">
              <div className="w-6 h-6 border-2 border-autumn-orange border-t-transparent rounded-full animate-spin"></div>
              <span>Loading your adventures...</span>
            </div>
          </div>
        )}

        {/* Trips Grid */}
        {!loading && trips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <TripCard
                key={trip._id}
                trip={trip}
                onDelete={() => handleDeleteTrip(trip._id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && trips.length === 0 && (
          <div className="text-center py-16">
            <div className="autumn-card p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-autumn-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-autumn-coral" />
              </div>
              <h3 className="text-2xl font-bold text-autumn-red mb-4">
                No Adventures Yet
              </h3>
              <p className="text-autumn-brown mb-8">
                Start your journey by creating your first AI-powered travel plan
              </p>
              <Link
                to="/create-trip"
                className="btn-autumn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Your First Trip
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;