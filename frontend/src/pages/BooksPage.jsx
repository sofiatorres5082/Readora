import React, { useState, useEffect, useCallback } from "react";
import BookCard from "../components/BookCard";
import { SearchBar } from "../components/search/SearchBar";
import { SearchResultList } from "../components/search/SearchResultList";
import { saveSelectedBook, getAllBooks } from "../services/books";

const BooksPage = () => {
  const [results, setResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); 
  const [isClosing, setIsClosing] = useState(false);

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

  const handleSearch = useCallback(
    (searchResults) => {
      setResults(
        searchResults.filter(
          (result) => !savedBooks.some((saved) => saved.id === result.id)
        )
      );
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

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Buscar Libros</h1>

      <SearchBar setResults={handleSearch} setError={setError} />

      {results.length > 0 && (
        <SearchResultList results={results} onSelect={handleSelectBook} />
      )}

      {loading && <div className="text-center text-lg">Guardando libro...</div>}
      {error && <div className="text-center text-lg text-red-500">{error}</div>}

      {savedBooks.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold mb-3">Libros Almacenados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedBooks.map((book) => (
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
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ${isClosing ? 'fade-out' : 'fade-in'}`}
        >
          <div
            className={`bg-white rounded-lg p-6 w-full max-w-md shadow-lg transition-all duration-300 ${isClosing ? 'scale-down-center' : 'scale-in-center'}`}
          >
            <h2 className="text-lg font-bold mb-4">{selectedBook.title}</h2>
            <p className="mb-2">
              <strong>Autor:</strong> {selectedBook.author?.name || "Desconocido"}
            </p>
            <p className="mb-2">
              <strong>Idioma:</strong> {selectedBook.language || "No disponible"}
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
