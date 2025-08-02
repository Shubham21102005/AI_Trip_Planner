const {registerUser,
  loginUser,
  logoutUser,
  checkAuth} = require('../controllers/authControllers.js');

  const requireAuth = require('../middleware/requireAuth.js');

  const express= require('express');

  const router= express.Router();

  router.post('/register', registerUser);
  router.post('/login', loginUser);
  router.post('/logout', logoutUser);
  router.get('/check-auth',requireAuth, checkAuth);

  module.exports= router