import React from "react";
import { SearchResult } from "./SearchResult";

export const SearchResultList = ({ results, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 bg-white text-center rounded-xl mt-4">
        <p className="text-sm text-gray-500">Cargando resultados...</p>
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div
      className="bg-white overflow-y-auto p-2 space-y-1 rounded-xl mt-4"
      style={{ maxHeight: "20rem" }}
    >
      {results.map((result, id) => (
        <SearchResult key={id} result={result} onSelect={onSelect} />
      ))}
    </div>
  );
};
