import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Star, 
  Bookmark,
  AlertTriangle,
  MessageCircle,
  Home as HomeIcon,
  TrendingUp
} from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const quickStats = [
    { label: 'Treks Completed', value: '12', icon: <MapPin className="h-5 w-5" />, color: 'text-primary-600' },
    { label: 'Days Trekking', value: '89', icon: <Calendar className="h-5 w-5" />, color: 'text-accent-600' },
    { label: 'Average Rating', value: '4.8', icon: <Star className="h-5 w-5" />, color: 'text-yellow-600' },
    { label: 'Badges Earned', value: '7', icon: <TrendingUp className="h-5 w-5" />, color: 'text-sage-600' },
  ];

  const recentActivity = [
    {
      type: 'trek_completed',
      title: 'Completed Annapurna Base Camp',
      time: '2 days ago',
      icon: <MapPin className="h-5 w-5 text-primary-600" />,
    },
    {
      type: 'review_posted',
      title: 'Posted review for Himalayan Homestay',
      time: '1 week ago',
      icon: <Star className="h-5 w-5 text-yellow-600" />,
    },
    {
      type: 'forum_post',
      title: 'Shared trail conditions for Torres del Paine',
      time: '2 weeks ago',
      icon: <MessageCircle className="h-5 w-5 text-sage-600" />,
    },
  ];

  const upcomingTreks = [
    {
      id: 1,
      name: 'Mount Kilimanjaro',
      location: 'Tanzania',
      date: '2025-03-15',
      difficulty: 'Hard',
      image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Everest Base Camp',
      location: 'Nepal',
      date: '2025-04-20',
      difficulty: 'Challenging',
      image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const savedTreks = [
    {
      id: 3,
      name: 'Torres del Paine W Circuit',
      location: 'Chile, Patagonia',
      difficulty: 'Moderate',
      duration: '5-6 days',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Mont Blanc Circuit',
      location: 'France, Italy, Switzerland',
      difficulty: 'Challenging',
      duration: '10-11 days',
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'Trekker'}!
          </h1>
          <p className="text-gray-600">Ready for your next adventure? Let's explore the mountains.</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trek Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Discover New Treks</h2>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search for treks, locations, or difficulty levels..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      icon={<Search className="h-5 w-5" />}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button>Search</Button>
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Treks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Treks</h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {upcomingTreks.map((trek) => (
                    <div key={trek.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={trek.image}
                        alt={trek.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{trek.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{trek.location}</span>
                        </p>
                        <p className="text-sm text-gray-600 flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(trek.date).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          trek.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                          trek.difficulty === 'Challenging' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {trek.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Emergency Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 border-accent-200 bg-accent-50">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-accent-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Emergency System</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Stay connected with fellow trekkers. Use the emergency broadcast system to alert others on your waitlisted treks.
                </p>
                <Button variant="secondary" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Broadcast
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Saved Treks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Saved Treks</h2>
                  <Bookmark className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {savedTreks.map((trek) => (
                    <div key={trek.id} className="space-y-2">
                      <h3 className="font-medium text-gray-900 text-sm">{trek.name}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{trek.location}</span>
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{trek.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{trek.duration}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          trek.difficulty === 'Challenging' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {trek.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <HomeIcon className="h-4 w-4 mr-3" />
                    Find Homestays
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-3" />
                    Join Forum
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-3" />
                    Plan New Trek
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};