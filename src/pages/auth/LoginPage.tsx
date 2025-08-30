import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Car, LogIn, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-lg mx-auto">
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
              Welcome Back!
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Sign in to continue your journey with My Drivemate
            </motion.p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
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
            
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="password" className="block text-sm font-semibold">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
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
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </button>
            </motion.div>
          </form>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-semibold">
                Create one now
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;