"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, {
  defaultSchema,
} from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import type { Element } from "hast";
import type { Schema } from "hast-util-sanitize";

type ReadmeRendererProps = {
  readme: string | null;
  githubUrl: string;
  defaultBranch?: string;
};

type GitHubRepositoryInfo = {
  owner: string;
  repo: string;
  branch: string;
};

/* ========================================
   GITHUB REPOSITORY PARSER
======================================== */

function parseGitHubRepository(
  githubUrl: string,
  defaultBranch = "main"
): GitHubRepositoryInfo | null {
  try {
    const url = new URL(githubUrl);

    if (url.hostname !== "github.com") {
      return null;
    }

    const parts = url.pathname
      .split("/")
      .filter(Boolean);

    if (parts.length < 2) {
      return null;
    }

    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, ""),
      branch: defaultBranch,
    };
  } catch {
    return null;
  }
}

/* ========================================
   URL HELPERS
======================================== */

function isAbsoluteUrl(value: string) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//") ||
    value.startsWith("data:") ||
    value.startsWith("mailto:") ||
    value.startsWith("#")
  );
}

function cleanRelativePath(value: string) {
  return value
    .replace(/^\.\//, "")
    .replace(/^\/+/, "");
}

/* ========================================
   RESOLVE README LINK
======================================== */

function resolveReadmeLink(
  href: string | undefined,
  repository: GitHubRepositoryInfo | null
): string | undefined {
  if (!href) {
    return undefined;
  }

  if (isAbsoluteUrl(href)) {
    return href;
  }

  if (!repository) {
    return href;
  }

  /*
   * Preserve README anchors.
   *
   * Example:
   * #installation
   */
  if (href.startsWith("#")) {
    return href;
  }

  /*
   * Handle relative links:
   *
   * CONTRIBUTING.md
   * ./CONTRIBUTING.md
   * docs/setup.md
   */
  const [pathPart, hashPart] =
    href.split("#");

  const cleanPath =
    cleanRelativePath(pathPart);

  const url =
    `https://github.com/${repository.owner}/${repository.repo}/blob/${encodeURIComponent(
      repository.branch
    )}/${cleanPath}`;

  return hashPart
    ? `${url}#${hashPart}`
    : url;
}

/* ========================================
   RESOLVE README IMAGE
======================================== */

function resolveReadmeImage(
  src: string | undefined,
  repository: GitHubRepositoryInfo | null
): string | undefined {
  if (!src) {
    return undefined;
  }

  if (isAbsoluteUrl(src)) {
    return src;
  }

  if (!repository) {
    return src;
  }

  /*
   * GitHub raw content URL.
   *
   * Example:
   *
   * ./docs/dashboard.png
   *
   * becomes:
   *
   * https://raw.githubusercontent.com/
   * owner/repo/branch/docs/dashboard.png
   */
  const cleanPath =
    cleanRelativePath(src);

  return (
    `https://raw.githubusercontent.com/` +
    `${repository.owner}/` +
    `${repository.repo}/` +
    `${encodeURIComponent(repository.branch)}/` +
    cleanPath
  );
}

/* ========================================
   SANITIZATION SCHEMA
======================================== */

const readmeSanitizeSchema: Schema = {
  ...defaultSchema,

  attributes: {
    ...defaultSchema.attributes,

    /*
     * GitHub READMEs commonly use:
     *
     * <div align="center">
     *
     * We explicitly allow align.
     */
    div: [
      ...(defaultSchema.attributes?.div ?? []),
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
    ],

    p: [
      ...(defaultSchema.attributes?.p ?? []),
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
    ],

    h1: [
      ...(defaultSchema.attributes?.h1 ?? []),
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
    ],

    h2: [
      ...(defaultSchema.attributes?.h2 ?? []),
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
    ],

    h3: [
      ...(defaultSchema.attributes?.h3 ?? []),
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
    ],

    h4: [
      ...(defaultSchema.attributes?.h4 ?? []),
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
    ],

    ul: [
      ...(defaultSchema.attributes?.ul ?? []),
      ["style", /^list-style:\s*none;?\s*$/],
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
    ],

    ol: [
      ...(defaultSchema.attributes?.ol ?? []),
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
    ],

    img: [
      ...(defaultSchema.attributes?.img ?? []),
      ["align", "center"],
      ["align", "left"],
      ["align", "right"],
      ["width"],
      ["height"],
    ],

    a: [
      ...(defaultSchema.attributes?.a ?? []),
      ["target"],
      ["rel"],
    ],
  },
};

/* ========================================
   ALIGNMENT
======================================== */

function alignmentClass(
  align?: string
): string {
  switch (align) {
    case "center":
      return "text-center";

    case "right":
      return "text-right";

    case "left":
      return "text-left";

    default:
      return "";
  }
}

/* ========================================
   GET ALIGNMENT
======================================== */

function getAlignFromNode(
  node?: Element
): string | undefined {
  const align = node?.properties?.align;

  if (typeof align === "string") {
    return align;
  }

  if (
    Array.isArray(align) &&
    typeof align[0] === "string"
  ) {
    return align[0];
  }

  return undefined;
}

/* ========================================
   IMAGE SRC
======================================== */

function getImageSrc(
  src: string | Blob | undefined
): string | undefined {
  return typeof src === "string"
    ? src
    : undefined;
}

/* ========================================
   BADGE DETECTION
======================================== */

function isBadgeImage(
  src: string | undefined
): boolean {
  if (!src) {
    return false;
  }

  try {
    const { hostname } =
      new URL(src);

    return (
      hostname === "img.shields.io" ||
      hostname.endsWith(".shields.io") ||
      hostname === "badgen.net" ||
      hostname.endsWith(".badgen.net")
    );
  } catch {
    return (
      src.includes("shields.io") ||
      src.includes("badgen.net")
    );
  }
}

/* ========================================
   IMAGE WIDTH
======================================== */

function parseWidth(
  width: string | number | undefined
): number | undefined {
  if (width === undefined) {
    return undefined;
  }

  const parsed =
    Number.parseInt(
      String(width),
      10
    );

  return Number.isFinite(parsed) &&
    parsed > 0
    ? parsed
    : undefined;
}

/* ========================================
   README STYLING
======================================== */

const readmeProseClassName = `
  readme-content
  max-w-none
  text-sm
  leading-7
  text-gray-700
  dark:text-gray-300

  [&_h1]:mb-4
  [&_h1]:mt-0
  [&_h1]:text-3xl
  [&_h1]:font-bold
  [&_h1]:leading-tight
  [&_h1]:tracking-tight
  [&_h1]:text-gray-900
  dark:[&_h1]:text-white

  [&_h2]:mb-4
  [&_h2]:mt-10
  [&_h2]:border-b
  [&_h2]:border-gray-200
  [&_h2]:pb-2
  [&_h2]:text-2xl
  [&_h2]:font-bold
  [&_h2]:text-gray-900
  dark:[&_h2]:border-gray-800
  dark:[&_h2]:text-white

  [&_h3]:mb-3
  [&_h3]:mt-8
  [&_h3]:text-xl
  [&_h3]:font-semibold
  [&_h3]:text-gray-900
  dark:[&_h3]:text-white

  [&_h4]:mb-2
  [&_h4]:mt-6
  [&_h4]:text-base
  [&_h4]:font-semibold
  [&_h4]:text-gray-900
  dark:[&_h4]:text-white

  [&_h4[data-align=center]]:mx-auto
  [&_h4[data-align=center]]:max-w-2xl
  [&_h4[data-align=center]]:font-normal
  [&_h4[data-align=center]]:leading-relaxed
  [&_h4[data-align=center]]:text-gray-600
  dark:[&_h4[data-align=center]]:text-gray-400

  [&_p]:my-4

  [&_a]:rounded-sm
  [&_a]:font-medium
  [&_a]:text-blue-600
  [&_a]:underline
  [&_a]:underline-offset-2
  [&_a]:transition-colors
  hover:[&_a]:text-blue-700
  focus-visible:[&_a]:outline-none
  focus-visible:[&_a]:ring-2
  focus-visible:[&_a]:ring-blue-500
  focus-visible:[&_a]:ring-offset-2
  dark:[&_a]:text-blue-400
  dark:hover:[&_a]:text-blue-300

  [&_div[data-align=center]>a]:mx-2
  [&_div[data-align=center]>a]:my-1
  [&_div[data-align=center]>a]:inline-block
  [&_div[data-align=center]>a]:no-underline

  [&_ul]:my-4
  [&_ul]:list-disc
  [&_ul]:space-y-2
  [&_ul]:pl-6

  [&_div[data-align=center]_ul]:list-none
  [&_div[data-align=center]_ul]:space-y-0
  [&_div[data-align=center]_ul]:pl-0

  [&_ol]:my-4
  [&_ol]:list-decimal
  [&_ol]:space-y-2
  [&_ol]:pl-6

  [&_ul.contains-task-list]:list-none
  [&_ul.contains-task-list]:pl-0
  [&_li.task-list-item]:list-none
  [&_li.task-list-item]:pl-0
  [&_input[type=checkbox]]:mr-2
  [&_input[type=checkbox]]:align-middle

  [&_li]:pl-1

  [&_blockquote]:my-5
  [&_blockquote]:rounded-r-lg
  [&_blockquote]:border-l-4
  [&_blockquote]:border-gray-300
  [&_blockquote]:bg-gray-50
  [&_blockquote]:px-4
  [&_blockquote]:py-3
  [&_blockquote]:text-gray-600
  dark:[&_blockquote]:border-gray-600
  dark:[&_blockquote]:bg-gray-900/50
  dark:[&_blockquote]:text-gray-400

  [&_hr]:my-8
  [&_hr]:border-0
  [&_hr]:border-t
  [&_hr]:border-gray-200
  dark:[&_hr]:border-gray-800

  [&_details]:my-5
  [&_details]:rounded-lg
  [&_details]:border
  [&_details]:border-gray-200
  [&_details]:bg-gray-50
  [&_details]:px-4
  [&_details]:py-3
  dark:[&_details]:border-gray-700
  dark:[&_details]:bg-gray-900/40

  [&_summary]:cursor-pointer
  [&_summary]:font-medium
  [&_summary]:text-gray-900
  [&_summary]:select-none
  dark:[&_summary]:text-white

  [&_table]:w-full
  [&_table]:min-w-full
  [&_table]:border-collapse
  [&_table]:text-left

  [&_thead]:bg-gray-50
  dark:[&_thead]:bg-gray-800/80

  [&_th]:border
  [&_th]:border-gray-200
  [&_th]:px-4
  [&_th]:py-3
  [&_th]:font-semibold
  [&_th]:text-gray-900
  dark:[&_th]:border-gray-700
  dark:[&_th]:text-white

  [&_td]:border
  [&_td]:border-gray-200
  [&_td]:px-4
  [&_td]:py-3
  dark:[&_td]:border-gray-700

  [&_code]:rounded
  [&_code]:bg-gray-100
  [&_code]:px-1.5
  [&_code]:py-0.5
  [&_code]:font-mono
  [&_code]:text-[0.9em]
  [&_code]:text-gray-800
  dark:[&_code]:bg-gray-800
  dark:[&_code]:text-gray-200

  [&_pre]:my-6
  [&_pre]:overflow-x-auto
  [&_pre]:rounded-xl
  [&_pre]:bg-gray-950
  [&_pre]:p-5
  [&_pre]:font-mono
  [&_pre]:text-sm
  [&_pre]:leading-6
  [&_pre]:text-gray-100

  [&_pre_code]:bg-transparent
  [&_pre_code]:p-0
  [&_pre_code]:text-inherit
`;

/* ========================================
   COMPONENT FACTORY
======================================== */

function createReadmeComponents(
  repository: GitHubRepositoryInfo | null
): Components {
  return {
    /* ======================================
       DIV
    ====================================== */

    div: ({
      children,
      node,
      ...props
    }) => {
      const align =
        getAlignFromNode(node);

      return (
        <div
          {...props}
          data-align={align}
          className={[
            alignmentClass(align),

            align === "center"
              ? `
                [&>img]:mx-1
                [&>img]:my-1
                [&>img]:inline-block
              `
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      );
    },

    /* ======================================
       H1
    ====================================== */

    h1: ({
      children,
      node,
      ...props
    }) => {
      const align =
        getAlignFromNode(node);

      return (
        <h1
          {...props}
          data-align={align}
          className={alignmentClass(
            align
          )}
        >
          {children}
        </h1>
      );
    },

    /* ======================================
       H2
    ====================================== */

    h2: ({
      children,
      node,
      ...props
    }) => {
      const align =
        getAlignFromNode(node);

      return (
        <h2
          {...props}
          data-align={align}
          className={alignmentClass(
            align
          )}
        >
          {children}
        </h2>
      );
    },

    /* ======================================
       H3
    ====================================== */

    h3: ({
      children,
      node,
      ...props
    }) => {
      const align =
        getAlignFromNode(node);

      return (
        <h3
          {...props}
          data-align={align}
          className={alignmentClass(
            align
          )}
        >
          {children}
        </h3>
      );
    },

    /* ======================================
       H4
    ====================================== */

    h4: ({
      children,
      node,
      ...props
    }) => {
      const align =
        getAlignFromNode(node);

      return (
        <h4
          {...props}
          data-align={align}
          className={alignmentClass(
            align
          )}
        >
          {children}
        </h4>
      );
    },

    /* ======================================
       P
    ====================================== */

    p: ({
      children,
      node,
      ...props
    }) => {
      const align =
        getAlignFromNode(node);

      return (
        <p
          {...props}
          data-align={align}
          className={alignmentClass(
            align
          )}
        >
          {children}
        </p>
      );
    },

    /* ======================================
       LINKS
    ====================================== */

    a: ({
      href,
      children,
      ...props
    }) => {
      const resolvedHref =
        resolveReadmeLink(
          href,
          repository
        );

      return (
        <a
          {...props}
          href={resolvedHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },

    /* ======================================
       IMAGES
    ====================================== */

    img: ({
      src,
      alt,
      width,
      height,
      node,
      className,
      style,
      ...props
    }) => {
      const originalSrc =
        getImageSrc(src);

      if (!originalSrc) {
        return null;
      }

      const srcString =
        resolveReadmeImage(
          originalSrc,
          repository
        );

      if (!srcString) {
        return null;
      }

      const align =
        getAlignFromNode(node);

      const requestedWidth =
        parseWidth(width);

      const badge =
        isBadgeImage(srcString);

      /* ==============================
         BADGES
      ============================== */

      if (badge) {
        return (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            {...props}
            src={srcString}
            alt={alt ?? ""}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className={[
              `
                my-1
                inline-block
                h-auto
                max-h-6
                w-auto
                align-middle
              `,
              className,
            ]
              .filter(Boolean)
              .join(" ")}
          />
        );
      }

      /* ==============================
         NORMAL IMAGE
      ============================== */

      return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          {...props}
          src={srcString}
          alt={alt ?? ""}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          data-align={align}
          style={{
            ...style,

            maxWidth: requestedWidth
              ? `${requestedWidth}px`
              : "100%",

            width: requestedWidth
              ? "100%"
              : "auto",

            height: "auto",
          }}
          className={[
            `
              my-5
              h-auto
              max-w-full
              rounded-lg
            `,

            alignmentClass(align),

            requestedWidth
              ? "mx-auto"
              : "",

            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      );
    },

    /* ======================================
       TABLE
    ====================================== */

    table: ({
      children,
      ...props
    }) => (
      <div className="my-6 overflow-x-auto">
        <table {...props}>
          {children}
        </table>
      </div>
    ),

    /* ======================================
       UL
    ====================================== */

    ul: ({
      children,
      node,
      className,
      ...props
    }) => {
      const align =
        getAlignFromNode(node);

      return (
        <ul
          {...props}
          data-align={align}
          className={[
            alignmentClass(align),
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </ul>
      );
    },

    /* ======================================
       OL
    ====================================== */

    ol: ({
      children,
      node,
      className,
      ...props
    }) => {
      const align =
        getAlignFromNode(node);

      return (
        <ol
          {...props}
          data-align={align}
          className={[
            alignmentClass(align),
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </ol>
      );
    },
  };
}

/* ========================================
   COMPONENT
======================================== */

function ReadmeRenderer({
  readme,
  githubUrl,
  defaultBranch = "main",
}: ReadmeRendererProps) {
  if (!readme) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-gray-300
          p-6
          text-sm
          text-gray-500
          dark:border-gray-700
          dark:text-gray-400
        "
      >
        README information is not available
        for this repository.
      </div>
    );
  }

  const repository =
    parseGitHubRepository(
      githubUrl,
      defaultBranch
    );

  const components =
    createReadmeComponents(
      repository
    );

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        dark:border-gray-800
        dark:bg-gray-950
      "
    >
      {/* README HEADER */}

      <div
        className="
          border-b
          border-gray-200
          bg-gray-50
          px-5
          py-4
          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          README.md
        </p>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Official repository documentation
        </p>
      </div>

      {/* README CONTENT */}

      <article
        className={`
          ${readmeProseClassName}

          overflow-x-auto

          px-5
          py-6

          sm:px-8
          sm:py-8
        `}
      >
        <ReactMarkdown
          remarkPlugins={[
            remarkGfm,
          ]}
          rehypePlugins={[
            rehypeRaw,
            [
              rehypeSanitize,
              readmeSanitizeSchema,
            ],
          ]}
          components={components}
        >
          {readme}
        </ReactMarkdown>
      </article>
    </div>
  );
}

export default ReadmeRenderer;