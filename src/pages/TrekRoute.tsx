import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface RouteStep {
  id: string;
  name: string;
  description: string;
  image_url: string;
  sequence: number;
}

const mockRoutes: Record<string, RouteStep[]> = {
  '1': [
    { id: '1', name: 'Nayapul', description: 'Starting point of the Annapurna Base Camp trek.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', sequence: 1 },
    { id: '2', name: 'Ghandruk', description: 'Traditional Gurung village with mountain views.', image_url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', sequence: 2 },
    { id: '3', name: 'Chhomrong', description: 'Gateway to the Annapurna Sanctuary.', image_url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80', sequence: 3 },
    { id: '4', name: 'Machapuchare Base Camp', description: 'Stunning views of Machapuchare peak.', image_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', sequence: 4 },
    { id: '5', name: 'Annapurna Base Camp', description: 'The final destination with panoramic mountain views.', image_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', sequence: 5 },
  ],
  '2': [
    { id: '1', name: 'Syabrubesi', description: 'Entry point to Langtang Valley.', image_url: 'https://images.pexels.com/photos/3030405/pexels-photo-3030405.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 1 },
    { id: '2', name: 'Lama Hotel', description: 'Forest lodge stop along the Langtang river.', image_url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', sequence: 2 },
    { id: '3', name: 'Langtang Village', description: 'Traditional Tamang village.', image_url: 'https://images.pexels.com/photos/3030405/pexels-photo-3030405.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 3 },
    { id: '4', name: 'Kyanjin Gompa', description: 'Famous monastery and yak cheese factory.', image_url: 'https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 4 },
  ],
  '3': [
    { id: '1', name: 'Soti Khola', description: 'Starting point of the Manaslu Circuit.', image_url: 'https://images.pexels.com/photos/2663683/pexels-photo-2663683.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 1 },
    { id: '2', name: 'Namrung', description: 'Village with Tibetan culture.', image_url: 'https://images.pexels.com/photos/2663683/pexels-photo-2663683.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 2 },
    { id: '3', name: 'Samagaon', description: 'Base for Manaslu expeditions.', image_url: 'https://images.pexels.com/photos/2663683/pexels-photo-2663683.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 3 },
    { id: '4', name: 'Larkya La Pass', description: 'Highest point of the trek.', image_url: 'https://images.pexels.com/photos/2663683/pexels-photo-2663683.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 4 },
  ],
  '4': [
    { id: '1', name: 'Jomsom', description: 'Gateway to Upper Mustang.', image_url: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 1 },
    { id: '2', name: 'Kagbeni', description: 'Ancient village at the Kali Gandaki river.', image_url: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 2 },
    { id: '3', name: 'Lo Manthang', description: 'Walled capital of Mustang.', image_url: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 3 },
  ],
  '5': [
    { id: '1', name: 'Kande', description: 'Start of the Mardi Himal trek.', image_url: 'https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 1 },
    { id: '2', name: 'Forest Camp', description: 'Dense rhododendron forests.', image_url: 'https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 2 },
    { id: '3', name: 'High Camp', description: 'Stunning views of Annapurna South.', image_url: 'https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 3 },
    { id: '4', name: 'Mardi Himal Base Camp', description: 'Final viewpoint of the trek.', image_url: 'https://images.pexels.com/photos/1576939/pexels-photo-1576939.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 4 },
  ],
  '6': [
    { id: '1', name: 'Lukla', description: 'Famous mountain airstrip and trek start.', image_url: 'https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 1 },
    { id: '2', name: 'Namche Bazaar', description: 'Bustling Sherpa town.', image_url: 'https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 2 },
    { id: '3', name: 'Tengboche', description: 'Famous monastery with Everest views.', image_url: 'https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 3 },
    { id: '4', name: 'Gorakshep', description: 'Last stop before base camp.', image_url: 'https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 4 },
    { id: '5', name: 'Everest Base Camp', description: 'Base of the world’s highest mountain.', image_url: 'https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=800', sequence: 5 },
  ],
};

const WavyTop = () => (
  <svg className="absolute top-0 left-0 w-full h-32 md:h-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      fill="url(#wavyGradient)"
    />
    <defs>
      <linearGradient id="wavyGradient" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  </svg>
);

const WavyBottom = () => (
  <svg className="absolute bottom-0 left-0 w-full h-32 md:h-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
      d="M0,224L60,197.3C120,171,240,117,360,101.3C480,85,600,107,720,133.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      fill="url(#wavyGradient2)"
    />
    <defs>
      <linearGradient id="wavyGradient2" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  </svg>
);

const WavyDivider = ({ idx }: { idx: number }) => (
  <svg className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-8 md:h-10 z-0" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.7, delay: 0.1 * idx, ease: 'easeInOut' }}
      d="M0,20 Q100,40 200,20 T400,20"
      stroke="url(#greenWaveDivider)" strokeWidth="4" fill="none"/>
    <defs>
      <linearGradient id="greenWaveDivider" x1="0" y1="0" x2="400" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#22c55e" />
        <stop offset="1" stopColor="#10b981" />
      </linearGradient>
    </defs>
  </svg>
);

const TrekRoute: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState<RouteStep[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoute() {
      setLoading(true);
      try {
        if (id) {
          const { data, error } = await supabase.from('Route').select('*').eq('trek_id', id).order('sequence');
          if (!error && data && data.length > 0) {
            setRoute(data);
          } else {
            setRoute(mockRoutes[id] || []);
          }
        }
      } catch (e) {
        setRoute(mockRoutes[id as string] || []);
      } finally {
        setLoading(false);
      }
    }
    fetchRoute();
  }, [id]);

  return (
    <div className="relative min-h-screen pt-24 pb-16 flex flex-col items-center bg-gradient-to-br from-blue-50 to-white overflow-x-hidden">
      <WavyTop />
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(6,182,212,0.25)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
          className="mb-8 px-8 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-200 transition-all border-2 border-white/60 backdrop-blur-lg"
        >
          ← Back to Trek
        </motion.button>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-12 drop-shadow-lg text-center tracking-tight">Trek Route</h1>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : route.length === 0 ? (
          <div className="text-gray-500 text-lg">No route data available for this trek.</div>
        ) : (
          <div className="relative flex flex-col items-center w-full">
            {/* Animated vertical line in green */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-400 z-0 origin-top"
              style={{ transform: 'translateX(-50%)' }}
            />
            {route.map((step, idx) => (
              <div key={step.id} className="relative z-10 flex flex-col md:flex-row items-center w-full mb-20 group">
                {/* Wavy divider above each sector except first */}
                {idx !== 0 && <WavyDivider idx={idx} />}
                {/* Interactive green dot */}
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full border-4 border-white shadow-xl flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110 z-10"
                  style={{ position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -50%)' }}
                  whileHover={{ scale: 1.15 }}
                  onMouseEnter={() => setHovered(step.id)}
                  onMouseLeave={() => setHovered(null)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300 }}
                >
                  <span className="text-white font-bold text-xl">{idx + 1}</span>
                </motion.div>
                {/* Step content sector: always show name and number */}
                <motion.div
                  className={`relative mt-10 md:mt-0 md:ml-20 md:mr-0 w-full md:w-2/3 bg-white/80 backdrop-blur-lg rounded-3xl shadow-card border border-green-100 p-6 md:p-10 flex flex-col items-center md:items-${idx % 2 === 0 ? 'start' : 'end'} transition-all`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                >
                  <h3 className="text-2xl font-bold text-green-700 mb-2 text-center md:text-left">{step.name}</h3>
                </motion.div>
                {/* Tooltip on dot hover: only image and description */}
                <AnimatePresence>
                  {hovered === step.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="hidden md:block absolute left-1/2 -top-56 w-80 p-4 bg-white rounded-3xl shadow-2xl border border-green-200 z-20"
                      style={{ transform: 'translate(-50%, 0)' }}
                    >
                      <img src={step.image_url} alt={step.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                      <p className="text-gray-600 text-center">{step.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Decorative floating background elements */}
      <motion.div
        className="hidden md:block absolute top-32 left-10 w-32 h-32 bg-sky-100 rounded-full opacity-60 blur-2xl animate-pulse z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="hidden md:block absolute bottom-32 right-10 w-40 h-40 bg-teal-100 rounded-full opacity-50 blur-2xl animate-pulse z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />
      <WavyBottom />
    </div>
  );
};

export default TrekRoute; 