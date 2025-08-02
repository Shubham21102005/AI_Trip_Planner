const {createTrip,
getSavedTrips,
viewTrip,
deleteTrip}= require('../controllers/tripControllers.js');

const requireAuth= require('../middleware/requireAuth.js')

const express= require('express');

const router= express.Router();

router.post('/create', requireAuth, createTrip);
router.get('/saved', requireAuth, getSavedTrips);
router.get('/view/:id', requireAuth, viewTrip);
router.delete('/delete/:id', requireAuth, deleteTrip);

module.exports= router;