import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Clock, 
  Truck, 
  Shield, 
  Star,
  ArrowRight,
  Bell
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const Marketplace: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
        {/* Coming Soon Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Marketplace
              <span className="block text-2xl md:text-3xl text-primary-600 mt-2">
                Coming Soon
              </span>
            </h1>
            
            {/* Animated Coming Soon Badge */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <Clock className="h-4 w-4" />
              <span>Launching Soon</span>
            </motion.div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get ready for a comprehensive marketplace featuring high-quality trek gear, 
            local handmade items, and everything you need for your mountain adventures.
          </p>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <Card className="p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trek Gear</h3>
            <p className="text-gray-600 text-sm">
              Premium equipment from trusted brands for all your trekking needs
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-sage-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Crafts</h3>
            <p className="text-gray-600 text-sm">
              Authentic handmade items from local artisans in trekking regions
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Quick and reliable shipping to get your gear before your trek
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-peach-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-peach-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-gray-600 text-sm">
              Every product tested and reviewed by experienced trekkers
            </p>
          </Card>
        </motion.div>

        {/* What's Coming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What's Coming to Our Marketplace
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary-600 mb-4">Trek Equipment</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Backpacks & Gear</h4>
                    <p className="text-gray-600 text-sm">Professional-grade backpacks, sleeping bags, and camping equipment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Clothing & Footwear</h4>
                    <p className="text-gray-600 text-sm">Technical clothing, boots, and accessories for all weather conditions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Navigation & Safety</h4>
                    <p className="text-gray-600 text-sm">GPS devices, emergency equipment, and first aid supplies</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-sage-600 mb-4">Local Handmade Items</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sage-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Traditional Crafts</h4>
                    <p className="text-gray-600 text-sm">Authentic handicrafts from trekking regions around the world</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sage-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Textiles & Clothing</h4>
                    <p className="text-gray-600 text-sm">Hand-woven fabrics, traditional clothing, and accessories</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sage-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Art & Souvenirs</h4>
                    <p className="text-gray-600 text-sm">Local art, jewelry, and unique mementos from your travels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vendor Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-br from-primary-50 to-sage-50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Become a Vendor
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join our marketplace and reach thousands of trekkers worldwide. 
                Submit your application now to be among the first vendors when we launch.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Input
                label="Business Name"
                placeholder="Enter your business name"
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
              />
              <Input
                label="Product Category"
                placeholder="e.g., Trek Gear, Handmade Crafts"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your products
                </label>
                <textarea
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="Describe your products and why they'd be perfect for trekkers..."
                />
              </div>
              <Button className="w-full" size="lg">
                Submit Application
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-8 text-center bg-white">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Be the First to Know
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              Get notified when our marketplace launches and receive exclusive early access 
              to the best trek gear and local products.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center mt-8 text-black">
              <Input
                placeholder="Enter your email"
                className="bg-white text-gray-900 border border-gray-300 shadow-sm rounded-l-lg rounded-r-none px-4 py-3 w-full sm:w-auto flex-1 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition sm:rounded-l-lg sm:rounded-r-none"
              />
              <Button
                variant="outline"
                size="lg"
                className="sm:rounded-l-none sm:rounded-r-lg rounded-lg px-8 py-3 font-semibold shadow-md -ml-px w-full sm:w-auto text-black border-primary-600 bg-white hover:bg-primary-50"
                style={{ minWidth: 'auto' }}
              >
                Notify Me
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};