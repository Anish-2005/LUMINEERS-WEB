"use client";

import Link from "next/link";
import { Camera, Globe2, NotebookPen, Users } from "lucide-react";

const highlightCards = [
  {
    title: "Narrative-led Publishing",
    description: "Create long-form stories with visual sections, curated pacing, and clean reading surfaces.",
    icon: NotebookPen,
  },
  {
    title: "Community Discovery",
    description: "Readers can filter by themes, discover creators, and follow the journeys that match their interests.",
    icon: Users,
  },
  {
    title: "Visual Story Collections",
    description: "Combine photography, destination context, and practical notes into reusable trip journals.",
    icon: Camera,
  },
];

const metrics = [
  { label: "Published Stories", value: "1.2k+" },
  { label: "Monthly Readers", value: "48k" },
  { label: "Contributing Authors", value: "380+" },
  { label: "Destinations Covered", value: "95" },
];

export default function FeaturedJourneys() {
  return (
    <section className="pb-16 pt-8 sm:pb-24">
      <div className="container-shell">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title">Designed for modern travel publishing teams</h2>
            <p className="section-subtitle">
              Build a professional storytelling brand with consistent layouts, strong readability, and clear content
              discovery.
            </p>
          </div>
          <Link href="/blogs" className="btn-ghost w-fit">
            View all journals
            <Globe2 size={15} />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {highlightCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="surface p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-100">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{card.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-4 text-center">
              <p className="text-2xl font-semibold text-white">{metric.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
