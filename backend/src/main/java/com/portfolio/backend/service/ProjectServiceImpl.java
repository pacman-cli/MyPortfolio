package com.portfolio.backend.service;

import com.portfolio.backend.dto.PagedResponse;
import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.util.DtoConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository repository;

    @Override
    public PagedResponse<ProjectDTO> getAllProjects(int page, int size) {
        Page<Project> projectPage = repository.findAll(PageRequest.of(page, size));
        return PagedResponse.<ProjectDTO>builder()
                .items(DtoConverter.toProjectDTOList(projectPage.getContent()))
                .total(projectPage.getTotalElements())
                .page(projectPage.getNumber())
                .size(projectPage.getSize())
                .totalPages(projectPage.getTotalPages())
                .build();
    }

    @Override
    public Optional<ProjectDTO> getProjectBySlug(String slug) {
        return repository.findBySlug(slug)
                .map(DtoConverter::toDTO);
    }

    @Override
    public Project saveProject(Project project) {
        return repository.save(project);
    }
}
