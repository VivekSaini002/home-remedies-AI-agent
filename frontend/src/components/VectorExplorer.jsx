"use client";

import React, { useState } from "react";
import { Database, Search, RefreshCw, FileText, CheckCircle, Layers } from "lucide-react";

export const VectorExplorer = ({ onIngest, isIngesting }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
    try {
      const res = await fetch(`${backendUrl}/api/remedies/search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.documents || []);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Vector search error:", err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col max-w-5xl mx-auto px-2 sm:px-4 py-3">
      {/* Overview Banner */}
      <div className="mb-4 rounded-2xl glass-card p-4 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Spring AI Vector Database Store
            </h2>
            <p className="text-xs text-emerald-200/70">
              Perform direct semantic similarity vector searches against MariaDB / Embedded Vector Store
            </p>
          </div>
        </div>

        <button
          onClick={onIngest}
          disabled={isIngesting}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-all hover:scale-[1.02] shadow-md shadow-emerald-950/40 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isIngesting ? "animate-spin" : ""}`} />
          {isIngesting ? "Ingesting Documents..." : "Sync / Seed Vector Store"}
        </button>
      </div>

      {/* Vector Search Input */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type a query to search vector embeddings (e.g. 'throat gargle', 'mint tea', 'joint oil')..."
            className="w-full rounded-xl bg-slate-900/90 border border-emerald-500/30 pl-10 pr-4 py-3 text-xs sm:text-sm text-emerald-100 placeholder-emerald-400/50 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
          />
        </div>
        <button
          type="submit"
          disabled={!searchQuery.trim() || isSearching}
          className="flex items-center justify-center rounded-xl bg-emerald-700/60 hover:bg-emerald-600/70 border border-emerald-500/40 px-5 py-3 text-xs sm:text-sm font-semibold text-emerald-100 transition-all disabled:opacity-50"
        >
          {isSearching ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Vector Search"}
        </button>
      </form>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto rounded-2xl glass-card p-4 space-y-3">
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center text-center py-12 text-emerald-300/60">
            <Database className="h-12 w-12 mb-3 text-emerald-500/30" />
            <h3 className="text-base font-semibold text-emerald-200">Vector Search Ready</h3>
            <p className="text-xs max-w-sm text-emerald-300/50 mt-1">
              Enter a search query above to fetch top-K semantically matching home remedy chunks from the Vector Store.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 text-emerald-300/60">
            <FileText className="h-10 w-10 mx-auto mb-2 text-emerald-500/30" />
            <p className="text-sm">No matching vector documents found. Try clicking "Sync / Seed Vector Store" first.</p>
          </div>
        ) : (
          results.map((doc, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/80 border border-emerald-500/20 p-4 transition-all hover:border-emerald-500/40"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" /> Matched Document #{idx + 1}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/20">
                  Cosine Similarity Match
                </span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs text-emerald-100/90 bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/40 leading-relaxed">
                {doc}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
