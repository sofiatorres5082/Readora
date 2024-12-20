package com.readora.Readora.dto;

import lombok.Data;

@Data
public class BookDTO {
    private String title;
    private String language;
    private AuthorDTO author;
    private int downloadCount;
}
