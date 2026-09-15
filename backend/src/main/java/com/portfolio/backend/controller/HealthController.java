package com.portfolio.backend.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Health check endpoint for container orchestration and load balancer health checks. */
@RestController
@RequestMapping("/api/v1")
public class HealthController {

  @GetMapping("/health")
  public ResponseEntity<Map<String, String>> health() {
    return ResponseEntity.ok(Map.of("status", "UP", "service", "portfolio-backend"));
  }
}
