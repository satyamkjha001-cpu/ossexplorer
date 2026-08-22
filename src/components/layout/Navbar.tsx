"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import ThemeToggle from "@/components/ui/ThemeToggle";
import { getBookmarkSnapshot, subscribeToBookmarks } from "@/lib/bookmarks";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  {
    href: "/projects",
    label: "Explore Projects",
    match: (path: string) => path.startsWith("/projects"),
  },
  {
    href: "/saved",
    label: "Saved",
    match: (path: string) => path.startsWith("/saved"),
    showBadge: true,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Read saved bookmarks count live
  const bookmarkSnapshot = useSyncExternalStore(
    subscribeToBookmarks,
    getBookmarkSnapshot,
    () => ""
  );

  let savedCount = 0;
  try {
    const parsed = bookmarkSnapshot ? JSON.parse(bookmarkSnapshot) : [];
    savedCount = Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    savedCount = 0;
  }

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <nav
      className="
        sticky top-0 z-50 border-b border-gray-200/80 bg-white/80
        backdrop-blur-xl transition-colors duration-200
        dark:border-gray-800/80 dark:bg-gray-950/80
      "
      aria-label="Main navigation"
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand Logo with Glowing Icon */}
        <Link
          href="/"
          className="
            group flex items-center gap-2.5 outline-none
          "
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-transform duration-200 group-hover:scale-105">
            <span className="text-base font-black">⚡</span>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-lg">
              OS Explorer
            </span>
            <span className="hidden text-[10px] font-medium tracking-wider uppercase text-gray-400 dark:text-gray-500 sm:block -mt-1">
              Open Source Directory
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-1.5 sm:flex">
          {navLinks.map((link) => {
            const active = link.match(pathname);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-blue-50 text-blue-700 font-semibold dark:bg-blue-950/60 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-white"
                )}
              >
                <span>{link.label}</span>

                {/* Bookmark Counter Badge */}
                {link.showBadge && savedCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-bold text-white shadow-2xs">
                    {savedCount}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="ml-2 border-l border-gray-200 pl-3 dark:border-gray-800">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="
              inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl
              border border-gray-200 text-gray-700 transition-colors
              hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800
            "
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="
            border-t border-gray-200 bg-white/95 px-4 py-4
            backdrop-blur-xl motion-safe:animate-fade-in
            dark:border-gray-800 dark:bg-gray-950/95 sm:hidden
          "
        >
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = link.match(pathname);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-medium transition-colors",
                      active
                        ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    )}
                  >
                    <span>{link.label}</span>
                    {link.showBadge && savedCount > 0 && (
                      <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                        {savedCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
