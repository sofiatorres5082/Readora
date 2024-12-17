import React from 'react';

const colors = {
  background: '#F5F5F5',
  primary: '#4A90E2',
  secondary: '#7ED7C1',
  text: '#333333',
  light: '#F9F9F9'
};

const LandingPage = ({ onStart }) => (
  <div 
    className="flex flex-col justify-center items-center min-h-screen"
    style={{ backgroundColor: colors.background }}
  >
    <h1 
      className="text-5xl font-bold mb-4"
      style={{ color: colors.primary }}
    >
      Readora
    </h1>
    <p 
      className="text-xl mb-8 text-center px-4"
      style={{ color: colors.text }}
    >
      Descubre tu próxima aventura literaria
    </p>
    <button 
      onClick={onStart} 
      className="px-6 py-3 rounded-full shadow-lg transform transition-all hover:scale-105"
      style={{ 
        backgroundColor: colors.primary, 
        color: 'white' 
      }}
    >
      Explorar
    </button>
  </div>
);

export default LandingPage;
