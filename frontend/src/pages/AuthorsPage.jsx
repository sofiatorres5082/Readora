import React, { useState, useEffect } from "react";
import { getAllAuthors, getLivingAuthorsInYear } from "../services/authors";
import Card from "../components/Card";

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
      <div className="flex justify-center">
        <h1 className="border-2 border-[#6b5758] font-pedagogique text-white text-center text-base font-medium mb-5 bg-[#ee99b1] rounded-full px-4 py-1.5 inline-block">
          Autores
        </h1>
      </div>

      {/* Filtro por año */}
      <div className="mb-8 bg-white border-2 border-[#52413f] p-6 rounded-lg">
        <h2 className="text-lg font-pedagogique text-[#52413f] mb-4">
          Filtrar autores vivos
        </h2>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ingresa un año"
            min="0"
            max={new Date().getFullYear()}
            className="p-1.5 px-4 text-base font-nunito border rounded-full w-1/3 focus:outline-none"
          />
          <button
            onClick={handleFilterByYear}
            className="px-4 py-2 bg-[#e08da6] text-white rounded-full hover:bg-[#a7586f] transition font-pedagogique text-sm"
          >
            Filtrar
          </button>
          <button
            onClick={handleResetFilter}
            className="px-4 py-2 bg-[#7c7c7c] text-white rounded-full hover:bg-[#4d4d4d] transition font-pedagogique text-sm"
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
      <div className="flex flex-col gap-6">
        <h2 className="font-vividly text-3xl text-[#52413f]">
          Lista de Autores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {authors.map((author) => (
          <Card
            key={author.id}
            title={author.name}
            details={[
              { label: "Año de Nacimiento", value: author.birthYear },
              { label: "Año de Fallecimiento", value: author.deathYear || "Presente" },
            ]}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;
