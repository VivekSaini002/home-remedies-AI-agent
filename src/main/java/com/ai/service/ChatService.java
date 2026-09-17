package com.ai.service;

import reactor.core.publisher.Flux;

import java.util.List;

public interface ChatService {

    String chatTemplate(String query, String userId);

    Flux<String> streamChat(String query);

    void saveData(List<String> list);

    List<String> searchRemedies(String query);

    List<String> getCategories();

    int ingestDefaultData();
}

