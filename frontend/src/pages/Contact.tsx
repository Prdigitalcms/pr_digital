import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';



export default function Contact() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      {/* Toggle Button */}
    
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Can't find what you're looking for? Send your question to our Support team
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl text-center"
          >
            <Mail className="w-8 h-8 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-gray-700 dark:text-gray-400">prdigitalcms@gmail.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl text-center"
          >
            <Phone className="w-8 h-8 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">Call Us:-7366042410 </h3>
            <p className="text-gray-700 dark:text-gray-400">Monday-Friday: 10am-6pm (ET)</p>
            <p className="text-gray-700 dark:text-gray-400">Saturday-Sunday: 12pm-7pm (ET)</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl text-center"
          >
            <MessageSquare className="w-8 h-8 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">Live Chat</h3>
            <p className="text-gray-700 dark:text-gray-400">Available during business hours</p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Submit Request
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
