import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Coffee, Leaf } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-autumn-gradient">
      {/* Warm background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-autumn-orange/20 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-autumn-coral/20 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-autumn-red/10 rounded-full blur-3xl animate-warm-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-autumn-warm rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-autumn-red">VoyageAI</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-6 py-2 text-autumn-brown hover:text-autumn-red font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-autumn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-autumn-red mb-6 leading-tight">
                Plan Your Perfect
                <span className="block text-autumn-coral">Autumn Adventure</span>
              </h1>
              <p className="text-xl text-autumn-brown max-w-2xl mx-auto leading-relaxed">
                Let AI craft your dream journey with cozy accommodations, scenic routes, and unforgettable experiences. 
                Your next adventure awaits with just a few clicks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/register"
                className="btn-autumn-primary text-lg px-8 py-4"
              >
                Start Planning Now
              </Link>
              <Link
                to="/login"
                className="btn-autumn-secondary text-lg px-8 py-4"
              >
                Sign In to Continue
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="autumn-card p-8 text-center">
                <div className="w-16 h-16 bg-autumn-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-autumn-coral" />
                </div>
                <h3 className="text-xl font-semibold text-autumn-red mb-4">Personalized Plans</h3>
                <p className="text-autumn-brown">
                  AI-powered recommendations tailored to your preferences, budget, and travel style.
                </p>
              </div>

              <div className="autumn-card p-8 text-center">
                <div className="w-16 h-16 bg-autumn-coral/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Coffee className="w-8 h-8 text-autumn-orange" />
                </div>
                <h3 className="text-xl font-semibold text-autumn-red mb-4">Cozy Stays</h3>
                <p className="text-autumn-brown">
                  Handpicked accommodations that feel like home, from boutique hotels to charming inns.
                </p>
              </div>

              <div className="autumn-card p-8 text-center">
                <div className="w-16 h-16 bg-autumn-red/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-autumn-brown" />
                </div>
                <h3 className="text-xl font-semibold text-autumn-red mb-4">Local Experiences</h3>
                <p className="text-autumn-brown">
                  Discover hidden gems and authentic experiences that make your journey truly special.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-8 border-t border-autumn-light-gray">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-autumn-brown">
              Made with ❤️ for wanderers and dreamers
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;