package com.portfolio.backend.config;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.BlogRepository;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BlogRepository blogRepository;
    private final ProjectRepository projectRepository;

    public DataSeeder(BlogRepository blogRepository, ProjectRepository projectRepository) {
        this.blogRepository = blogRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) {
        if (blogRepository.count() == 0) {
            seedBlogs();
        }
        if (projectRepository.count() == 0) {
            seedProjects();
        }
    }

    private void seedBlogs() {
        List<Blog> blogs = List.of(
            createBlog("LLM Deep Thinking: Reasoning Models, Techniques, Evaluation, and the Landscape",
                "llm-deep-thinking",
                "A comprehensive exploration of how large language models \"think\" — from the internal architecture of reasoning models like o1, R1, and Claude, to practical prompting techniques, rigorous evaluation methods, and a look at where the field is heading.",
                loadContent("llm-deep-thinking"),
                "LLM, Deep Learning, Reasoning, AI Architecture, Prompt Engineering",
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
                LocalDateTime.of(2026, 5, 16, 10, 0)),
            createBlog("Unlocking Spring Security: Authentication Pipeline & Bean Connections",
                "spring-security-architecture-linkedin",
                "A deep dive into Spring Security's authentication architecture — how filters, providers, and SecurityContextHolder work together to secure your application.",
                loadContent("spring-security"),
                "Spring Security, Java, Authentication, Backend",
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
                LocalDateTime.of(2026, 5, 10, 10, 0)),
            createBlog("Microservices in Spring Boot: Architecture, Design Patterns, and Production Practices",
                "microservices-spring-boot-architecture",
                "A comprehensive guide to designing, building, and deploying microservices with Spring Boot — covering service discovery, API gateways, resilience patterns, and production deployment strategies.",
                loadContent("microservices-spring-boot"),
                "Microservices, Spring Boot, Java, Architecture, Docker",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
                LocalDateTime.of(2026, 5, 5, 10, 0)),
            createBlog("Data Cleaning and Model Training: A Practical Guide",
                "data-cleaning-model-training",
                "A hands-on guide to data cleaning, preprocessing, and training machine learning models — from handling missing values to feature engineering and model evaluation.",
                loadContent("data-cleaning"),
                "Data Science, Machine Learning, Python, Data Engineering",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
                LocalDateTime.of(2026, 4, 28, 10, 0))
        );

        blogRepository.saveAll(blogs);
        System.out.println("Seeded " + blogs.size() + " blog posts.");
    }

    private void seedProjects() {
        List<Project> projects = List.of(
            createProject("TakaTrack", "takatrack",
                "A comprehensive personal finance management platform with real-time visualizations, expense tracking, and savings goal management.",
                "Next.js, Spring Boot, MySQL, Docker",
                "https://github.com/pacman-cli/expense-tracker",
                "https://takatrack.puspo.online",
                "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"),
            createProject("StayMate", "staymate",
                "Full-stack rental property marketplace with secure authentication, real-time messaging, and comprehensive listing management.",
                "Next.js, Spring Boot, MySQL, Docker",
                "https://github.com/pacman-cli/staymate",
                "https://staymate-demo.puspo.online",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"),
            createProject("Portfolio", "portfolio",
                "Modern developer portfolio built with Next.js 16, featuring scroll-driven animations, dark mode, and responsive design.",
                "Next.js, TypeScript, Tailwind CSS",
                "https://github.com/pacman-cli/MyPortfolio",
                "https://www.puspo.online",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"),
            createProject("E-Commerce", "e-commerce",
                "A comprehensive e-commerce platform with product management, shopping cart functionality, and secure checkout processes.",
                "Next.js, Spring Boot, MySQL, Docker",
                "https://github.com/pacman-cli/e-commerce",
                "https://ecommerce.puspo.online/",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"),
            createProject("Java Learning", "java-learning",
                "Comprehensive repository of Java learning projects covering core concepts, algorithms, and advanced OOP patterns.",
                "Java, Algorithms, OOP",
                "https://github.com/pacman-cli/Java-Learning",
                null,
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"),
            createProject("Business Analytics Dashboard", "business-analytics",
                "Data-driven analytics dashboard for business insights with interactive visualizations and reporting capabilities.",
                "Java, Spring Boot, Analytics",
                "https://github.com/pacman-cli/Java-Learning/tree/main/server/businessAnalytics",
                null,
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop")
        );

        projectRepository.saveAll(projects);
        System.out.println("Seeded " + projects.size() + " projects.");
    }

    private Blog createBlog(String title, String slug, String excerpt, String content, String tags, String imageUrl, LocalDateTime publishedAt) {
        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setSlug(slug);
        blog.setExcerpt(excerpt);
        blog.setContent(content);
        blog.setTags(tags);
        blog.setImageUrl(imageUrl);
        blog.setPublishedAt(publishedAt);
        return blog;
    }

    private Project createProject(String title, String slug, String description, String techStack, String githubUrl, String liveDemoUrl, String imageUrl) {
        Project project = new Project();
        project.setTitle(title);
        project.setSlug(slug);
        project.setDescription(description);
        project.setTechStack(techStack);
        project.setGithubUrl(githubUrl);
        project.setLiveDemoUrl(liveDemoUrl);
        project.setImageUrl(imageUrl);
        return project;
    }

    private String loadContent(String key) {
        return switch (key) {
            case "llm-deep-thinking" -> """
                ## Introduction

                For most of their short history, large language models generated answers in a single pass — one forward propagation through the network, producing one token at a time from left to right with no回头, no revision, no second thoughts. That changed in late 2024.

                OpenAI's o1 preview introduced a new paradigm: **reasoning models** that spend extra compute at inference time to generate hidden "thinking" tokens before arriving at an answer. DeepSeek-R1 open-sourced a competitive approach days later. Anthropic added extended thinking to Claude. Google shipped Gemini 2.0 Flash Thinking. By 2026, almost every frontier model has some form of internal reasoning capability.

                This article covers the full landscape across four sections:

                1. **How reasoning models work** — the architecture and internals of o1, R1, Claude thinking, and others
                2. **Practical techniques** — prompting strategies that elicit deeper reasoning from any capable LLM
                3. **Evaluating reasoning** — benchmarks, failure modes, and what the numbers don't tell you
                4. **The road ahead** — history, open challenges, and future directions
                """;
            case "spring-security" -> """
                ## The Authentication Architecture

                Spring Security's authentication system is built on a pipeline of filters, providers, and context holders. Understanding how they connect is key to configuring security correctly.

                ### The Filter Chain

                Every request passes through a chain of filters. The `UsernamePasswordAuthenticationFilter` (for form logins) or `BearerTokenAuthenticationFilter` (for JWT) extracts credentials and creates an `Authentication` object.

                ### The Provider Manager

                The `AuthenticationManager` delegates to one or more `AuthenticationProvider`s. Each provider attempts to authenticate the request. Common providers include `DaoAuthenticationProvider` (username/password against a database) and `JwtAuthenticationProvider` (JWT token validation).

                ### SecurityContextHolder

                On successful authentication, the `SecurityContextHolder` stores the `Authentication` object for the duration of the request. This is how controllers and services access the current user via `SecurityContextHolder.getContext().getAuthentication()`.
                """;
            case "microservices-spring-boot" -> """
                ## Introduction

                Microservices architecture has become the de facto standard for building scalable, resilient, and maintainable applications. In this comprehensive guide, we'll explore how to leverage the power of **Spring Boot** and **Spring Cloud** to build a robust microservices ecosystem.

                ### Why Microservices?

                Monolithic applications, while easier to start with, often become difficult to maintain and scale as they grow. Microservices offer:

                - **Scalability**: Scale individual components based on demand.
                - **Resilience**: Failure in one service doesn't bring down the entire system.
                - **Technology Agnosticism**: Use the best tool for each job.

                ### Key Components

                1. **Service Discovery** (Eureka)
                2. **API Gateway** (Spring Cloud Gateway)
                3. **Centralized Configuration** (Spring Cloud Config)
                4. **Circuit Breakers** (Resilience4j)

                ### Deployment with Docker

                Each microservice is containerized using Docker, with Docker Compose orchestrating the entire system. This ensures consistent environments across development, staging, and production.
                """;
            case "data-cleaning" -> """
                ## The Data Pipeline

                Data cleaning is often the most time-consuming part of any machine learning project. This guide covers the essential steps to transform raw data into a model-ready format.

                ### 1. Handling Missing Values

                Missing data can significantly impact model performance. Common strategies include:
                - Removing rows with missing values (when the proportion is small)
                - Imputing with mean, median, or mode
                - Using model-based imputation for complex patterns

                ### 2. Feature Engineering

                Creating informative features from raw data often makes the difference between a good model and a great one. Techniques include:
                - Encoding categorical variables
                - Creating interaction features
                - Extracting date/time components
                - Scaling numerical features

                ### 3. Model Training and Evaluation

                Once the data is clean, split into training, validation, and test sets. Use cross-validation to ensure the model generalizes well, and track metrics like precision, recall, and F1-score.
                """;
            default -> throw new IllegalArgumentException("Unknown content key: " + key);
        };
    }
}
