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