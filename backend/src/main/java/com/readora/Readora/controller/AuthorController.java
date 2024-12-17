package com.readora.Readora.controller;

import com.readora.Readora.model.Author;
import com.readora.Readora.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/search")
    public List<Author> searchAuthorByName(@RequestParam String name) {
        return authorService.searchAuthorByName(name);
    }

    @GetMapping
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }

    @GetMapping("/living")
    public List<Author> getAuthorsAliveInYear(@RequestParam Integer year) {
        return authorService.getAuthorsByLivingInYear(year);
    }
}
