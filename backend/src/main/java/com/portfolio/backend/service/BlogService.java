package com.portfolio.backend.service;

import com.portfolio.backend.model.Blog;
import java.util.List;
import java.util.Optional;

public interface BlogService {
    List<Blog> getAllBlogs();

    Optional<Blog> getBlogBySlug(String slug);

    Blog createBlog(Blog blog);
}
