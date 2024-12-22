package com.readora.Readora.controller;

import com.readora.Readora.model.Author;
import com.readora.Readora.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authors")
public class AuthorController {

    private final AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    // Endpoint para listar todos los autores
    @GetMapping
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }

    // Endpoint para listar autores vivos en un año
    @GetMapping("/living")
    public ResponseEntity<?> getAuthorsAliveInYear(@RequestParam int year) {
        try {
            List<Author> authors = authorService.getLivingAuthorsInYear(year);
            return ResponseEntity.ok(authors);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
