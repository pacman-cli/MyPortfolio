package com.portfolio.backend.service;

import com.portfolio.backend.model.Project;
import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();

    Project saveProject(Project project);
}
