import React from "react";

const Card = ({ title, details, onDetailsClick }) => {
  return (
    <div className="flex flex-col justify-between gap-2 p-4 border-2 border-[#6b5758] rounded-2xl bg-[#fffaf6]">
      <h3
        className="font-pedagogique text-center text-lg text-[#6b5758] mb-2 truncate w-full"
        title={title}
      >
        {title}
      </h3>
      {details.map((detail, index) => (
        <p key={index} className="font-nunito text-sm text-gray-700">
          <strong>{detail.label}:</strong> {detail.value}
        </p>
      ))}
      {onDetailsClick && (
        <button
          onClick={onDetailsClick}
          className="px-4 py-2 bg-[#e08da6] text-white rounded-full hover:bg-[#a7586f] transition font-pedagogique text-sm mt-2"
        >
          Ver Detalles
        </button>
      )}
    </div>
  );
};

export default Card;
