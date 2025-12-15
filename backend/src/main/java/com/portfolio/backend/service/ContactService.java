package com.portfolio.backend.service;

import com.portfolio.backend.model.ContactMessage;

public interface ContactService {
    ContactMessage saveMessage(ContactMessage message);
}
