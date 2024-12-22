import React from "react";

const BookCard = ({ book, onDetailsClick }) => {
  const authorName = book.author?.name || "Desconocido";
  const language = book.language || "No disponible";
  const downloadCount = book.downloadCount || 0;

  return (
    <div className="flex flex-col justify-between gap-2 p-4 border-2 border-[#6b5758] rounded-2xl bg-[#fffaf6]">
      <h3
        className="font-pedagogique text-center text-lg text-[#6b5758] mb-2 truncate w-full"
        title={book.title}
      >
        {book.title}
      </h3>
      <p className="font-nunito text-sm text-gray-700">
        <strong>Autor:</strong> {authorName}
      </p>
      <p className="font-nunito text-sm text-gray-700">
        <strong>Idioma:</strong> {language}
      </p>
      <p className="font-nunito text-sm text-gray-700">
        <strong>Descargas:</strong> {downloadCount}
      </p>
      <button
        className="mt-4 px-4 py-2 bg-[#e08da6] text-white rounded-full hover:bg-[#a7586f] transition font-pedagogique text-sm"
        onClick={onDetailsClick}  
      >
        Ver detalles
      </button>
    </div>
  );
};

export default BookCard;
