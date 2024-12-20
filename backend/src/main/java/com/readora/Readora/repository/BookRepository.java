package com.readora.Readora.repository;

import com.readora.Readora.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByLanguage(String language);

    List<Book> findByTitleContainingIgnoreCase(String title);

    Optional<Book> findByTitleAndLanguage(String title, String languages);
}
