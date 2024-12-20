package com.readora.Readora.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Service
public class ApiService {
    private final HttpClient client;
    private final ObjectMapper objectMapper;

    @Value("${gutendex.api.url}")
    private String apiUrl;

    public ApiService() {
        this.client = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    // Consultar la API de Gutendex
    public JsonNode fetchBooksFromAPI(String title) throws Exception {
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8.toString());
        String url = apiUrl + "?search=" + encodedTitle;
        HttpRequest request = HttpRequest.newBuilder().uri(new URI(url)).build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        JsonNode responseJson = objectMapper.readTree(response.body());
        return responseJson.has("results") ? responseJson.get("results") : null;
    }
}
