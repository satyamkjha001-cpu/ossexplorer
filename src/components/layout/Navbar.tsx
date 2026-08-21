"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  {
    href: "/projects",
    label: "Projects",
    match: (path: string) => path.startsWith("/projects"),
  },
  {
    href: "/saved",
    label: "Saved",
    match: (path: string) => path.startsWith("/saved"),
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
        sticky top-0 z-50 border-b border-gray-200 bg-white/95
        backdrop-blur-md transition-colors duration-200
        dark:border-gray-800 dark:bg-gray-950/95
      "
      aria-label="Main navigation"
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="
            min-w-0 shrink-0 text-lg font-bold tracking-tight text-gray-900
            transition-colors hover:text-gray-600
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
            dark:text-white dark:hover:text-gray-300
            dark:focus:ring-white dark:focus:ring-offset-gray-950
            sm:text-xl
          "
        >
          <span className="hidden sm:inline">Open Source Explorer</span>
          <span className="sm:hidden">OS Explorer</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex sm:gap-2">
          {navLinks.map((link) => {
            const active = link.match(pathname);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  `
                    rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                    dark:focus:ring-white dark:focus:ring-offset-gray-950
                  `,
                  active
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="ml-2 border-l border-gray-200 pl-3 dark:border-gray-800">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="
              inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg
              border border-gray-200 text-gray-700 transition-colors
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800
              dark:focus:ring-white
            "
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="
            border-t border-gray-200 bg-white px-4 py-3
            motion-safe:animate-fade-in dark:border-gray-800 dark:bg-gray-950
            sm:hidden
          "
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = link.match(pathname);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      `
                        flex min-h-11 items-center rounded-lg px-3 text-sm font-medium
                        transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900
                        dark:focus:ring-white
                      `,
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    )}
                  >
                    {link.label}
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
