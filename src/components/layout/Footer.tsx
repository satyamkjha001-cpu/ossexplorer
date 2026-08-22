import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/80 bg-white dark:border-gray-800/80 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-sm font-bold text-white shadow-2xs">
                ⚡
              </div>
              <span className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white">
                OS Explorer
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              A curated discovery platform for developers to explore, bookmark, and contribute to world-class open-source projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Categories
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/projects?domain=AI%2FML" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/projects?domain=Web+Development" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/projects?domain=Backend" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
                  Backend Systems
                </Link>
              </li>
              <li>
                <Link href="/projects?beginnerFriendly=true" className="hover:text-blue-600 transition-colors dark:hover:text-blue-400">
                  Beginner Friendly
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {currentYear} Open Source Explorer. Built for developers worldwide.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Press <kbd className="rounded border px-1 py-0.2 font-mono text-[10px]">⌘K</kbd> anywhere to search
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
