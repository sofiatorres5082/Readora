import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#efd4ce]">
      <div className="text-center">
        <h1 className="text-4xl font-pedagogique text-[#6b5758] mb-6">404 - Página no encontrada</h1>
        <button
          onClick={handleGoHome} 
          className="px-4 py-2 bg-[#e08da6] text-white rounded-full hover:bg-[#a7586f] transition font-pedagogique text-sm mt-2"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
