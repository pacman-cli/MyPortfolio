package com.portfolio.backend.service;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();
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
            log.info("Sending email via Resend API...");

            // Use Jackson ObjectMapper for proper JSON encoding (prevents XSS/injection)
            Map<String, Object> emailData = Map.of(
                    "from", "onboarding@resend.dev",
                    "to", List.of(recipientEmail),
                    "subject", "Portfolio Contact: " + escapeHtml(message.getName()),
                    "html", buildHtmlBody(message));

            String jsonBody = objectMapper.writeValueAsString(emailData);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.resend.com/emails"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + resendApiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 || response.statusCode() == 201) {
                log.info("Email sent successfully via Resend! Response: {}", response.body());
            } else {
                log.error("Resend API Failed: {} {}", response.statusCode(), response.body());
                throw new RuntimeException("Failed to send email via Resend API: " + response.body());
            }

        } catch (Exception e) {
            log.error("Email sending error: {}", e.getMessage(), e);
            throw new RuntimeException("Email sending failed: " + e.getMessage());
        }
    }

    private String buildHtmlBody(ContactMessage message) {
        return String.format(
                "<p><strong>Name:</strong> %s</p><p><strong>Email:</strong> %s</p><p><strong>Message:</strong><br/>%s</p>",
                escapeHtml(message.getName()),
                escapeHtml(message.getEmail()),
                escapeHtml(message.getMessage()).replace("\n", "<br/>"));
    }

    private String escapeHtml(String input) {
        if (input == null)
            return "";
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
