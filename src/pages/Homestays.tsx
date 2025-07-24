import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Star, 
  Wifi,
  Car,
  Coffee,
  Mountain,
  Users,
  Heart,
  Camera
} from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

// Define Homestay type (adjust fields as needed)
type Homestay = {
  id: number;
  name: string;
  location: string;
  host: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  culturalPackages: string[];
  capacity: number;
  distance: string;
  featured: boolean;
};

export const Homestays: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const homestays = [
    {
      id: 1,
      name: 'Himalayan Heritage Home',
      location: 'Annapurna Base Camp, Nepal',
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
      name: 'Langtang Valley Lodge',
      location: 'Langtang Village, Nepal',
      host: 'Pema Tamang',
      rating: 4.7,
      reviews: 98,
      price: 30,
      image: 'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Comfortable lodge in the heart of Langtang Valley. Enjoy scenic vistas and warm Tamang hospitality.',
      amenities: ['Wifi', 'Fireplace', 'Solar Power', 'Hot Showers'],
      culturalPackages: ['Yak Cheese Factory Visit', 'Monastery Tour'],
      capacity: 5,
      distance: 'Near Kyanjin Gompa trail',
      featured: false,
    },
    {
      id: 3,
      name: 'Manaslu Eco Homestay',
      location: 'Sama Gaun, Nepal',
      host: 'Ngima Lama',
      rating: 4.8,
      reviews: 120,
      price: 40,
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Remote eco-stay on the Manaslu Circuit surrounded by glaciers and Buddhist heritage.',
      amenities: ['Wood Heating', 'Tibetan Tea', 'Solar Charging'],
      culturalPackages: ['Mani Wall Tour', 'Larkya Pass Orientation'],
      capacity: 6,
      distance: '3km from Manaslu Base Camp trail',
      featured: true,
    },
    {
      id: 4,
      name: 'Lo Mustang Residency',
      location: 'Lo Manthang, Nepal',
      host: 'Tsering Bista',
      rating: 4.6,
      reviews: 78,
      price: 50,
      image: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Desert-style homestay in the walled city of Lo Manthang with deep Tibetan cultural roots.',
      amenities: ['Wifi', 'Roof Terrace', 'Traditional Decor', 'Breakfast'],
      culturalPackages: ['Cave Monastery Tour', 'Tiji Festival Insights'],
      capacity: 8,
      distance: 'Central Lo Manthang',
      featured: false,
    },
    {
      id: 5,
      name: 'Mardi Himal Hill Lodge',
      location: 'High Camp, Mardi Himal, Nepal',
      host: 'Bishnu Gurung',
      rating: 4.5,
      reviews: 65,
      price: 33,
      image: 'https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Panoramic views of the Annapurna range from a peaceful hillside lodge above the clouds.',
      amenities: ['Basic Wifi', 'Campfire', 'Organic Food'],
      culturalPackages: ['Local Forest Walk', 'Guide-led Stargazing'],
      capacity: 4,
      distance: '10-minute walk to Mardi Viewpoint',
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
    // Add more filtering logic based on priceRange
    return matchesSearch;
  });

  const featuredHomestays = homestays.filter(homestay => homestay.featured);

  const amenityIcons = {
    'Wifi': <Wifi className="h-4 w-4" />,
    'Parking': <Car className="h-4 w-4" />,
    'Meals Included': <Coffee className="h-4 w-4" />,
    'Mountain View': <Mountain className="h-4 w-4" />,
  };

  const location = useLocation();
  const highlightId = new URLSearchParams(location.search).get('highlight');
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (highlightId && cardRefs.current[String(highlightId)]) {
      cardRefs.current[String(highlightId)]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightId]);

  // Add state for selected homestay and modal
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
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
            {featuredHomestays.map((homestay) => (
              <Card key={String(homestay.id)} hover className="overflow-hidden">
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
                    <Button size="sm" onClick={() => navigate(`/homestay/${homestay.id}`)}>View Details</Button>
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
                  {/* <Filter className="h-4 w-4 mr-2" /> */}
                  More Filters
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* All Homestays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHomestays.map((homestay) => {
            const idStr = String(homestay.id);
            return (
              <motion.div
                key={idStr}
                ref={el => { cardRefs.current[idStr] = el; }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={highlightId === idStr ? 'ring-4 ring-primary-400 ring-offset-2' : ''}
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
                    <Button variant="ghost" className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>
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
                      <Button size="sm" onClick={() => navigate(`/homestay/${homestay.id}`)}>Book Now</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
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
      {showModal && selectedHomestay && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-primary-600 text-2xl">&times;</button>
            {/* Image Gallery */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {selectedHomestay.images?.map((img: string, idx: number) => (
                <img key={idx} src={img} alt={selectedHomestay.name} className="w-32 h-24 object-cover rounded-xl border" />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-primary-700 mb-2 flex items-center gap-2">
              {selectedHomestay.name}
              {selectedHomestay.featured && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Featured</span>}
            </h2>
            <div className="text-gray-600 mb-2">{selectedHomestay.location}</div>
            <div className="mb-2"><span className="font-semibold text-primary-600">Host:</span> {selectedHomestay.host}</div>
            <div className="mb-2 flex gap-4">
              <span className="font-semibold text-yellow-600">★ {selectedHomestay.rating}</span>
              <span className="text-gray-500">{selectedHomestay.reviews} reviews</span>
              <span className="text-primary-600 font-semibold">${selectedHomestay.price}/night</span>
            </div>
            <div className="mb-2"><span className="font-semibold text-primary-600">Capacity:</span> {selectedHomestay.capacity} guests</div>
            <div className="mb-2"><span className="font-semibold text-primary-600">Distance:</span> {selectedHomestay.distance}</div>
            <p className="text-gray-700 mb-4">{selectedHomestay.description}</p>
            <div className="mb-4">
              <span className="font-semibold text-primary-600">Amenities:</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {selectedHomestay.amenities?.map((a, i) => (
                  <li key={i} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium border border-primary-100">{a}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-primary-600">Cultural Packages:</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {selectedHomestay.culturalPackages?.map((c, i) => (
                  <li key={i} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-100">{c}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleCloseModal} className="flex-1 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};