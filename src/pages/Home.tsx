import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Shield, 
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Ultimate
              <span className="block text-accent-400">Trekking Companion</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Discover breathtaking treks, connect with local communities, and explore 
              authentic cultural experiences with safety at every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Link to="/treks">Explore Treks</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">
                <Link to="/auth">Join Community</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TrekSphere?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need for safe, memorable, and culturally rich trekking experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="p-6 text-center h-full">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary-600">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
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
            {featuredTreks.map((trek, index) => (
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
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of trekkers who trust TrekSphere for their mountain adventures. 
              Start planning your next trek today.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Link to="/auth">Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};