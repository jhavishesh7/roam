import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Star, Users, Home, Wifi, Coffee, BedDouble, CheckCircle } from 'lucide-react';

const mockHomestays = [
  {
    id: 1,
    name: 'Annapurna Homestay',
    location: 'Ghandruk, Nepal',
    price: '$40/night',
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'A cozy homestay nestled in the heart of Ghandruk village, offering stunning mountain views, home-cooked meals, and warm hospitality. Perfect for trekkers and families alike.',
    amenities: ['WiFi', 'Hot Water', 'Breakfast', 'Laundry', 'Mountain View', 'Private Room'],
    host: 'Sita Gurung',
    contact: '+977-9800000000',
    photos: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    ],
  },
  // Add more mock homestays as needed
];

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="h-5 w-5 text-green-500" />, 'Hot Water': <Coffee className="h-5 w-5 text-green-500" />, 'Breakfast': <Coffee className="h-5 w-5 text-green-500" />, 'Laundry': <BedDouble className="h-5 w-5 text-green-500" />, 'Mountain View': <Home className="h-5 w-5 text-green-500" />, 'Private Room': <Users className="h-5 w-5 text-green-500" />
};

const HomestayDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const homestay = mockHomestays.find(h => h.id === Number(id)) || mockHomestays[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img
          src={homestay.image}
          alt={homestay.name}
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{homestay.name}</h1>
              <div className="flex items-center space-x-6 text-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{homestay.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{homestay.rating} ({homestay.reviews} reviews)</span>
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
            {/* Homestay Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Homestay Overview</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{homestay.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {homestay.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      {amenityIcons[amenity] || <CheckCircle className="h-5 w-5 text-green-500" />}
                      <span className="text-gray-700 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-primary-600">Host:</span> {homestay.host}
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-primary-600">Contact:</span> {homestay.contact}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="primary" className="flex-1">Book Now</Button>
                  <Button variant="outline" className="flex-1" onClick={() => navigate('/homestays')}>Back to Homestays</Button>
                </div>
              </Card>
            </motion.div>
            {/* Photos Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
                <div className="flex gap-4 overflow-x-auto">
                  {homestay.photos.map((photo, idx) => (
                    <img key={idx} src={photo} alt={`Homestay photo ${idx + 1}`} className="w-48 h-32 object-cover rounded-xl shadow-md" />
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
                  <div className="text-3xl font-bold text-green-600 mb-2">{homestay.price}</div>
                  <div className="text-sm text-gray-600">per night</div>
                </div>
                <div className="space-y-3 mb-6">
                  <Button className="w-full" variant="primary">Book Now</Button>
                  <Button variant="outline" className="w-full">Share Homestay</Button>
                </div>
                <div className="border-t pt-6">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg transition-all duration-200">
                    <Home className="h-4 w-4 mr-2" />
                    Emergency Contact
                  </Button>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    For urgent assistance, contact the host directly.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomestayDetail; 