import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Pricing from './pages/Dashboard';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Marquee from './components/Marquee';
import { ServicesSection } from './components/ServicesSection';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ReleaseMusic from './Dashboard/pages/ReleaseVideo';
import ReleaseForm from "./ReleaseForm";

import Support from './pages/Support';

// ✅ FIX: Add this line if missing
import { AuthProvider } from './context/AuthContext'; // adjust path if needed

function WebsiteApp() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />

            {/* 🔒 Protected Route */}
            <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <ThemeToggle />
      </div>
    </AuthProvider>
  );
}

export default WebsiteApp;
