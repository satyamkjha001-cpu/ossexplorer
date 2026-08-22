import { projects, type Project } from "@/data/projects";

export type SortOption =
  | "relevance"
  | "stars-desc"
  | "stars-asc"
  | "date-desc"
  | "name-asc"
  | "name-desc";

export type TechnologyMatchMode =
  | "any"
  | "all";

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
  technologyMatchMode: TechnologyMatchMode;
  beginnerFriendly?: boolean;
  goodFirstIssue?: boolean;
  minStars?: number;
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
        (project) => project.technologies
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

  /*
   * Split the search into individual words.
   *
   * Example:
   * "react typescript"
   *
   * becomes:
   * ["react", "typescript"]
   */

  const searchTerms = query
    ? query.split(/\s+/)
    : [];

  return items.filter((project) => {
    /* ========================================
       SEARCH
    ======================================== */

    const searchableText = [
      project.name,
      project.description,
      project.domain,
      ...project.technologies,
    ]
      .join(" ")
      .toLowerCase();

    /*
     * Every search term must exist somewhere
     * in the project information.
     */

    const matchesSearch =
      searchTerms.length === 0 ||
      searchTerms.every((term) =>
        searchableText.includes(term)
      );

    /* ========================================
       DOMAIN
    ======================================== */

    const matchesDomain =
      filters.selectedDomain === "All" ||
      project.domain ===
        filters.selectedDomain;

    /* ========================================
       TECHNOLOGY
    ======================================== */

    const matchesTechnology =
      filters.selectedTechnologies
        .length === 0
        ? true
        : filters.technologyMatchMode ===
          "all"
        ? filters.selectedTechnologies.every(
            (technology) =>
              project.technologies.includes(
                technology
              )
          )
        : filters.selectedTechnologies.some(
            (technology) =>
              project.technologies.includes(
                technology
              )
          );

    /* ========================================
       DIFFICULTY
    ======================================== */

    const matchesDifficulty =
      filters.selectedDifficulty ===
        "All" ||
      project.difficulty ===
        filters.selectedDifficulty;

    /* ========================================
       QUICK PRESET FILTERS
    ======================================== */

    const matchesBeginnerFriendly =
      !filters.beginnerFriendly ||
      project.beginnerFriendly === true;

    const matchesGoodFirstIssue =
      !filters.goodFirstIssue ||
      project.goodFirstIssue === true;

    const matchesMinStars =
      !filters.minStars ||
      project.stars >= filters.minStars;

    return (
      matchesSearch &&
      matchesDomain &&
      matchesTechnology &&
      matchesDifficulty &&
      matchesBeginnerFriendly &&
      matchesGoodFirstIssue &&
      matchesMinStars
    );
  });
}

/* ========================================
   SORT PROJECTS
======================================== */

export function sortProjects(
  items: Project[],
  sortOption: SortOption,
  searchQuery: string = ""
): Project[] {
  /* ========================================
     RELEVANCE
  ======================================== */

  if (sortOption === "relevance") {
    const query =
      searchQuery
        .toLowerCase()
        .trim();

    /*
     * If there is no search query,
     * preserve the original order.
     */

    if (!query) {
      return items;
    }

    const searchTerms =
      query.split(/\s+/);

    const getRelevanceScore = (
      project: Project
    ): number => {
      let score = 0;

      const name =
        project.name.toLowerCase();

      const description =
        project.description.toLowerCase();

      const domain =
        project.domain.toLowerCase();

      const technologies =
        project.technologies.map(
          (technology) =>
            technology.toLowerCase()
        );

      /*
       * Exact project name
       */

      if (name === query) {
        score += 100;
      }

      /*
       * Project name contains
       * the complete query.
       */

      else if (name.includes(query)) {
        score += 50;
      }

      /*
       * Score every individual
       * search term.
       */

      for (const term of searchTerms) {
        /*
         * Name match
         */

        if (name.includes(term)) {
          score += 20;
        }

        /*
         * Technology match
         */

        if (
          technologies.some(
            (technology) =>
              technology.includes(term)
          )
        ) {
          score += 15;
        }

        /*
         * Domain match
         */

        if (
          domain.includes(term)
        ) {
          score += 10;
        }

        /*
         * Description match
         */

        if (
          description.includes(term)
        ) {
          score += 5;
        }
      }

      return score;
    };

    return [...items].sort(
      (a, b) => {
        const scoreA =
          getRelevanceScore(a);

        const scoreB =
          getRelevanceScore(b);

        /*
         * Higher relevance first.
         */

        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }

        /*
         * If relevance is equal,
         * use stars as a tie-breaker.
         */

        return b.stars - a.stars;
      }
    );
  }

  /* ========================================
     OTHER SORT OPTIONS
  ======================================== */

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
    filters.selectedTechnologies.length;

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

  if (filters.beginnerFriendly) {
    count++;
  }

  if (filters.goodFirstIssue) {
    count++;
  }

  if (filters.minStars && filters.minStars > 0) {
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

export type UrlUpdateParams = {
  search?: string;
  domain?: string;
  technologies?: string[];
  difficulty?: string;
  sort?: SortOption;
  beginnerFriendly?: boolean;
  goodFirstIssue?: boolean;
  minStars?: number;
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

  /* ========================================
     SEARCH
  ======================================== */

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

  /* ========================================
     DOMAIN
  ======================================== */

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

  /* ========================================
     TECHNOLOGIES
  ======================================== */

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

  /* ========================================
     DIFFICULTY
  ======================================== */

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

  /* ========================================
     SORT
  ======================================== */

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

  /* ========================================
     QUICK PRESET FILTERS
  ======================================== */

  if (updates.beginnerFriendly !== undefined) {
    if (updates.beginnerFriendly) {
      params.set("beginnerFriendly", "true");
    } else {
      params.delete("beginnerFriendly");
    }
  }

  if (updates.goodFirstIssue !== undefined) {
    if (updates.goodFirstIssue) {
      params.set("goodFirstIssue", "true");
    } else {
      params.delete("goodFirstIssue");
    }
  }

  if (updates.minStars !== undefined) {
    if (updates.minStars && updates.minStars > 0) {
      params.set("minStars", String(updates.minStars));
    } else {
      params.delete("minStars");
    }
  }

  return params;
}

/* ========================================
   BUILD SEARCH PARAMS DIRECTLY FROM STATE
======================================== */

export function buildProjectSearchParamsFromState(
  state: ProjectFilterState
): URLSearchParams {
  const params = new URLSearchParams();

  if (state.searchQuery.trim()) {
    params.set("search", state.searchQuery.trim());
  }

  if (state.selectedDomain && state.selectedDomain !== "All") {
    params.set("domain", state.selectedDomain);
  }

  if (state.selectedTechnologies && state.selectedTechnologies.length > 0) {
    state.selectedTechnologies.forEach((technology) => {
      params.append("technology", technology);
    });
  }

  if (state.selectedDifficulty && state.selectedDifficulty !== "All") {
    params.set("difficulty", state.selectedDifficulty);
  }

  if (state.sortOption && state.sortOption !== "relevance") {
    params.set("sort", state.sortOption);
  }

  if (state.beginnerFriendly) {
    params.set("beginnerFriendly", "true");
  }

  if (state.goodFirstIssue) {
    params.set("goodFirstIssue", "true");
  }

  if (state.minStars && state.minStars > 0) {
    params.set("minStars", String(state.minStars));
  }

  return params;
}