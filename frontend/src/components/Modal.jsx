import React from "react";

const Modal = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {content.map((item, index) => (
          <p key={index} className="mb-2">
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
