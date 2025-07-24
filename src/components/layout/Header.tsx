import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mountain, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Try to get profile image from localStorage
  let profilePic = '';
  try {
    profilePic = localStorage.getItem('profilePic') || '';
  } catch {}

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/treks' },
    { name: 'Homestays', href: '/homestays' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'AI_tools', href: '/ai_tools' },
    { name: 'Subscriptions', href: '/subscriptions' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 font-sans z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Mountain className="h-8 w-8 text-primary-500" />
          <span className="text-2xl font-extrabold text-primary-600 tracking-tight">TrekSphere</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-dark hover:text-primary-500 font-medium transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-primary-50 text-base"
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <button
              className="ml-4 flex items-center gap-2 px-2 py-1 rounded-full bg-white/80 border-2 border-primary-200 shadow hover:shadow-lg transition-all"
              onClick={() => navigate('/dashboard?tab=profile')}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <img
                src={profilePic || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-300 bg-white"
              />
              <span className="hidden lg:inline text-primary-700 font-semibold">Profile</span>
            </button>
          ) : (
            <Button
              className="ml-4 px-6 py-2 rounded-full font-semibold text-white shadow-xl transition-all duration-200 border-0 text-lg flex items-center gap-2"
              onClick={() => navigate('/auth')}
              style={{ boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
            >
              <Mountain className="h-5 w-5 text-white" /> Start Your Journey
            </Button>
          )}
        </div>
        {/* Mobile Menu Button */}
        <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-dark hover:text-primary-500 transition-colors">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-blue-100 py-4 bg-white/95 rounded-b-2xl shadow-lg"
          >
            <div className="flex flex-col space-y-4 px-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-dark hover:text-primary-500 font-medium transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-primary-50 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <button
                  className="mt-2 flex items-center gap-2 px-2 py-1 rounded-full bg-white/80 border-2 border-primary-200 shadow hover:shadow-lg transition-all"
                  onClick={() => { setIsMenuOpen(false); navigate('/dashboard?tab=profile'); }}
                  style={{ minWidth: 44, minHeight: 44 }}
                >
                  <img
                    src={profilePic || '/default-avatar.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-300 bg-white"
                  />
                  <span className="text-primary-700 font-semibold">Profile</span>
                </button>
              ) : (
                <Button
                  className="mt-2 px-6 py-2 rounded-full font-semibold text-white shadow-xl transition-all duration-200 border-0 text-lg flex items-center gap-2"
                  onClick={() => { setIsMenuOpen(false); navigate('/auth'); }}
                  style={{ boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
                >
                  <Mountain className="h-5 w-5 text-white" /> Start Your Journey
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};