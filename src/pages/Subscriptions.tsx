import React from 'react';
import { useNavigate } from 'react-router-dom';

const Subscriptions: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f4f9f8] py-10 px-2 font-sans">
      <div className="max-w-4xl mx-auto">
        <section className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#004d40] mb-2">Lifetime Premium Membership</h1>
          <p className="text-lg text-[#555] max-w-2xl mx-auto">Enjoy peace of mind, early access, real-time alerts and pro tools — for just $10 / ₹799, once in a lifetime.</p>
        </section>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-6">
          <div className="text-center text-3xl font-bold text-[#004d40] mb-4">$10 / ₹1370 <br /><span className="text-base font-normal">One-Time Payment • Lifetime Access</span></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-start gap-4 bg-[#f9fdfa] border-l-4 border-[#1de9b6] rounded-xl p-4">
              <span className="text-2xl">🕔</span>
              <div><strong>24/7 Dedicated Support</strong><br />Get instant help via WhatsApp or live chat anytime.</div>
            </div>
            <div className="flex items-start gap-4 bg-[#f9fdfa] border-l-4 border-[#1de9b6] rounded-xl p-4">
              <span className="text-2xl">📱</span>
              <div><strong>SMS Safety Alerts</strong><br />Receive real-time alerts about disasters, weather & more.</div>
            </div>
            <div className="flex items-start gap-4 bg-[#f9fdfa] border-l-4 border-[#1de9b6] rounded-xl p-4">
              <span className="text-2xl">🚀</span>
              <div><strong>Early Access</strong><br />Book new treks and verified homestays before public launch.</div>
            </div>
            <div className="flex items-start gap-4 bg-[#f9fdfa] border-l-4 border-[#1de9b6] rounded-xl p-4">
              <span className="text-2xl">🆘</span>
              <div><strong>Emergency Toolkit</strong><br />One-tap SOS, offline access & contact sharing during travel.</div>
            </div>
            <div className="flex items-start gap-4 bg-[#f9fdfa] border-l-4 border-[#1de9b6] rounded-xl p-4">
              <span className="text-2xl">👨‍👩‍👧</span>
              <div><strong>Family Access</strong><br />Add 2 family members to your account for shared safety.</div>
            </div>
            <div className="flex items-start gap-4 bg-[#f9fdfa] border-l-4 border-[#1de9b6] rounded-xl p-4">
              <span className="text-2xl">🧭</span>
              <div><strong>AI Trek Planner</strong><br />Get custom itineraries based on your time, goals and budget.</div>
            </div>
            <div className="flex items-start gap-4 bg-[#f9fdfa] border-l-4 border-[#1de9b6] rounded-xl p-4">
              <span className="text-2xl">🗺</span>
              <div><strong>Offline Map Access</strong><br />Download detailed trek maps and GPS routes for offline use.</div>
            </div>
            <div className="flex items-start gap-4 bg-[#f9fdfa] border-l-4 border-[#1de9b6] rounded-xl p-4">
              <span className="text-2xl">✅</span>
              <div><strong>Verified Reviews First</strong><br />Get top traveler insights with filtered, authentic reviews only.</div>
            </div>
          </div>
          <button
            className="block mt-10 mx-auto px-8 py-4 bg-[#004d40] text-white text-lg rounded-lg font-semibold shadow-lg hover:bg-[#00332e] transition"
            onClick={() => navigate('/payment-coming-soon')}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions; 