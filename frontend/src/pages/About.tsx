import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Users } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';


const stats = [
  { number: '150+', label: 'Digital Platforms', icon: Globe },
  { number: '1M+', label: 'Content Creators', icon: Users },
  { number: '10+', label: 'Years Experience', icon: Award }
];

export default function About() {
 
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Toggle Button */}
     

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          About{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
            PR DIGITAL CMS
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
        >
          PR DIGITAL CMS is the leading independent development partner for content creators, helping build audiences and careers through technology and services across distribution, publishing administration, and promotional services.
        </motion.p>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 text-center hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
              <p className="text-gray-700 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6"
        >
          Our{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
            Mission
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
        >
          PR DIGITAL CMS's mission is to best serve content creators and brands in the early stages of their development in the digital ecosystem, with fairness, expertise, respect and transparency.
        </motion.p>
      </div>
    </div>
  );
}
