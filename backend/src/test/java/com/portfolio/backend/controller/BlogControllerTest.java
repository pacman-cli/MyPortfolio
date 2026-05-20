package com.portfolio.backend.controller;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BlogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BlogRepository blogRepository;

    @BeforeEach
    void setUp() {
        blogRepository.deleteAll();
        Blog blog = new Blog();
        blog.setTitle("Test Blog");
        blog.setSlug("test-blog");
        blog.setContent("Test content");
        blog.setExcerpt("Test excerpt");
        blog.setTags("test, blog");
        blog.setImageUrl("https://example.com/image.jpg");
        blog.setPublishedAt(LocalDateTime.now());
        blogRepository.save(blog);
    }

    @Test
    void getAllBlogs_ReturnsPaginatedResponse() throws Exception {
        mockMvc.perform(get("/api/v1/blogs?page=0&size=10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items").isArray())
                .andExpect(jsonPath("$.items.length()").value(1))
                .andExpect(jsonPath("$.total").value(1));
    }

    @Test
    void getBlogBySlug_ReturnsBlog() throws Exception {
        mockMvc.perform(get("/api/v1/blogs/test-blog"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Blog"))
                .andExpect(jsonPath("$.tags").isArray());
    }

    @Test
    void getBlogBySlug_NotFound_Returns404() throws Exception {
        mockMvc.perform(get("/api/v1/blogs/non-existent"))
                .andExpect(status().isNotFound());
    }
}
