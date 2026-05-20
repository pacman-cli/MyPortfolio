package com.portfolio.backend.util;

import com.portfolio.backend.dto.BlogDTO;
import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.model.Blog;
import com.portfolio.backend.model.Project;
import lombok.experimental.UtilityClass;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class DtoConverter {

    public static BlogDTO toDTO(Blog blog) {
        return BlogDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .slug(blog.getSlug())
                .excerpt(blog.getExcerpt())
                .content(blog.getContent())
                .tags(splitCommaSeparated(blog.getTags()))
                .imageUrl(blog.getImageUrl())
                .publishedAt(blog.getPublishedAt())
                .build();
    }

    public static List<BlogDTO> toBlogDTOList(List<Blog> blogs) {
        return blogs.stream().map(DtoConverter::toDTO).collect(Collectors.toList());
    }

    public static ProjectDTO toDTO(Project project) {
        return ProjectDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .slug(project.getSlug())
                .description(project.getDescription())
                .techStack(splitCommaSeparated(project.getTechStack()))
                .githubUrl(project.getGithubUrl())
                .liveDemoUrl(project.getLiveDemoUrl())
                .imageUrl(project.getImageUrl())
                .build();
    }

    public static List<ProjectDTO> toProjectDTOList(List<Project> projects) {
        return projects.stream().map(DtoConverter::toDTO).collect(Collectors.toList());
    }

    private static List<String> splitCommaSeparated(String value) {
        if (value == null || value.isBlank()) return Collections.emptyList();
        return Arrays.stream(value.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }
}
