import React, { useEffect, useState } from 'react';
import {  Routes, Route, Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { Youtube, Music, Instagram, HelpCircle, FileText, Users, Tags, Sun, Moon, DollarSign, User, Save } from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { FormStorageManager } from './components/FormStorageManager';
import Dashboard from './pages/Dashboard';
import Support from './pages/Support';
import Legal from './pages/Legal';
import MyArtists from './pages/MyArtists';
import Labels from './pages/Labels';
import CallerTune from './pages/CallerTune';
import ReleaseVideo from './pages/ReleaseVideo';
import ReleaseMusic from './pages/ReleaseMusic';
import CreateRelease from './pages/CreateRelease';
import Finance from './pages/Finance';
import UserProfile from './pages/UserProfile';

// Mock user data - in a real app, this would come from authentication context
const currentUser = {
  firstName: 'Pintu',
  lastName: 'Kumar',
  email: 'pintu.kumar@example.com',
  profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  initials: 'PK'
};

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-blue-600 hover:text-blue-700 transition-colors" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500 hover:text-yellow-400 transition-colors" />
      )}
    </button>
  );
}

function UserAvatar() {
  const navigate = useNavigate();
  
  const handleAvatarClick = () => {
    navigate('/user-profile');
  };

  return (
    <div 
      onClick={handleAvatarClick}
      className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105 group border-2 border-white dark:border-gray-700"
      title={`${currentUser.firstName} ${currentUser.lastName} - Click to view profile`}
    >
      {currentUser.profilePhoto ? (
        <img
          src={currentUser.profilePhoto}
          alt={`${currentUser.firstName} ${currentUser.lastName}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <span 
        className={`text-white font-bold text-lg ${currentUser.profilePhoto ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
        style={{ display: currentUser.profilePhoto ? 'none' : 'flex' }}
      >
        {currentUser.initials}
      </span>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFormManager, setShowFormManager] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { name: 'Dashboard', path: '/cms', icon: null },
    { name: 'Release Music', path: '/cms/release-music', icon: Music },
    { name: 'Release Video', path: '/cms/release-video', icon: Youtube },
    { name: 'Caller Tune', path: '/cms/caller-tune', icon: null },
    { name: 'Finance', path: '/cms/finance', icon: DollarSign },
    { name: 'Service Request', path: '/cms/service-request', icon: null },
    { name: 'Labels', path: '/cms/labels', icon: Tags },
    { name: 'My Artists', path: '/cms/my-artists', icon: Users },
    { name: 'User Profile', path: '/cms/user-profile', icon: User },
    { name: 'Legal', path: '/cms/legal', icon: FileText },
    { name: 'Support', path: '/cms/support', icon: HelpCircle }
  ];

  const handleCreate = () => {
    navigate('/cms/create-release');
  };

  return (
    <>
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-8">
          <UserAvatar />
          <div className="flex-1">
            <h1 className="text-xl font-semibold dark:text-white">PrDigitalCms</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              Welcome, {currentUser.firstName}
            </p>
          </div>  
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:from-pink-600 hover:to-red-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <span className="text-lg">+</span> Create 
          </button>
          
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-400 shadow-md border border-blue-200 dark:border-blue-800'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:scale-105'
              }`}
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button
            onClick={() => setShowFormManager(true)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Form Data Manager
          </button>
          <ThemeToggle />
        </div>
      </div>

      <FormStorageManager 
        isOpen={showFormManager}
        onClose={() => setShowFormManager(false)}
      />
    </>
  );
}

function DashboardApp() {
  const token = localStorage.getItem('token')
   const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  }, [localStorage.getItem('token')])
  

  return (
    <ThemeProvider>
      <>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Sidebar />
          <div className="ml-64">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/support" element={<Support />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/my-artists" element={<MyArtists />} />
              <Route path="/labels" element={<Labels />} />
              <Route path="/caller-tune" element={<CallerTune />} />
              <Route path="/release-video" element={<ReleaseVideo />} />
              <Route path="/release-music" element={<ReleaseMusic />} />
              <Route path="/create-release" element={<CreateRelease />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/user-profile" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default DashboardApp;