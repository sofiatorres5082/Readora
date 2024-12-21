package com.readora.Readora.controller;

import com.readora.Readora.dto.BookDTO;
import com.readora.Readora.dto.BookStatisticsDTO;
import com.readora.Readora.model.Book;
import com.readora.Readora.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Endpoint para buscar un libro por título
    @GetMapping("/search")
    public List<BookDTO> searchBookByTitle(@RequestParam String title) {
        return bookService.searchBooksByTitle(title);
    }

    // Endpoint para guardar un libro
    @PostMapping("/save")
    public ResponseEntity<Book> saveBook(@RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.saveSelectedBook(bookDTO));
    }

    // Endpoint para obtener todos los libros
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Endpoint para obtener libros por idioma
    @GetMapping("/language")
    public List<Book> getBooksByLanguage(@RequestParam String language) {
        return bookService.getBooksByLanguage(language);
    }

    // Endpoint para obtener libros por título
    @GetMapping("/title")
    public List<Book> getBooksByTitle(@RequestParam String title) {
        return bookService.getBooksByTitle(title);
    }

    // Endpoint para obtener estadísticas de libros por idioma
    @GetMapping("/statistics")
    public ResponseEntity<BookStatisticsDTO> getBookStatistics(@RequestParam String language) {
        BookStatisticsDTO statistics = bookService.getBookStatisticsByLanguage(language);
        return ResponseEntity.ok(statistics);
    }
}
