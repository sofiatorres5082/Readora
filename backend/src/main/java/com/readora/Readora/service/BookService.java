package com.readora.Readora.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.readora.Readora.model.Author;
import com.readora.Readora.model.Book;
import com.readora.Readora.repository.BookRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class BookService {

    private final HttpClient client;
    private final ObjectMapper objectMapper;
    private final BookRepository bookRepository;

    @Value("${gutendex.api.url}")
    private String apiUrl;

    public BookService(BookRepository bookRepository) {
        this.client = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
        this.bookRepository = bookRepository;
    }

    // Buscar un libro por título desde la API y guardarlo en la base de datos
    public Book searchBookByTitle(String title) {
        try {
            // URL de la API con el título codificado
            String url = apiUrl + "?search=" + title;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JsonNode responseJson = objectMapper.readTree(response.body());

            if (responseJson.has("results") && responseJson.get("results").size() > 0) {
                JsonNode bookData = responseJson.get("results").get(0);

                // Crear autor
                Author author = new Author();
                author.setName(bookData.get("authors").get(0).get("name").asText());

                // Crear libro
                Book book = new Book();
                book.setTitle(bookData.get("title").asText());
                book.setDownloadCount(bookData.get("download_count").asInt());
                book.setLanguage(bookData.get("languages").get(0).asText()); // Solo el primer idioma
                book.setAuthor(author);

                return bookRepository.save(book);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // Obtener todos los libros almacenados
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Obtener libros por idioma
    public List<Book> getBooksByLanguage(String language) {
        return bookRepository.findByLanguage(language);
    }

    // Obtener libros por título
    public List<Book> getBooksByTitle(String title) {
        return bookRepository.findByTitle(title);
    }


}
