package com.ai.service;

import com.ai.helper.Helper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.document.Document;
import org.springframework.ai.rag.advisor.RetrievalAugmentationAdvisor;
import org.springframework.ai.rag.retrieval.search.VectorStoreDocumentRetriever;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    private final ChatClient chatClient;

    @Value("classpath:/prompts/user-message.st")
    private Resource userMessage;

    @Value("classpath:/prompts/system-message.st")
    private Resource systemMessage;

    private Logger logger = LoggerFactory.getLogger(ChatServiceImpl.class);

    @Autowired
    private VectorStore vectorStore;

    public ChatServiceImpl(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @Override
    public String chatTemplate(String query, String userId) {
        try {
            var advisor = RetrievalAugmentationAdvisor.builder()
                    .documentRetriever(VectorStoreDocumentRetriever.builder()
                            .vectorStore(this.vectorStore)
                            .topK(5)
                            .similarityThreshold(0.2)
                            .build())
                    .build();

            return this.chatClient
                    .prompt()
                    .advisors(advisor)
                    .advisors(advisorSpec -> advisorSpec.param(ChatMemory.CONVERSATION_ID, userId))
                    .user(user -> user.text(this.userMessage).param("query", query))
                    .call()
                    .content();
        } catch (Exception e) {
            logger.warn("Vector Store retrieval encountered an issue ({}), attempting auto-ingest and fallback...", e.getMessage());
            try {
                ingestDefaultData();
            } catch (Exception ex) {
                logger.error("Auto-ingest fallback failed: {}", ex.getMessage());
            }

            return this.chatClient
                    .prompt()
                    .advisors(advisorSpec -> advisorSpec.param(ChatMemory.CONVERSATION_ID, userId))
                    .user(user -> user.text(this.userMessage).param("query", query))
                    .call()
                    .content();
        }
    }

    @Override
    public Flux<String> streamChat(String query) {
        return this.chatClient
                .prompt()
                .system(system -> system.text(this.systemMessage))
                .user(user -> user.text(this.userMessage).param("concept", query))
                .stream()
                .content();
    }

    @Override
    public void saveData(List<String> list) {
        List<Document> documentList = list.stream().map(Document::new).toList();
        this.vectorStore.add(documentList);
    }

    @Override
    public List<String> searchRemedies(String query) {
        try {
            SearchRequest searchRequest = SearchRequest.builder()
                    .topK(5)
                    .similarityThreshold(0.1)
                    .query(query)
                    .build();

            List<Document> documents = this.vectorStore.similaritySearch(searchRequest);
            if (documents.isEmpty()) {
                ingestDefaultData();
                documents = this.vectorStore.similaritySearch(searchRequest);
            }
            return documents.stream().map(Document::getText).toList();
        } catch (Exception e) {
            logger.error("Error performing vector similarity search: {}", e.getMessage());
            return List.of();
        }
    }

    @Override
    public List<String> getCategories() {
        return List.of(
                "Common Cold & Cough",
                "Sore Throat & Pharyngitis",
                "Digestive Health & Acidity",
                "Headache & Tension Migraine",
                "Insomnia & Sleep Disorders",
                "Skin Care & Acne",
                "Hair Health & Dandruff",
                "Joint & Muscle Pain",
                "Nausea & Morning Sickness",
                "Toothache & Gum Pain",
                "Immunity Boost",
                "Constipation"
        );
    }

    @Override
    public int ingestDefaultData() {
        List<String> remedies = Helper.getData();
        saveData(remedies);
        logger.info("Ingested {} home remedy documents into Vector Store", remedies.size());
        return remedies.size();
    }
}

