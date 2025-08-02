const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    enum: ['cheap', 'moderate', 'expensive'],
    required: true
  },
  people: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  hotels: [
    {
      name: { type: String, required: true },
      address: { type: String, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      },
      rating: { type: Number },
      description: { type: String }
    }
  ],
  itinerary: [
    {
      day: { type: Number, required: true },
      bestTimeToVisit: { type: String }, // e.g., "Morning", "Evening"
      places: [
        {
          placeName: { type: String, required: true },
          placeDetails: { type: String },
          imageUrl: { type: String },
          coordinates: {
            lat: { type: Number },
            lng: { type: Number }
          },
          ticketPrice: { type: Number },
          travelTime: { type: String } // e.g., "20 mins from hotel"
        }
      ]
    }
  ]
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
