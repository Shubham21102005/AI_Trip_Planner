import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, DollarSign, Eye, Trash2 } from 'lucide-react';

const TripCard = ({ trip, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      onDelete(trip._id);
    }
  };

  return (
    <div className="autumn-card p-6 hover-autumn">
      {/* Trip Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-autumn-red mb-2">{trip.location}</h3>
          <div className="flex items-center gap-2 text-autumn-brown text-sm">
            <MapPin className="w-4 h-4" />
            <span>{trip.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="p-2 bg-autumn-coral/10 hover:bg-autumn-coral/20 text-autumn-coral hover:text-autumn-red rounded-lg transition-colors"
            title="Delete trip"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trip Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-autumn-orange/20 rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-autumn-orange" />
          </div>
          <div>
            <p className="text-xs text-autumn-brown">Budget</p>
            <p className="text-sm font-medium text-autumn-red capitalize">{trip.budget}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-autumn-coral/20 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-autumn-coral" />
          </div>
          <div>
            <p className="text-xs text-autumn-brown">Travelers</p>
            <p className="text-sm font-medium text-autumn-red">{trip.people}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-autumn-red/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-autumn-red" />
          </div>
          <div>
            <p className="text-xs text-autumn-brown">Duration</p>
            <p className="text-sm font-medium text-autumn-red">{trip.duration} days</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-autumn-brown/20 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-autumn-brown" />
          </div>
          <div>
            <p className="text-xs text-autumn-brown">Places</p>
            <p className="text-sm font-medium text-autumn-red">
              {trip.itinerary?.length || 0} days
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        to={`/trip/${trip._id}`}
        className="w-full btn-autumn-secondary flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        View Details
      </Link>
    </div>
  );
};

export default TripCard;