"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Copy, Check, Bookmark, BookmarkCheck, RefreshCw, ShieldAlert } from "lucide-react";
import { SymptomPills } from "./SymptomPills";

export const ChatSection = ({
  messages,
  isLoading,
  onSendMessage,
  onSaveMessage,
}) => {
  const [inputText, setInputText] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBotResponse = (text) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("🌿") || line.startsWith("🥬") || line.startsWith("🥣") || line.startsWith("⏰") || line.startsWith("⚠️")) {
        return (
          <h4 key={idx} className="mt-3 mb-1 text-sm font-bold text-emerald-300 flex items-center gap-1.5">
            {line}
          </h4>
        );
      }
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm text-emerald-100/90 leading-relaxed my-0.5">
            {line.replace(/^[-•]\s*/, "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed my-1">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col max-w-5xl mx-auto px-2 sm:px-4 py-3">
      {/* Medical Safety Banner */}
      <div className="mb-3 flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900/80 border border-emerald-500/20 px-3.5 py-2 text-xs text-emerald-200/90 shadow-sm backdrop-blur-sm">
        <ShieldAlert className="h-4 w-4 text-emerald-400 shrink-0" />
        <p>
          <strong className="font-semibold text-emerald-300">Natural Remedy Guidance:</strong> Always test herbal ingredients for allergies. Consult a physician for chronic conditions or emergencies.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="flex-1 overflow-y-auto rounded-2xl glass-card p-3 sm:p-5 flex flex-col gap-4 shadow-xl border border-emerald-900/40">
        {messages.length === 0 ? (
          <div className="my-auto flex flex-col items-center justify-center text-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 glow-emerald">
              <Bot className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Welcome to RemedyBot AI</h2>
            <p className="max-w-md text-xs sm:text-sm text-emerald-200/70 mb-6">
              Ask any symptom or ailment question to get evidence-backed natural home remedies powered by Spring AI & Vector Database.
            </p>

            <div className="w-full max-w-2xl">
              <SymptomPills onSelectSymptom={onSendMessage} />
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-slate-950 shadow-md shadow-emerald-900/50"
                    : "bg-emerald-900/80 border border-emerald-500/30 text-emerald-300"
                }`}
              >
                {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col group">
                <div
                  className={`rounded-2xl px-4 py-3 shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none"
                      : "bg-slate-900/90 border border-emerald-500/20 text-emerald-100 rounded-tl-none shadow-emerald-950/40"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                  ) : (
                    <div>{formatBotResponse(msg.text)}</div>
                  )}
                </div>

                {/* Footer / Controls */}
                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-emerald-400/50">
                  <span>{msg.timestamp}</span>
                  {msg.sender === "bot" && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-emerald-300 p-0.5 rounded"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                      <button
                        onClick={() => onSaveMessage(msg.id)}
                        className="hover:text-emerald-300 p-0.5 rounded"
                        title={msg.saved ? "Remove from saved" : "Save remedy"}
                      >
                        {msg.saved ? <BookmarkCheck className="h-3 w-3 text-emerald-400" /> : <Bookmark className="h-3 w-3" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-start animate-pulse">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-900/80 border border-emerald-500/30 text-emerald-300">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-slate-900/90 border border-emerald-500/20 px-4 py-3 text-xs sm:text-sm text-emerald-300/80 flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
              <span>Searching Vector DB & crafting natural home remedy...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about symptoms, cold, acidity, headache, acne remedies..."
            className="w-full rounded-xl bg-slate-900/90 border border-emerald-500/30 px-4 py-3 text-xs sm:text-sm text-emerald-100 placeholder-emerald-400/50 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
          />
        </div>
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 font-medium text-slate-950 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
