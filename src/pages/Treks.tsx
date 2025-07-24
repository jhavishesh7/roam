import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  Users,
  Mountain,
  Calendar,
  Thermometer,
  AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Treks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const navigate = useNavigate();

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
      name: 'Langtang Valley Trek',
      location: 'Nepal',
      difficulty: 'Moderate',
      duration: '7-9 days',
      maxAltitude: '4,984m',
      bestSeason: 'Mar-May, Sep-Nov',
      price: '$700',
      rating: 4.6,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      description: 'Trek through the beautiful Langtang Valley, known for its scenic landscapes, Tamang culture, and serene monasteries.',
      highlights: ['Langtang National Park', 'Kyanjin Gompa', 'Langtang Lirung views'],
      currentConditions: 'Clear with chilly mornings',
      weather: 'Sunny, -2°C to 17°C',
    },
    {
      id: 3,
      name: 'Manaslu Circuit Trek',
      location: 'Nepal',
      difficulty: 'Challenging',
      duration: '14-16 days',
      maxAltitude: '5,160m',
      bestSeason: 'Sep-Nov, Mar-May',
      price: '$1,400',
      rating: 4.7,
      reviews: 89,
      image: 'https://images.pexels.com/photos/2663683/pexels-photo-2663683.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A remote and rugged trek that circles Mount Manaslu, Nepal’s eighth highest peak, through untouched Himalayan terrain.',
      highlights: ['Larkya La Pass', 'Tibetan-influenced villages', 'Wild river crossings'],
      currentConditions: 'Some snow at higher elevations',
      weather: 'Partly cloudy, -8°C to 18°C',
    },
    {
      id: 4,
      name: 'Upper Mustang Trek',
      location: 'Nepal',
      difficulty: 'Moderate',
      duration: '10-12 days',
      maxAltitude: '3,810m',
      bestSeason: 'Mar-Nov',
      price: '$1,800',
      rating: 4.9,
      reviews: 134,
      image: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Explore the ancient kingdom of Lo in the rain shadow of the Himalayas, filled with Tibetan culture and desert-like landscapes.',
      highlights: ['Lo Manthang', 'Cave monasteries', 'Arid Himalayan landscapes'],
      currentConditions: 'Dry and windy',
      weather: 'Clear skies, 5°C to 20°C',
    },
    {
      id: 5,
      name: 'Mardi Himal Trek',
      location: 'Nepal',
      difficulty: 'Moderate',
      duration: '5-7 days',
      maxAltitude: '4,500m',
      bestSeason: 'Mar-May, Sep-Nov',
      price: '$500',
      rating: 4.5,
      reviews: 93,
      image: 'https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A hidden gem offering spectacular close-up views of the Annapurna range, ideal for a short and rewarding trek.',
      highlights: ['Mardi Himal Base Camp', 'Dense rhododendron forests', 'Close Annapurna South views'],
      currentConditions: 'Trail dry and open',
      weather: 'Sunny, 0°C to 18°C',
    },
    {
      id: 6,
      name: 'Everest Base Camp Trek',
      location: 'Nepal',
      difficulty: 'Hard',
      duration: '16-18 days',
      maxAltitude: '5,364m',
      bestSeason: 'Mar-May, Sep-Dec',
      price: '$2,800',
      rating: 4.9,
      reviews: 387,
      image: 'https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Journey to the base of the world\'s highest mountain through Sherpa villages and dramatic Himalayan landscapes.',
      highlights: ['Everest Base Camp', 'Kala Patthar viewpoint', 'Sherpa culture immersion'],
      currentConditions: 'Optimal trekking weather',
      weather: 'Clear skies, -10°C to 10°C',
    },
  ];

  const filteredTreks = treks.filter(trek => {
    const matchesSearch = trek.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trek.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || trek.difficulty === selectedDifficulty;
    const matchesDuration = !selectedDuration || trek.duration.includes(selectedDuration);
    
    return matchesSearch && matchesDifficulty && matchesDuration;
  });

  const difficultyColors = {
    'Easy': 'bg-green-100 text-green-800',
    'Moderate': 'bg-yellow-100 text-yellow-800',
    'Challenging': 'bg-orange-100 text-orange-800',
    'Hard': 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Amazing Treks</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore breathtaking trails from around the world with detailed information, 
            real-time conditions, and community insights.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search treks by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-5 w-5" />}
                />
              </div>
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">All Durations</option>
                  <option value="4">1-5 days</option>
                  <option value="6">6-10 days</option>
                  <option value="11">11+ days</option>
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Trek Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreks.map((trek, index) => (
            <motion.div
              key={trek.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={trek.image}
                    alt={trek.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${difficultyColors[trek.difficulty as keyof typeof difficultyColors]}`}>
                      {trek.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-bold text-primary-600">
                    {trek.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {trek.name}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{trek.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{trek.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {trek.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{trek.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mountain className="h-3 w-3" />
                      <span>{trek.maxAltitude}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{trek.bestSeason}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{trek.reviews} reviews</span>
                    </div>
                  </div>

                  {/* Current Conditions */}
                  <div className="mb-4 p-3 bg-sage-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <Thermometer className="h-4 w-4 text-sage-600" />
                      <span className="font-medium text-sage-800">Current Conditions:</span>
                    </div>
                    <p className="text-sm text-sage-700 mt-1">{trek.currentConditions}</p>
                    <p className="text-xs text-sage-600 mt-1">{trek.weather}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/trek/${trek.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                      View Details →
                    </Link>
                    <Button size="sm" onClick={() => navigate(`/trek/${trek.id}/route`)} className="mt-2 w-full bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform border-2 border-white/60">View Route</Button>
                    <Button size="sm" variant="outline">
                      Add to Waitlist
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTreks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Mountain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No treks found</h3>
            <p className="text-gray-600">Try adjusting your search filters to find more treks.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};