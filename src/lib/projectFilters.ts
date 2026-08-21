import {
  projects,
  type Project,
} from "@/data/projects";

export type SortOption =
  | "relevance"
  | "stars-desc"
  | "stars-asc"
  | "date-desc"
  | "name-asc"
  | "name-desc";

export const DIFFICULTIES = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const SORT_OPTIONS: SortOption[] = [
  "relevance",
  "stars-desc",
  "stars-asc",
  "date-desc",
  "name-asc",
  "name-desc",
];

export const SORT_LABELS: Record<
  SortOption,
  string
> = {
  relevance: "Relevance",
  "stars-desc": "Most Stars",
  "stars-asc": "Least Stars",
  "date-desc": "Recently Added",
  "name-asc": "A → Z",
  "name-desc": "Z → A",
};

export type ProjectFilterState = {
  searchQuery: string;
  selectedDomain: string;
  selectedTechnologies: string[];
  selectedDifficulty: string;
  sortOption: SortOption;
};

/* ========================================
   SORT OPTION
======================================== */

export function parseSortOption(
  value: string | null
): SortOption {
  if (
    value &&
    SORT_OPTIONS.includes(
      value as SortOption
    )
  ) {
    return value as SortOption;
  }

  return "relevance";
}

/* ========================================
   UNIQUE DOMAINS
======================================== */

export function getUniqueDomains(): string[] {
  return [
    "All",
    ...new Set(
      projects.map(
        (project) => project.domain
      )
    ),
  ];
}

/* ========================================
   UNIQUE TECHNOLOGIES
======================================== */

export function getUniqueTechnologies(): string[] {
  return Array.from(
    new Set(
      projects.flatMap(
        (project) =>
          project.technologies
      )
    )
  ).sort();
}

/* ========================================
   FILTER PROJECTS
======================================== */

export function filterProjects(
  items: Project[],
  filters: ProjectFilterState
): Project[] {
  const query =
    filters.searchQuery
      .toLowerCase()
      .trim();

  return items.filter((project) => {
    /* SEARCH */

    const matchesSearch =
      !query ||
      project.name
        .toLowerCase()
        .includes(query) ||
      project.description
        .toLowerCase()
        .includes(query) ||
      project.domain
        .toLowerCase()
        .includes(query) ||
      project.technologies.some(
        (technology) =>
          technology
            .toLowerCase()
            .includes(query)
      );

    /* DOMAIN */

    const matchesDomain =
      filters.selectedDomain ===
        "All" ||
      project.domain ===
        filters.selectedDomain;

    /* TECHNOLOGY */

    const matchesTechnology =
      filters.selectedTechnologies
        .length === 0 ||
      filters.selectedTechnologies.some(
        (technology) =>
          project.technologies.includes(
            technology
          )
      );

    /* DIFFICULTY */

    const matchesDifficulty =
      filters.selectedDifficulty ===
        "All" ||
      project.difficulty ===
        filters.selectedDifficulty;

    return (
      matchesSearch &&
      matchesDomain &&
      matchesTechnology &&
      matchesDifficulty
    );
  });
}

/* ========================================
   SORT PROJECTS
======================================== */

export function sortProjects(
  items: Project[],
  sortOption: SortOption
): Project[] {
  if (sortOption === "relevance") {
    return items;
  }

  return [...items].sort(
    (a, b) => {
      switch (sortOption) {
        case "stars-desc":
          return b.stars - a.stars;

        case "stars-asc":
          return a.stars - b.stars;

        case "date-desc":
          return (
            new Date(
              b.dateAdded
            ).getTime() -
            new Date(
              a.dateAdded
            ).getTime()
          );

        case "name-asc":
          return a.name.localeCompare(
            b.name
          );

        case "name-desc":
          return b.name.localeCompare(
            a.name
          );

        default:
          return 0;
      }
    }
  );
}

/* ========================================
   COUNT ACTIVE FILTERS
======================================== */

export function countActiveFilters(
  filters: ProjectFilterState
): number {
  let count = 0;

  if (
    filters.searchQuery.trim()
  ) {
    count++;
  }

  if (
    filters.selectedDomain !==
    "All"
  ) {
    count++;
  }

  count +=
    filters.selectedTechnologies
      .length;

  if (
    filters.selectedDifficulty !==
    "All"
  ) {
    count++;
  }

  if (
    filters.sortOption !==
    "relevance"
  ) {
    count++;
  }

  return count;
}

/* ========================================
   HAS ACTIVE FILTERS
======================================== */

export function hasActiveFilters(
  filters: ProjectFilterState
): boolean {
  return (
    countActiveFilters(filters) >
    0
  );
}

/* ========================================
   URL UPDATE PARAMS
======================================== */

type UrlUpdateParams = {
  search?: string;
  domain?: string;
  technologies?: string[];
  difficulty?: string;
  sort?: SortOption;
};

/* ========================================
   BUILD URL SEARCH PARAMS
======================================== */

export function buildProjectSearchParams(
  currentParams: URLSearchParams,
  updates: UrlUpdateParams
): URLSearchParams {
  const params =
    new URLSearchParams(
      currentParams.toString()
    );

  /* SEARCH */

  if (
    updates.search !== undefined
  ) {
    if (
      updates.search.trim()
    ) {
      params.set(
        "search",
        updates.search.trim()
      );
    } else {
      params.delete("search");
    }
  }

  /* DOMAIN */

  if (
    updates.domain !== undefined
  ) {
    if (
      updates.domain &&
      updates.domain !== "All"
    ) {
      params.set(
        "domain",
        updates.domain
      );
    } else {
      params.delete("domain");
    }
  }

  /* TECHNOLOGIES */

  if (
    updates.technologies !==
    undefined
  ) {
    params.delete(
      "technology"
    );

    updates.technologies.forEach(
      (technology) => {
        params.append(
          "technology",
          technology
        );
      }
    );
  }

  /* DIFFICULTY */

  if (
    updates.difficulty !==
    undefined
  ) {
    if (
      updates.difficulty &&
      updates.difficulty !==
        "All"
    ) {
      params.set(
        "difficulty",
        updates.difficulty
      );
    } else {
      params.delete(
        "difficulty"
      );
    }
  }

  /* SORT */

  if (
    updates.sort !== undefined
  ) {
    if (
      updates.sort !==
      "relevance"
    ) {
      params.set(
        "sort",
        updates.sort
      );
    } else {
      params.delete("sort");
    }
  }

  return params;
}