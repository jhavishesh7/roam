import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentComingSoon: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white font-sans">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary-700 mb-4">Payment Integration Coming Soon!</h1>
        <p className="text-gray-600 mb-8">We're working hard to bring you secure and seamless payment options. Stay tuned!</p>
        <button
          className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow hover:bg-primary-700 transition"
          onClick={() => navigate('/subscriptions')}
        >
          Back to Subscriptions
        </button>
      </div>
    </div>
  );
};

export default PaymentComingSoon; 