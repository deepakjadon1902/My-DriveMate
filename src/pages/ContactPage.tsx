import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe, CheckCircle2, Users, Shield, DollarSign } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">We're here to help</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Have questions about My Drivemate? Need support or want to share feedback? 
              Our team is ready to assist you on your carpooling journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="p-3 rounded-xl bg-blue-900 text-white mr-4">
                      <Send className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                      <p className="text-gray-600">We'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                      <span className="text-red-800 font-medium">Please fill in all required fields.</span>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-200 bg-white text-black"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-200 bg-white text-black"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-200 bg-white text-black"
                        required
                      >
                        <option value="">Please select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="account">Account & Profile Issues</option>
                        <option value="booking">Ride Booking Problems</option>
                        <option value="payment">Payment & Billing</option>
                        <option value="safety">Safety Concerns</option>
                        <option value="feedback">App Feedback & Suggestions</option>
                        <option value="partnership">Business Partnership</option>
                        <option value="technical">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-200 bg-white resize-none text-black"
                        placeholder="Please describe your question or concern in detail. Include any relevant information that might help us assist you better."
                        required
                      />
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-blue-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-800 focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-blue-900 text-white mr-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Support</h4>
                      <a 
                        href="mailto:deepakjadon1907@gmail.com"
                        className="text-blue-900 hover:text-blue-700 text-sm"
                      >
                        deepakjadon1907@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-blue-900 text-white mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone Support</h4>
                      <a 
                        href="tel:+919149370081"
                        className="text-blue-900 hover:text-blue-700 text-sm"
                      >
                        +91 9149370081
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-4 rounded-xl bg-blue-50">
                    <div className="p-2 rounded-lg bg-blue-900 text-white mr-4">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Support Hours</h4>
                      <p className="text-gray-600 text-sm">Mon-Fri: 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-900 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Our Location</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium">GLA University</p>
                  <p>17km Stone, NH-2</p>
                  <p>Mathura, Uttar Pradesh</p>
                  <p>India - 281406</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl text-white p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold">Response Time</h3>
                </div>
                <p className="text-blue-100 mb-2">We typically respond within:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Email: 24 hours
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    Phone: Immediate (business hours)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about My Drivemate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                question: "How do I get started with My Drivemate?",
                answer: "Simply download the app, create your profile as either a driver or passenger, verify your identity, and start connecting with fellow travelers. The process takes less than 5 minutes!"
              },
              {
                icon: Shield,
                question: "How safe and secure is My Drivemate?",
                answer: "We prioritize your safety with verified profiles, secure payment processing, emergency contacts, real-time trip tracking, and a comprehensive rating system for all users."
              },
              {
                icon: DollarSign,
                question: "How does the pricing and payment work?",
                answer: "Drivers set their own price per seat based on distance and fuel costs. Passengers pay securely through the app using multiple payment methods. No cash exchanges needed!"
              },
              {
                icon: MessageCircle,
                question: "Can I cancel or modify my ride booking?",
                answer: "Yes, both drivers and passengers can cancel rides through the app. We recommend canceling at least 2 hours before departure to be considerate to other participants."
              },
              {
                icon: Clock,
                question: "What if I'm running late or there's an emergency?",
                answer: "Use our in-app messaging and calling features to communicate with your ride partners. For emergencies, contact our 24/7 support line or use the emergency button in the app."
              },
              {
                icon: Globe,
                question: "In which cities is My Drivemate available?",
                answer: "Currently launching in major Indian cities with plans to expand nationwide. Check the app for availability in your area, and sign up for updates on new city launches."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-blue-900 text-white flex-shrink-0">
                    <faq.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Carpooling?</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of users who are saving money, reducing their carbon footprint, 
              and making meaningful connections through My Drivemate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:deepakjadon1907@gmail.com"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all duration-200 flex items-center justify-center"
              >
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;