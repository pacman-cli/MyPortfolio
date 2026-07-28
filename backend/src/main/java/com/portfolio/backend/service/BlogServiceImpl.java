package com.portfolio.backend.service;

import com.portfolio.backend.dto.BlogDTO;
import com.portfolio.backend.dto.PagedResponse;
import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import com.portfolio.backend.util.DtoConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    @Override
    public PagedResponse<BlogDTO> getAllBlogs(int page, int size) {
        Page<Blog> blogPage = blogRepository.findAll(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "publishedAt")));
        return PagedResponse.<BlogDTO>builder()
                .items(DtoConverter.toBlogDTOList(blogPage.getContent()))
                .total(blogPage.getTotalElements())
                .page(blogPage.getNumber())
                .size(blogPage.getSize())
                .totalPages(blogPage.getTotalPages())
                .build();
    }

    @Override
    public Optional<BlogDTO> getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug)
                .map(DtoConverter::toDTO);
    }


}
