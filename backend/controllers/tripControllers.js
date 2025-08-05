const User= require('../models/user.js')
const Trip= require('../models/trip.js');
const { createTripAI } = require('../services/aiService.js');

const createTrip = async (req, res) => {
  try {
    const { location, budget, people, duration } = req.body;

    // Check required fields
    if (!location || !budget || !people || !duration) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate trip data using AI
    const tripData = await createTripAI(location, budget, people, duration);

    // Create and save the trip
    const newTrip = await Trip.create({
      ...tripData,
      user: user._id
      
    });

    // Add trip to user's savedTrips
    user.savedTrips.push(newTrip._id);
    await user.save();

    res.status(201).json({
      message: 'Trip created successfully',
      trip: newTrip,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSavedTrips= async (req, res)=>{
    try {
        const user= await User.findById(req.user.id).populate({
        path: 'savedTrips',
        options: { sort: { createdAt: -1 } } 
        })
        if(!user) return res.status(404).json({message: 'User not found'})
        res.status(200).json(user.savedTrips)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    
    }
}

const viewTrip= async (req,res)=>{
    try {
        const user= await User.findById(req.user.id)
        const trip= await Trip.findById(req.params.id)
        if(!user || !trip) return res.status(404).json({message: 'User or trip not found'})
        if(!user.savedTrips.includes(trip._id)) return res.status(403).json({message: 'Unauthorized'})
        res.status(200).json(trip)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}

const deleteTrip = async (req,res)=>{
    try {
        const trip= await Trip.findById(req.params.id);
        const user= await User.findById(req.user.id)
        if(!user || !trip)return res.status(404).json({message: 'User or trip not found'})
        if (!trip.user.equals(user._id)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }


        user.savedTrips.pull(trip._id)
        await user.save()
        await Trip.deleteOne({_id: trip._id});
        res.status(200).json({message: 'Trip deleted successfully'})

        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    
    }
}

module.exports={
    createTrip,
    getSavedTrips,
    viewTrip,
    deleteTrip
}

