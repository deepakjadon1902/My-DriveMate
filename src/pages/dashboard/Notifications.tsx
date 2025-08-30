
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Notification } from '../../types/supabase';
import { BellRing, CheckCircle, XCircle, AlertTriangle, Car, MessageCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';

const Notifications: React.FC = () => {
  const { profile } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);
  
  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!profile) return;
      
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('recipient_id', profile.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setNotifications(data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast.error('Failed to load notifications');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNotifications();
  }, [profile]);
  
  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!profile) return;
    
    setMarkingAsRead(notificationId);
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      
      // Update state
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
      
      toast.success('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to update notification');
    } finally {
      setMarkingAsRead(null);
    }
  };
  
  // Mark all as read
  const markAllAsRead = async () => {
    if (!profile) return;
    
    const unreadNotifications = notifications.filter(n => !n.read);
    if (unreadNotifications.length === 0) {
      toast.info('No unread notifications');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('recipient_id', profile.id)
        .eq('read', false);
      
      if (error) throw error;
      
      // Update state
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to update notifications');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Car className="text-blue-600" size={20} />;
      case 'confirmation':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancellation':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <MessageCircle className="text-blue-600" size={20} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
    }}>
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-center md:text-left">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ color: '#1e293b' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Notifications
                </motion.h1>
                <motion.p 
                  className="text-lg text-slate-600 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Stay updated on your ride bookings and confirmations
                </motion.p>
              </div>
              
              <motion.button
                onClick={markAllAsRead}
                className="px-6 py-3 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || notifications.every(n => n.read)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CheckCircle size={18} />
                Mark All as Read
              </motion.button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader />
                <p className="text-slate-500 font-medium">Loading notifications...</p>
              </div>
            </div>
          ) : notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  className={`relative overflow-hidden rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-lg ${
                    !notification.read 
                      ? 'border-blue-600 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        !notification.read 
                          ? 'bg-blue-50 border-2 border-blue-200' 
                          : 'bg-slate-100 border-2 border-slate-200'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-slate-900">
                            {notification.type === 'booking' && 'New Booking Request'}
                            {notification.type === 'confirmation' && 'Ride Confirmed'}
                            {notification.type === 'cancellation' && 'Ride Cancelled'}
                            {!notification.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </h3>
                          
                          <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                            {format(parseISO(notification.created_at), 'MMM d • h:mm a')}
                          </div>
                        </div>
                        
                        <p className="text-slate-600 mb-6 leading-relaxed font-medium">
                          {notification.content}
                        </p>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                          <Link
                            to="/my-rides"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow"
                          >
                            <Car size={16} />
                            View Details
                          </Link>
                          
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 font-medium transition-colors duration-200"
                              disabled={markingAsRead === notification.id}
                            >
                              {markingAsRead === notification.id ? (
                                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <CheckCircle size={16} />
                              )}
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-20 bg-white rounded-2xl border-2 border-slate-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8 rounded-full bg-slate-50 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <BellRing size={40} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No notifications yet</h3>
              <p className="text-slate-600 font-medium text-lg">
                You're all caught up! New notifications will appear here.
              </p>
            </motion.div>
          )}
          
          {/* Notification Guide */}
          <motion.div 
            className="mt-16 p-8 bg-white rounded-2xl border-2 border-slate-200 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Notification Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-200 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Car size={24} className="text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Booking Requests</h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {profile?.role === 'driver' 
                    ? "When passengers book your offered rides" 
                    : "Confirmation that you've requested a ride"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-green-50 rounded-2xl border-2 border-green-200 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-500" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Ride Confirmations</h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {profile?.role === 'driver' 
                    ? "When you confirm a passenger's booking" 
                    : "When a driver accepts your booking request"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-200 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <XCircle size={24} className="text-red-500" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Cancellations</h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  When a ride is cancelled by you or the other party
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;