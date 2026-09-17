"use client";

import React from "react";
import { Thermometer, Zap, Activity, Flame, Moon, Sparkles, Droplets, HeartPulse } from "lucide-react";

const SYMPTOMS = [
  {
    label: "Cold & Cough",
    icon: Thermometer,
    prompt: "What is a natural home remedy for cold, chest congestion, and persistent cough?",
    color: "from-blue-500/20 to-teal-500/20 text-teal-300 border-teal-500/30",
  },
  {
    label: "Sore Throat",
    icon: Droplets,
    prompt: "Can you recommend an effective home remedy and gargle for sore throat pain?",
    color: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
  },
  {
    label: "Acidity & Gas",
    icon: Flame,
    prompt: "How can I quickly relieve acid reflux, stomach bloating, and gas using home remedies?",
    color: "from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30",
  },
  {
    label: "Headache / Migraine",
    icon: Zap,
    prompt: "What home remedies help soothe tension headaches and migraines naturally?",
    color: "from-red-500/20 to-rose-500/20 text-rose-300 border-rose-500/30",
  },
  {
    label: "Sleep & Insomnia",
    icon: Moon,
    prompt: "What is a natural bedtime remedy or golden milk recipe to help fall asleep fast?",
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-300 border-indigo-500/30",
  },
  {
    label: "Acne & Skin Care",
    icon: Sparkles,
    prompt: "What natural face pack or neem aloe vera remedy helps cure acne pimples?",
    color: "from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    label: "Joint & Muscle Pain",
    icon: Activity,
    prompt: "What warm herbal oil massage or compress works best for joint and muscle stiffness?",
    color: "from-cyan-500/20 to-emerald-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    label: "Immunity Kadha",
    icon: HeartPulse,
    prompt: "How to prepare an herbal Ayurvedic Kadha tea to boost daily immunity?",
    color: "from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/30",
  },
];

export const SymptomPills = ({ onSelectSymptom }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
          🌱 Popular Ailment Quick Remedies
        </h3>
        <span className="text-xs text-emerald-500/60">Click to ask RemedyBot</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SYMPTOMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectSymptom(item.prompt)}
              className={`group flex items-center gap-2 rounded-xl bg-gradient-to-r ${item.color} border px-3.5 py-2 text-xs font-medium backdrop-blur-sm transition-all hover:scale-[1.03] hover:shadow-lg active:scale-95`}
            >
              <Icon className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
