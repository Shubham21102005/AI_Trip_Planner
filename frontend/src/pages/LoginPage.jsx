import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Coffee } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-autumn-gradient flex items-center justify-center p-6">
      {/* Warm background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-autumn-orange/20 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-autumn-coral/20 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-autumn-warm rounded-2xl flex items-center justify-center">
              <Coffee className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-autumn-red">Welcome Back</h1>
          </div>
          <p className="text-autumn-brown">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Form */}
        <div className="autumn-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-autumn-coral/10 border border-autumn-coral/20 rounded-xl text-autumn-coral text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-autumn-brown mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-autumn-gray" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="autumn-input w-full pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-autumn-brown mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-autumn-gray" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="autumn-input w-full pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-autumn-gray hover:text-autumn-brown"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-autumn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-autumn-brown">
              Don't have an account?{' '}
              <Link to="/register" className="text-autumn-coral hover:text-autumn-red font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-autumn-brown hover:text-autumn-red font-medium">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;