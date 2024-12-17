package com.readora.Readora.repository;

import com.readora.Readora.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author, Long> {

    // Derived Queries
    List<Author> findByNameContaining(String name);

    List<Author> findByBirthYearLessThanEqualAndDeathYearGreaterThanEqual(Integer birthYear, Integer deathYear);
}
