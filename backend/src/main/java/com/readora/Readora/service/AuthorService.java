package com.readora.Readora.service;

import com.readora.Readora.model.Author;
import com.readora.Readora.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    public List<Author> getLivingAuthorsInYear(int year) {
        int currentYear = java.time.Year.now().getValue();

        if (year < 0) {
            throw new IllegalArgumentException("El año no puede ser negativo");
        }
        if (year > currentYear) {
            throw new IllegalArgumentException("El año no puede ser mayor al actual");
        }

        return authorRepository.findLivingAuthorsInYear(year);
    }
}
