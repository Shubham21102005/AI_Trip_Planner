import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1120] via-[#0d1c3a] to-[#1a2d4d] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Floating islands */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1e3a8a] to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-12 bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-t-2xl border-t border-blue-500/30"></div>
        <div className="absolute bottom-0 right-1/3 w-32 h-10 bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-t-2xl border-t border-teal-500/30"></div>
      </div>
      
      {/* Floating clouds */}
      <div className="absolute top-20 left-10 w-24 h-8 bg-white/10 backdrop-blur-sm rounded-full animate-float1"></div>
      <div className="absolute top-40 right-20 w-32 h-10 bg-white/10 backdrop-blur-sm rounded-full animate-float2"></div>
      <div className="absolute top-1/3 left-1/4 w-20 h-6 bg-white/10 backdrop-blur-sm rounded-full animate-float3"></div>
      
      {/* Animated stars */}
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle-delay"></div>
      <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-twinkle-delay2"></div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl text-center backdrop-blur-sm bg-gradient-to-b from-slate-900/40 to-slate-800/30 border border-slate-700/50 rounded-3xl shadow-2xl shadow-blue-900/20 p-12 mx-6">
        {/* Animated AI icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M16 17H7"></path>
                <path d="M17 21H9"></path>
                <path d="M13 17v4"></path>
                <path d="M9 13v-1"></path>
                <path d="M15 13v-1"></path>
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-ping-slow">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 animate-fade-in">
          Plan Your Perfect Trip with <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">AI</span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
          Get personalized travel itineraries, hotel suggestions, and local experiences — powered by artificial intelligence that learns your preferences.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in-up">
          <Link
            to="/login"
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-900/30 flex items-center justify-center"
          >
            <span>Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/30 flex items-center justify-center"
          >
            <span>Create Account</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in-up">
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Itineraries</h3>
            <p className="text-slate-400">AI-generated travel plans tailored to your interests and preferences</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Local Experiences</h3>
            <p className="text-slate-400">Discover hidden gems and authentic experiences curated by AI</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-teal-500/50 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Personalized Safety</h3>
            <p className="text-slate-400">Real-time safety alerts and recommendations based on your location</p>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default Landing;