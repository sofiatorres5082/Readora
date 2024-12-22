import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#efd4ce] flex justify-center items-center z-50">
      <img
        src="/images/ReadoraIcon.png" 
        alt="loading"
        className="w-28 mb-24 animate-rotateCenter"
      />
    </div>
  );
};

export default LoadingScreen;
