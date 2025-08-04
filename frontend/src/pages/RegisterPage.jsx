import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/register`, { fullName: name, email, password }, { withCredentials: true })
            console.log(res.data);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'SignUp failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4">
            <div className="relative w-full max-w-md">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-indigo-900/30 rounded-3xl rotate-6 -z-10 animate-pulse"></div>
                
                {/* Main card */}
                <form 
                    onSubmit={handleRegister}
                    className="relative bg-gradient-to-br from-slate-800/80 to-gray-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-blue-900/30 p-8 space-y-6"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Create Your Account
                        </h2>
                        <p className="mt-2 text-slate-400">Join our community today</p>
                    </div>

                    {error && (
                        <div className="p-3 bg-rose-900/40 border border-rose-700 rounded-lg text-rose-200 text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-slate-300 mb-2 text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 mb-2 text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
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
                                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-indigo-900/40"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-slate-500 text-sm pt-4">
                        Already have an account?{" "}
                        <a 
                            href="/login" 
                            className="ml-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-700 transition-colors"
                        >
                            Login
                        </a>
                    </p>
                </form>
                
                {/* Glowing effect */}
                <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm -z-10"></div>
            </div>
        </div>
    )
}

export default RegisterPage