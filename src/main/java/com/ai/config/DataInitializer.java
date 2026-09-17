package com.ai.config;

import com.ai.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ChatService chatService;
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Override
    public void run(String... args) throws Exception {
        logger.info("Initializing Home Remedies dataset into Vector Database on application startup...");
        try {
            int count = chatService.ingestDefaultData();
            logger.info("Successfully populated Vector Database with {} home remedy documents on startup!", count);
        } catch (Exception e) {
            logger.error("Could not auto-populate Vector Store on startup: {}", e.getMessage(), e);
        }
    }
}
