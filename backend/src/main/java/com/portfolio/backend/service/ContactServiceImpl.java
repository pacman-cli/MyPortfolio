package com.portfolio.backend.service;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository repository;
    private final JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username}")
    private String recipientEmail;

    @Override
    public ContactMessage saveMessage(ContactMessage message) {
        // 1. Try to send email FIRST. If it fails, do not save to DB (or save with
        // status 'FAILED' if we had a status field).
        // For now, we prioritize notifying the user of failure.
        sendEmail(message);

        // 2. If email sent successfully, save to DB
        return repository.save(message);
    }

    private void sendEmail(ContactMessage message) {
        try {
            System.out.println("📧 Attempting to send email from " + message.getEmail() + "...");
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(recipientEmail); // Must match authenticated user
            mailMessage.setTo(recipientEmail); // Sending to yourself
            mailMessage.setSubject("New Portfolio Contact: " + message.getName());
            mailMessage.setText(
                    "FROM: " + message.getName() + " (" + message.getEmail() + ")\n\n" +
                            "MESSAGE:\n" + message.getMessage() + "\n\n" +
                            "--------------------------------------------------\n" +
                            "This email was sent from your portfolio contact form.");

            mailSender.send(mailMessage);
            System.out.println("✅ Email sent successfully to " + recipientEmail);
        } catch (Exception e) {
            System.err.println("❌ FAILED to send email: " + e.getMessage());
            e.printStackTrace();
            // Critical: Throw exception so Controller returns 500 error
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
}
