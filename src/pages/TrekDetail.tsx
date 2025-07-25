import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [isWaitlisted, setIsWaitlisted] = useState(false);
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on ID
  const treks = [
    {
      id: 1,
      name: 'Annapurna Base Camp Trek',
      location: 'Nepal',
      difficulty: 'Moderate',
      duration: '12-14 days',
      maxAltitude: '4,130m',
      bestSeason: 'Oct-Nov, Mar-May',
      price: '$1,200',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Experience the majestic Annapurna massif with stunning mountain views, diverse landscapes, and rich cultural encounters.',
      highlights: ['Stunning mountain panoramas', 'Cultural villages', 'Hot springs at Jhinu Danda'],
      currentConditions: 'Good trail conditions',
      weather: 'Clear skies, -5°C to 15°C',
    },
    {
      id: 2,
      name: 'Everest Base Camp Trek',
      location: 'Nepal',
      difficulty: 'Moderate',
      duration: '14-16 days',
      maxAltitude: '5,364m',
      bestSeason: 'Mar-May, Sep-Nov',
      price: '$1,500',
      rating: 4.9,
      reviews: 200,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Trek through the Sherpa villages and high passes to the base camp of the world\'s highest peak.',
      highlights: ['Views of Everest and Lhotse', 'Cultural interaction with Sherpas', 'High altitude acclimatization'],
      currentConditions: 'Good trail conditions',
      weather: 'Clear skies, -10°C to 10°C',
    },
    {
      id: 3,
      name: 'Langtang Valley Trek',
      location: 'Nepal',
      difficulty: 'Easy',
      duration: '7-9 days',
      maxAltitude: '3,400m',
      bestSeason: 'Oct-Nov, Mar-May',
      price: '$800',
      rating: 4.6,
      reviews: 100,
      image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Explore the beautiful Langtang valley, home to the Tamang people and their traditional culture.',
      highlights: ['Beautiful alpine meadows', 'Tamang villages', 'Hot springs at Langtang'],
      currentConditions: 'Good trail conditions',
      weather: 'Clear skies, -5°C to 15°C',
    },
  ];
  // Use the id param to select the correct trek
  const trek = treks.find(t => t.id === Number(id)) || treks[0];

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

  // Dummy nearest homestay (replace with real logic if available)
  const nearestHomestay = { id: 1, name: 'Annapurna Homestay', distance: '10km' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={trek.image}
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Trek Overview</h2>
                  <Button
                    onClick={() => navigate(`/trek/${trek.id}/route`)}
                    className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform border-2 border-white/60"
                    style={{ minWidth: 'fit-content' }}
                  >
                    <svg className="inline-block mr-2 -mt-1" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 19V6m0 0l-7 7m7-7l7 7"/></svg>
                    View Route
                  </Button>
                </div>
                <div className="relative w-full h-6 mb-6 -mt-2">
                  <svg className="absolute left-0 w-full h-full" viewBox="0 0 400 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,12 Q100,24 200,12 T400,12" fill="none" stroke="url(#greenWave)" strokeWidth="4"/>
                    <defs>
                      <linearGradient id="greenWave" x1="0" y1="0" x2="400" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#22c55e" />
                        <stop offset="1" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
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
                        <div className="font-medium">{trek.weather}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Thermometer className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Temperature</div>
                        <div className="font-medium">{trek.weather.split(',')[0].replace('-', '')}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Visibility</div>
                        <div className="font-medium">Excellent mountain views</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mountain className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Trail Conditions</div>
                        <div className="font-medium">{trek.currentConditions}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Last updated: 2 hours ago
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
                        <Button variant="ghost" className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{message.upvotes}</span>
                        </Button>
                        <Button variant="ghost" className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                          <ThumbsDown className="h-4 w-4" />
                          <span>{message.downvotes}</span>
                        </Button>
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
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold shadow-lg transition-all duration-200"
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
                  {/* This section needs to be updated based on the new trek structure */}
                  {/* For now, keeping the original structure but it might need adjustment */}
                  <li className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Sleeping bag (-10°C rating)</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Insulated jacket</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Waterproof jacket and pants</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Trekking boots</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Trekking poles</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Headlamp with extra batteries</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Sun hat and sunglasses</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">First aid kit</span>
                  </li>
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

            {nearestHomestay && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2 text-primary-700">Nearest Homestay</h3>
                <Button
                  onClick={() => navigate(`/homestays?highlight=${nearestHomestay.id}`)}
                  className="mb-4"
                >
                  View Nearest Homestay
                </Button>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <Button onClick={() => navigate(`/trek/${trek.id}/route`)} className="self-start mb-4">
                View Route
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};