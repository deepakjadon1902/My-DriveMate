import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Car, User, Mail, Lock, Phone, UserCheck, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<'driver' | 'passenger'>('passenger');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !phoneNumber) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (!phoneNumber.match(/^[0-9]{10}$/)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, fullName, phoneNumber, role);
      toast.success('Account created successfully! Please sign in.');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div 
        className="water-glass-card p-10 shadow-water relative overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5] 
          }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        
        <motion.div 
          className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.1, 0.4] 
          }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <motion.div 
              className="relative mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
            >
              <div className="absolute inset-0 bg-primary rounded-3xl blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-br from-primary to-navy-800 rounded-3xl p-4 text-white shadow-glow w-fit mx-auto">
                <Car size={32} />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Join My Drivemate
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Create your account and start sharing rides today
            </motion.p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <label htmlFor="fullName" className="block text-sm font-semibold mb-3">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input pl-12 text-lg"
                    placeholder="Deepak Jadon"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold mb-3">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-12 text-lg"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <label htmlFor="password" className="block text-sm font-semibold mb-3">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-12 text-lg"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-3">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={20} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input pl-12 text-lg"
                    placeholder="9876543210"
                    required
                    pattern="[0-9]{10}"
                  />
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <label className="block text-sm font-semibold mb-4">
                I want to register as
              </label>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    role === 'passenger'
                      ? 'bg-primary/20 border-primary text-primary shadow-glow'
                      : 'bg-secondary/50 border-border hover:bg-primary/10 hover:border-primary/50'
                  } flex flex-col items-center gap-3`}
                  onClick={() => setRole('passenger')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users size={28} />
                  <span className="font-semibold">Passenger</span>
                  <span className="text-xs text-muted-foreground text-center">
                    Find and book rides
                  </span>
                </motion.button>
                
                <motion.button
                  type="button"
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    role === 'driver'
                      ? 'bg-primary/20 border-primary text-primary shadow-glow'
                      : 'bg-secondary/50 border-border hover:bg-primary/10 hover:border-primary/50'
                  } flex flex-col items-center gap-3`}
                  onClick={() => setRole('driver')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Car size={28} />
                  <span className="font-semibold">Driver</span>
                  <span className="text-xs text-muted-foreground text-center">
                    Offer rides to others
                  </span>
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-3 text-lg py-4 ripple-effect"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UserCheck size={20} />
                    Create Account
                  </>
                )}
              </button>
            </motion.div>
          </form>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;