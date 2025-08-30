
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Ride } from '../../types/supabase';
import { Search, MapPin, Calendar, Clock, Users, CreditCard, Car, AlertCircle, Filter, Star, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';

const SearchRides: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  
  // Validate if user is a passenger
  if (profile?.role !== 'passenger') {
    return (
      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #eff6ff 100%)' 
      }}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-12 max-w-md mx-auto"
            style={{ 
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0'
            }}
          >
            <div 
              className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderRadius: '50%'
              }}
            >
              <AlertCircle size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">Access Denied</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              You need to be registered as a passenger to search for rides.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Fetch all available rides
  useEffect(() => {
    const fetchRides = async () => {
      setIsSearching(true);
      try {
        const { data: ridesData, error: ridesError } = await supabase
          .from('rides')
          .select('*')
          .gte('date_time', new Date().toISOString())
          .gt('available_seats', 0)
          .order('date_time', { ascending: true });
        
        if (ridesError) throw ridesError;
        
        // Filter out rides with no available seats
        const availableRides = ridesData.filter(ride => ride.available_seats > 0);
        setRides(availableRides);
        setFilteredRides(availableRides);
      } catch (error) {
        console.error('Error fetching rides:', error);
        toast.error('Failed to load rides. Please try again.');
      } finally {
        setIsSearching(false);
      }
    };
    
    fetchRides();
  }, []);
  
  // Apply filters
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let filtered = [...rides];
    
    // Filter by destination
    if (destination) {
      filtered = filtered.filter(ride =>
        ride.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    // Filter by date
    if (date) {
      const selectedDate = new Date(date);
      filtered = filtered.filter(ride => {
        const rideDate = new Date(ride.date_time);
        return (
          rideDate.getFullYear() === selectedDate.getFullYear() &&
          rideDate.getMonth() === selectedDate.getMonth() &&
          rideDate.getDate() === selectedDate.getDate()
        );
      });
    }
    
    setFilteredRides(filtered);
  };
  
  // Book a ride
  const handleBookRide = async (rideId: string) => {
    if (!profile) return;
    
    setIsBooking(rideId);
    
    try {
      // Check if ride is already booked by this passenger
      const { data: existingBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('ride_id', rideId)
        .eq('passenger_id', profile.id)
        .not('status', 'eq', 'cancelled');
      
      if (existingBookings && existingBookings.length > 0) {
        toast.error('You have already booked this ride');
        return;
      }
      
      // Get ride details
      const { data: ride } = await supabase
        .from('rides')
        .select('*')
        .eq('id', rideId)
        .single();
      
      if (!ride) {
        toast.error('Ride not found');
        return;
      }
      
      if (ride.available_seats <= 0) {
        toast.error('No seats available');
        return;
      }
      
      // Start a transaction
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          ride_id: rideId,
          passenger_id: profile.id,
          status: 'upcoming'
        })
        .select()
        .single();
      
      if (bookingError) throw bookingError;
      
      // Update available seats
      const { error: updateError } = await supabase
        .from('rides')
        .update({ available_seats: ride.available_seats - 1 })
        .eq('id', rideId);
      
      if (updateError) throw updateError;
      
      // Create notification for driver
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          sender_id: profile.id,
          recipient_id: ride.driver_id,
          type: 'booking',
          content: `${profile.full_name} has booked your ride from ${ride.pickup_location} to ${ride.destination}. Contact: ${profile.phone_number}, Email: ${profile.email}`,
          ride_id: rideId,
          read: false
        });
      
      if (notificationError) throw notificationError;
      
      // Update local state
      setRides(prevRides =>
        prevRides.map(r =>
          r.id === rideId
            ? { ...r, available_seats: r.available_seats - 1 }
            : r
        )
      );
      
      setFilteredRides(prevRides =>
        prevRides.map(r =>
          r.id === rideId
            ? { ...r, available_seats: r.available_seats - 1 }
            : r
        )
      );
      
      toast.success('Ride booked successfully!');
      navigate('/my-rides');
    } catch (error) {
      console.error('Error booking ride:', error);
      toast.error('Failed to book ride. Please try again.');
    } finally {
      setIsBooking(null);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setDestination('');
    setDate('');
    setFilteredRides(rides);
  };
  
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #eff6ff 100%)' 
    }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)',
            opacity: 0.9
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 
              className="text-6xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #bfdbfe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Find Your Perfect Ride
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Discover comfortable, affordable rides with verified drivers across the city
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 relative z-10">
        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 mb-12"
          style={{ 
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0'
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                borderRadius: '12px'
              }}
            >
              <Filter className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-black">Search & Filter</h2>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 text-black font-medium bg-gray-50 transition-all duration-200 focus:outline-none"
                    style={{ 
                      borderRadius: '16px',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    placeholder="Where are you heading?"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 text-black font-medium bg-gray-50 transition-all duration-200 focus:outline-none"
                    style={{ 
                      borderRadius: '16px',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    min={format(new Date(), 'yyyy-MM-dd')}
                  />
                </div>
              </div>
              
              <div className="flex items-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 text-white py-4 px-6 font-bold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ 
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)';
                  }}
                >
                  <Search size={20} />
                  Search Rides
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-4 border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  style={{ borderRadius: '16px' }}
                >
                  Reset
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
        
        {/* Results Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-black mb-2">Available Rides</h2>
              <p className="text-gray-600">{filteredRides.length} rides found</p>
            </div>
            {filteredRides.length > 0 && (
              <div 
                className="flex items-center gap-2 px-4 py-2"
                style={{ 
                  backgroundColor: '#eff6ff',
                  borderRadius: '50px',
                  border: '1px solid #dbeafe'
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: '#10b981' }}
                ></div>
                <span className="text-sm font-medium" style={{ color: '#1e3a8a' }}>Live Results</span>
              </div>
            )}
          </div>
          
          {isSearching ? (
            <div className="flex justify-center py-20">
              <div className="text-center">
                <div 
                  className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
                  style={{ 
                    borderColor: '#1e3a8a',
                    borderTopColor: 'transparent'
                  }}
                ></div>
                <p className="text-gray-600 font-medium">Finding the best rides for you...</p>
              </div>
            </div>
          ) : filteredRides.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filteredRides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white overflow-hidden group transition-all duration-300"
                  style={{ 
                    borderRadius: '24px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Header */}
                  <div 
                    className="px-8 py-6 border-b border-gray-100"
                    style={{ 
                      background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 flex items-center justify-center"
                          style={{ 
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                            borderRadius: '12px'
                          }}
                        >
                          <Car className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-black text-lg">{ride.car_model}</h3>
                          <p className="text-gray-500 text-sm">{ride.number_plate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div 
                          className="text-white px-4 py-2 font-bold text-lg"
                          style={{ 
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                            borderRadius: '50px'
                          }}
                        >
                          ₹{ride.price_per_seat}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8">
                    {/* Route */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: '#10b981' }}
                          ></div>
                          <span className="font-semibold text-black text-lg">{ride.pickup_location}</span>
                        </div>
                      </div>
                      <ArrowRight style={{ color: '#1e3a8a' }} size={24} />
                      <div className="flex-1 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className="font-semibold text-black text-lg">{ride.destination}</span>
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: '#ef4444' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 flex items-center justify-center"
                          style={{ 
                            backgroundColor: '#eff6ff',
                            borderRadius: '12px'
                          }}
                        >
                          <Calendar style={{ color: '#1e3a8a' }} size={18} />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm font-medium">Date</p>
                          <p className="text-black font-semibold">{format(parseISO(ride.date_time), 'MMM d, yyyy')}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 flex items-center justify-center"
                          style={{ 
                            backgroundColor: '#eff6ff',
                            borderRadius: '12px'
                          }}
                        >
                          <Clock style={{ color: '#1e3a8a' }} size={18} />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm font-medium">Time</p>
                          <p className="text-black font-semibold">{format(parseISO(ride.date_time), 'h:mm a')}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 flex items-center justify-center"
                          style={{ 
                            backgroundColor: '#f0fdf4',
                            borderRadius: '12px'
                          }}
                        >
                          <Users style={{ color: '#16a34a' }} size={18} />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm font-medium">Available</p>
                          <p className="text-black font-semibold">
                            {ride.available_seats} seat{ride.available_seats !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 flex items-center justify-center"
                          style={{ 
                            backgroundColor: '#fefce8',
                            borderRadius: '12px'
                          }}
                        >
                          <Star style={{ color: '#eab308' }} size={18} />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm font-medium">Rating</p>
                          <p className="text-black font-semibold">4.8 ★</p>
                        </div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBookRide(ride.id)}
                      disabled={isBooking === ride.id || ride.available_seats <= 0}
                      className="w-full py-4 px-6 font-bold text-lg transition-all duration-200"
                      style={{
                        borderRadius: '16px',
                        backgroundColor: ride.available_seats <= 0 
                          ? '#e2e8f0' 
                          : isBooking === ride.id 
                          ? '#eff6ff' 
                          : '#1e3a8a',
                        color: ride.available_seats <= 0 
                          ? '#94a3b8' 
                          : isBooking === ride.id 
                          ? '#1e3a8a' 
                          : 'white',
                        background: ride.available_seats <= 0 
                          ? '#e2e8f0' 
                          : isBooking === ride.id 
                          ? '#eff6ff' 
                          : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                        cursor: ride.available_seats <= 0 || isBooking === ride.id ? 'not-allowed' : 'pointer',
                        boxShadow: ride.available_seats > 0 && isBooking !== ride.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (ride.available_seats > 0 && isBooking !== ride.id) {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)';
                          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (ride.available_seats > 0 && isBooking !== ride.id) {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)';
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }
                      }}
                    >
                      {isBooking === ride.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div 
                            className="w-5 h-5 border-2 rounded-full animate-spin"
                            style={{ 
                              borderColor: '#1e3a8a',
                              borderTopColor: 'transparent'
                            }}
                          />
                          Booking...
                        </div>
                      ) : ride.available_seats <= 0 ? (
                        "Fully Booked"
                      ) : (
                        "Book This Ride"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white"
              style={{ 
                borderRadius: '24px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}
            >
              <div 
                className="w-24 h-24 flex items-center justify-center mx-auto mb-6"
                style={{ 
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                  borderRadius: '50%'
                }}
              >
                <MapPin size={40} className="text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">No Rides Found</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                {destination || date 
                  ? "We couldn't find any rides matching your criteria. Try adjusting your filters." 
                  : "There are no available rides at the moment. Check back soon!"}
              </p>
              {(destination || date) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className="text-white px-8 py-3 font-bold transition-all duration-200"
                  style={{ 
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    borderRadius: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)';
                  }}
                >
                  Reset Filters
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
        
        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 text-white"
          style={{ 
            background: 'linear-gradient(135deg, #000000 0%, #374151 50%, #000000 100%)',
            borderRadius: '24px'
          }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Pro Ride Booking Tips</h3>
            <p className="text-gray-300 text-lg">Master the art of smart ride sharing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div 
                className="w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '16px'
                }}
              >
                <CreditCard size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Save Big</h4>
              <p className="text-gray-300 leading-relaxed">
                Ride sharing can reduce your travel costs by up to 60% compared to traditional taxis.
              </p>
            </div>
            
            <div className="text-center group">
              <div 
                className="w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  borderRadius: '16px'
                }}
              >
                <Clock size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Book Early</h4>
              <p className="text-gray-300 leading-relaxed">
                Popular routes fill up fast, especially during peak hours and weekends.
              </p>
            </div>
            
            <div className="text-center group">
              <div 
                className="w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '16px'
                }}
              >
                <AlertCircle size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Stay Safe</h4>
              <p className="text-gray-300 leading-relaxed">
                Always verify driver details, check ratings, and confirm vehicle information before boarding.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchRides;