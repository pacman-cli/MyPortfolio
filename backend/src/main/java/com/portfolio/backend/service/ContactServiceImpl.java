package com.portfolio.backend.service;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository repository;

    @Override
    public ContactMessage saveMessage(ContactMessage message) {
        ContactMessage saved = repository.save(message);
        // Simulate email sending
        System.out.println("📧 [MOCK EMAIL] Sending to: puspopuspo520@gmail.com");
        System.out.println("   Subject: New Contact from " + message.getName());
        System.out.println("   Body: " + message.getMessage());
        return saved;
    }
}
