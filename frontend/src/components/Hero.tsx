import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Pricing from '../pages/Dashboard';
import YouTube from 'react-youtube';
import { a, link } from 'framer-motion/client';
import Marquee from '../components/Marquee';



export default function Hero() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black flex items-center justify-center overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <div className="relative h-full">
          {/* Wave Animation */}
          {/* <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
            <defs>
              <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use href="#wave" x="48" y="0" fill="rgba(0,0,0,0.7)" className="dark:fill-white/70" />
              <use href="#wave" x="48" y="3" fill="rgba(0,0,0,0.5)" className="dark:fill-white/50" />
              <use href="#wave" x="48" y="5" fill="rgba(0,0,0,0.3)" className="dark:fill-white/30" />
              <use href="#wave" x="48" y="7" fill="rgba(0,0,0,0.2)" className="dark:fill-white/20" />
            </g>
          </svg> */}
          <img className="w-screen h-screen object-cover object-center" src="https://i.pinimg.com/736x/55/ec/a1/55eca19939887886c4207ea61a2b0d95.jpg" alt="" />


        </div>
        <Marquee />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8 }}
           className="text-5xl md:text-7xl font-bold font-display bg-gradient-to-r from-white via-white-10 to-white bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300 transform-gpu animate-gradient-x text-center mb-12">



          
        
        
      <br />   <br /> Unlimited Distribution <br />  <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-aqua-600 mt-5 py-2">
  Artist / Label
</h2>
 <br />
          

          Get Your Own Deshboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white-600 dark:text-pink-600 mb-12 max-w-3xl mx-auto"
        >
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          
        ><div className="flex justify-end gap-4 mt-7">
        <a href="https://www.prdigitalcms.in/pricing">
  <button className="bg-blue-600 text-white px-4 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors">
    Get Started
  </button>
</a>

        <a
  href="https://youtu.be/l9ltbUY6EaY?si=v6vtsVs-ZWGR4eMG" // Replace with the actual YouTube link
  target="_blank" // Opens the link in a new tab
  rel="noopener noreferrer" // Security feature to prevent tabnabbing
  className="flex items-center gap-2 bg-gray-900 dark:bg-gray-800 text-white px-4 py-4 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
>
  <Play className="w-6 h-6" /> {/* Assuming you're using an icon component */}
  Watch Demo
</a>
      </div>
        </motion.div>
        <Marquee />
      </div>
    </div>
    
  );
}
