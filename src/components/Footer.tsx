// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Car, Mail, Phone, MapPin, Instagram, Linkedin, Heart } from 'lucide-react';

// const Footer: React.FC = () => {
//   const currentYear = new Date().getFullYear();
  
//   return (
//     <footer className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-black text-white overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         <motion.div 
//           className="absolute top-20 left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
//           animate={{ 
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.1, 0.3] 
//           }}
//           transition={{ repeat: Infinity, duration: 8 }}
//         />
//         <motion.div 
//           className="absolute bottom-20 right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"
//           animate={{ 
//             scale: [1, 1.3, 1],
//             opacity: [0.2, 0.05, 0.2] 
//           }}
//           transition={{ repeat: Infinity, duration: 10 }}
//         />
//       </div>
      
//       <div className="relative container mx-auto px-4 md:px-6 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//           {/* Brand Section */}
//           <div className="space-y-6">
//             <Link to="/" className="flex items-center space-x-3">
//               <motion.div 
//                 className="relative"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <div className="absolute inset-0 bg-primary rounded-2xl blur-lg opacity-50"></div>
//                 <div className="relative bg-gradient-to-br from-primary to-navy-600 rounded-2xl p-3 text-white shadow-glow">
//                   <Car size={24} />
//                 </div>
//               </motion.div>
//               <span className="font-bold text-2xl tracking-tight">
//                 My Drivemate
//               </span>
//             </Link>
//             <p className="text-gray-300 text-sm leading-relaxed">
//               Revolutionizing ride sharing with smart technology, connecting travelers and making journeys more affordable, sustainable, and social.
//             </p>
//             <div className="flex space-x-4">
//               <motion.a 
//                 href="https://instagram.com" 
//                 className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Instagram size={20} />
//                 <span className="sr-only">Instagram</span>
//               </motion.a>
//               <motion.a 
//                 href="https://linkedin.com" 
//                 className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Linkedin size={20} />
//                 <span className="sr-only">LinkedIn</span>
//               </motion.a>
//             </div>
//           </div>
          
//           {/* Quick Links */}
//           <div>
//             <h3 className="font-bold text-lg mb-6">Quick Links</h3>
//             <ul className="space-y-3">
//               {[
//                 { name: 'Dashboard', path: '/dashboard' },
//                 { name: 'Search Rides', path: '/search-rides' },
//                 { name: 'Offer Ride', path: '/offer-ride' },
//                 { name: 'My Rides', path: '/my-rides' },
//               ].map((link) => (
//                 <li key={link.path}>
//                   <Link 
//                     to={link.path} 
//                     className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           {/* Company */}
//           <div>
//             <h3 className="font-bold text-lg mb-6">Company</h3>
//             <ul className="space-y-3">
//               <li>
//                 <a 
//                   href="/privacy-policy" 
//                   className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a 
//                   href="/terms-of-service" 
//                   className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
//                 >
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <Link 
//                   to="/about" 
//                   className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/contact" 
//                   className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>
          
//           {/* Contact Info */}
//           <div>
//             <h3 className="font-bold text-lg mb-6">Get in Touch</h3>
//             <ul className="space-y-4">
//               <li className="flex items-center space-x-3">
//                 <div className="p-2 rounded-lg bg-white/10">
//                   <MapPin size={16} />
//                 </div>
//                 <div className="text-sm">
//                   <div className="text-gray-300">GLA University</div>
//                   <div className="text-gray-400">Mathura, India 281001</div>
//                 </div>
//               </li>
//               <li className="flex items-center space-x-3">
//                 <div className="p-2 rounded-lg bg-white/10">
//                   <Mail size={16} />
//                 </div>
//                 <a 
//                   href="mailto:deepakjadon1907@gmail.com" 
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   deepakjadon1907@gmail.com
//                 </a>
//               </li>
//               <li className="flex items-center space-x-3">
//                 <div className="p-2 rounded-lg bg-white/10">
//                   <Phone size={16} />
//                 </div>
//                 <a 
//                   href="tel:+919149370081" 
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   +91 9149370081
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
        
//         {/* Bottom Section */}
//         <div className="mt-16 pt-8 border-t border-white/10">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <div className="text-center md:text-left">
//               <p className="text-gray-300 text-sm">
//                 &copy; {currentYear} My Drivemate. All rights reserved.
//               </p>
//               <p className="text-gray-400 text-xs mt-1">
//                 Built with <Heart size={12} className="inline text-red-400" /> by Deepak Jadon
//               </p>
//             </div>
            
//             <div className="text-center md:text-right">
//               <p className="text-gray-400 text-xs">
//                 Making travel affordable, sustainable, and social
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Mail, Phone, MapPin, Github, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3] 
          }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.05, 0.2] 
          }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-primary rounded-2xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-br from-primary to-navy-600 rounded-2xl p-3 text-white shadow-glow">
                  <Car size={24} />
                </div>
              </motion.div>
              <span className="font-bold text-2xl tracking-tight">
                My Drivemate
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Revolutionizing ride sharing with smart technology, connecting travelers and making journeys more affordable, sustainable, and social.
            </p>
            <div className="flex space-x-4">
              {/* GitHub */}
              <motion.a 
                href="https://github.com/Deepakjadon1902" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>

              {/* LinkedIn */}
              <motion.a 
                href="https://www.linkedin.com/in/deepak-jadon-612487272" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Search Rides', path: '/search-rides' },
                { name: 'Offer Ride', path: '/offer-ride' },
                { name: 'My Rides', path: '/my-rides' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/privacy-policy" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms-of-service" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <MapPin size={16} />
                </div>
                <div className="text-sm">
                  <div className="text-gray-300">GLA University</div>
                  <div className="text-gray-400">Mathura, India 281001</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <Mail size={16} />
                </div>
                <a 
                  href="mailto:deepakjadon1907@gmail.com" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  deepakjadon1907@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <Phone size={16} />
                </div>
                <a 
                  href="tel:+919149370081" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  +91 9149370081
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                &copy; {currentYear} My Drivemate. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Built with <Heart size={12} className="inline text-red-400" /> by Deepak Jadon
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-xs">
                Making travel affordable, sustainable, and social
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
