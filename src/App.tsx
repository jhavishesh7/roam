import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Treks } from './pages/Treks';
import { TrekDetail } from './pages/TrekDetail';
import { Homestays } from './pages/Homestays';
import { Marketplace } from './pages/Marketplace';
import PasswordResetSent from './pages/PasswordResetSent';
import AI_tools from './pages/AI_tools';
import TrekRoute from './pages/TrekRoute';
import HomestayDetail from './pages/HomestayDetail';
import Subscriptions from './pages/Subscriptions';
import PaymentComingSoon from './pages/PaymentComingSoon';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/treks" element={<Treks />} />
          <Route path="/trek/:id" element={<TrekDetail />} />
          <Route path="/trek/:id/route" element={<TrekRoute />} />
          <Route path="/homestays" element={<Homestays />} />
          <Route path="/homestay/:id" element={<HomestayDetail />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/password-reset-sent" element={<PasswordResetSent />} />
          <Route path="/ai_tools" element={<AI_tools />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/payment-coming-soon" element={<PaymentComingSoon />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1F1F1F',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          },
        }}
      />
      {/* Floating AI Widget Button */}
      <button
        aria-label="AI Widget"
        onClick={() => window.location.href = 'https://monumental-longma-41716d.netlify.app/'}
        className="fixed z-50 bottom-6 right-6 bg-gradient-to-br from-blue-500 to-green-400 text-white rounded-full shadow-2xl p-4 flex items-center justify-center hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)' }}
      >
        {/* Simple robot icon SVG */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="8" width="16" height="10" rx="4" fill="currentColor" className="text-white/80" />
          <circle cx="8.5" cy="13" r="1.5" fill="#fff" />
          <circle cx="15.5" cy="13" r="1.5" fill="#fff" />
          <rect x="10" y="2" width="4" height="4" rx="2" fill="currentColor" className="text-white/80" />
        </svg>
      </button>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;