package com.ai.controller;

import com.ai.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AiController {

    private final ChatService chatService;

    @GetMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(
            @RequestParam(value = "q", required = true) String q,
            @RequestParam(value = "userId", required = false, defaultValue = "default_user") String queryUserId,
            @RequestHeader(value = "userId", required = false) String headerUserId
    ) {
        String userId = (headerUserId != null && !headerUserId.isBlank()) ? headerUserId : queryUserId;
        String answer = chatService.chatTemplate(q, userId);
        return ResponseEntity.ok(Map.of(
                "query", q,
                "userId", userId,
                "response", answer
        ));
    }

    @PostMapping("/api/remedies/ingest")
    public ResponseEntity<Map<String, Object>> ingestRemedies() {
        int count = chatService.ingestDefaultData();
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Successfully ingested " + count + " home remedy documents into the Vector Database.",
                "count", count
        ));
    }

    @GetMapping("/api/remedies/search")
    public ResponseEntity<Map<String, Object>> searchRemedies(@RequestParam("q") String query) {
        List<String> results = chatService.searchRemedies(query);
        return ResponseEntity.ok(Map.of(
                "query", query,
                "count", results.size(),
                "documents", results
        ));
    }

    @GetMapping("/api/remedies/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(chatService.getCategories());
    }
}

