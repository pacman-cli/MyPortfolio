package com.portfolio.backend.config;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final BlogRepository blogRepository;

    @Bean
    public CommandLineRunner seedDatabase() {
        return args -> {
            if (blogRepository.count() == 0) {
                Blog blog1 = new Blog();
                blog1.setTitle("Mastering Spring Boot: A Backend Guide");
                blog1.setSlug("mastering-spring-boot");
                blog1.setExcerpt(
                        "Dive deep into the architecture of Spring Boot microservices and how to build scalable APIs.");
                blog1.setContent(
                        "# Mastering Spring Boot\n\nSpring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can \"just run\".\n\n## Why Spring Boot?\n\n- Standalone\n- Opinionated\n- Production Ready\n\nIn this guide, we explore the core components...");
                blog1.setTags("Spring Boot,Java,Backend");
                blog1.setPublishedAt(LocalDateTime.now().minusDays(2));

                Blog blog2 = new Blog();
                blog2.setTitle("Building Secure APIs with JWT");
                blog2.setSlug("building-secure-apis-jwt");
                blog2.setExcerpt(
                        "Learn how to secure your REST endpoints using JSON Web Tokens (JWT) and Spring Security.");
                blog2.setContent(
                        "# Secure APIs with JWT\n\nSecurity is paramount in modern web applications. JWT provides a stateless authentication mechanism.\n\n## Implementation Steps\n\n1. Add Dependencies\n2. Configure Security Filter\n3. Generate Tokens\n\n...");
                blog2.setTags("Security,JWT,Spring");
                blog2.setPublishedAt(LocalDateTime.now().minusDays(5));

                Blog blog3 = new Blog();
                blog3.setTitle("Next.js 14: The Future of Frontend");
                blog3.setSlug("nextjs-14-guide");
                blog3.setExcerpt(
                        "Exploring the App Router, Server Actions, and the paradigm shift in React development.");
                blog3.setContent(
                        "# Next.js 14\n\nThe App Router is a game changer. It allows for nested layouts, loading states, and error handling.\n\n## Server Components\n\nReact Server Components allow you to write UI that can be rendered and optionally cached on the server.");
                blog3.setTags("Next.js,React,Frontend");
                blog3.setPublishedAt(LocalDateTime.now().minusDays(1));

                blogRepository.saveAll(Arrays.asList(blog1, blog2, blog3));
                System.out.println("✅ Database seeded with 3 blogs.");
            }
        };
    }
}
