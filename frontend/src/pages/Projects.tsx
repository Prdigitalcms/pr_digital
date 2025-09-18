import React from 'react';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { Play } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';

const projects = [
  {
    title: "Studio Production",
    description: "Professional recording studio sessions with top-tier equipment",
    image: "https://images.unsplash.com/photo-1598488035139-bdaa7543d5d6?auto=format&fit=crop&q=80&w=2070",
    views: "2.5M"
  },
  {
    title: "Live Performance",
    description: "Capturing the energy of live music events",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=2070",
    views: "1.8M"
  },
  {
    title: "Music Video Production",
    description: "Creating stunning visuals for your music",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=2070",
    views: "3.2M"
  }
];

const featuredVideos = [
  { id: 'dQw4w9WgXcQ', title: 'Featured Artist 1' },
  { id: 'JGwWNGJdvx8', title: 'Featured Artist 2' },
  { id: 'kJQP7kiw5Fk', title: 'Featured Artist 3' }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-24 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Our Latest{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Discover our most successful music productions and collaborations
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200 mb-4">{project.description}</p>
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">{project.views} views</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Videos Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Music Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <YouTube
                videoId={video.id}
                opts={{
                  height: '200',
                  width: '100%',
                  playerVars: {
                    autoplay: 0,
                  },
                }}
                className="w-full"
              />
              <div className="p-4 bg-gray-100 dark:bg-gray-800">
                <h3 className="text-lg font-semibold">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}