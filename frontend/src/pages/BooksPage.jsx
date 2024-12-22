import React, { useState, useEffect, useCallback } from "react";

import { SearchBar } from "../components/search/SearchBar";
import { SearchResultList } from "../components/search/SearchResultList";
import { saveSelectedBook, getAllBooks } from "../services/books";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { Globe, ChevronDown } from "lucide-react";

const LanguageFilter = ({ filterLanguage, setFilterLanguage }) => {
  const languages = [
    { code: "", label: "Todos los idiomas" },
    { code: "en", label: "Inglés" },
    { code: "es", label: "Español" },
    { code: "zh", label: "Chino" },
    { code: "fr", label: "Francés" },
  ];

  return (
    <div className="flex items-center gap-3 my-6 max-w-xs">
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52413f]">
          <Globe size={18} />
        </div>
        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 appearance-none bg-white border-2 border-[#52413f] 
                     rounded-xl focus:outline-none
                     transition-all duration-200 text-[#52413f] font-nunito font-semibold cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52413f] pointer-events-none">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
};

const BooksPage = ({ setIsLoading }) => {
  const [results, setResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Inicializar como true para mostrar la carga
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState("");

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const books = await getAllBooks();
        setSavedBooks(books);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los libros guardados:", err);
        setError("No se pudieron cargar los libros guardados.");
        setLoading(false);
      }
    };

    fetchSavedBooks();
  }, [setIsLoading]);

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
      <div className="flex justify-center">
        <h1 className="border-2 border-[#6b5758] font-pedagogique text-white text-center text-base font-medium mb-5 bg-[#ee99b1] rounded-full px-4 py-1.5 inline-block">
          Libros
        </h1>
      </div>

      {/* Barra de búsqueda */}
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
            <h2 className="font-vividly text-3xl text-[#52413f]">
              Libros Almacenados
            </h2>

            <LanguageFilter
              filterLanguage={filterLanguage}
              setFilterLanguage={setFilterLanguage}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <Card
                key={book.id}
                title={book.title}
                details={[
                  { label: "Autor", value: book.author?.name || "Desconocido" },
                  { label: "Idioma", value: book.language || "No disponible" },
                ]}
                onDetailsClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal: Detalle del libro */}
      {selectedBook && (
        <Modal
          title={selectedBook.title}
          content={[
            { label: "Autor", value: selectedBook.author?.name || "Desconocido" },
            { label: "Idioma", value: selectedBook.language || "No disponible" },
            { label: "Descargas", value: selectedBook.downloadCount || 0 },
          ]}
          onClose={handleClose}
          isClosing={isClosing}
        />
      )}
    </div>
  );
};

export default BooksPage;
