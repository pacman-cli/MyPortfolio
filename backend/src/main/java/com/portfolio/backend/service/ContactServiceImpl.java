package com.portfolio.backend.service;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository repository;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${spring.mail.username}")
    private String recipientEmail;

    @Override
    public ContactMessage saveMessage(ContactMessage message) {
        // 1. Send via Resend API (HTTP to bypass SMTP block)
        sendEmailViaResend(message);

        // 2. Save to DB
        return repository.save(message);
    }

    private void sendEmailViaResend(ContactMessage message) {
        try {
            System.out.println("📧 Sending email via Resend API...");

            // Construct JSON payload manually to avoid extra dependencies (Jackson is
            // available via Spring Web but simple string is safer for now)
            // Note: Resend Free Tier only allows sending from 'onboarding@resend.dev' to
            // your verified email.
            // We use 'onboarding@resend.dev' as From, and your email as To.
            String jsonBody = String.format(
                    "{\"from\": \"onboarding@resend.dev\", \"to\": [\"%s\"], \"subject\": \"Portfolio Contact: %s\", \"html\": \"<p><strong>Name:</strong> %s</p><p><strong>Email:</strong> %s</p><p><strong>Message:</strong><br/>%s</p>\"}",
                    recipientEmail,
                    message.getName(),
                    message.getName(),
                    message.getEmail(),
                    message.getMessage().replace("\n", "<br/>").replace("\"", "\\\"") // Basic escaping
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.resend.com/emails"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + resendApiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 || response.statusCode() == 201) {
                System.out.println("✅ Email sent successfully via Resend! ID: " + response.body());
            } else {
                System.err.println("❌ Resend API Failed: " + response.statusCode() + " " + response.body());
                throw new RuntimeException("Failed to send email via Resend API: " + response.body());
            }

        } catch (Exception e) {
            System.err.println("❌ Email Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Email sending failed: " + e.getMessage());
        }
    }
}
