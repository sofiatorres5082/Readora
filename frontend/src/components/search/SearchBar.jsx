import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchBooksByTitle } from "../../services/books";

export const SearchBar = ({ setResults, setLoading, setError }) => {
  const [input, setInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const fetchData = async (value) => {
    try {
      setLoading(true);
      if (!value || value.length < 1) {
        setResults([]);
        setLoading(false);
        return;
      }

    const apiResults = await searchBooksByTitle(value);

    // Filtrar los resultados para que contengan el término ingresado
    const filteredResults = apiResults
    // Priorizar títulos que comiencen con el término
    .filter((book) => book.title.toLowerCase().startsWith(value.toLowerCase()))
     // Agregar títulos que incluyan el término pero no comiencen con él
    .concat(
      apiResults.filter(
        (book) =>
          !book.title.toLowerCase().startsWith(value.toLowerCase()) &&
          book.title.toLowerCase().includes(value.toLowerCase())
      )
    );

    setResults(filteredResults || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setResults([]);
      setError("Ocurrió un error al buscar libros. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => fetchData(value), 500)); // Debounce de 500ms
  };

  return (
    <div className="w-full flex flex-col relative">
      <div className="w-full h-10 flex items-center bg-white border-2 border-[#725a58] rounded-xl px-6">
        <FaSearch className="text-[#e08da6]" />
        <input
          type="text"
          className="flex-grow ml-4 bg-transparent outline-none text-base"
          placeholder="Buscar libro por título..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};
