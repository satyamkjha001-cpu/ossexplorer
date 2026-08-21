import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Open Source Project Explorer
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Discover projects worth contributing to.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-5">
              <li>
                <Link
                  href="/"
                  className="
                    text-sm text-gray-600 transition-colors hover:text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                    dark:text-gray-400 dark:hover:text-white
                    dark:focus:ring-white dark:focus:ring-offset-gray-950
                  "
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="
                    text-sm text-gray-600 transition-colors hover:text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                    dark:text-gray-400 dark:hover:text-white
                    dark:focus:ring-white dark:focus:ring-offset-gray-950
                  "
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="
                    text-sm text-gray-600 transition-colors hover:text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                    dark:text-gray-400 dark:hover:text-white
                    dark:focus:ring-white dark:focus:ring-offset-gray-950
                  "
                >
                  Saved
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          © {currentYear} Open Source Project Explorer. Built for learning and
          exploration.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
