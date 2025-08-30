
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Car, MapPin, Calendar, Clock, Users, CreditCard, AlertCircle, Route, Info, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const OfferRide: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState(0);
  const [carModel, setCarModel] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Validate if user is a driver
  if (profile?.role !== 'driver') {
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
              You need to be registered as a driver to offer rides.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupLocation || !destination || !date || !time || !carModel || !numberPlate) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Validate number plate format (basic validation)
    const numberPlateRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    if (!numberPlateRegex.test(numberPlate)) {
      toast.error('Invalid number plate format. Example: DL01AB1234');
      return;
    }
    
    // Validate date is in the future
    const rideDateTime = new Date(`${date}T${time}`);
    if (rideDateTime <= new Date()) {
      toast.error('Ride date and time must be in the future');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('rides')
        .insert({
          driver_id: profile.id,
          pickup_location: pickupLocation,
          destination,
          date_time: rideDateTime.toISOString(),
          available_seats: availableSeats,
          price_per_seat: pricePerSeat,
          car_model: carModel,
          number_plate: numberPlate.toUpperCase(),
        })
        .select();
      
      if (error) throw error;
      
      toast.success('Ride offered successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error offering ride:', error);
      toast.error('Failed to offer ride. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <div 
              className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Route size={40} className="text-white" />
            </div>
            <h1 
              className="text-6xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #bfdbfe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Offer Your Ride
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Share your journey, earn money, and help others reach their destination
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 relative z-10 pb-16">
        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-10"
            style={{ 
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0'
            }}
          >
            {/* Route Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-14 h-14 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    borderRadius: '16px'
                  }}
                >
                  <MapPin className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Route Information</h2>
                  <p className="text-gray-600">Where are you traveling?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <div 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: '#10b981' }}
                    ></div>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 text-black font-medium bg-gray-50 transition-all duration-200 focus:outline-none"
                      style={{ 
                        borderRadius: '16px',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      placeholder="Enter pickup location"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Destination
                  </label>
                  <div className="relative">
                    <div 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: '#ef4444' }}
                    ></div>
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
                      placeholder="Enter destination"
                      required
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Date and Time */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-14 h-14 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                    borderRadius: '16px'
                  }}
                >
                  <Calendar className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Date & Time</h2>
                  <p className="text-gray-600">When is your journey?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
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
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Departure Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 text-black font-medium bg-gray-50 transition-all duration-200 focus:outline-none"
                      style={{ 
                        borderRadius: '16px',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      required
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ride Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-14 h-14 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '16px'
                  }}
                >
                  <Users className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Ride Details</h2>
                  <p className="text-gray-600">Set your ride preferences</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Available Seats
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      value={availableSeats}
                      onChange={(e) => setAvailableSeats(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 text-black font-medium bg-gray-50 transition-all duration-200 focus:outline-none appearance-none"
                      style={{ 
                        borderRadius: '16px',
                        transition: 'border-color 0.2s ease',
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 12px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '16px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      required
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} seat{num !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Price per Seat (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">₹</div>
                    <input
                      type="number"
                      value={pricePerSeat}
                      onChange={(e) => setPricePerSeat(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 text-black font-medium bg-gray-50 transition-all duration-200 focus:outline-none"
                      style={{ 
                        borderRadius: '16px',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      placeholder="Enter price"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Car Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-14 h-14 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '16px'
                  }}
                >
                  <Car className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Vehicle Information</h2>
                  <p className="text-gray-600">Tell us about your car</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Car Model
                  </label>
                  <div className="relative">
                    <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 text-black font-medium bg-gray-50 transition-all duration-200 focus:outline-none"
                      style={{ 
                        borderRadius: '16px',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      placeholder="e.g. Honda City, Maruti Swift"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Number Plate
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold text-sm">#</div>
                    <input
                      type="text"
                      value={numberPlate}
                      onChange={(e) => setNumberPlate(e.target.value.toUpperCase())}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 text-black font-medium bg-gray-50 transition-all duration-200 focus:outline-none"
                      style={{ 
                        borderRadius: '16px',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      placeholder="e.g. DL01AB1234"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-2">
                    <Info size={12} className="mt-0.5 flex-shrink-0" />
                    Format: State code (2 letters) + Number (2 digits) + Letters (1-2) + Number (4 digits)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="px-12 py-4 text-white font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3 min-w-[200px]"
                style={{
                  borderRadius: '16px',
                  background: isLoading 
                    ? '#6b7280' 
                    : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: isLoading ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div 
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
                    />
                    Creating Ride...
                  </>
                ) : (
                  <>
                    <Route size={24} />
                    Offer Your Ride
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 p-8 text-white"
            style={{ 
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 flex items-center justify-center"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px'
                }}
              >
                <AlertCircle size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold">Important Guidelines</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">Ensure all details provided are accurate and up-to-date</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">You'll receive notifications when passengers book your ride</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">You can cancel rides anytime, but please be considerate</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">Contact information will be shared with passengers after booking</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OfferRide;