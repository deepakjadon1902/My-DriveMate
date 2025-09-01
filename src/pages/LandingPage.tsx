
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, CreditCard, Car, Search, Shield, Zap, Globe, Crown, Heart, Star, AlertCircle, X } from 'lucide-react';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const authToken = localStorage.getItem('authToken') || 
                     localStorage.getItem('userToken') || 
                     sessionStorage.getItem('authToken') ||
                     sessionStorage.getItem('userSession');

    setIsLoggedIn(!!authToken);
  };

  // Navigation handlers
  const handleStartJourney = () => {
    redirectToLogin();
  };

  const handleDriveAndEarn = () => {
    if (isLoggedIn) {
      redirectToDashboard();
    } else {
      setShowLoginModal(true);
    }
  };

  const redirectToLogin = () => {
    if (window.location.pathname !== '/login') {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        window.location.href = '/login';
      }
    }
  };

  const redirectToDashboard = () => {
    if (window.location.pathname !== '/dashboard') {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, '/dashboard');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        window.location.href = '/dashboard';
      }
    }
  };

  const handleModalLogin = () => {
    setShowLoginModal(false);
    redirectToLogin();
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float2 { animation: float2 6s ease-in-out infinite 2s; }
        .animate-pulse-custom { animation: pulse 3s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 1.2s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 1.2s ease-out; }
        .animate-slideInRight { animation: slideInRight 1.2s ease-out 0.4s both; }
        .animate-scaleIn { animation: scaleIn 0.8s ease-out; }
        .animate-delay-1 { animation-delay: 0.2s; animation-fill-mode: both; }
        .animate-delay-2 { animation-delay: 0.4s; animation-fill-mode: both; }
        .animate-delay-3 { animation-delay: 0.6s; animation-fill-mode: both; }
        .animate-delay-4 { animation-delay: 0.8s; animation-fill-mode: both; }
        
        .hover-scale { transition: all 0.3s ease; }
        .hover-scale:hover { transform: scale(1.05); }
        .hover-rotate:hover { transform: scale(1.1) rotate(5deg); }
        
        .group:hover .group-hover\\:shadow-glow {
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
        }

        .modal-backdrop {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse-custom"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl animate-pulse-custom" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 md:w-[600px] md:h-[600px] bg-gradient-to-r from-blue-900/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Floating Orbs - Responsive */}
        <div className="absolute top-16 left-8 sm:top-20 sm:left-20 w-2 h-2 sm:w-4 sm:h-4 bg-blue-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute bottom-16 right-16 sm:bottom-32 sm:right-32 w-3 h-3 sm:w-6 sm:h-6 bg-white rounded-full opacity-40 animate-float2"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left animate-slideInLeft">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] sm:leading-[0.9] text-white animate-delay-2 animate-fadeInUp">
                YOUR JOURNEY
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  MATTERS
                </span>
                <br />
                <span className="text-gray-300 text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">TO US</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-4 lg:px-0 animate-delay-3 animate-fadeInUp">
                Every mile you travel deserves trust, comfort, and genuine care. 
                <span className="text-blue-400 font-medium"> Join thousands who've made the smart choice</span> — 
                where your safety meets our passion for perfect journeys.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 px-4 lg:px-0 justify-center lg:justify-start animate-delay-4 animate-fadeInUp">
                <button 
                  onClick={handleStartJourney}
                  className="relative bg-blue-800 hover:bg-blue-700 text-white font-bold text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl shadow-blue-900/50 transition-all duration-300 group overflow-hidden w-full sm:w-auto hover-scale active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center space-x-2">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Start Your Journey</span>
                  </span>
                </button>
                
                <button 
                  onClick={handleDriveAndEarn}
                  className="border-2 border-blue-800 text-blue-400 hover:bg-blue-800 hover:text-white font-bold text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 group w-full sm:w-auto hover-scale active:scale-95"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Car className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{isLoggedIn ? 'Go to Dashboard' : 'Drive & Earn'}</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - Enhanced Floating Cards */}
            <div className="relative hidden lg:block xl:scale-110 animate-slideInRight">
              {/* Trust Card */}
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-white/10 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl max-w-xs hover-scale animate-scaleIn" style={{animationDelay: '1.2s', transform: 'rotate(-5deg)'}}>
                <div className="flex items-center space-x-4">
                  <div className="p-2 lg:p-3 rounded-2xl bg-blue-800/30 border border-blue-600/30">
                    <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-lg lg:text-xl text-white">100% Verified</p>
                    <p className="text-xs lg:text-sm text-gray-300">Every ride, every driver</p>
                  </div>
                </div>
              </div>

              {/* Community Card */}
              <div className="absolute top-20 lg:top-24 -right-8 lg:-right-12 bg-gradient-to-br from-white/10 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl max-w-xs hover-scale animate-scaleIn" style={{animationDelay: '1.5s', transform: 'rotate(5deg)'}}>
                <div className="flex items-center space-x-4">
                  <div className="p-2 lg:p-3 rounded-2xl bg-white/10 border border-white/20">
                    <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg lg:text-xl text-white">Growing Community</p>
                    <p className="text-xs lg:text-sm text-gray-300">Real people, real connections</p>
                  </div>
                </div>
              </div>

              {/* Free Platform Card */}
              <div className="absolute bottom-0 left-4 bg-gradient-to-br from-green-800/40 to-black/60 backdrop-blur-xl border border-green-600/30 rounded-3xl p-4 lg:p-6 shadow-2xl hover-scale animate-scaleIn" style={{animationDelay: '1.8s'}}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 lg:p-3 rounded-2xl bg-green-600/30 border border-green-500/50">
                    <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-base lg:text-lg text-white">100% Free</p>
                    <p className="text-xs text-gray-300">Always & Forever</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Floating Cards */}
            <div className="lg:hidden mt-8 px-4">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-gradient-to-br from-white/10 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl flex-1 min-w-[140px] max-w-[160px] animate-scaleIn animate-delay-1">
                  <Shield className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="font-bold text-sm text-white">100% Verified</p>
                  <p className="text-xs text-gray-300">Safe & Secure</p>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-green-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl flex-1 min-w-[140px] max-w-[160px] animate-scaleIn animate-delay-2">
                  <Heart className="w-6 h-6 text-green-400 mb-2" />
                  <p className="font-bold text-sm text-white">100% Free</p>
                  <p className="text-xs text-gray-300">Always & Forever</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 animate-scaleIn">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span className="text-blue-800 font-medium text-sm sm:text-base">Built with Care</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 text-black px-4 animate-fadeInUp">
              WHY WE'RE 
              <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent"> DIFFERENT</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 animate-fadeInUp animate-delay-1">
              We don't just connect rides — we build relationships. Every feature is designed 
              with your heart and safety in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            {[
              {
                icon: <Shield className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />,
                title: "Trust You Can Feel",
                description: "Every driver is family-verified with background checks. We protect what matters most — you and your loved ones.",
                emotion: "Security meets warmth"
              },
              {
                icon: <Heart className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />,
                title: "Completely Free",
                description: "No hidden costs, no subscription fees, no premium charges. Free forever — because good things should be accessible to everyone.",
                emotion: "Kindness over profit"
              },
              {
                icon: <Globe className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />,
                title: "Everywhere You Need",
                description: "From your neighborhood to cross-country journeys. We're expanding our caring community across India, one heart at a time.",
                emotion: "Home away from home"
              },
              {
                icon: <Users className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />,
                title: "Real People, Real Stories",
                description: "Connect with verified professionals, students, and families. Every ride creates meaningful connections and lasting friendships.",
                emotion: "Community over commerce"
              },
              {
                icon: <Zap className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />,
                title: "Genuine Connections",
                description: "No algorithms manipulating your experience. Just real people helping real people reach their destinations safely.",
                emotion: "Humanity over technology"
              },
              {
                icon: <Clock className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />,
                title: "Built on Trust",
                description: "Every feature designed with honesty and transparency. No fake reviews, no inflated numbers — just authentic experiences.",
                emotion: "Truth in every journey"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative animate-fadeInUp hover-scale"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full group-hover:border-blue-200 group-hover:shadow-glow transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl hover-rotate transition-all duration-300">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-black group-hover:text-blue-900 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">{feature.description}</p>
                  <p className="text-blue-600 font-medium italic text-xs sm:text-sm">{feature.emotion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 lg:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 text-white px-4 animate-fadeInUp">
              YOUR JOURNEY IN 
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> 3 STEPS</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 animate-fadeInUp animate-delay-1">
              Simple, personal, and built around you. Because great journeys shouldn't be complicated.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 px-4 sm:px-0">
            {[
              {
                step: "01",
                icon: <Users className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />,
                title: "Join Our Family",
                description: "Create your verified profile in minutes. Share who you are, build trust, and become part of our caring community.",
                detail: "Quick verification • Safe community • Real connections"
              },
              {
                step: "02",
                icon: <Search className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />,
                title: "Find Your Perfect Match",
                description: "Smart matching with people going your way. Real-time connections with verified travelers who share your journey.",
                detail: "Instant matching • Same direction • Verified travelers"
              },
              {
                step: "03",
                icon: <Car className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />,
                title: "Travel & Connect",
                description: "Enjoy safe, comfortable rides with genuine people. Pay directly, travel securely, and maybe make a new friend.",
                detail: "Direct payment • Safe travels • Meaningful connections"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative text-center group animate-fadeInUp hover-scale"
                style={{animationDelay: `${index * 0.3}s`}}
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-blue-900/40 border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group-hover:border-blue-600/50 group-hover:shadow-glow transition-all duration-500">
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-5xl sm:text-6xl lg:text-7xl font-black text-gray-800/30 group-hover:text-blue-800/20 transition-colors duration-500">
                    {item.step}
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl w-fit mx-auto mb-6 sm:mb-8 shadow-2xl hover-rotate transition-all duration-400">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg mb-4">{item.description}</p>
                  <div className="inline-flex items-center bg-blue-900/30 border border-blue-700/50 rounded-full px-3 sm:px-4 py-1 sm:py-2">
                    <p className="text-blue-300 text-xs sm:text-sm font-medium">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Connection Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center animate-scaleIn">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/70 border-2 border-blue-100 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-blue-100 border border-blue-200 rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 mb-6 sm:mb-8 animate-fadeInUp">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  <span className="text-blue-800 font-bold text-sm sm:text-base lg:text-lg">From Our Hearts to Yours</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 text-black leading-tight px-4 animate-fadeInUp animate-delay-1">
                  MORE THAN JUST RIDES —<br />
                  <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                    WE'RE BUILDING CONNECTIONS
                  </span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 animate-fadeInUp animate-delay-2">
                  Every journey tells a story. Every driver has dreams. Every passenger matters. 
                  We're not just a platform — we're a community where real people care about real people.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                  {[
                    { 
                      icon: <Heart className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />, 
                      title: "COMPLETELY FREE",
                      description: "No hidden fees, no premium plans, no subscription costs. Free forever because we believe good connections shouldn't cost money."
                    },
                    { 
                      icon: <Shield className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />, 
                      title: "FAMILY SAFE",
                      description: "Every driver verified like family. Every ride protected with care. Every journey secured with love and responsibility."
                    },
                    { 
                      icon: <Users className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />, 
                      title: "AUTHENTIC COMMUNITY",
                      description: "Real people, real connections, real friendships. No fake reviews, no inflated numbers — just genuine human experiences."
                    },
                    { 
                      icon: <MapPin className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />, 
                      title: "EVERYWHERE",
                      description: "From village roads to city highways. Wherever your heart wants to go, we're building a network of caring people to help you get there."
                    }
                  ].map((benefit, index) => (
                    <div 
                      key={index}
                      className="group animate-fadeInUp hover-scale"
                      style={{animationDelay: `${index * 0.15}s`}}
                    >
                      <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full group-hover:border-blue-200 group-hover:shadow-glow transition-all duration-300">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 sm:p-3 rounded-lg sm:rounded-xl w-fit mx-auto mb-3 sm:mb-4 hover-rotate transition-all duration-300">
                          <div className="text-white">
                            {benefit.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-black">{benefit.title}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white animate-fadeInUp animate-delay-4">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Your Journey, Our Promise</h3>
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed italic px-2 sm:px-4">
                    "We believe every mile should be meaningful, every ride should be safe, 
                    and every person should feel valued. This isn't just our promise — this is our heart, and it's completely free."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 lg:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 text-white px-4 leading-tight">
              READY TO EXPERIENCE THE 
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> DIFFERENCE?</span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed animate-fadeInUp animate-delay-1">
              Join a community built on trust, friendship, and genuine human connection. 
              Where every journey is an opportunity to meet someone wonderful.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0 animate-fadeInUp animate-delay-2">
              <button 
                onClick={handleStartJourney}
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-full shadow-2xl shadow-blue-900/50 transition-all duration-300 group w-full sm:w-auto hover-scale active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Start Your Journey</span>
                </span>
              </button>
              
              <button 
                onClick={handleDriveAndEarn}
                className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-bold text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 w-full sm:w-auto hover-scale active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <Car className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>{isLoggedIn ? 'Go to Dashboard' : 'Drive & Earn'}</span>
                </span>
              </button>
            </div>

            <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
              {[
                { number: "100%", label: "Verified Platform" },
                { number: "Free", label: "Always & Forever" },
                { number: "Real", label: "Authentic Community" },
                { number: "24/7", label: "Care & Support" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-blue-900/30 backdrop-blur-xl border border-gray-700/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover-scale animate-scaleIn"
                  style={{animationDelay: `${0.6 + index * 0.1}s`}}
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-white mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 modal-backdrop flex items-center justify-center z-50 px-4 animate-fadeInUp">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 relative animate-scaleIn shadow-2xl">
            <button 
              onClick={handleModalClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 group"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            </button>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl">
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 text-gray-900">Login Required</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                Please login first to access the driver dashboard and start earning with our caring community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={handleModalLogin}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 flex-1 hover-scale active:scale-95 shadow-lg"
                >
                  Login Now
                </button>
                <button 
                  onClick={handleModalClose}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-bold px-6 py-3 rounded-full transition-all duration-300 flex-1 hover-scale active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;