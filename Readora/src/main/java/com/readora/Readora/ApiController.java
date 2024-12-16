package com.readora.Readora;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @GetMapping("/")
    public String name() {
        return dbUrl;
    }
}
