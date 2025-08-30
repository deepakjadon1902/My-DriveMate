
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { useTheme } from "../contexts/ThemeContext";
// import { Car, Sun, Moon, Menu, X, Bell } from "lucide-react";
// import { motion } from "framer-motion";

// const Header: React.FC = () => {
//   const { user, signOut, profile } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       navigate("/");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   const navItems = [
//     { title: "Dashboard", path: "/dashboard", authRequired: true },
//     {
//       title: profile?.role === "driver" ? "Offer Ride" : "Search Rides",
//       path: profile?.role === "driver" ? "/offer-ride" : "/search-rides",
//       authRequired: true,
//     },
//     { title: "My Rides", path: "/my-rides", authRequired: true }
//   ];

//   return (
//     <motion.header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled
//           ? "bg-black/90 backdrop-blur-xl shadow-lg border-b border-navy-800"
//           : "bg-black/60 backdrop-blur-sm"
//       }`}
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//     >
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3">
//             <motion.div
//               className="relative"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <div className="absolute inset-0 bg-navy-800 rounded-2xl blur-lg opacity-50"></div>
//               <div className="relative bg-gradient-to-br from-navy-700 to-navy-900 rounded-2xl p-3 text-white shadow-glow">
//                 <Car size={32} />
//               </div>
//             </motion.div>
//             <span className="font-extrabold text-4xl tracking-tight bg-gradient-to-r from-white via-navy-300 to-navy-700 bg-clip-text text-transparent">
//               My Drivemate
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-4">
//             {navItems.map(
//               (item) =>
//                 (!item.authRequired || user) && (
//                   <motion.div
//                     key={item.path}
//                     whileHover={{ scale: 1.07 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Link
//                       to={item.path}
//                       className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
//                         location.pathname === item.path
//                           ? "bg-navy-800/30 text-navy-300 shadow-lg backdrop-blur-sm"
//                           : "text-white hover:text-navy-300 hover:bg-white/10"
//                       }`}
//                     >
//                       {item.title}
//                     </Link>
//                   </motion.div>
//                 )
//             )}

//             {user && (
//               <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   to="/notifications"
//                   className="p-4 ml-2 rounded-xl text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
//                   aria-label="Notifications"
//                 >
//                   <Bell size={24} />
//                 </Link>
//               </motion.div>
//             )}

//             <motion.button
//               onClick={toggleTheme}
//               className="p-4 ml-2 rounded-xl text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
//               aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
//               whileHover={{ scale: 1.07 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
//             </motion.button>

//             {user ? (
//               <motion.button
//                 onClick={handleSignOut}
//                 className="ml-4 px-6 py-3 rounded-xl font-bold text-lg bg-navy-800 hover:bg-navy-900 text-white transition"
//                 whileHover={{ scale: 1.07 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Sign Out
//               </motion.button>
//             ) : (
//               <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   to="/login"
//                   className="ml-4 px-6 py-3 rounded-xl font-bold text-lg bg-navy-800 hover:bg-navy-900 text-white transition"
//                 >
//                   Sign In
//                 </Link>
//               </motion.div>
//             )}
//           </nav>

//           {/* Mobile Menu Button */}
//           <div className="flex items-center lg:hidden space-x-2">
//             {user && (
//               <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   to="/notifications"
//                   className="p-4 rounded-xl text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300"
//                   aria-label="Notifications"
//                 >
//                   <Bell size={24} />
//                 </Link>
//               </motion.div>
//             )}

//             <motion.button
//               onClick={toggleTheme}
//               className="p-4 rounded-xl text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300"
//               aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
//               whileHover={{ scale: 1.07 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
//             </motion.button>

//             <motion.button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="p-4 rounded-xl text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300"
//               aria-label="Open menu"
//               whileHover={{ scale: 1.07 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <motion.div
//           className="lg:hidden bg-black/95 shadow-xl border-t border-navy-800"
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <div className="px-4 pt-4 pb-6 space-y-2">
//             {navItems.map(
//               (item) =>
//                 (!item.authRequired || user) && (
//                   <motion.div
//                     key={item.path}
//                     initial={{ x: -20, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Link
//                       to={item.path}
//                       className={`block px-5 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
//                         location.pathname === item.path
//                           ? "bg-navy-800/30 text-navy-300"
//                           : "text-white hover:text-navy-300 hover:bg-white/10"
//                       }`}
//                     >
//                       {item.title}
//                     </Link>
//                   </motion.div>
//                 )
//             )}

//             {user ? (
//               <motion.button
//                 onClick={handleSignOut}
//                 className="w-full text-left px-5 py-4 rounded-xl text-lg font-bold text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300"
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.3, delay: 0.1 }}
//               >
//                 Sign Out
//               </motion.button>
//             ) : (
//               <motion.div
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.3, delay: 0.1 }}
//               >
//                 <Link
//                   to="/login"
//                   className="block px-5 py-4 rounded-xl text-lg font-bold text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300"
//                 >
//                   Sign In
//                 </Link>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </motion.header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Car, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const { user, signOut, profile } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navItems = [
    { title: "Dashboard", path: "/dashboard", authRequired: true },
    {
      title: profile?.role === "driver" ? "Offer Ride" : "Search Rides",
      path: profile?.role === "driver" ? "/offer-ride" : "/search-rides",
      authRequired: true,
    },
    { title: "My Rides", path: "/my-rides", authRequired: true }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl shadow-lg border-b border-navy-800"
          : "bg-black/60 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-navy-800 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-br from-navy-700 to-navy-900 rounded-2xl p-3 text-white shadow-glow">
                <Car size={32} />
              </div>
            </motion.div>
            <span className="font-extrabold text-4xl tracking-tight bg-gradient-to-r from-white via-navy-300 to-navy-700 bg-clip-text text-transparent">
              My Drivemate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navItems.map(
              (item) =>
                (!item.authRequired || user) && (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                        location.pathname === item.path
                          ? "bg-navy-800/30 text-navy-300 shadow-lg backdrop-blur-sm"
                          : "text-white hover:text-navy-300 hover:bg-white/10"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                )
            )}

            {user ? (
              <motion.button
                onClick={handleSignOut}
                className="ml-4 px-6 py-3 rounded-xl font-bold text-lg bg-navy-800 hover:bg-navy-900 text-white transition"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Out
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="ml-4 px-6 py-3 rounded-xl font-bold text-lg bg-navy-800 hover:bg-navy-900 text-white transition"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-4 rounded-xl text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300"
              aria-label="Open menu"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="lg:hidden bg-black/95 shadow-xl border-t border-navy-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map(
              (item) =>
                (!item.authRequired || user) && (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      className={`block px-5 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                        location.pathname === item.path
                          ? "bg-navy-800/30 text-navy-300"
                          : "text-white hover:text-navy-300 hover:bg-white/10"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                )
            )}

            {user ? (
              <motion.button
                onClick={handleSignOut}
                className="w-full text-left px-5 py-4 rounded-xl text-lg font-bold text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Sign Out
              </motion.button>
            ) : (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  to="/login"
                  className="block px-5 py-4 rounded-xl text-lg font-bold text-white hover:text-navy-300 hover:bg-white/10 transition-all duration-300"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;