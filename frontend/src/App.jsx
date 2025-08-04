import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Landing from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/trip/:id" element={<div>Trip Details</div>} />
        <Route path="/create-trip" element={<div>Create Trip</div>} />
      </Routes>
    </Router>
  );
}

export default App;
