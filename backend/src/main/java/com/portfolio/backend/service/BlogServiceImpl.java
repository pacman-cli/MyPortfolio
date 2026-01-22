package com.portfolio.backend.service;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public Optional<Blog> getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug);
    }

    @Override
    public Blog createBlog(Blog blog) {
        // Simple slug generation logic if not provided
        if (blog.getSlug() == null || blog.getSlug().isEmpty()) {
            blog.setSlug(blog.getTitle().toLowerCase().replace(" ", "-"));
        }
        return blogRepository.save(blog);
    }
}
