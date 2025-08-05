import React, { useEffect, useState } from 'react';
import TripCard from '../components/TripCard.jsx';
import Header from '../components/Header.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

function Dashboard() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchTrips = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND}/trips/saved`, {
                withCredentials: true,
            });
            setTrips(res.data);
        } catch (error) {
            console.error('Failed to fetch trips:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTrip = async (tripId) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND}/trips/${tripId}`, {
                    withCredentials: true
                });
                // Refresh the trips list
                fetchTrips();
            } catch (error) {
                console.error('Failed to delete trip:', error);
            }
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0c1120] via-[#0d1c3a] to-[#1a2d4d] relative overflow-hidden">
            <Header />
            <div className="p-6">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-1/3 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Floating islands */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1e3a8a] to-transparent"></div>
            </div>
            
            {/* Header */}
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                            Your Travel Dashboard
                        </h1>
                        <p className="mt-2 text-slate-400">
                            Manage and plan your upcoming adventures
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => navigate('/create-trip')}
                        className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-medium flex items-center gap-2 hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-[1.03] shadow-lg shadow-blue-900/30"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create New Trip</span>
                    </button>
                </div>
                
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg shadow-blue-900/10">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">Total Trips</p>
                                <p className="text-3xl font-bold text-sky-400 mt-1">{trips.length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-600/30 to-cyan-600/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg shadow-purple-900/10">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">Upcoming</p>
                                <p className="text-3xl font-bold text-purple-400 mt-1">{trips.filter(trip => trip.status === 'upcoming').length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg shadow-rose-900/10">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">Destinations</p>
                                <p className="text-3xl font-bold text-rose-400 mt-1">{new Set(trips.map(trip => trip.location)).size}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-rose-600/30 to-red-600/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Trip cards section */}
                <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-xl shadow-slate-900/20 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-200">Your Saved Trips</h2>
                        <div className="relative">
                            <select className="bg-slate-800/70 border border-slate-700/50 rounded-xl py-2 px-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/30">
                                <option>All Trips</option>
                                <option>Upcoming</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </div>
                    
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                                        <path d="M16 17H7"></path>
                                        <path d="M17 21H9"></path>
                                        <path d="M13 17v4"></path>
                                        <path d="M9 13v-1"></path>
                                        <path d="M15 13v-1"></path>
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-ping-slow">
                                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                                </div>
                            </div>
                            <p className="mt-6 text-lg text-slate-400 animate-pulse">Loading your adventures...</p>
                        </div>
                    ) : trips.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/80 border border-slate-700/50 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-slate-300 mb-2">No trips found</h3>
                            <p className="text-slate-500 mb-6 text-center max-w-md">
                                You haven't created any trips yet. Start planning your next adventure!
                            </p>
                            <button 
                                onClick={() => navigate('/create-trip')}
                                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-medium flex items-center gap-2 hover:from-cyan-700 hover:to-blue-700 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Create Your First Trip</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trips.map((trip) => (
                                <TripCard 
                                    key={trip._id} 
                                    trip={trip} 
                                    onView={(id) => navigate(`/trip/${id}`)}
                                    onDelete={handleDeleteTrip}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
            

    </div>
    );
}

export default Dashboard;