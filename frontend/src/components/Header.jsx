"use client";

import React from "react";
import { Leaf, Database, ShieldCheck, Sparkles } from "lucide-react";

export const Header = ({
  activeTab,
  setActiveTab,
  onOpenDisclaimer,
  isIngesting,
  onIngest,
  ingestStatus,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/40 bg-emerald-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div
          onClick={() => setActiveTab("chat")}
          className="flex items-center gap-3 cursor-pointer group select-none transition-transform active:scale-95"
          title="Return to Home AI Remedy Assistant"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-400/40 transition-all">
            <Leaf className="h-6 w-6 text-slate-950 transition-transform group-hover:rotate-12" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl group-hover:text-emerald-300 transition-colors">
                Remedy<span className="text-emerald-400">Bot</span>
              </h1>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                Spring AI RAG
              </span>
            </div>
            <p className="text-xs text-emerald-200/70 hidden sm:block">
              Natural Health & Home Remedies AI Specialist
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 rounded-xl bg-slate-900/60 p-1 border border-emerald-900/50">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "chat"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40"
                : "text-emerald-300/70 hover:text-emerald-200 hover:bg-emerald-950/50"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            AI Remedy Assistant
          </button>
          <button
            onClick={() => setActiveTab("explorer")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "explorer"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40"
                : "text-emerald-300/70 hover:text-emerald-200 hover:bg-emerald-950/50"
            }`}
          >
            <Database className="h-4 w-4" />
            Vector DB Explorer
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onIngest}
            disabled={isIngesting}
            title="Seed/Sync home remedies knowledge base into MariaDB Vector Store"
            className="hidden md:flex items-center gap-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-all disabled:opacity-50"
          >
            <Database className={`h-3.5 w-3.5 text-emerald-400 ${isIngesting ? "animate-spin" : ""}`} />
            {isIngesting ? "Syncing..." : "Sync Vector Store"}
          </button>

          <button
            onClick={onOpenDisclaimer}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 text-xs font-medium text-amber-300 transition-all"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Medical Disclaimer</span>
          </button>
        </div>
      </div>

      {ingestStatus && (
        <div className="bg-emerald-900/60 text-emerald-200 text-xs text-center py-1 border-t border-emerald-500/20 animate-fade-in">
          {ingestStatus}
        </div>
      )}
    </header>
  );
};
