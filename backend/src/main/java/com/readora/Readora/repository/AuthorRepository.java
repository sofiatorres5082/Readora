package com.readora.Readora.repository;

import com.readora.Readora.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByName(String name);

    @Query("SELECT a FROM Author a WHERE " +
            "(" +
            "  (a.birthYear IS NOT NULL AND a.birthYear <= :year) OR " +
            "  (a.birthYear = 0)" +
            ") AND (" +
            "  a.deathYear IS NULL OR " +
            "  a.deathYear >= :year OR " +
            "  a.deathYear = 0" +
            ")")
    List<Author> findLivingAuthorsInYear(@Param("year") int year);
}