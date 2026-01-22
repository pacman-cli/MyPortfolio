package com.portfolio.backend.controller;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService service;

    @PostMapping
    public ResponseEntity<ContactMessage> submitContactForm(@Valid @RequestBody ContactMessage message) {
        ContactMessage saved = service.saveMessage(message);
        return ResponseEntity.ok(saved);
    }
}
