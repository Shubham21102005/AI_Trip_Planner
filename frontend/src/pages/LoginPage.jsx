import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4">
            <div className="relative w-full max-w-md">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-pink-900/30 rounded-3xl rotate-6 -z-10 animate-pulse"></div>
                
                {/* Main card */}
                <form 
                    onSubmit={handleLogin}
                    className="relative bg-gradient-to-br from-slate-800/80 to-gray-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-purple-900/30 p-8 space-y-6"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-slate-400">Sign in to continue your journey</p>
                    </div>

                    {error && (
                        <div className="p-3 bg-rose-900/40 border border-rose-700 rounded-lg text-rose-200 text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-slate-300 mb-2 text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                placeholder="hello@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 mb-2 text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 hover:from-purple-700 hover:via-pink-600 hover:to-rose-600 disabled:from-slate-600 disabled:via-slate-700 disabled:to-slate-800 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-rose-900/40 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Logging in...</span>
                            </>
                        ) : (
                            <span>Login</span>
                        )}
                    </button>

                    <p className="text-center text-slate-500 text-sm pt-4">
                        Don't have an account? 
                        <Link 
                            to="/register" 
                            className="ml-1 text-purple-400 hover:text-purple-300 underline underline-offset-4 decoration-purple-700 transition-colors"
                        >
                            Register
                        </Link>
                    </p>
                </form>
                
                {/* Glowing effect */}
                <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-sm -z-10"></div>
            </div>
        </div>
    )
}

export default LoginPage