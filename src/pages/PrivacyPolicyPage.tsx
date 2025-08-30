import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Database, Lock, Share2, Cookie, Mail } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <motion.div
          className="container mx-auto px-4 md:px-6 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </motion.p>
            <motion.p 
              className="text-sm text-muted-foreground mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Last updated: January 2025
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 space-y-8">
              
              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Database className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground">Personal Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full name and email address</li>
                    <li>Phone number for ride coordination</li>
                    <li>Account preferences (driver/passenger role)</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground">Ride Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pickup and destination locations</li>
                    <li>Travel dates and times</li>
                    <li>Vehicle details (for drivers)</li>
                    <li>Booking and ride history</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground">Technical Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Usage patterns and preferences</li>
                  </ul>
                </div>
              </motion.div>

              {/* How We Use Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Eye className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We use your information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Facilitate ride-sharing connections between users</li>
                    <li>Process and manage ride bookings</li>
                    <li>Send notifications about ride status and updates</li>
                    <li>Improve our service and user experience</li>
                    <li>Ensure platform security and prevent fraud</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </motion.div>

              {/* Information Sharing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Share2 className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">3. Information Sharing</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We share your information only in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>With Other Users:</strong> Contact information is shared between drivers and passengers only after ride confirmation</li>
                    <li><strong>Service Providers:</strong> With trusted third-party services that help us operate the platform (Supabase for data storage)</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                    <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                  </ul>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p><strong>Note:</strong> We never sell your personal information to third parties for marketing purposes.</p>
                  </div>
                </div>
              </motion.div>

              {/* Data Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Lock className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">4. Data Security</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We implement industry-standard security measures to protect your data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Row-level security in our database</li>
                    <li>Regular security audits and updates</li>
                    <li>Secure authentication protocols</li>
                    <li>Limited access to personal information</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </div>
              </motion.div>

              {/* Cookies and Tracking */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Cookie className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">5. Cookies and Tracking</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your login status and preferences</li>
                    <li>Analyze usage patterns to improve our service</li>
                    <li>Provide personalized content and features</li>
                    <li>Ensure platform security</li>
                  </ul>
                  <p>You can control cookie settings through your browser preferences.</p>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Shield className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">6. Your Rights</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and review your personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt-out of non-essential communications</li>
                    <li>Request data portability</li>
                  </ul>
                  <p>To exercise these rights, please contact us using the information provided below.</p>
                </div>
              </motion.div>

              {/* Data Retention */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Database className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">7. Data Retention</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We retain your information for as long as necessary to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide our services to you</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes and enforce agreements</li>
                    <li>Improve our services</li>
                  </ul>
                  <p>When you delete your account, we will remove your personal information within 30 days, except where retention is required by law.</p>
                </div>
              </motion.div>

              {/* Contact Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Mail className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">8. Contact Us</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>If you have questions about this Privacy Policy, please contact us:</p>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p><strong>Email:</strong> deepakjadon1907@gmail.com</p>
                    <p><strong>Phone:</strong> +91 9149370081</p>
                    <p><strong>Address:</strong> GLA University, Mathura, Uttar Pradesh, India 281001</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;