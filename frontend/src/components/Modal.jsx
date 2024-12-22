import React from "react";

const Modal = ({ title, content, onClose, isClosing }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-md border-4 border-[#6b5758] transform ${
          isClosing ? "animate-zoomOut" : "animate-zoomCenter"
        }`}
      >
        <h2 className="font-pedagogique text-center text-lg text-[#6b5758] mb-2">{title}</h2>
        {content.map((item, index) => (
          <p key={index} className="font-nunito text-sm text-gray-700 font-semibold">
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
