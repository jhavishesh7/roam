import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Mountain, 
  Calendar,
  Star,
  Users,
  AlertTriangle,
  MessageCircle,
  Heart,
  Share2,
  Thermometer,
  CloudRain,
  Wind,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const TrekDetail: React.FC = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [isWaitlisted, setIsWaitlisted] = useState(false);

  // Mock data - in real app, fetch based on ID
  const trek = {
    id: 1,
    name: 'Annapurna Base Camp Trek',
    location: 'Nepal, Himalayas',
    difficulty: 'Moderate',
    duration: '12-14 days',
    maxAltitude: '4,130m',
    bestSeason: 'Oct-Nov, Mar-May',
    price: '$1,200',
    rating: 4.8,
    reviews: 156,
    images: [
      'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'The Annapurna Base Camp trek is one of Nepal\'s most popular trekking routes, offering stunning mountain views, diverse landscapes, and rich cultural encounters. This moderate trek takes you through rhododendron forests, traditional Gurung villages, and alpine meadows before reaching the spectacular amphitheater of peaks at Annapurna Base Camp.',
    highlights: [
      'Stunning 360-degree mountain panoramas at ABC',
      'Cultural immersion in traditional Gurung villages',
      'Hot springs at Jhinu Danda for relaxation',
      'Diverse ecosystems from subtropical to alpine',
      'Views of Annapurna I, Machapuchare, and Hiunchuli',
    ],
    itinerary: [
      { day: 1, title: 'Drive to Pokhara, trek to Ulleri', elevation: '2,070m' },
      { day: 2, title: 'Trek to Ghorepani', elevation: '2,874m' },
      { day: 3, title: 'Poon Hill sunrise, trek to Tadapani', elevation: '2,630m' },
      { day: 4, title: 'Trek to Chhomrong', elevation: '2,170m' },
      { day: 5, title: 'Trek to Dovan', elevation: '2,600m' },
      { day: 6, title: 'Trek to Deurali', elevation: '3,230m' },
      { day: 7, title: 'Trek to Annapurna Base Camp', elevation: '4,130m' },
    ],
    equipment: [
      'Sleeping bag (-10°C rating)',
      'Insulated jacket',
      'Waterproof jacket and pants',
      'Trekking boots',
      'Trekking poles',
      'Headlamp with extra batteries',
      'Sun hat and sunglasses',
      'First aid kit',
    ],
    currentConditions: {
      weather: 'Clear skies with afternoon clouds',
      temperature: '-5°C to 15°C',
      visibility: 'Excellent mountain views',
      trails: 'Good condition, some ice on high passes',
      lastUpdated: '2 hours ago',
    },
  };

  const forumMessages = [
    {
      id: 1,
      user: 'MountainExplorer',
      time: '3 hours ago',
      message: 'Just completed this trek yesterday! The views from ABC are absolutely breathtaking. Weather was perfect with clear skies in the morning.',
      upvotes: 12,
      downvotes: 0,
      helpful: true,
    },
    {
      id: 2,
      user: 'TrekkerSarah',
      time: '1 day ago',
      message: 'Be prepared for cold nights at higher elevations. Brought a -15°C sleeping bag and was still chilly. Hot tea at the teahouses is a lifesaver!',
      upvotes: 8,
      downvotes: 1,
      helpful: true,
    },
    {
      id: 3,
      user: 'AdventureJoe',
      time: '2 days ago',
      message: 'Trail conditions are good but there\'s some ice early morning on the path from Deurali to ABC. Microspikes recommended for safety.',
      upvotes: 15,
      downvotes: 0,
      helpful: true,
    },
  ];

  const handleEmergencyAlert = () => {
    // In real app, this would send alerts to waitlisted users
    alert('Emergency alert sent to all waitlisted trekkers for this route!');
  };

  const handleWaitlistToggle = () => {
    setIsWaitlisted(!isWaitlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={trek.images[0]}
          alt={trek.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{trek.name}</h1>
              <div className="flex items-center space-x-6 text-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{trek.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{trek.rating} ({trek.reviews} reviews)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trek Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Trek Overview</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{trek.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold">{trek.duration}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Mountain className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Max Altitude</div>
                    <div className="font-semibold">{trek.maxAltitude}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Best Season</div>
                    <div className="font-semibold">{trek.bestSeason}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className="font-semibold">{trek.difficulty}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Trek Highlights</h3>
                  <ul className="space-y-2">
                    {trek.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>

            {/* Current Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6 border-l-4 border-l-sage-500">
                <div className="flex items-center space-x-2 mb-4">
                  <Thermometer className="h-6 w-6 text-sage-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Current Conditions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CloudRain className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Weather</div>
                        <div className="font-medium">{trek.currentConditions.weather}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Thermometer className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Temperature</div>
                        <div className="font-medium">{trek.currentConditions.temperature}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Visibility</div>
                        <div className="font-medium">{trek.currentConditions.visibility}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mountain className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Trail Conditions</div>
                        <div className="font-medium">{trek.currentConditions.trails}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Last updated: {trek.currentConditions.lastUpdated}
                </div>
              </Card>
            </motion.div>

            {/* Discussion Forum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <MessageCircle className="h-6 w-6 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Discussion Forum</h2>
                </div>

                {/* Post Message */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Share your experience or ask questions about this trek..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Forum Messages */}
                <div className="space-y-4">
                  {forumMessages.map((message) => (
                    <div key={message.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {message.user[0]}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{message.user}</span>
                          <span className="text-sm text-gray-500">{message.time}</span>
                        </div>
                        {message.helpful && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Helpful
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3">{message.message}</p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{message.upvotes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                          <ThumbsDown className="h-4 w-4" />
                          <span>{message.downvotes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{trek.price}</div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button 
                    className="w-full" 
                    onClick={handleWaitlistToggle}
                    variant={isWaitlisted ? "outline" : "primary"}
                  >
                    {isWaitlisted ? (
                      <>
                        <Heart className="h-4 w-4 mr-2 fill-current" />
                        Remove from Waitlist
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 mr-2" />
                        Add to Waitlist
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Trek
                  </Button>
                </div>

                {/* Emergency Alert */}
                <div className="border-t pt-6">
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={handleEmergencyAlert}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency Broadcast
                  </Button>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    Sends alert to all waitlisted users
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Equipment List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Essential Equipment</h3>
                <ul className="space-y-2">
                  {trek.equipment.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary-50 to-sage-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Trek Summary</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Based on recent community feedback and current conditions, this trek offers excellent 
                  mountain views with moderate difficulty. Weather conditions are currently favorable 
                  with clear morning skies.
                </p>
                <div className="text-xs text-gray-600">
                  Generated by Gemini AI • Updated hourly
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};