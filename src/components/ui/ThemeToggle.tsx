"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const dark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches);

    setIsDark(dark);

    document.documentElement.classList.toggle(
      "dark",
      dark
    );

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;

    setIsDark(newDark);

    document.documentElement.classList.toggle(
      "dark",
      newDark
    );

    localStorage.setItem(
      "theme",
      newDark ? "dark" : "light"
    );
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      aria-pressed={isDark}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-lg
        border
        border-gray-200
        bg-white
        text-gray-700
        transition-all
        duration-200
        hover:bg-gray-100
        focus:outline-none
        focus:ring-2
        focus:ring-gray-900
        focus:ring-offset-2

        dark:border-gray-700
        dark:bg-gray-900
        dark:text-gray-200
        dark:hover:bg-gray-800
        dark:focus:ring-gray-300
        dark:focus:ring-offset-gray-950
      "
    >
      {!mounted ? (
        <span className="h-5 w-5" />
      ) : isDark ? (
        /* SUN */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <circle
            cx="12"
            cy="12"
            r="4"
          />

          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        /* MOON */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}