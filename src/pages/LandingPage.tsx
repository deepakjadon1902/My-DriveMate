
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, CreditCard, Car, Search, Shield, Zap, Globe, Crown } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-40 overflow-hidden bg-black">
        {/* Glow Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0a1f44]/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-32 left-16 w-24 h-24 bg-[#0a1f44]/40 rounded-full blur-2xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 8, delay: 2 }}
        />

        <motion.div
          className="container mx-auto px-6 md:px-8 relative z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              <motion.h3
                className="text-7xl md:text-9xl font-black leading-none text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                RIDE<br />
                <span className="text-[#0a1f44]">SMARTER</span><br />
                <span className="text-slate-300">GO FASTER</span>
              </motion.h3>

              <motion.p
                className="text-2xl md:text-3xl text-slate-300 leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                Safe, affordable, and always on time.  
                The future of everyday travel — built for you.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-8 pt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <button className="bg-[#0a1f44] hover:bg-[#112b5a] text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Book a Ride
                </button>
                <button className="border-2 border-[#0a1f44] text-[#0a1f44] hover:bg-[#0a1f44] hover:text-white font-bold text-xl px-12 py-5 rounded-2xl transition-all duration-300">
                  Drive with Us
                </button>
              </motion.div>
            </div>

            {/* Right Content → replaced image with futuristic floating cards */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1.2 }}
            >
              {/* Floating Card 1 */}
              <motion.div
                className="absolute -bottom-12 -left-12 bg-gradient-to-br from-black/80 to-[#0a1f44]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <div className="flex items-center space-x-6">
                  <div className="p-4 rounded-xl bg-[#0a1f44]/30 border border-[#0a1f44]/50">
                    <MapPin size={32} className="text-[#0a1f44]" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-white">Instant Matching</p>
                    <p className="text-lg text-slate-400">Get a ride in seconds</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                className="absolute top-20 -right-12 bg-gradient-to-br from-black/80 to-[#0a1f44]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <div className="flex items-center space-x-6">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                    <CreditCard size={32} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-white">Transparent Pricing</p>
                    <p className="text-lg text-slate-400">No hidden fees, ever</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

// {/* Features Grid */}
<section className="py-40 bg-slate-950">
  <div className="container mx-auto px-6 md:px-8">
    <motion.div
      className="text-center mb-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-6xl md:text-7xl font-black mb-8 text-white">CORE FEATURES</h2>
      <p className="text-2xl md:text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
        Why riders and drivers across India trust My Drivemate for smarter, safer, and cost-effective travel
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          icon: <Shield className="h-16 w-16" />,
          title: "Verified & Secure",
          description: "Every driver and passenger is identity-verified. With background checks and OTP ride confirmation, trust is built into every trip."
        },
        {
          icon: <Zap className="h-16 w-16" />,
          title: "Direct Payments",
          description: "No commissions, no hidden fees. Passengers pay drivers directly, keeping rides affordable and earnings fair."
        },
        {
          icon: <Globe className="h-16 w-16" />,
          title: "Pan-India Access",
          description: "From metro cities to growing towns, our network is expanding fast — helping you find verified rides wherever you go."
        },
        {
          icon: <Users className="h-16 w-16" />,
          title: "Community-Driven",
          description: "More than just ride-sharing, it’s a trusted network of professionals, students, and families traveling together safely."
        },
        {
          icon: <CreditCard className="h-16 w-16" />,
          title: "Transparent Pricing",
          description: "Clear and fair costs — no surge pricing, no middlemen. Just genuine ride-sharing where everyone benefits."
        },
        {
          icon: <Clock className="h-16 w-16" />,
          title: "Flexible & Reliable",
          description: "Book rides anytime, reschedule when needed, and enjoy the flexibility of real people coordinating real journeys."
        }
      ].map((feature, index) => (
        <motion.div 
          key={index}
          className="group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-slate-800/60 to-blue-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 h-full group-hover:border-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <motion.div 
              className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 rounded-2xl w-fit mb-8 border border-blue-500/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-blue-400">
                {feature.icon}
              </div>
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed text-lg">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* How It Works */}
<section className="py-40 bg-white">
  <div className="container mx-auto px-6 md:px-8">
    <motion.div
      className="text-center mb-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-6xl md:text-7xl font-black mb-8 text-slate-900">HOW IT WORKS</h2>
      <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        A simple, transparent process to connect trusted drivers and riders
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
      {[
        {
          step: "01",
          icon: <Users className="h-20 w-20" />,
          title: "Create Your Profile",
          description: "Sign up with mobile verification and build trust with your verified identity. Choose whether you’re driving or riding."
        },
        {
          step: "02",
          icon: <Search className="h-20 w-20" />,
          title: "Find Your Match",
          description: "Drivers list routes, riders search rides. Our system connects you instantly with verified travel partners going the same way."
        },
        {
          step: "03",
          icon: <Car className="h-20 w-20" />,
          title: "Ride & Pay Directly",
          description: "Meet your drivemate, enjoy a safe and seamless journey, and pay your driver directly without extra app charges."
        }
      ].map((item, index) => (
        <motion.div 
          key={index}
          className="relative text-center group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.4, duration: 1 }}
        >
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border-2 border-slate-200 rounded-3xl p-12 relative overflow-hidden group-hover:border-blue-300 group-hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-8 right-8 text-9xl font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-500">
              {item.step}
            </div>
            
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl w-fit mx-auto mb-10 shadow-2xl"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-white">
                {item.icon}
              </div>
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed text-xl">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Benefits Section */}
<section className="py-40 bg-black">
  <div className="container mx-auto px-6 md:px-8">
    <motion.div
      className="bg-gradient-to-br from-black/80 to-[#0a1f44]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-20 text-center relative overflow-hidden shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f44]/20 to-white/5"></div>
      
      <div className="relative z-10">
        <h2 className="text-5xl md:text-6xl font-black mb-8 text-white tracking-tight">
          WHY RIDE WITH US?
        </h2>
        <p className="text-2xl text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed">
          Simple, safe, and stress-free. The way ride-sharing was meant to be.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { 
              icon: <CreditCard className="h-12 w-12" />, 
              title: "NO EXTRA FEES",
              description: "Pay only the ride fare. No hidden charges, no surprise costs — ever."
            },
            { 
              icon: <Shield className="h-12 w-12" />, 
              title: "SAFETY FIRST",
              description: "Verified drivers, live tracking, and built-in safety tools for peace of mind."
            },
            { 
              icon: <Users className="h-12 w-12" />, 
              title: "COMMUNITY DRIVEN",
              description: "Every ride builds trust — riders and drivers growing together in a safe network."
            },
            { 
              icon: <MapPin className="h-12 w-12" />, 
              title: "GO ANYWHERE",
              description: "Ride across cities with ease. No limits, just seamless travel at your fingertips."
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-black/60 to-[#0a1f44]/60 backdrop-blur-lg border border-slate-600/50 rounded-2xl p-8 h-full group-hover:border-[#0a1f44] group-hover:shadow-xl group-hover:shadow-[#0a1f44]/40 transition-all duration-300">
                <motion.div 
                  className="bg-gradient-to-br from-[#0a1f44]/30 to-white/10 p-4 rounded-xl w-fit mx-auto mb-6 border border-[#0a1f44]/40"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Changed from text-[#0a1f44] to text-white */}
                  <div className="text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] transition-all duration-300">
                    {benefit.icon}
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 text-white">{benefit.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Message */}
        <motion.div 
          className="mt-16 pt-12 border-t border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-black/70 to-[#0a1f44]/70 border border-[#0a1f44]/40 rounded-2xl p-8">
            <p className="text-xl text-slate-300 leading-relaxed italic">
              "Ride the smart way — transparent, safe, and designed for everyone."
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
</section>


    </>
  );
};
export default LandingPage;
