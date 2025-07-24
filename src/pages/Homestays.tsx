import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Wifi,
  Car,
  Coffee,
  Mountain,
  Users,
  Calendar,
  Heart,
  Camera
} from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Homestays: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('');

  const homestays = [
    {
      id: 1,
      name: 'Himalayan Heritage Home',
      location: 'Ghandruk, Nepal',
      host: 'Karma Sherpa',
      rating: 4.9,
      reviews: 87,
      price: 35,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Experience authentic Gurung culture in our traditional stone house with stunning Annapurna views.',
      amenities: ['Wifi', 'Parking', 'Meals Included', 'Mountain View'],
      culturalPackages: ['Local Cuisine', 'Folk Dance', 'Village Tour'],
      capacity: 6,
      distance: '2.5km from Annapurna Base Camp trail',
      featured: true,
    },
    {
      id: 2,
      name: 'Patagonia Valley Lodge',
      location: 'Torres del Paine, Chile',
      host: 'Maria González',
      rating: 4.8,
      reviews: 92,
      price: 55,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Cozy lodge with panoramic views of Torres del Paine. Perfect base for W Circuit trekkers.',
      amenities: ['Wifi', 'Parking', 'Kitchen Access', 'Heating'],
      culturalPackages: ['Gaucho Experience', 'Local Cuisine'],
      capacity: 8,
      distance: '5km from W Trek entrance',
      featured: false,
    },
    {
      id: 3,
      name: 'Kilimanjaro Base House',
      location: 'Moshi, Tanzania',
      host: 'Joseph Mbeki',
      rating: 4.7,
      reviews: 134,
      price: 28,
      image: 'https://images.pexels.com/photos/87651/earth-lights-environment-geography-87651.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/87651/earth-lights-environment-geography-87651.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Traditional Chagga family home offering authentic Tanzanian hospitality near Kilimanjaro.',
      amenities: ['Wifi', 'Meals Included', 'Pickup Service', 'Garden'],
      culturalPackages: ['Coffee Farm Tour', 'Traditional Cooking', 'Local Music'],
      capacity: 4,
      distance: '15km from Machame Gate',
      featured: true,
    },
    {
      id: 4,
      name: 'Alpine Chalet Refuge',
      location: 'Chamonix, France',
      host: 'Pierre Dubois',
      rating: 4.6,
      reviews: 76,
      price: 75,
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Historic alpine chalet with modern amenities. Gateway to Mont Blanc circuit adventures.',
      amenities: ['Wifi', 'Parking', 'Ski Storage', 'Fireplace'],
      culturalPackages: ['Cheese Making', 'Alpine History Tour'],
      capacity: 10,
      distance: '1km from TMB trail',
      featured: false,
    },
    {
      id: 5,
      name: 'Sacred Valley Casa',
      location: 'Ollantaytambo, Peru',
      host: 'Carmen Quispe',
      rating: 4.9,
      reviews: 156,
      price: 32,
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Colonial-style house in the heart of Sacred Valley. Perfect for Inca Trail preparation.',
      amenities: ['Wifi', 'Breakfast', 'Luggage Storage', 'Garden'],
      culturalPackages: ['Quechua Lessons', 'Textile Weaving', 'Ancient Ruins Tour'],
      capacity: 8,
      distance: '20km from Inca Trail start',
      featured: true,
    },
    {
      id: 6,
      name: 'Everest View Guest House',
      location: 'Namche Bazaar, Nepal',
      host: 'Tenzing Norbu',
      rating: 4.8,
      reviews: 203,
      price: 45,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Traditional Sherpa home with breathtaking Everest views. Experience authentic mountain culture.',
      amenities: ['Wifi', 'Hot Showers', 'Yak Cheese', 'Prayer Flags'],
      culturalPackages: ['Sherpa Culture', 'Buddhist Monastery', 'Yak Farm Visit'],
      capacity: 6,
      distance: 'On Everest Base Camp route',
      featured: false,
    },
  ];

  const filteredHomestays = homestays.filter(homestay => {
    const matchesSearch = homestay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         homestay.location.toLowerCase().includes(searchQuery.toLowerCase());
    // Add more filtering logic based on selectedFilters and priceRange
    return matchesSearch;
  });

  const featuredHomestays = homestays.filter(homestay => homestay.featured);

  const amenityIcons = {
    'Wifi': <Wifi className="h-4 w-4" />,
    'Parking': <Car className="h-4 w-4" />,
    'Meals Included': <Coffee className="h-4 w-4" />,
    'Mountain View': <Mountain className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Local Homestays</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay with local families and experience authentic culture while exploring the world's most beautiful trekking destinations.
          </p>
        </motion.div>

        {/* Featured Homestays */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Homestays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHomestays.map((homestay, index) => (
              <Card key={homestay.id} hover className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={homestay.image}
                    alt={homestay.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-accent-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-bold text-primary-600">
                    ${homestay.price}/night
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{homestay.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{homestay.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {homestay.location}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {homestay.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{homestay.reviews} reviews</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by location or homestay name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-5 w-5" />}
                />
              </div>
              <div>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">All Prices</option>
                  <option value="budget">Under $40/night</option>
                  <option value="mid">$40-70/night</option>
                  <option value="premium">$70+/night</option>
                </select>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* All Homestays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHomestays.map((homestay, index) => (
            <motion.div
              key={homestay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={homestay.image}
                    alt={homestay.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-bold text-primary-600">
                    ${homestay.price}/night
                  </div>
                  <button className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{homestay.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{homestay.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>{homestay.location}</span>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    Hosted by <span className="font-medium">{homestay.host}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {homestay.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {homestay.amenities.slice(0, 4).map((amenity, idx) => (
                      <span 
                        key={idx} 
                        className="flex items-center space-x-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {amenityIcons[amenity as keyof typeof amenityIcons] && (
                          <span>{amenityIcons[amenity as keyof typeof amenityIcons]}</span>
                        )}
                        <span>{amenity}</span>
                      </span>
                    ))}
                  </div>

                  {/* Cultural Packages */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-900 mb-2">Cultural Experiences:</div>
                    <div className="flex flex-wrap gap-1">
                      {homestay.culturalPackages.map((pkg, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-peach-100 text-peach-800 px-2 py-1 rounded-full"
                        >
                          {pkg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Up to {homestay.capacity} guests</span>
                    </div>
                    <span>{homestay.reviews} reviews</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    {homestay.distance}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="outline">
                      <Camera className="h-4 w-4 mr-1" />
                      Photos
                    </Button>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary-50 to-sage-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Host Your Own Homestay
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Share your home and culture with trekkers from around the world. 
              Join our community of local hosts and earn income while making meaningful connections.
            </p>
            <Button size="lg">Become a Host</Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};