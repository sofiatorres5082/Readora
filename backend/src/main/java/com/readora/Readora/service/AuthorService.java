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

    public List<Author> searchAuthorByName(String name) {
        return authorRepository.findByNameContaining(name);
    }

    public List<Author> getAuthorsByLivingInYear(Integer year) {
        return authorRepository.findByBirthYearLessThanEqualAndDeathYearGreaterThanEqual(year, year);
    }

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }
}
