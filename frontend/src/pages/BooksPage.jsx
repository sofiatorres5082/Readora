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

  const handleSelectBook = useCallback(async (book) => {
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
  }, [savedBooks]);

  const handleSearch = useCallback((searchResults) => {
    setResults(searchResults.filter((result) => !savedBooks.some((saved) => saved.id === result.id)));
  }, [savedBooks]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Buscar Libros</h1>

      <SearchBar setResults={handleSearch} setError={setError} />

      {results.length > 0 && <SearchResultList results={results} onSelect={handleSelectBook} />}

      {loading && <div className="text-center text-lg">Guardando libro...</div>}
      {error && <div className="text-center text-lg text-red-500">{error}</div>}

      {savedBooks.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold mb-3">Libros Almacenados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
