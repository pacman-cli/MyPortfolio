package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(length = 500)
    private String excerpt;

    private String tags; // Comma separated tags

    private LocalDateTime publishedAt;

    @PrePersist
    protected void onCreate() {
        publishedAt = LocalDateTime.now();
    }
}
