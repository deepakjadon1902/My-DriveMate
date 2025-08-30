
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Ride, Booking, Notification } from '../../types/supabase';
import { Car, Search, MapPin, Clock, Users, CreditCard, BellRing, User, Calendar, ChevronRight, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import Loader from '../../components/ui/Loader';

const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [recentRides, setRecentRides] = useState<Ride[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<(Booking & { ride: Ride })[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      if (!profile) return;
      
      try {
        // Fetch data based on user role
        if (profile.role === 'driver') {
          // Recent rides offered by the driver
          const { data: rides } = await supabase
            .from('rides')
            .select('*')
            .eq('driver_id', profile.id)
            .order('date_time', { ascending: false })
            .limit(3);
          
          setRecentRides(rides || []);
        } else {
          // Recent available rides for passengers
          const { data: rides } = await supabase
            .from('rides')
            .select('*')
            .gte('date_time', new Date().toISOString())
            .order('date_time', { ascending: true })
            .limit(3);
          
          setRecentRides(rides || []);
        }
        
        // Upcoming bookings for both drivers and passengers
        const bookingsQuery = profile.role === 'driver'
          ? supabase
              .from('bookings')
              .select('*, ride:rides(*)')
              .eq('status', 'upcoming')
              .in('ride.driver_id', [profile.id])
              .order('created_at', { ascending: false })
              .limit(3)
          : supabase
              .from('bookings')
              .select('*, ride:rides(*)')
              .eq('passenger_id', profile.id)
              .eq('status', 'upcoming')
              .order('created_at', { ascending: false })
              .limit(3);
        
        const { data: bookings } = await bookingsQuery;
        setUpcomingBookings(bookings as (Booking & { ride: Ride })[] || []);
        
        // Unread notifications
        const { data: notifications } = await supabase
          .from('notifications')
          .select('*')
          .eq('recipient_id', profile.id)
          .eq('read', false)
          .order('created_at', { ascending: false })
          .limit(5);
        
        setUnreadNotifications(notifications || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [profile]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  
  const quickActions = [
    {
      to: profile?.role === 'driver' ? '/offer-ride' : '/search-rides',
      icon: profile?.role === 'driver' ? Car : Search,
      label: profile?.role === 'driver' ? 'Offer a Ride' : 'Find a Ride',
      color: 'from-blue-900 to-blue-800',
      description: profile?.role === 'driver' ? 'Share your journey' : 'Discover rides'
    },
    {
      to: '/my-rides',
      icon: Clock,
      label: 'My Rides',
      color: 'from-slate-800 to-slate-700',
      description: 'View all activities'
    },
    {
      to: '/notifications',
      icon: BellRing,
      label: 'Notifications',
      color: 'from-slate-700 to-slate-600',
      description: 'Stay updated',
      badge: unreadNotifications.length
    },
    {
      to: '/profile',
      icon: User,
      label: 'Profile',
      color: 'from-slate-600 to-slate-500',
      description: 'Manage account'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4"
              >
                <span className="text-2xl">👋</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  {profile?.full_name?.split(' ')[0]}
                </span>
              </h1>
              <p className="text-xl text-blue-100 font-light">
                {profile?.role === 'driver' 
                  ? 'Ready to share your journey and connect with fellow travelers' 
                  : 'Your next adventure is just a ride away'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Quick Actions</h2>
            <p className="text-slate-600 text-lg">Everything you need, right at your fingertips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={action.to} to={action.to}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div className={`bg-gradient-to-br ${action.color} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-white overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                          <action.icon size={24} />
                        </div>
                        {action.badge && action.badge > 0 && (
                          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                            {action.badge}
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{action.label}</h3>
                      <p className="text-white/80 text-sm">{action.description}</p>
                      <ChevronRight 
                        size={16} 
                        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Rides - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="xl:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 h-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {profile?.role === 'driver' ? 'Recent Rides Offered' : 'Available Rides'}
                  </h2>
                  <p className="text-slate-600">
                    {profile?.role === 'driver' ? 'Your recent ride offerings' : 'Perfect matches for your journey'}
                  </p>
                </div>
                <Link 
                  to={profile?.role === 'driver' ? '/my-rides' : '/search-rides'}
                  className="flex items-center text-blue-900 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  View all
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              
              {recentRides.length > 0 ? (
                <div className="space-y-6">
                  {recentRides.map((ride, index) => (
                    <motion.div 
                      key={ride.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                            <MapPin size={18} className="text-blue-900" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-lg">
                              {ride.pickup_location} → {ride.destination}
                            </div>
                            <div className="text-slate-600 text-sm mt-1">
                              {ride.car_model} • {ride.number_plate}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white text-sm font-bold px-4 py-2 rounded-xl">
                          ₹{ride.price_per_seat}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-slate-600">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} />
                          <span className="text-sm font-medium">
                            {format(new Date(ride.date_time), 'MMM d, yyyy • h:mm a')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users size={16} />
                          <span className="text-sm font-medium">{ride.available_seats} seats</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="p-4 bg-slate-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Car size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {profile?.role === 'driver' ? "No rides offered yet" : "No available rides"}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {profile?.role === 'driver' ? "Start sharing your journey with others" : "Be the first to discover new rides"}
                  </p>
                  <Link 
                    to={profile?.role === 'driver' ? '/offer-ride' : '/search-rides'}
                    className="inline-flex items-center bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition-all duration-300"
                  >
                    {profile?.role === 'driver' ? 'Offer a ride' : 'Search for rides'}
                    <ChevronRight size={16} className="ml-2" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Sidebar - Bookings and Notifications */}
          <div className="space-y-8">
            {/* Upcoming Bookings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Upcoming Bookings</h2>
                    <p className="text-slate-600 text-sm">Your scheduled rides</p>
                  </div>
                  <Link 
                    to="/my-rides"
                    className="text-blue-900 hover:text-blue-700 font-semibold text-sm"
                  >
                    View all
                  </Link>
                </div>
                
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.slice(0, 3).map((booking, index) => (
                      <motion.div 
                        key={booking.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 text-sm mb-1">
                              {booking.ride.pickup_location} → {booking.ride.destination}
                            </div>
                            <div className="text-xs text-slate-600">
                              {format(new Date(booking.ride.date_time), 'MMM d • h:mm a')}
                            </div>
                          </div>
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Confirmed
                          </div>
                        </div>
                        <div className="text-xs text-slate-500">
                          ₹{booking.ride.price_per_seat} • {booking.ride.car_model}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar size={24} className="text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 text-sm">No upcoming bookings</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Recent Updates</h2>
                    <p className="text-slate-600 text-sm">Stay in the loop</p>
                  </div>
                  <Link 
                    to="/notifications"
                    className="text-blue-900 hover:text-blue-700 font-semibold text-sm"
                  >
                    View all
                  </Link>
                </div>
                
                {unreadNotifications.length > 0 ? (
                  <div className="space-y-4">
                    {unreadNotifications.slice(0, 3).map((notification, index) => (
                      <motion.div 
                        key={notification.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-1.5 bg-amber-100 rounded-full">
                            <BellRing size={12} className="text-amber-700" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 text-sm mb-1">
                              {notification.type === 'booking' && 'New Booking Request'}
                              {notification.type === 'confirmation' && 'Ride Confirmed'}
                              {notification.type === 'cancellation' && 'Ride Cancelled'}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {notification.content}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                              {format(new Date(notification.created_at), 'MMM d • h:mm a')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BellRing size={24} className="text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 text-sm">All caught up!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;