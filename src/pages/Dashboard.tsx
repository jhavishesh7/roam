import React, { useState, useEffect } from 'react';
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
import { getUserProfileById } from '../../backend/users';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [identityProofPreview, setIdentityProofPreview] = useState<string | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState<'view' | 'edit'>('view');
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  // Parallax effect for dashboard header
  const dashRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (dashRef.current) {
        const rect = dashRef.current.getBoundingClientRect();
        setParallax(Math.max(0, -rect.top * 0.3));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeTab === 'profile' && user?.id) {
      setProfileLoading(true);
      getUserProfileById(user.id)
        .then((data) => {
          setProfile(data);
          // No need to set form values, handled by controlled components
        })
        .catch((err) => setProfileError(err.message))
        .finally(() => setProfileLoading(false));
    }
  }, [activeTab, user]);

  // On mount, load profilePicPreview and identityProofPreview from localStorage if available
  useEffect(() => {
    try {
      const storedPic = localStorage.getItem('profilePic');
      if (storedPic) setProfilePicPreview(storedPic);
      const storedProof = localStorage.getItem('identityProof');
      if (storedProof) setIdentityProofPreview(storedProof);
    } catch {}
  }, []);

  const quickStats = [
    { label: 'Treks Completed', value: '0', icon: <MapPin className="h-5 w-5" />, color: 'text-primary-600' },
    { label: 'Days Trekking', value: '0', icon: <Calendar className="h-5 w-5" />, color: 'text-accent-600' },
    { label: 'Average Rating', value: '0', icon: <Star className="h-5 w-5" />, color: 'text-yellow-600' },
    { label: 'Badges Earned', value: '0', icon: <TrendingUp className="h-5 w-5" />, color: 'text-sage-600' },
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

  // Upload handlers
  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicPreview(reader.result as string);
      try {
        localStorage.setItem('profilePic', reader.result as string);
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  const handleIdentityProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdentityProofPreview(reader.result as string);
        try {
          localStorage.setItem('identityProof', reader.result as string);
        } catch {}
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setIdentityProofPreview(url);
      try {
        localStorage.setItem('identityProof', url);
      } catch {}
    }
  };

  // Logout handler with error handling
  const handleLogout = async () => {
    setLogoutLoading(true);
    setLogoutError(null);
    try {
      localStorage.removeItem('profilePic');
      localStorage.removeItem('identityProof');
      await signOut();
      navigate('/');
    } catch (err: any) {
      setLogoutError(err?.message || 'Logout failed. Please try again.');
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-sans pt-20">
      {/* Tab Switcher */}
      <div className="max-w-4xl mx-auto flex justify-center gap-6 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 ${activeTab === 'dashboard' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-primary-600 border-primary-200 hover:bg-primary-50'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 ${activeTab === 'profile' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-primary-600 border-primary-200 hover:bg-primary-50'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>
      {/* Dashboard Parallax Header */}
      {activeTab === 'dashboard' && (
        <section ref={dashRef} className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-lg mb-12">
          <img
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80"
            alt="Dashboard Hero"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ transform: `translateY(${parallax}px) scale(1.08)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-primary-600/60 z-10" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 flex flex-col items-center text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">
              Welcome back, <span className="text-primary-300">{user?.user_metadata?.full_name || 'Trekker'}</span>!
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 mb-2 max-w-2xl mx-auto font-medium">
              Ready for your next adventure? Let's explore the mountains.
            </p>
          </motion.div>
        </section>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-glass border border-primary-100 p-8 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-100 mb-3 text-primary-500 text-2xl`}>{stat.icon}</div>
                    <div className="text-3xl font-bold text-blue-900 mb-1">{stat.value}</div>
                    <div className="text-base text-gray-500 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

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
                          <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/homestays')}>
                            <HomeIcon className="h-4 w-4 mr-3" />
                            Find Homestays
                          </Button>
                          <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://forum.example.com', '_blank')}>
                            <MessageCircle className="h-4 w-4 mr-3" />
                            Join Forum
                          </Button>
                          <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/treks')}>
                            <Search className="h-4 w-4 mr-3" />
                            Plan New Trek
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-10 max-w-xl mx-auto shadow-xl border border-primary-100 bg-white/90">
                  <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Profile</h2>
                  {profileLoading ? (
                    <div className="text-center">Loading profile...</div>
                  ) : profileError ? (
                    <div className="text-red-600 text-center">{profileError}</div>
                  ) : (
                    <div className="flex flex-col items-center gap-6 w-full">
                      <div className="flex space-x-4 mb-4">
                        <Button variant="ghost" className={`px-4 py-2 rounded-md font-medium ${activeProfileTab === 'view' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'} transition-all duration-200`} onClick={() => setActiveProfileTab('view')}>
                          View Profile
                        </Button>
                        <Button variant="ghost" className={`px-4 py-2 rounded-md font-medium ${activeProfileTab === 'edit' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'} transition-all duration-200`} onClick={() => setActiveProfileTab('edit')}>
                          Edit Profile
                        </Button>
                      </div>
                      {activeProfileTab === 'view' ? (
                        <div className="relative flex flex-col items-center w-full pb-8">
                          {/* Banner */}
                          <div className="w-full h-40 rounded-t-lg overflow-hidden relative">
                            <img
                              src={profile?.banner_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}
                              alt="Banner"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                          </div>
                          {/* Avatar - absolute overlap */}
                          <div className="absolute left-1/2 top-28 transform -translate-x-1/2">
                            <img
                              src={profilePicPreview || profile?.profile_pic || '/default-avatar.png'}
                              alt="Profile"
                              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                            />
                          </div>
                          {/* Name, Location, Email */}
                          <div className="flex flex-col items-center mt-20">
                            <h3 className="text-2xl font-bold mb-1">{profile?.full_name}</h3>
                            {profile?.location && <p className="text-gray-500 mb-1">{profile?.location}</p>}
                            <p className="text-gray-600 mb-2">{profile?.email}</p>
                            {profile?.identity_proof_path && (
                              <a href={profile?.identity_proof_path} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline mb-2 block">
                                {profile?.identity_proof_filename || 'View Identity Proof'}
                              </a>
                            )}
                          </div>
                          {/* Stats Row */}
                          <div className="flex justify-center gap-12 w-full mt-8">
                            <div className="text-center">
                              <div className="text-xl font-bold">{profile?.treks_completed ?? 0}</div>
                              <div className="text-xs text-gray-500">Treks</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold">{profile?.experiences ?? 0}</div>
                              <div className="text-xs text-gray-500">Experiences</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Editable form
                        <form className="space-y-8 w-full max-w-md mx-auto">
                          {/* Banner URL */}
                          <Input
                            label="Banner Image URL"
                            value={profile?.banner_url || ''}
                            onChange={(e) => setProfile({ ...profile, banner_url: e.target.value })}
                            placeholder="Paste an image URL for your profile banner"
                          />
                          {/* Profile Pic Section */}
                          <div className="flex flex-col items-center mb-6">
                            <div className="relative group">
                              <motion.img
                                src={profilePicPreview || profile?.profile_pic || '/default-avatar.png'}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-primary-200 shadow mb-2 group-hover:brightness-90 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                              />
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleProfilePicUpload}
                              />
                            </div>
                            <span className="text-sm text-gray-600 mt-2">Profile Picture</span>
                          </div>
                          {/* Name (editable) */}
                          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <Input
                              label="Name"
                              value={profile?.full_name || ''}
                              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                            />
                          </motion.div>
                          {/* Email (editable) */}
                          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <Input
                              label="Email"
                              value={profile?.email || ''}
                              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                          </motion.div>
                          {/* Location (editable) */}
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <Input
                              label="Location"
                              value={profile?.location || ''}
                              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            />
                          </motion.div>
                          {/* Treks Completed (editable) */}
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <Input
                              label="Treks Completed"
                              type="number"
                              value={profile?.treks_completed ?? 0}
                              onChange={(e) => setProfile({ ...profile, treks_completed: Number(e.target.value) })}
                            />
                          </motion.div>
                          {/* Experiences (editable) */}
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            <Input
                              label="Experiences"
                              type="number"
                              value={profile?.experiences ?? 0}
                              onChange={(e) => setProfile({ ...profile, experiences: Number(e.target.value) })}
                            />
                          </motion.div>
                          {/* Identity Proof Upload */}
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                            <div className="flex flex-col gap-2">
                              <label className="block text-sm font-medium text-gray-700">Identity Proof</label>
                              {identityProofPreview ? (
                                identityProofPreview.endsWith('.pdf') ? (
                                  <a href={identityProofPreview} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline mb-2">
                                    View Uploaded PDF
                                  </a>
                                ) : (
                                  <img src={identityProofPreview} alt="Identity Proof Preview" className="w-32 h-32 object-cover rounded border mb-2" />
                                )
                              ) : profile?.identity_proof_path ? (
                                <a href={profile?.identity_proof_path} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline mb-2">
                                  {profile?.identity_proof_filename || 'View Uploaded Proof'}
                                </a>
                              ) : null}
                              <input
                                type="file"
                                accept="application/pdf,image/*"
                                onChange={handleIdentityProofUpload}
                              />
                            </div>
                          </motion.div>
                          <div className="flex gap-4 mt-6">
                            <Button variant="primary" className="flex-1" type="button" onClick={() => setActiveProfileTab('view')}>Save</Button>
                            <Button variant="outline" className="flex-1" type="button" onClick={() => setActiveProfileTab('view')}>Cancel</Button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </Card>
                {logoutError && (
                  <div className="text-red-600 text-center mb-4">{logoutError}</div>
                )}
                <div className="flex justify-center mt-10">
                  <Button variant="outline" className="px-8 py-3 text-lg font-semibold" onClick={handleLogout} disabled={logoutLoading}>
                    {logoutLoading ? 'Logging out...' : 'Log Out'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    
  );
};

export default Dashboard;