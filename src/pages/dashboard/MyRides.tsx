
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Ride, Booking, Profile } from '../../types/supabase';
import { MapPin, Clock, Calendar, Users, CreditCard, Car, CheckCircle, XCircle, Phone, Mail, User, ArrowRight, Activity } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';

// Extend the Booking type to include ride and associated profile
type ExtendedBooking = Booking & {
  ride: Ride;
  profile: Profile; // Driver for passenger's bookings, Passenger for driver's bookings
};

const MyRides: React.FC = () => {
  const { profile } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'upcoming' | 'going' | 'finished' | 'cancelled'>('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<{
    upcoming: ExtendedBooking[];
    going: ExtendedBooking[];
    finished: ExtendedBooking[];
    cancelled: ExtendedBooking[];
  }>({
    upcoming: [],
    going: [],
    finished: [],
    cancelled: [],
  });
  
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  
  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!profile) return;
      
      setIsLoading(true);
      
      try {
        let bookingsQuery;
        
        if (profile.role === 'passenger') {
          // Fetch bookings for passenger, including ride details and driver profiles
          bookingsQuery = supabase
            .from('bookings')
            .select(`
              *,
              ride:rides(*),
              profile:rides(driver:profiles(*))
            `)
            .eq('passenger_id', profile.id);
        } else {
          // Fetch bookings for driver's rides, including passenger profiles
          bookingsQuery = supabase
            .from('bookings')
            .select(`
              *,
              ride:rides!inner(*),
              profile:profiles(*)
            `)
            .eq('ride.driver_id', profile.id);
        }
        
        const { data, error } = await bookingsQuery;
        
        if (error) throw error;
        
        // Process and categorize bookings
        const processedBookings = {
          upcoming: [],
          going: [],
          finished: [],
          cancelled: [],
        };
        
        data.forEach((booking: any) => {
          // Restructure driver/passenger profile data
          if (profile.role === 'passenger') {
            booking.profile = booking.profile.driver;
          }
          
          processedBookings[booking.status as keyof typeof processedBookings].push(booking);
        });
        
        setBookings(processedBookings as any);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load your rides');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [profile]);
  
  // Update booking status
  const updateBookingStatus = async (bookingId: string, newStatus: 'upcoming' | 'going' | 'finished' | 'cancelled') => {
    if (!profile) return;
    
    setUpdatingStatus(bookingId);
    
    try {
      // Get booking details for notification
      const { data: bookingData } = await supabase
        .from('bookings')
        .select(`
          *,
          ride:rides(*),
          passenger:profiles(*)
        `)
        .eq('id', bookingId)
        .single();
      
      if (!bookingData) throw new Error('Booking not found');
      
      // Update booking status
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);
      
      if (updateError) throw updateError;
      
      // Create notification based on status change
      let notificationType = 'confirmation';
      let notificationContent = '';
      
      if (newStatus === 'going') {
        notificationType = 'confirmation';
        notificationContent = `Your ride from ${bookingData.ride.pickup_location} to ${bookingData.ride.destination} has been confirmed by the driver. Contact: ${profile.phone_number}, Email: ${profile.email}`;
      } else if (newStatus === 'cancelled') {
        notificationType = 'cancellation';
        notificationContent = `${profile.role === 'driver' ? 'Driver' : 'Passenger'} has cancelled the ride from ${bookingData.ride.pickup_location} to ${bookingData.ride.destination}.`;
        
        // If driver cancels, increase available seats
        if (profile.role === 'driver') {
          const { error: updateSeatsError } = await supabase
            .from('rides')
            .update({ available_seats: bookingData.ride.available_seats + 1 })
            .eq('id', bookingData.ride.id);
          
          if (updateSeatsError) throw updateSeatsError;
        }
      } else if (newStatus === 'finished') {
        notificationType = 'confirmation';
        notificationContent = `Your ride from ${bookingData.ride.pickup_location} to ${bookingData.ride.destination} has been marked as completed.`;
      }
      
      // Create notification
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          sender_id: profile.id,
          recipient_id: profile.role === 'driver' ? bookingData.passenger.id : bookingData.ride.driver_id,
          type: notificationType as 'booking' | 'confirmation' | 'cancellation',
          content: notificationContent,
          ride_id: bookingData.ride.id,
          read: false,
        });
      
      if (notificationError) throw notificationError;
      
      // Update state
      setBookings(prev => {
        const currentTab = prev[activeTab as keyof typeof prev];
        const updatedTabBookings = currentTab.filter(booking => booking.id !== bookingId);
        
        return {
          ...prev,
          [activeTab]: updatedTabBookings,
          [newStatus]: [...prev[newStatus as keyof typeof prev], {
            ...currentTab.find(booking => booking.id === bookingId)!,
            status: newStatus,
          }],
        };
      });
      
      toast.success(`Ride status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update ride status');
    } finally {
      setUpdatingStatus(null);
    }
  };
  
  const statusConfig = {
    upcoming: {
      label: 'Upcoming',
      icon: Clock,
      color: 'from-blue-100 to-blue-50',
      textColor: 'text-blue-900',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    },
    going: {
      label: 'Ongoing',
      icon: Activity,
      color: 'from-amber-100 to-amber-50',
      textColor: 'text-amber-900',
      bgColor: 'bg-amber-100',
      borderColor: 'border-amber-200'
    },
    finished: {
      label: 'Finished',
      icon: CheckCircle,
      color: 'from-green-100 to-green-50',
      textColor: 'text-green-900',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    cancelled: {
      label: 'Cancelled',
      icon: XCircle,
      color: 'from-red-100 to-red-50',
      textColor: 'text-red-900',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200'
    }
  };
  
  const renderBookingCard = (booking: ExtendedBooking) => {
    const { ride, profile: otherParty } = booking;
    const status = statusConfig[booking.status as keyof typeof statusConfig];
    
    return (
      <motion.div
        key={booking.id}
        className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 rounded-xl mr-3">
                  <MapPin size={18} className="text-blue-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {ride.pickup_location} → {ride.destination}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-slate-600">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span className="font-medium">
                    {format(parseISO(ride.date_time), 'EEEE, MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span className="font-medium">
                    {format(parseISO(ride.date_time), 'h:mm a')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-3">
              <div className={`inline-flex items-center px-4 py-2 rounded-xl font-semibold text-sm ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                <status.icon size={16} className="mr-2" />
                {status.label}
              </div>
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-xl font-bold">
                ₹{ride.price_per_seat}
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6"></div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ride Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Ride Details</h4>
              
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100">
                  <Car size={18} className="text-slate-700 mr-3" />
                  <div>
                    <span className="font-semibold text-slate-900">{ride.car_model}</span>
                    <span className="text-slate-600 ml-2">({ride.number_plate})</span>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100">
                  <Users size={18} className="text-slate-700 mr-3" />
                  <span className="font-semibold text-slate-900">1 seat booked</span>
                </div>
                
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100">
                  <CreditCard size={18} className="text-slate-700 mr-3" />
                  <span className="font-semibold text-slate-900">₹{ride.price_per_seat} per seat</span>
                </div>
              </div>
            </div>
            
            {/* Contact Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 mb-4">
                {profile?.role === 'driver' ? 'Passenger' : 'Driver'} Details
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100">
                  <User size={18} className="text-blue-900 mr-3" />
                  <span className="font-semibold text-slate-900">{otherParty.full_name}</span>
                </div>
                
                {(booking.status === 'going' || booking.status === 'finished') && (
                  <>
                    <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100">
                      <Phone size={18} className="text-blue-900 mr-3" />
                      <span className="font-semibold text-slate-900">{otherParty.phone_number}</span>
                    </div>
                    <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100">
                      <Mail size={18} className="text-blue-900 mr-3" />
                      <span className="font-semibold text-slate-900">{otherParty.email}</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Action Buttons */}
              {booking.status === 'upcoming' && profile?.role === 'driver' && (
                <div className="flex flex-col space-y-3 mt-6">
                  <button
                    className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => updateBookingStatus(booking.id, 'going')}
                    disabled={updatingStatus === booking.id}
                  >
                    {updatingStatus === booking.id ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle size={18} className="mr-2" />
                        Confirm Ride
                      </>
                    )}
                  </button>
                  <button
                    className="flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300"
                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    disabled={updatingStatus === booking.id}
                  >
                    <XCircle size={18} className="mr-2" />
                    Decline
                  </button>
                </div>
              )}
              
              {booking.status === 'going' && (
                <div className="flex flex-col space-y-3 mt-6">
                  <button
                    className="flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => updateBookingStatus(booking.id, 'finished')}
                    disabled={updatingStatus === booking.id}
                  >
                    {updatingStatus === booking.id ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle size={18} className="mr-2" />
                        Mark as Completed
                      </>
                    )}
                  </button>
                  <button
                    className="flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300"
                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    disabled={updatingStatus === booking.id}
                  >
                    <XCircle size={18} className="mr-2" />
                    Cancel
                  </button>
                </div>
              )}
              
              {booking.status === 'upcoming' && profile?.role === 'passenger' && (
                <div className="mt-6">
                  <button
                    className="flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300"
                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    disabled={updatingStatus === booking.id}
                  >
                    {updatingStatus === booking.id ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <XCircle size={18} className="mr-2" />
                        Cancel Booking
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const renderEmptyState = () => (
    <motion.div 
      className="text-center py-16 bg-white rounded-3xl shadow-lg border border-slate-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 bg-slate-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <MapPin size={32} className="text-slate-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">No {activeTab} rides</h3>
      <p className="text-slate-600 text-lg max-w-md mx-auto">
        {activeTab === 'upcoming' && "You don't have any upcoming rides"}
        {activeTab === 'going' && "You don't have any ongoing rides"}
        {activeTab === 'finished' && "You haven't completed any rides yet"}
        {activeTab === 'cancelled' && "You don't have any cancelled rides"}
      </p>
    </motion.div>
  );
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            >
              <Car size={28} className="text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Rides
              </span>
            </h1>
            <p className="text-xl text-blue-100 font-light">
              Manage your bookings and track ride status
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Status Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-2 inline-flex space-x-1">
            {Object.entries(statusConfig).map(([key, config], index) => {
              const count = bookings[key as keyof typeof bookings].length;
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveTab(key as any)}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === key
                      ? `bg-gradient-to-r ${config.color} ${config.textColor} shadow-lg scale-105`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <config.icon size={18} />
                  <span>{config.label}</span>
                  {count > 0 && (
                    <div className={`min-w-[20px] h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                      activeTab === key 
                        ? 'bg-white/20 text-current' 
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        
        {/* Bookings Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {bookings[activeTab].length > 0 ? (
            bookings[activeTab].map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {renderBookingCard(booking)}
              </motion.div>
            ))
          ) : (
            renderEmptyState()
          )}
        </motion.div>
        
        {/* Ride Management Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/20 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative">
            <h3 className="text-2xl font-bold mb-6 text-center">Ride Status Guide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(statusConfig).map(([key, config], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${config.color}`}>
                    <config.icon size={24} className={config.textColor} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-blue-100">{config.label}</h4>
                    <p className="text-white/90 leading-relaxed">
                      {key === 'upcoming' && (profile?.role === 'driver' 
                        ? "Rides that passengers have booked but you haven't confirmed yet. Review and decide to accept or decline." 
                        : "Rides you've booked but the driver hasn't confirmed yet. Wait for driver confirmation.")}
                      {key === 'going' && (profile?.role === 'driver' 
                        ? "Rides you've confirmed and are scheduled to happen. Contact details are now available." 
                        : "Rides the driver has confirmed and are scheduled to happen. Contact details are now available.")}
                      {key === 'finished' && "Rides that have been completed successfully. Great job on a safe journey!"}
                      {key === 'cancelled' && `Rides that were cancelled by you or the ${profile?.role === 'driver' ? 'passenger' : 'driver'}. No charges applied.`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyRides;