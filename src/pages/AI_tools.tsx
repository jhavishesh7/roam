import React from 'react';

const AITools: React.FC = () => {
  const handleRedirect = () => {
    window.location.href = 'https://ai-model-mu.vercel.app/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-sans pt-20 flex flex-col items-center justify-center relative">
      <div className="max-w-xl mx-auto text-center mt-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-6">AI Tools</h1>
        <p className="text-lg text-gray-700 mb-8">
          Our advanced AI tools are now available on a dedicated platform.<br />
          Click the button below to access all features instantly!
        </p>
        <button
          onClick={handleRedirect}
          className="mt-8 px-12 py-5 bg-primary-600 text-white text-2xl rounded-full font-bold shadow-xl hover:bg-primary-700 transition-all animate-bounce"
          style={{ boxShadow: '0 8px 32px 0 rgba(16, 185, 129, 0.25)' }}
        >
          Use Our AI Tools
        </button>
      </div>
    </div>
  );
};

export default AITools; 