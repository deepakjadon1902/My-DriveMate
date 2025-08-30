
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { User, Mail, Phone, CarFront, UserCircle, Shield, Calendar, MapPin, ArrowLeft, ChevronRight } from 'lucide-react';
// import Loader from '../../components/ui/Loader';

// const Profile: React.FC = () => {
//   const { profile, isLoading } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
  
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   }
  
//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
//         <div className="text-center p-8">
//           <div className="p-4 bg-slate-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
//             <User size={32} className="text-slate-400" />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-900 mb-4">Profile not found</h2>
//           <p className="text-slate-600">Please sign in to view your profile.</p>
//         </div>
//       </div>
//     );
//   }
  
//   const profileStats = [
//     {
//       label: "Member Since",
//       value: "Jan 2025",
//       icon: Calendar,
//       color: "from-blue-100 to-blue-50"
//     },
//     {
//       label: "Account Status",
//       value: "Verified",
//       icon: Shield,
//       color: "from-green-100 to-green-50"
//     },
//     {
//       label: "Total Rides",
//       value: "12",
//       icon: MapPin,
//       color: "from-purple-100 to-purple-50"
//     }
//   ];
  
//   const profileFields = [
//     {
//       label: "Full Name",
//       value: profile.full_name,
//       icon: User,
//       delay: 0.1
//     },
//     {
//       label: "Email Address",
//       value: profile.email,
//       icon: Mail,
//       delay: 0.2
//     },
//     {
//       label: "Phone Number",
//       value: profile.phone_number,
//       icon: Phone,
//       delay: 0.3
//     },
//     {
//       label: "Account Type",
//       value: profile.role,
//       icon: profile.role === 'driver' ? CarFront : UserCircle,
//       delay: 0.4
//     }
//   ];
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900">
//         <div className="absolute inset-0 bg-black opacity-10"></div>
        
//         {/* Floating decorative elements */}
//         <motion.div 
//           className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
//           animate={{ 
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.1, 0.3] 
//           }}
//           transition={{ repeat: Infinity, duration: 8 }}
//         />
//         <motion.div 
//           className="absolute bottom-10 left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-lg"
//           animate={{ 
//             scale: [1.2, 1, 1.2],
//             opacity: [0.2, 0.4, 0.2] 
//           }}
//           transition={{ repeat: Infinity, duration: 6 }}
//         />
        
//         <div className="relative container mx-auto px-6 py-16">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
//               className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mb-6"
//             >
//               <User size={40} className="text-white" />
//             </motion.div>
            
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               My{' '}
//               <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
//                 Profile
//               </span>
//             </h1>
//             <p className="text-xl text-blue-100 font-light">
//               Manage your personal information and account settings
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       <div className="container mx-auto px-6 py-12">
//         <div className="max-w-5xl mx-auto">
//           {/* Profile Header Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8 relative overflow-hidden"
//           >
//             {/* Background decoration */}
//             <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
            
//             <div className="relative">
//               <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
//                 {/* Profile Avatar */}
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="relative"
//                 >
//                   <div className="w-32 h-32 bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl flex items-center justify-center shadow-lg">
//                     <span className="text-4xl font-bold text-white">
//                       {profile.full_name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
//                     <Shield size={16} className="text-white" />
//                   </div>
//                 </motion.div>

//                 {/* Profile Info */}
//                 <div className="flex-1 text-center md:text-left">
//                   <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.2, duration: 0.5 }}
//                   >
//                     <h2 className="text-3xl font-bold text-slate-900 mb-2">
//                       {profile.full_name}
//                     </h2>
//                     <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 px-4 py-2 rounded-xl font-semibold mb-4">
//                       {profile.role === 'driver' ? (
//                         <>
//                           <CarFront size={18} className="mr-2" />
//                           Verified Driver
//                         </>
//                       ) : (
//                         <>
//                           <UserCircle size={18} className="mr-2" />
//                           Premium Passenger
//                         </>
//                       )}
//                     </div>
//                     <p className="text-slate-600 max-w-md">
//                       {profile.role === 'driver'
//                         ? "Connecting travelers and making journeys more affordable and eco-friendly."
//                         : "Discovering new routes and connecting with fellow travelers for amazing journeys."
//                       }
//                     </p>
//                   </motion.div>
//                 </div>

//                 {/* Action Button */}
//                 <motion.div
//                   initial={{ x: 20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3, duration: 0.5 }}
//                 >
//                   <Link to="/dashboard">
//                     <button className="flex items-center bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-slate-600 hover:to-slate-500 transition-all duration-300 shadow-lg hover:shadow-xl">
//                       <ArrowLeft size={18} className="mr-2" />
//                       Back to Dashboard
//                       <ChevronRight size={16} className="ml-2" />
//                     </button>
//                   </Link>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
//           >
//             {profileStats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + index * 0.1 }}
//                 className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-4`}>
//                   <stat.icon size={20} className="text-slate-700" />
//                 </div>
//                 <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
//                 <div className="text-slate-600 text-sm">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Profile Details */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8"
//           >
//             <div className="mb-8">
//               <h3 className="text-2xl font-bold text-slate-900 mb-2">Account Information</h3>
//               <p className="text-slate-600">Your personal details and account settings</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {profileFields.map((field, index) => (
//                 <motion.div
//                   key={field.label}
//                   initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 + field.delay, duration: 0.5 }}
//                   className="group"
//                 >
//                   <label className="block text-sm font-semibold text-slate-700 mb-3">
//                     {field.label}
//                   </label>
//                   <div className="flex items-center p-4 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300">
//                     <div className="p-2 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors duration-300">
//                       <field.icon size={18} className="text-blue-900" />
//                     </div>
//                     <span className="font-medium text-slate-900 capitalize">
//                       {field.value}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Welcome Message */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden"
//           >
//             {/* Background decoration */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/20 rounded-full translate-y-12 -translate-x-12"></div>
            
//             <div className="relative">
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.5, duration: 0.5 }}
//                 className="text-center mb-6"
//               >
//                 <h3 className="text-2xl font-bold mb-3">
//                   Welcome to My Drivemate, {profile.full_name.split(' ')[0]}! 🚗
//                 </h3>
//                 <p className="text-blue-100 text-lg font-light max-w-2xl mx-auto">
//                   {profile.role === 'driver'
//                     ? "Thank you for joining as a driver. You're helping make travel more accessible and sustainable for everyone in our community."
//                     : "Thank you for joining as a passenger. Enjoy affordable, convenient, and eco-friendly rides to your destination."
//                   }
//                 </p>
//               </motion.div>
              
//               <motion.div
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.6, duration: 0.5 }}
//                 className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-3xl mx-auto"
//               >
//                 <h4 className="font-bold text-lg mb-3 text-blue-100">🚀 Getting Started</h4>
//                 <p className="text-white/90 leading-relaxed">
//                   {profile.role === 'driver'
//                     ? "Ready to share your journey? Offer rides from your dashboard and connect with passengers heading in your direction. You'll receive instant notifications when travelers book your rides, and our secure payment system ensures you get paid fairly for every trip."
//                     : "Ready to explore? Browse available rides from your dashboard and book your next adventure. After booking, you'll receive confirmation notifications when drivers approve your requests. Our rating system ensures safe, reliable journeys every time."
//                   }
//                 </p>
                
//                 <div className="mt-6 flex flex-wrap gap-3">
//                   <div className="flex items-center text-blue-200 text-sm">
//                     <Shield size={16} className="mr-2" />
//                     Verified & Secure
//                   </div>
//                   <div className="flex items-center text-blue-200 text-sm">
//                     <MapPin size={16} className="mr-2" />
//                     Journey Tracking
//                   </div>
//                   <div className="flex items-center text-blue-200 text-sm">
//                     <ArrowLeft size={16} className="mr-2" />
//                     Easy Navigation
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, CarFront, UserCircle, Shield, Calendar, MapPin, ArrowLeft, ChevronRight } from 'lucide-react';
import Loader from '../../components/ui/Loader';

const Profile: React.FC = () => {
  const { profile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="p-4 bg-slate-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <User size={32} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Profile not found</h2>
          <p className="text-slate-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }
  
  const profileStats = [
    {
      label: "Member Since",
      value: "Jan 2025",
      icon: Calendar,
      color: "from-blue-100 to-blue-50"
    },
    {
      label: "Account Status",
      value: "Verified",
      icon: Shield,
      color: "from-green-100 to-green-50"
    }
  ];
  
  const profileFields = [
    {
      label: "Full Name",
      value: profile.full_name,
      icon: User,
      delay: 0.1
    },
    {
      label: "Email Address",
      value: profile.email,
      icon: Mail,
      delay: 0.2
    },
    {
      label: "Phone Number",
      value: profile.phone_number,
      icon: Phone,
      delay: 0.3
    },
    {
      label: "Account Type",
      value: profile.role,
      icon: profile.role === 'driver' ? CarFront : UserCircle,
      delay: 0.4
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Floating decorative elements */}
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3] 
          }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-lg"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        
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
              className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            >
              <User size={40} className="text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Profile
              </span>
            </h1>
            <p className="text-xl text-blue-100 font-light">
              Manage your personal information and account settings
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
            
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Profile Avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold text-white">
                      {profile.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <Shield size={16} className="text-white" />
                  </div>
                </motion.div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                      {profile.full_name}
                    </h2>
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 px-4 py-2 rounded-xl font-semibold mb-4">
                      {profile.role === 'driver' ? (
                        <>
                          <CarFront size={18} className="mr-2" />
                          Verified Driver
                        </>
                      ) : (
                        <>
                          <UserCircle size={18} className="mr-2" />
                          Premium Passenger
                        </>
                      )}
                    </div>
                    <p className="text-slate-600 max-w-md">
                      {profile.role === 'driver'
                        ? "Connecting travelers and making journeys more affordable and eco-friendly."
                        : "Discovering new routes and connecting with fellow travelers for amazing journeys."
                      }
                    </p>
                  </motion.div>
                </div>

                {/* Action Button */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Link to="/dashboard">
                    <button className="flex items-center bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-slate-600 hover:to-slate-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <ArrowLeft size={18} className="mr-2" />
                      Back to Dashboard
                      <ChevronRight size={16} className="ml-2" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {profileStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-4`}>
                  <stat.icon size={20} className="text-slate-700" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Account Information</h3>
              <p className="text-slate-600">Your personal details and account settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileFields.map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + field.delay, duration: 0.5 }}
                  className="group"
                >
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    {field.label}
                  </label>
                  <div className="flex items-center p-4 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <field.icon size={18} className="text-blue-900" />
                    </div>
                    <span className="font-medium text-slate-900 capitalize">
                      {field.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/20 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center mb-6"
              >
                <h3 className="text-2xl font-bold mb-3">
                  Welcome to My Drivemate, {profile.full_name.split(' ')[0]}! 🚗
                </h3>
                <p className="text-blue-100 text-lg font-light max-w-2xl mx-auto">
                  {profile.role === 'driver'
                    ? "Thank you for joining as a driver. You're helping make travel more accessible and sustainable for everyone in our community."
                    : "Thank you for joining as a passenger. Enjoy affordable, convenient, and eco-friendly rides to your destination."
                  }
                </p>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-3xl mx-auto"
              >
                <h4 className="font-bold text-lg mb-3 text-blue-100">🚀 Getting Started</h4>
                <p className="text-white/90 leading-relaxed">
                  {profile.role === 'driver'
                    ? "Ready to share your journey? Offer rides from your dashboard and connect with passengers heading in your direction. You'll receive instant notifications when travelers book your rides, and our secure payment system ensures you get paid fairly for every trip."
                    : "Ready to explore? Browse available rides from your dashboard and book your next adventure. After booking, you'll receive confirmation notifications when drivers approve your requests. Our rating system ensures safe, reliable journeys every time."
                  }
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center text-blue-200 text-sm">
                    <Shield size={16} className="mr-2" />
                    Verified & Secure
                  </div>
                  <div className="flex items-center text-blue-200 text-sm">
                    <MapPin size={16} className="mr-2" />
                    Journey Tracking
                  </div>
                  <div className="flex items-center text-blue-200 text-sm">
                    <ArrowLeft size={16} className="mr-2" />
                    Easy Navigation
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;