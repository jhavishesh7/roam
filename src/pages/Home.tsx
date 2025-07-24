import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Home as HomeIcon, 
  MessageCircle, 
  AlertTriangle,
  Star,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Home: React.FC = () => {
  // Example gallery images
  const galleryImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  ];

  // Add state for selected background image
  const [selectedBg, setSelectedBg] = useState(galleryImages[0]);
  // Add state for animating background image
  const [bgAnimKey, setBgAnimKey] = useState(0);

  const featuredTreks = [
    {
      id: 1,
      name: 'Annapurna Base Camp',
      location: 'Nepal',
      difficulty: 'Moderate',
      duration: '12-14 days',
      image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      name: 'Torres del Paine',
      location: 'Chile',
      difficulty: 'Challenging',
      duration: '8-10 days',
      image: 'https://images.pexels.com/photos/1437297/pexels-photo-1437297.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Mount Kilimanjaro',
      location: 'Tanzania',
      difficulty: 'Hard',
      duration: '6-8 days',
      image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      reviews: 203,
    },
  ];

  // Add state for search input and filtered treks
  const [search, setSearch] = useState('');
  const [filteredTreks, setFilteredTreks] = useState(featuredTreks);

  // Handle search
  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredTreks(featuredTreks);
      return;
    }
    setFilteredTreks(
      featuredTreks.filter(trek =>
        trek.name.toLowerCase().includes(search.toLowerCase()) ||
        trek.location.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  // When selectedBg changes, update animation key
  useEffect(() => {
    setBgAnimKey((k) => k + 1);
  }, [selectedBg]);

  // Parallax effect
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setParallax(Math.max(0, -rect.top * 0.3));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Trek Discovery',
      description: 'Search and explore detailed information about treks with difficulty levels, weather conditions, and route maps.',
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'Community Forums',
      description: 'Connect with fellow trekkers, share experiences, and get real-time updates from recent adventurers.',
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: 'Emergency Alerts',
      description: 'Stay safe with our emergency broadcast system that alerts waitlisted users and provides SOS features.',
    },
    {
      icon: <HomeIcon className="h-8 w-8" />,
      title: 'Local Homestays',
      description: 'Discover authentic cultural experiences with local homestays and immersive cultural packages.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-sans">
      {/* Hero Section with Parallax and Glassy Overlay */}
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-between overflow-hidden rounded-b-3xl shadow-lg px-4 md:px-16">
        {/* Parallax Background Image with crazy animation */}
        <AnimatePresence mode="wait">
          <motion.img
            key={bgAnimKey}
            src={selectedBg}
            alt="Trek Adventure"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ transform: `translateY(${parallax}px) scale(1.08)` }}
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(16px) grayscale(1)' }}
            animate={{ opacity: 1, scale: 1.08, filter: 'blur(0px) grayscale(0)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(32px) grayscale(1)' }}
            transition={{ duration: 0.9, ease: [0.4, 0.8, 0.2, 1] }}
          />
        </AnimatePresence>
        {/* Parallax Layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-primary-600/60 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent z-20 pointer-events-none" />
        {/* Content - align left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-30 flex flex-col items-start text-left px-4 pt-32 w-full max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
            Explore <span className="text-primary-300 animate-pulse">Epic Treks</span> & Adventures
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl font-medium animate-fadeInUp">
            Discover breathtaking destinations, connect with trekkers, and plan your next journey with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-8">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for treks, destinations, or experience..."
              className="flex-1 px-5 py-4 rounded-xl border border-white/30 bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300 text-lg shadow animate-fadeInUp"
            />
            <Button
              className="px-10 py-4 text-lg rounded-xl text-white font-bold shadow-xl transition-all duration-200 border-0 flex items-center gap-2"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 text-white" /> Search
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="primary" className="rounded-full px-8 py-3 text-lg font-semibold shadow-md animate-glow">
              Find Your Trek
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-3 text-lg font-semibold border-2 border-white text-white hover:bg-white/10 shadow-md animate-glow">
              Get Safety Alerts
            </Button>
          </div>
        </motion.div>
        {/* Parallax Gallery - align right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-8 right-8 flex gap-6 z-30 bg-white/70 rounded-2xl px-6 py-3 shadow-xl backdrop-blur-md"
          style={{ transform: `translateY(${parallax * 0.5}px)` }}
        >
          {galleryImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Trek Gallery ${idx + 1}`}
              className={`w-28 h-20 object-cover rounded-xl border-2 border-white shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer ${selectedBg === img ? 'ring-4 ring-primary-400' : ''}`}
              onClick={() => setSelectedBg(img)}
            />
          ))}
        </motion.div>
      </section>
      {/* Features Section - glassy, animated cards */}
      <section className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-glass border border-primary-100 p-10 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            <div className="mb-6 text-primary-500 text-4xl bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-blue-900 tracking-tight">{feature.title}</h3>
            <p className="text-gray-500 text-lg font-medium">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Treks Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Treks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most popular and breathtaking trekking destinations around the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreks.map((trek, index) => (
              <motion.div
                key={trek.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={trek.image}
                      alt={trek.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
                      {trek.difficulty}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {trek.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{trek.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{trek.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{trek.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{trek.reviews} reviews</span>
                      </div>
                      <Button size="sm">
                        <Link to={`/trek/${trek.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              <Link to="/treks">View All Treks</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
        {/* Animated floating shapes (optional, keep for depth) */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary-400 opacity-30 rounded-full blur-3xl z-0"
          animate={{ y: [0, 40, 0], x: [0, 20, 0], rotate: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 right-0 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-2xl z-0"
          animate={{ y: [0, -30, 0], x: [0, -20, 0], rotate: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight animate-glow">
              Ready to <span className="text-primary-200 animate-pulse">Start Your Adventure?</span>
            </h2>
            <p className="text-2xl text-primary-100 mb-10 max-w-2xl mx-auto animate-fadeInUp">
              Join thousands of trekkers who trust <span className="font-bold text-white">TrekSphere</span> for their mountain adventures.<br/>
              Start planning your next trek today.
            </p>
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Button size="lg" variant="secondary" className="text-lg px-10 py-5 rounded-full font-bold shadow-2xl animate-flicker bg-primary-600 border-0">
                <Link to="/auth">Get Started Now 🚀</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};