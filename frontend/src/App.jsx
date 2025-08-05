import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Landing from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateTrip from './pages/CreateTrip.jsx';
import TripDetails from './pages/TripDetails.jsx';

// Component to handle conditional routing based on auth status
const ConditionalRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c1120] via-[#0d1c3a] to-[#1a2d4d] flex items-center justify-center">
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
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <ConditionalRoute>
          <Landing />
        </ConditionalRoute>
      } />
      <Route path="/login" element={
        <ConditionalRoute>
          <LoginPage />
        </ConditionalRoute>
      } />
      <Route path="/register" element={
        <ConditionalRoute>
          <RegisterPage />
        </ConditionalRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/create-trip" element={
        <ProtectedRoute>
          <CreateTrip />
        </ProtectedRoute>
      } />
      <Route path="/trip/:id" element={
        <ProtectedRoute>
          <TripDetails />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
