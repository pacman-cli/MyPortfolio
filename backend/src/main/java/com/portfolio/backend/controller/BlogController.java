package com.portfolio.backend.controller;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Blog> getBlogBySlug(@PathVariable String slug) {
        return blogService.getBlogBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // For seeding/testing purposes
    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.createBlog(blog);
    }
}
