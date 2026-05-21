package com.portfolio.backend.controller;

import com.portfolio.backend.dto.PagedResponse;
import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;

    @GetMapping
    public ResponseEntity<PagedResponse<ProjectDTO>> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getAllProjects(page, size));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProjectDTO> getProjectBySlug(@PathVariable String slug) {
        return service.getProjectBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
