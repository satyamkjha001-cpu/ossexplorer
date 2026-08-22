"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const POPULAR_SEARCH_TAGS = [
  { label: "🤖 AI & ML", query: "AI" },
  { label: "⚡ Next.js", query: "Next.js" },
  { label: "🌱 Good First Issue", filter: "goodFirstIssue=true" },
  { label: "🔰 Beginner Friendly", filter: "beginnerFriendly=true" },
  { label: "🦀 Rust", query: "Rust" },
  { label: "🐍 Python", query: "Python" },
  { label: "🌟 >1K Stars", filter: "minStars=1000" },
];

const Hero = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/projects?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/projects");
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
      <ScrollReveal>
        <Badge
          variant="default"
          size="md"
          className="mb-6 inline-flex items-center gap-1.5 border border-blue-200/60 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-900 shadow-2xs dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Curated Open Source Directory
        </Badge>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Discover Open Source Projects{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Worth Building
          </span>
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg sm:leading-8">
          Explore hundreds of open-source projects by domain, technology, and
          difficulty. Find projects matching your stack and start contributing today.
        </p>
      </ScrollReveal>

      {/* Hero Interactive Search Bar */}
      <ScrollReveal delay={220} className="w-full max-w-2xl mt-8">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <div className="relative flex items-center rounded-2xl border border-gray-300/80 bg-white/95 p-1.5 shadow-lg shadow-gray-200/40 backdrop-blur-md transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-900/90 dark:shadow-black/50 dark:focus-within:border-blue-500">
            <div className="pointer-events-none pl-3.5 pr-2 text-gray-400 dark:text-gray-500">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects by name, tech (React, Python, AI)..."
              className="h-12 w-full bg-transparent px-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none dark:text-gray-100 dark:placeholder:text-gray-500 sm:text-base"
            />

            <Button
              type="submit"
              size="md"
              className="shrink-0 rounded-xl px-5 font-semibold shadow-xs"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Popular Quick Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            Trending:
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => {
                if (tag.filter) {
                  router.push(`/projects?${tag.filter}`);
                } else if (tag.query) {
                  router.push(`/projects?search=${encodeURIComponent(tag.query)}`);
                }
              }}
              className="
                inline-flex items-center rounded-lg border border-gray-200/80 bg-white/80
                px-2.5 py-1 text-xs font-medium text-gray-700 shadow-2xs transition-all
                hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700
                dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-300
                dark:hover:border-blue-700 dark:hover:bg-blue-950/60 dark:hover:text-blue-300
              "
            >
              {tag.label}
            </button>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
