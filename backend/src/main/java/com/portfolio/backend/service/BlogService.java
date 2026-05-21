package com.portfolio.backend.service;

import com.portfolio.backend.dto.BlogDTO;
import com.portfolio.backend.dto.PagedResponse;
import java.util.Optional;

public interface BlogService {
    PagedResponse<BlogDTO> getAllBlogs(int page, int size);
    Optional<BlogDTO> getBlogBySlug(String slug);
}
