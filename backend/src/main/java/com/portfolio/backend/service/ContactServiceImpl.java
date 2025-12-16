package com.portfolio.backend.service;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository repository;
    private final org.springframework.mail.javamail.JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username}")
    private String recipientEmail;

    @Override
    public ContactMessage saveMessage(ContactMessage message) {
        ContactMessage saved = repository.save(message);

        // Send email asynchronously to not block the response
        new Thread(() -> sendEmail(message)).start();

        return saved;
    }

    private void sendEmail(ContactMessage message) {
        try {
            org.springframework.mail.SimpleMailMessage mailMessage = new org.springframework.mail.SimpleMailMessage();
            mailMessage.setFrom(recipientEmail);
            mailMessage.setTo(recipientEmail);
            mailMessage.setSubject("New Contact Form Submission from " + message.getName());
            mailMessage.setText(
                    "Name: " + message.getName() + "\n" +
                            "Email: " + message.getEmail() + "\n\n" +
                            "Message:\n" + message.getMessage());

            mailSender.send(mailMessage);
            System.out.println("✅ Email sent successfully to " + recipientEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
