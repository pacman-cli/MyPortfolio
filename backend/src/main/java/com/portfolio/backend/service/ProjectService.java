package com.portfolio.backend.service;

import com.portfolio.backend.dto.PagedResponse;
import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.model.Project;

import java.util.Optional;

public interface ProjectService {
    PagedResponse<ProjectDTO> getAllProjects(int page, int size);
    Optional<ProjectDTO> getProjectBySlug(String slug);
    Project saveProject(Project project);
}
