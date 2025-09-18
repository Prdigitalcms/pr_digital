import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, YoutubeIcon } from 'lucide-react';
import YouTube from 'react-youtube';
import { ThemeProvider } from './contexts/ThemeContext';


export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Learn About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Learn About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/OUR TEAM" className="text-gray-400 hover:text-white">Leadership</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/signup" className="text-gray-400 hover:text-white">Create Account</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Our Services</Link></li>
              <li><Link to="/client-services" className="text-gray-400 hover:text-white">Client Services</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="https://www.facebook.com/people/Digital-Pintu-Yadav/61563808907174/?mibextid=ZbWKwL" className="text-gray-400 hover:text-white" target='_blank'>Facebook</a></li>
              <li><a href="https://x.com/digitalpintu_" className="text-gray-400 hover:text-white" target='_blank'>X (Formerly Twitter)</a></li>
              <li><a href="https://www.instagram.com/digitalpintuyadav/#" className="text-gray-400 hover:text-white" target='_blank'>Instagram</a></li>
            </ul>
          </div>

          {/* Account Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account Services</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © PR DIGITAL CMS. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/share/18X6TNEBiJ/" className="text-gray-400 hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://x.com/digitalpintu_" className="text-gray-400 hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/pintuyadavofficial1" className="text-gray-400 hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@pintuyadav-j5q" className="text-gray-400 hover:text-white">
              <YoutubeIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}