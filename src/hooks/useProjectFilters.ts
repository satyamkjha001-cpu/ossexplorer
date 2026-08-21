"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { projects } from "@/data/projects";

import {
  buildProjectSearchParams,
  countActiveFilters,
  DIFFICULTIES,
  filterProjects,
  getUniqueDomains,
  getUniqueTechnologies,
  hasActiveFilters,
  parseSortOption,
  sortProjects,
  type ProjectFilterState,
  type SortOption,
} from "@/lib/projectFilters";

export const PROJECTS_PER_PAGE = 10;

export function useProjectFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] =
    useState<ProjectFilterState>({
      searchQuery: "",
      selectedDomain: "All",
      selectedTechnologies: [],
      selectedDifficulty: "All",
      sortOption: "relevance",
    });

  const [visibleCount, setVisibleCount] =
    useState(PROJECTS_PER_PAGE);

  const [
    filtersInitialized,
    setFiltersInitialized,
  ] = useState(false);

  /* ========================================
     INITIALIZE FILTERS FROM URL
  ======================================== */

  useEffect(() => {
    const difficulty =
      searchParams.get("difficulty") ?? "All";

    setFilters({
      searchQuery:
        searchParams.get("search") ?? "",

      selectedDomain:
        searchParams.get("domain") ?? "All",

      selectedTechnologies:
        searchParams.getAll("technology"),

      selectedDifficulty:
        DIFFICULTIES.includes(
          difficulty as (typeof DIFFICULTIES)[number]
        )
          ? difficulty
          : "All",

      sortOption: parseSortOption(
        searchParams.get("sort")
      ),
    });

    setVisibleCount(
      PROJECTS_PER_PAGE
    );

    setFiltersInitialized(true);
  }, [searchParams]);

  /* ========================================
     UPDATE URL
  ======================================== */

  const pushParams = useCallback(
    (
      updates: Parameters<
        typeof buildProjectSearchParams
      >[1]
    ) => {
      const params =
        buildProjectSearchParams(
          new URLSearchParams(
            searchParams.toString()
          ),
          updates
        );

      const queryString =
        params.toString();

      router.push(
        queryString
          ? `${pathname}?${queryString}`
          : pathname,
        {
          scroll: false,
        }
      );
    },
    [
      pathname,
      router,
      searchParams,
    ]
  );

  /* ========================================
     SEARCH URL SYNC
  ======================================== */

  useEffect(() => {
    if (!filtersInitialized) {
      return;
    }

    const currentSearch =
      searchParams.get("search") ?? "";

    if (
      currentSearch ===
      filters.searchQuery.trim()
    ) {
      return;
    }

    const timeout = setTimeout(() => {
      pushParams({
        search:
          filters.searchQuery,
      });
    }, 500);

    return () =>
      clearTimeout(timeout);
  }, [
    filters.searchQuery,
    filtersInitialized,
    pushParams,
    searchParams,
  ]);

  /* ========================================
     RESET PAGINATION
  ======================================== */

  const resetPagination =
    useCallback(() => {
      setVisibleCount(
        PROJECTS_PER_PAGE
      );
    }, []);

  /* ========================================
     GENERIC FILTER UPDATE
  ======================================== */

  const updateFilter =
    useCallback(
      <
        K extends keyof ProjectFilterState
      >(
        key: K,
        value: ProjectFilterState[K],
        syncUrl?: Parameters<
          typeof buildProjectSearchParams
        >[1]
      ) => {
        setFilters((current) => ({
          ...current,
          [key]: value,
        }));

        resetPagination();

        if (syncUrl) {
          pushParams(syncUrl);
        }
      },
      [
        pushParams,
        resetPagination,
      ]
    );

  /* ========================================
     SEARCH
  ======================================== */

  const handleSearchChange = (
    value: string
  ) => {
    updateFilter(
      "searchQuery",
      value
    );
  };

  /* ========================================
     DOMAIN
  ======================================== */

  const handleDomainChange = (
    value: string
  ) => {
    updateFilter(
      "selectedDomain",
      value,
      {
        domain: value,
      }
    );
  };

  /* ========================================
     TECHNOLOGY
  ======================================== */

  const handleTechnologyChange = (
    technology: string
  ) => {
    const next =
      filters.selectedTechnologies.includes(
        technology
      )
        ? filters.selectedTechnologies.filter(
            (item) =>
              item !== technology
          )
        : [
            ...filters.selectedTechnologies,
            technology,
          ];

    updateFilter(
      "selectedTechnologies",
      next,
      {
        technologies: next,
      }
    );
  };

  /* ========================================
     DIFFICULTY
  ======================================== */

  const handleDifficultyChange = (
    value: string
  ) => {
    updateFilter(
      "selectedDifficulty",
      value,
      {
        difficulty: value,
      }
    );
  };

  /* ========================================
     SORT
  ======================================== */

  const handleSortChange = (
    value: SortOption
  ) => {
    updateFilter(
      "sortOption",
      value,
      {
        sort: value,
      }
    );
  };

  /* ========================================
     REMOVE TECHNOLOGY
  ======================================== */

  const removeTechnology = (
    technology: string
  ) => {
    const next =
      filters.selectedTechnologies.filter(
        (item) =>
          item !== technology
      );

    updateFilter(
      "selectedTechnologies",
      next,
      {
        technologies: next,
      }
    );
  };

  /* ========================================
     CLEAR ALL FILTERS
  ======================================== */

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedDomain: "All",
      selectedTechnologies: [],
      selectedDifficulty: "All",
      sortOption: "relevance",
    });

    resetPagination();

    router.push(pathname, {
      scroll: false,
    });
  };

  /* ========================================
     CLEAR SEARCH
  ======================================== */

  const clearSearch = () => {
    setFilters((current) => ({
      ...current,
      searchQuery: "",
    }));

    resetPagination();

    pushParams({
      search: "",
    });
  };

  /* ========================================
     LOAD MORE
  ======================================== */

  const loadMore = () => {
    setVisibleCount(
      (current) =>
        current + PROJECTS_PER_PAGE
    );
  };

  /* ========================================
     UNIQUE FILTER OPTIONS
  ======================================== */

  const domains = useMemo(
    () => getUniqueDomains(),
    []
  );

  const technologies = useMemo(
    () => getUniqueTechnologies(),
    []
  );

  /* ========================================
     FILTER PROJECTS
  ======================================== */

  const filteredProjects =
    useMemo(
      () =>
        filterProjects(
          projects,
          filters
        ),
      [filters]
    );

  /* ========================================
     SORT PROJECTS
  ======================================== */

  const sortedProjects =
    useMemo(
      () =>
        sortProjects(
          filteredProjects,
          filters.sortOption
        ),
      [
        filteredProjects,
        filters.sortOption,
      ]
    );

  /* ========================================
     VISIBLE PROJECTS
  ======================================== */

  const visibleProjects =
    sortedProjects.slice(
      0,
      visibleCount
    );

  const hasMoreProjects =
    visibleCount <
    sortedProjects.length;

  /* ========================================
     ACTIVE FILTERS
  ======================================== */

  const activeFilterCount =
    countActiveFilters(
      filters
    );

  const filtersActive =
    hasActiveFilters(
      filters
    );

  /* ========================================
     RETURN
  ======================================== */

  return {
    filters,
    filtersInitialized,

    domains,
    technologies,

    sortedProjects,
    visibleProjects,
    hasMoreProjects,

    activeFilterCount,
    filtersActive,

    handleSearchChange,
    handleDomainChange,
    handleTechnologyChange,
    handleDifficultyChange,
    handleSortChange,

    removeTechnology,

    clearFilters,
    clearSearch,

    loadMore,
  };
}

export type { SortOption };