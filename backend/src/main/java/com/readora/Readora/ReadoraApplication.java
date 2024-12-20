package com.readora.Readora;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class ReadoraApplication implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ReadoraApplication.class);

    @Value("${spring.datasource.url}")
    private String dbUrl;

    public static void main(String[] args) {
        SpringApplication.run(ReadoraApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("Database URL loaded: {}", dbUrl);
    }
}

