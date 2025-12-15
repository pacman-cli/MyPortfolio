package com.portfolio.backend.service;

import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository repository;

    @Override
    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    @Override
    public Project saveProject(Project project) {
        return repository.save(project);
    }
}
