"use client";

import React from "react";
import { X, ShieldAlert, AlertTriangle } from "lucide-react";

export const DisclaimerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl glass-card border border-emerald-500/40 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-emerald-400 hover:text-white p-1 rounded-lg hover:bg-emerald-900/40 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Medical & Safety Disclaimer</h3>
            <p className="text-xs text-amber-300/80">RemedyBot Health AI Assistant</p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <p>
            <strong className="text-emerald-300">1. Educational Information Only:</strong> The home remedies provided by RemedyBot are compiled from traditional, wellness, and natural health literature for educational and informational purposes only.
          </p>

          <p>
            <strong className="text-emerald-300">2. Not Medical Advice:</strong> RemedyBot is an AI assistant, not a licensed healthcare professional or medical doctor. Responses should never be considered professional medical advice, diagnosis, or treatment.
          </p>

          <p>
            <strong className="text-emerald-300">3. Allergies & Sensitivities:</strong> Always perform a patch test for topical remedies (essential oils, herbs) and verify ingredient allergies before consuming any remedy.
          </p>

          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 flex items-start gap-2.5 text-amber-200 text-xs">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Medical Emergencies:</strong> If you experience severe chest pain, shortness of breath, sudden numbness, severe high fever, or uncontrollable bleeding, immediately call your local emergency medical services or go to an urgent care facility.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:scale-105 transition-all"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
