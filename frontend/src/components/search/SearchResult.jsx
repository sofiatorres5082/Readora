import React, { useState, useEffect } from 'react';

export const SearchResult = ({ result, onSelect }) => {
  return (
    <div 
      className="p-3 cursor-pointer transition-all duration-200 hover:bg-[#e08da6] hover:text-white rounded-lg"
      onClick={() => onSelect(result)}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{result.title || "Sin título"}</span>
        <span className="text-base">
          - {result.author.name || "Desconocido"}  
          - {result.language || "Idioma no disponible"}
        </span>
      </div>
    </div>
  );
};