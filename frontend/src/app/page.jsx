"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { ChatSection } from "../components/ChatSection";
import { VectorExplorer } from "../components/VectorExplorer";
import { DisclaimerModal } from "../components/DisclaimerModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestStatus, setIngestStatus] = useState(null);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [userId] = useState(() => "user_" + Math.random().toString(36).substring(2, 9));

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  const handleSendMessage = async (text) => {
    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/chat?q=${encodeURIComponent(text)}&userId=${encodeURIComponent(userId)}`
      );

      if (response.ok) {
        const data = await response.json();
        const botAnswer = data.response || "No response received.";

        const botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botAnswer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `⚠️ Unable to connect to RemedyBot AI backend service (${BACKEND_URL}). Please ensure the Spring Boot server is running.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: `⚠️ Connection error: Could not connect to Spring Boot server at ${BACKEND_URL}. Ensure your backend server is active.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMessage = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, saved: !msg.saved } : msg))
    );
  };

  const handleIngest = async () => {
    setIsIngesting(true);
    setIngestStatus("Ingesting natural home remedy documents into MariaDB Vector Store...");
    try {
      const res = await fetch(`${BACKEND_URL}/api/remedies/ingest`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setIngestStatus(`✅ Success: Ingested ${data.count} home remedy items into Vector Database!`);
      } else {
        setIngestStatus("⚠️ Vector Store Ingestion returned an error. Check backend server logs.");
      }
    } catch (err) {
      console.error("Ingest error:", err);
      setIngestStatus(`⚠️ Ingestion Failed: Backend server (${BACKEND_URL}) unreachable.`);
    } finally {
      setIsIngesting(false);
      setTimeout(() => setIngestStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#07130c] text-emerald-50 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        isIngesting={isIngesting}
        onIngest={handleIngest}
        ingestStatus={ingestStatus}
      />

      <main>
        {activeTab === "chat" ? (
          <ChatSection
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onSaveMessage={handleSaveMessage}
          />
        ) : (
          <VectorExplorer onIngest={handleIngest} isIngesting={isIngesting} />
        )}
      </main>

      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </div>
  );
}
