package com.readora.Readora.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer birthYear;

    private Integer deathYear;

    @JsonBackReference
    @OneToMany(mappedBy = "author")
    private List<Book> books;  // Relación uno a muchos con los libros
}
