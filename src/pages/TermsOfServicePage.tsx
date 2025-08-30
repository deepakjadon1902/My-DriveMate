import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Users, AlertTriangle, Scale, Clock } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
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
              Terms of Service
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Please read these terms carefully before using My Drivemate
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

      {/* Terms Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 space-y-8">
              
              {/* Acceptance of Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <FileText className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By accessing and using My Drivemate ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p>
                    These Terms of Service constitute a legally binding agreement between you and My Drivemate regarding your use of the Service.
                  </p>
                </div>
              </motion.div>

              {/* Service Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Users className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">2. Service Description</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    My Drivemate is a ride-sharing platform that connects drivers with passengers traveling similar routes. The Service allows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Drivers to offer rides to passengers</li>
                    <li>Passengers to search and book available rides</li>
                    <li>Communication between drivers and passengers</li>
                    <li>Ride management and status tracking</li>
                  </ul>
                </div>
              </motion.div>

              {/* User Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Shield className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">3. User Responsibilities</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground">For Drivers:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Possess a valid driver's license and vehicle registration</li>
                    <li>Maintain adequate vehicle insurance</li>
                    <li>Provide accurate vehicle and ride information</li>
                    <li>Ensure vehicle safety and roadworthiness</li>
                    <li>Comply with all traffic laws and regulations</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6">For Passengers:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate contact information</li>
                    <li>Be punctual for scheduled rides</li>
                    <li>Respect the driver and vehicle</li>
                    <li>Pay agreed-upon fare promptly</li>
                  </ul>
                </div>
              </motion.div>

              {/* Prohibited Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <AlertTriangle className="text-red-500 mr-3" size={24} />
                  <h2 className="text-2xl font-bold">4. Prohibited Activities</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>Users are prohibited from:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Using the Service for illegal activities</li>
                    <li>Providing false or misleading information</li>
                    <li>Harassing or threatening other users</li>
                    <li>Using the Service for commercial transportation without proper licensing</li>
                    <li>Attempting to circumvent security measures</li>
                    <li>Sharing login credentials with others</li>
                  </ul>
                </div>
              </motion.div>

              {/* Liability and Disclaimers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Scale className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">5. Liability and Disclaimers</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    My Drivemate acts as a platform to connect drivers and passengers. We are not responsible for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The conduct of drivers or passengers</li>
                    <li>Vehicle accidents or incidents during rides</li>
                    <li>Loss or damage to personal property</li>
                    <li>Disputes between users</li>
                    <li>Compliance with local transportation regulations</li>
                  </ul>
                  <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <strong>Important:</strong> Users participate in ride-sharing at their own risk. We strongly recommend verifying driver credentials and vehicle details before traveling.
                  </p>
                </div>
              </motion.div>

              {/* Payment Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <FileText className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">6. Payment Terms</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payment arrangements are made directly between drivers and passengers</li>
                    <li>My Drivemate does not process payments or collect fees</li>
                    <li>Users are responsible for resolving payment disputes</li>
                    <li>Cancellation policies are determined by individual drivers</li>
                  </ul>
                </div>
              </motion.div>

              {/* Termination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Clock className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">7. Account Termination</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities. Users may also delete their accounts at any time.
                  </p>
                </div>
              </motion.div>

              {/* Changes to Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <FileText className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">8. Changes to Terms</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or platform notifications. Continued use of the Service after changes constitutes acceptance of the new terms.
                  </p>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <FileText className="text-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold">9. Contact Information</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    For questions about these Terms of Service, please contact us at:
                  </p>
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

export default TermsOfServicePage;