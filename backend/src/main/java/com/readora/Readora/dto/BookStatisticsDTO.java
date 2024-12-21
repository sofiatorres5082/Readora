package com.readora.Readora.dto;

import lombok.Data;

@Data
public class BookStatisticsDTO {
    private String language;
    private long totalBooks;
    private long totalDownloads;
}
