import React, { useState, useEffect, useCallback } from "react";
import BookCard from "../components/BookCard";
import { SearchBar } from "../components/search/SearchBar";
import { SearchResultList } from "../components/search/SearchResultList";
import { saveSelectedBook, getAllBooks } from "../services/books";
import { Globe, ChevronDown } from 'lucide-react';

const LanguageFilter = ({ filterLanguage, setFilterLanguage }) => {
  const languages = [
    { code: "", label: "Todos los idiomas" },
    { code: "en", label: "Inglés" },
    { code: "es", label: "Español" },
    { code: "zh", label: "Chino" },
    { code: "fr", label: "Francés" }
  ];

  return (
    <div className="flex items-center gap-3 my-6 max-w-xs">
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#faaec5]">
          <Globe size={18} />
        </div>
        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 appearance-none bg-white border-2 border-[#faaec5] 
                     rounded-xl hover:border-[#faaec5] focus:border-[#faaec5] focus:outline-none
                     transition-all duration-200 text-gray-600 font-medium cursor-pointer"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#faaec5] pointer-events-none">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
};

const BooksPage = () => {
  const [results, setResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState("");

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const books = await getAllBooks();
        setSavedBooks(books);
      } catch (err) {
        console.error("Error al obtener los libros guardados:", err);
        setError("No se pudieron cargar los libros guardados.");
      }
    };

    fetchSavedBooks();
  }, []);

  const handleSelectBook = useCallback(
    async (book) => {
      const isBookInLocalState = savedBooks.some(
        (savedBook) => savedBook.id === book.id
      );

      if (isBookInLocalState) {
        setError("Este libro ya está en tu lista.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const savedBook = await saveSelectedBook(book);
        setSavedBooks((prevBooks) => {
          const isDuplicate = prevBooks.some((b) => b.id === savedBook.id);
          if (isDuplicate) return prevBooks;
          return [...prevBooks, savedBook];
        });
      } catch (err) {
        setError("Hubo un problema al guardar el libro.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [savedBooks]
  );

  const closeModal = () => {
    setSelectedBook(null);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  const filteredBooks = savedBooks.filter((book) =>
    filterLanguage ? book.language === filterLanguage : true
  );

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold mb-5">Buscar libros</h1>
      <SearchBar
        setResults={setResults}
        setLoading={setLoading}
        setError={setError}
      />
      <SearchResultList
        results={results}
        onSelect={handleSelectBook}
        isLoading={loading}
      />

      {/* Filtro por idioma */}
      {savedBooks.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Libros Almacenados</h2>
            <LanguageFilter
              filterLanguage={filterLanguage}
              setFilterLanguage={setFilterLanguage}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDetailsClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal: Detalle del libro */}
      {selectedBook && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ${
            isClosing ? "fade-out" : "fade-in"
          }`}
        >
          <div
            className={`bg-white rounded-lg p-6 w-full max-w-md shadow-lg transition-all duration-300 ${
              isClosing ? "scale-down-center" : "scale-in-center"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">{selectedBook.title}</h2>
            <p className="mb-2">
              <strong>Autor:</strong>{" "}
              {selectedBook.author?.name || "Desconocido"}
            </p>
            <p className="mb-2">
              <strong>Idioma:</strong>{" "}
              {selectedBook.language || "No disponible"}
            </p>
            <p className="mb-4">
              <strong>Descargas:</strong> {selectedBook.downloadCount || 0}
            </p>
            <button
              className="w-full px-4 py-2 bg-[#e08da6] font-pedagogique text-white rounded-full hover:bg-[#a7586f] transition-all duration-200"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
