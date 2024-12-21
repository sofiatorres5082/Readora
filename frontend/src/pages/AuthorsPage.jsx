import React, { useState, useEffect } from "react";
import { getAllAuthors, getLivingAuthorsInYear } from "../services/authors";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [year, setYear] = useState("");
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState("");

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAllAuthors();
        setAuthors(data);
        setAllAuthors(data);
      } catch (err) {
        setError("Error al obtener los autores.");
      }
    };
    fetchAuthors();
  }, []);

  const handleFilterByYear = async () => {
    try {
      setError(null);
      setNoResults(false);

      // Validación del año
      const parsedYear = parseInt(year);

      if (!year || isNaN(parsedYear)) {
        setError("Por favor, ingresa un año válido.");
        return;
      }

      if (parsedYear < 0) {
        setError("El año no puede ser negativo.");
        return;
      }

      if (parsedYear > currentYear) {
        setError("El año no puede ser mayor al actual.");
        return;
      }

      // Llamada al backend
      const data = await getLivingAuthorsInYear(parsedYear);

      if (!Array.isArray(data)) {
        throw new Error("Respuesta inválida del servidor");
      }

      if (data.length === 0) {
        setNoResults(true);
        setNoResultsMessage(
          `No se encontraron autores vivos en el año ${parsedYear}.`
        );
        setAuthors([]);
      } else {
        setAuthors(data);
        setNoResultsMessage("");
        setNoResults(false);
      }
    } catch (err) {
      console.error("Error al filtrar autores:", err);
      setError(err.response?.data || "Error al filtrar autores vivos.");
      setAuthors([]);
    }
  };

  const handleResetFilter = () => {
    setYear("");
    setAuthors(allAuthors);
    setError(null);
    setNoResults(false);
  };

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-center text-3xl font-bold text-pink-700 mb-8">
        Autores
      </h1>

      {/* Filtro por año */}
      <div className="mb-8 bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-pink-600 mb-3">
          Filtrar Autores Vivos
        </h2>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ingresa un año"
            min="0"
            max={new Date().getFullYear()}
            className="p-2 border rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={handleFilterByYear}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500 transition"
          >
            Filtrar
          </button>
          <button
            onClick={handleResetFilter}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Resetear Filtro
          </button>
        </div>

        <div className="mt-2">
          {noResults && !error && (
            <div className="text-gray-500 text-sm">{noResultsMessage}</div>
          )}
        </div>
      </div>

      {/* Lista de autores */}
      <div>
        <h2 className="text-xl font-semibold text-pink-600 mb-3">
          Lista de Autores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center text-center"
            >
              <h3 className="text-lg font-bold text-pink-700">{author.name}</h3>
              <p className="text-gray-500">
                ({author.birthYear} - {author.deathYear || "Presente"})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;
