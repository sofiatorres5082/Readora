package com.readora.Readora.controller;

import com.readora.Readora.model.Book;
import com.readora.Readora.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Endpoint para buscar un libro por título desde la API y guardarlo en la base de datos
    @GetMapping("/search")
    public Book searchBookByTitle(@RequestParam String title) {
        return bookService.searchBookByTitle(title);
    }

    // Endpoint para obtener todos los libros guardados
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Endpoint para filtrar libros por idioma
    @GetMapping("/language")
    public List<Book> getBooksByLanguage(@RequestParam String language) {
        return bookService.getBooksByLanguage(language);
    }

    // Endpoint para obtener libros ya guardados por título
    @GetMapping("/title")
    public List<Book> getBooksByTitle(@RequestParam String title) {
        return bookService.getBooksByTitle(title); // Se cambió a este método
    }
}
