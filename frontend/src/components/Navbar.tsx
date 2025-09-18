import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  

  return (
    <nav className="fixed w-full z-50 bg-black/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://i.pinimg.com/736x/39/18/e5/3918e55645680ff6443f09c6ebad18cb.jpg"
              alt="PR Digital CMS Logo" 
              className="h-12 w-12rounded-full"
            />
            <span className="text-white text-2xl font-bold">PR DIGITAL CMS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
            <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
            <Link to="/about" className="text-white hover:text-gray-300">About</Link>
            <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
            {/* <Link
              to="/login"
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Sign Up
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-black"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-white hover:bg-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-white hover:bg-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-white hover:bg-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-white hover:bg-gray-900"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-white hover:bg-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-white bg-gray-900 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}