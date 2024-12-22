import React from "react";

const Modal = ({ title, content, onClose, isClosing }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-md border-4 border-[#6b5758] transform relative ${
          isClosing ? "animate-zoomOut" : "animate-zoomCenter"
        }`}
      >
        {/* Estrellas de decoración */}
        <img
          src="/images/star1.png"
          alt="Star 1"
          className="absolute top-[25px] left-[-18px] w-10 h-10 z-10 transform rotate-[45deg]"
        />
        <img
          src="/images/star1.png"
          alt="Star 2"
          className="absolute top-[-10px] right-[-14px] w-7 h-7 z-10 transform rotate-[-45deg]"
        />
         <img
          src="/images/star2.png"
          alt="Star 1"
          className="absolute top-[100px] right-[-10px] w-10 h-10 z-10"
        />

        <h2 className="font-pedagogique text-center text-lg text-[#6b5758] mb-2">{title}</h2>
        {content.map((item, index) => (
          <p key={index} className="font-nunito text-sm text-gray-900">
            <strong>{item.label}:</strong> {item.value}
          </p>
        ))}
        <button
          className="w-full px-4 py-2 bg-[#e08da6] font-pedagogique text-white rounded-full hover:bg-[#a7586f] transition-all duration-200 mt-4"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
