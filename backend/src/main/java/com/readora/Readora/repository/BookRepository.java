package com.readora.Readora.repository;

import com.readora.Readora.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Derived Queries
    List<Book> findByLanguage(String language);

    List<Book> findByTitle(String title);

}
