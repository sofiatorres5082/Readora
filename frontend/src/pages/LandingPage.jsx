import React from "react";

const LandingPage = ({ onStart }) => (
  <div className="min-h-screen bg-[url('/images/ReadoraBackground.png')] bg-cover bg-center bg-fixed flex flex-col overflow-hidden justify-center items-center">
    {/* Logo Readora */}
    <div className="w-96">
      <img src="/images/ReadoraLogo.png" alt="logo" />
    </div>

    {/* Subtítulo */}
    <p className="font-pedagogique text-[#927570] text-lg mb-8 text-center px-4 ">
      Explore y guarde sus libros favoritos
    </p>

    {/* Botón explorar */}
    <button
      onClick={onStart}
      className="bg-[#f9ede5] font-pedagogique text-[#927570] text-base border-4 border-[#927570] px-6 py-2 rounded-full transform transition-all scale-up-center"
    >
      Explorar
    </button>
  </div>
);

export default LandingPage;
