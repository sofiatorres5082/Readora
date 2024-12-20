package com.readora.Readora.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.readora.Readora.dto.AuthorDTO;
import com.readora.Readora.dto.BookDTO;
import com.readora.Readora.model.Author;
import com.readora.Readora.model.Book;
import com.readora.Readora.repository.AuthorRepository;
import com.readora.Readora.repository.BookRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final ApiService apiService;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository, ApiService apiService) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.apiService = apiService;
    }

    // Buscar libros por título desde la API Gutendex.
    public List<BookDTO> searchBooksByTitle(String title) {
        try {
            var booksData = apiService.fetchBooksFromAPI(title);
            if (booksData == null || !booksData.isArray()) {
                throw new IllegalArgumentException("No se encontraron resultados para el título: " + title);
            }

            List<BookDTO> bookResults = new ArrayList<>();
            for (JsonNode bookNode : booksData) {
                bookResults.add(mapBookToDTO(bookNode));
            }
            return bookResults;

        } catch (Exception e) {
            throw new RuntimeException("Error al buscar libros: " + title, e);
        }
    }

    // METODO: Para mapear datos de la API al DTO.
    private BookDTO mapBookToDTO(JsonNode bookNode) {
        BookDTO bookDTO = new BookDTO();
        AuthorDTO authorDTO = new AuthorDTO();

        bookDTO.setTitle(bookNode.has("title") ? bookNode.get("title").asText() : "Título desconocido");
        bookDTO.setLanguage(bookNode.has("languages") && bookNode.get("languages").isArray()
                ? bookNode.get("languages").get(0).asText() : "Desconocido");
        bookDTO.setDownloadCount(bookNode.has("download_count") ? bookNode.get("download_count").asInt() : 0);

        if (bookNode.has("authors") && bookNode.get("authors").isArray() && bookNode.get("authors").size() > 0) {
            JsonNode authorNode = bookNode.get("authors").get(0);
            if (authorNode != null && authorNode.has("name")) {
                authorDTO.setName(authorNode.get("name").asText());
            } else {
                authorDTO.setName("Autor desconocido");
            }
            authorDTO.setBirthYear(authorNode.has("birth_year") ? authorNode.get("birth_year").asInt() : 0);
            authorDTO.setDeathYear(authorNode.has("death_year") ? authorNode.get("death_year").asInt() : 0);
        } else {
            authorDTO.setName("Autor desconocido");
            authorDTO.setBirthYear(0);
            authorDTO.setDeathYear(0);
        }

        bookDTO.setAuthor(authorDTO);
        return bookDTO;
    }


    // Para guardar un libro seleccionado
    public Book saveSelectedBook(BookDTO bookDTO) {
        try {
            Optional<Book> existingBook = bookRepository.findByTitleAndLanguage(
                    bookDTO.getTitle(),
                    bookDTO.getLanguage()
            );

            if (existingBook.isPresent()) {
                return existingBook.get();
            }

            Book newBook = new Book();
            newBook.setTitle(bookDTO.getTitle());
            newBook.setLanguage(bookDTO.getLanguage());
            newBook.setDownloadCount(bookDTO.getDownloadCount());

            Author author = null;
            Optional<Author> existingAuthor = authorRepository.findByName(bookDTO.getAuthor().getName());

            if (existingAuthor.isPresent()) {
                author = existingAuthor.get();
            } else {
                author = new Author();
                author.setName(bookDTO.getAuthor().getName());
                author.setBirthYear(bookDTO.getAuthor().getBirthYear());
                author.setDeathYear(bookDTO.getAuthor().getDeathYear());
            }

            newBook.setAuthor(author);

            Book savedBook = bookRepository.save(newBook);

            if (author.getId() == null) {
                authorRepository.save(author);
            }

            return savedBook;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al guardar el libro: " + bookDTO.getTitle());
        }
    }

    // Obtener todos los libros almacenados.
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Obtener libros por idioma.
    public List<Book> getBooksByLanguage(String language) {
        return bookRepository.findByLanguage(language);
    }

    // Obtener libros por título.
    public List<Book> getBooksByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }
}
