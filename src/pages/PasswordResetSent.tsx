import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

const PasswordResetSent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-sage-50 px-4">
      <Card className="p-10 max-w-md w-full text-center shadow-xl border border-primary-100 bg-white/90">
        <div className="flex flex-col items-center mb-6">
          <Mail className="h-16 w-16 text-primary-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Verification Link Sent</h2>
          <p className="text-gray-700 mb-6">A password reset link has been sent to your registered email address. Please check your inbox and follow the instructions to reset your password.</p>
          <Button onClick={() => navigate('/auth')} className="w-full" size="lg">Back to Login</Button>
        </div>
      </Card>
    </div>
  );
};

export default PasswordResetSent; 