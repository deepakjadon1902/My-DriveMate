
import React from 'react';
import { 
  Car, Users, Heart, Target, Lightbulb, Award, Mail, 
  Shield, Zap, Globe, CheckCircle, Star
} from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety & Trust",
      description: "Built with user safety and transparency in mind, ensuring trust in every connection."
    },
    {
      icon: Zap,
      title: "Simple & Free",
      description: "No hidden charges. A completely free platform designed for everyone."
    },
    {
      icon: Heart,
      title: "Community Spirit",
      description: "Connecting people, sharing rides, and making travel a collective experience."
    },
    {
      icon: Globe,
      title: "Sustainable Future",
      description: "Promoting eco-friendly shared mobility to reduce costs, traffic, and pollution."
    }
  ];

  const milestones = [
    { year: "2023", title: "Vision Born", description: "Started as my individual idea to solve travel challenges." },
    { year: "2024", title: "First Prototype", description: "Developed core ride-sharing features and tested with peers." },
    { year: "2025", title: "Going Public", description: "Launching free for everyone – no limits, just shared journeys." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            My Drivemate – 
            <span className="block bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
              A Free Vision for Shared Travel
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            A personal project by <strong>Deepak Jadon</strong>, designed to make travel 
            affordable, sustainable, and community-driven. Free for everyone, with no limits. 
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Lightbulb className="w-4 h-4" />
                My Story
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                A Student’s Vision, A Free Platform
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  My Drivemate started as my personal initiative during my time at 
                  <strong> GLA University</strong>, when I saw the difficulties of expensive rides, 
                  traffic congestion, and lack of affordable transport options.
                </p>
                <p>
                  Instead of just another app, I wanted to create a free solution — a platform that 
                  connects people, reduces costs, and makes travel sustainable for everyone. 
                </p>
                <p>
                  This is not a company project, but an **individual passion project**, created to 
                  showcase how technology can solve real-world problems.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Completely Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Personal Vision</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">My Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To design a free carpooling ecosystem that is simple, safe, 
                  and sustainable — empowering people to share rides without barriers. 
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">My Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  A future where technology-driven shared mobility is available to all, 
                  reducing costs, traffic, and environmental impact — without limitations. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide me as I build My Drivemate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth story</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && <div className="w-0.5 h-20 bg-gray-300 mt-4"></div>}
                </div>
                <div className="flex-1 pb-12">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 text-sm font-semibold rounded-full">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">About the Developer</h2>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">Deepak Jadon</h3>
                
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    Full-Stack Developer
                  </span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium">
                    GLA University
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    Computer Science Student
                  </span>
                </div>
              </div>
              
              <blockquote className="text-lg text-gray-700 leading-relaxed text-center mb-8 italic">
                "Technology should always serve people. My Drivemate is my vision of 
                free, impactful, and sustainable mobility for everyone."
              </blockquote>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-blue-900" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Innovation</h4>
                  <p className="text-gray-600 text-sm">Exploring new ideas in shared mobility</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-blue-900" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Passion</h4>
                  <p className="text-gray-600 text-sm">Driven by solving real-world problems</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-blue-900" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Commitment</h4>
                  <p className="text-gray-600 text-sm">Always striving for quality</p>
                </div>
              </div>
              
              <div className="text-center">
                <a 
                  href="mailto:deepakjadon1907@gmail.com"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Be Part of This Vision
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            My Drivemate is not about numbers — it’s about creating an open, 
            free, and impactful travel solution for everyone.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
