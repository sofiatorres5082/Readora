import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchBooksByTitle } from "../../services/books";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [error, setError] = useState(null); 

  const fetchData = async (value) => {
    try {
      if (!value || value.length < 1) {
        setResults([]); 
        return;
      }
      const results = await searchBooksByTitle(value);
      setResults(results ? results : []); 
    } catch (error) {
      console.error("Error fetching books:", error);
      setResults([]);
      setError("An error occurred while fetching books. Please try again later.");
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => fetchData(value))); 
  };

  return (
    <div className="w-full h-10 flex items-center bg-white rounded-xl px-6">
      <FaSearch className="text-[#927570]" />
      <input
        type="text"
        className="flex-grow ml-4 bg-transparent outline-none text-base"
        placeholder="Buscar libro por titulo..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
