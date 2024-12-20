import React from "react";

const BookCard = ({ book }) => {
  const authorName = book.author?.name || "Desconocido"; 
  const language = book.language || "No disponible";
  const downloadCount = book.downloadCount || 0;

  return (
    <div className="p-4 border-4 border-[#927570] rounded-2xl bg-white">
      <h3 className="font-bold text-lg mb-2">{book.title}</h3>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Autor:</strong> {authorName}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Idioma:</strong> {language}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Descargas:</strong> {downloadCount}
      </p>
    </div>
  );
};

export default BookCard;