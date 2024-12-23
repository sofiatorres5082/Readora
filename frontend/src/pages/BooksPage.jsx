import React, { useState, useEffect, useCallback } from "react";

import { SearchBar } from "../components/search/SearchBar";
import { SearchResultList } from "../components/search/SearchResultList";
import { saveSelectedBook, getAllBooks } from "../services/books";
import Card from "../components/Card";
import Modal from "../components/Modal";
import CustomSelect from "../components/CustomSelect";

const LanguageFilter = ({ filterLanguage, setFilterLanguage }) => {
  const languages = [
    { code: "", label: "Todos los idiomas" },
    { code: "en", label: "Inglés" },
    { code: "es", label: "Español" },
    { code: "zh", label: "Chino" },
    { code: "fr", label: "Francés" },
  ];

  const options = languages.map((lang) => ({
    value: lang.code,
    label: lang.label,
  }));

  return (
    <div className="flex items-center gap-3 my-6 max-w-xs">
      <CustomSelect
        options={options}
        value={filterLanguage}
        onChange={setFilterLanguage}
      />
    </div>
  );
};

const BooksPage = ({ setIsLoading }) => {
  const [results, setResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
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
            {
              label: "Autor",
              value: selectedBook.author?.name || "Desconocido",
            },
            {
              label: "Idioma",
              value: selectedBook.language || "No disponible",
            },
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
