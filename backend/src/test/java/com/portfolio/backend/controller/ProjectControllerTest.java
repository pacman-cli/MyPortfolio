package com.portfolio.backend.controller;

import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        projectRepository.deleteAll();
        Project project = new Project();
        project.setTitle("Test Project");
        project.setSlug("test-project");
        project.setDescription("A test project");
        project.setTechStack("Java, Spring");
        project.setGithubUrl("https://github.com/test/test");
        project.setImageUrl("https://example.com/project.jpg");
        projectRepository.save(project);
    }

    @Test
    void getAllProjects_ReturnsPaginatedResponse() throws Exception {
        mockMvc.perform(get("/api/v1/projects?page=0&size=10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items").isArray())
                .andExpect(jsonPath("$.items.length()").value(1));
    }

    @Test
    void getProjectBySlug_ReturnsProject() throws Exception {
        mockMvc.perform(get("/api/v1/projects/test-project"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Project"))
                .andExpect(jsonPath("$.techStack").isArray());
    }

    @Test
    void getProjectBySlug_NotFound_Returns404() throws Exception {
        mockMvc.perform(get("/api/v1/projects/non-existent"))
                .andExpect(status().isNotFound());
    }
}
