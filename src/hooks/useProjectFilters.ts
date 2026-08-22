"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { projects } from "@/data/projects";

import {
  buildProjectSearchParamsFromState,
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
  type TechnologyMatchMode,
} from "@/lib/projectFilters";

export const PROJECTS_PER_PAGE = 10;

function getFiltersFromSearchParams(
  searchParams: ReturnType<typeof useSearchParams>
): ProjectFilterState {
  const difficulty =
    searchParams.get("difficulty") ?? "All";

  const beginnerFriendlyParam =
    searchParams.get("beginnerFriendly");
  const goodFirstIssueParam =
    searchParams.get("goodFirstIssue");
  const minStarsParam =
    searchParams.get("minStars");

  return {
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

    technologyMatchMode: "any",

    beginnerFriendly:
      beginnerFriendlyParam === "true",

    goodFirstIssue:
      goodFirstIssueParam === "true",

    minStars: minStarsParam
      ? parseInt(minStarsParam, 10) || undefined
      : undefined,
  };
}

export function useProjectFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProjectFilterState>(() =>
    getFiltersFromSearchParams(searchParams)
  );

  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);
  const filtersInitialized = true;

  const isFirstRender = useRef(true);
  const prevUrlParamsRef = useRef(searchParams.toString());

  /* ========================================
     SYNC ON EXTERNAL BROWSER NAVIGATION (BACK/FORWARD)
  ======================================== */

  useEffect(() => {
    const currentParamsString = searchParams.toString();
    if (currentParamsString !== prevUrlParamsRef.current) {
      prevUrlParamsRef.current = currentParamsString;
      setFilters(getFiltersFromSearchParams(searchParams));
      setVisibleCount(PROJECTS_PER_PAGE);
    }
  }, [searchParams]);

  /* ========================================
     SAFELY SYNC STATE CHANGES TO URL AFTER RENDER
  ======================================== */

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const nextParams = buildProjectSearchParamsFromState(filters);
    const nextQueryString = nextParams.toString();
    prevUrlParamsRef.current = nextQueryString;

    const timeout = setTimeout(() => {
      const currentUrlParams = searchParams.toString();
      if (currentUrlParams !== nextQueryString) {
        router.push(
          nextQueryString ? `${pathname}?${nextQueryString}` : pathname,
          { scroll: false }
        );
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [filters, pathname, router, searchParams]);

  /* ========================================
     RESET PAGINATION
  ======================================== */

  const resetPagination = useCallback(() => {
    setVisibleCount(PROJECTS_PER_PAGE);
  }, []);

  /* ========================================
     GENERIC FILTER UPDATE
  ======================================== */

  const updateFilter = useCallback(
    <K extends keyof ProjectFilterState>(
      key: K,
      value: ProjectFilterState[K]
    ) => {
      setFilters((current) => ({
        ...current,
        [key]: value,
      }));

      resetPagination();
    },
    [resetPagination]
  );

  /* ========================================
     FILTER HANDLERS
  ======================================== */

  const handleSearchChange = (value: string) => {
    updateFilter("searchQuery", value);
  };

  const handleDomainChange = (value: string) => {
    updateFilter("selectedDomain", value);
  };

  const handleTechnologyChange = (technology: string) => {
    setFilters((current) => {
      const nextTechs = current.selectedTechnologies.includes(technology)
        ? current.selectedTechnologies.filter((item) => item !== technology)
        : [...current.selectedTechnologies, technology];

      return {
        ...current,
        selectedTechnologies: nextTechs,
      };
    });

    resetPagination();
  };

  const handleTechnologyMatchModeChange = (mode: TechnologyMatchMode) => {
    updateFilter("technologyMatchMode", mode);
  };

  const handleDifficultyChange = (value: string) => {
    updateFilter("selectedDifficulty", value);
  };

  const handleSortChange = (value: SortOption) => {
    updateFilter("sortOption", value);
  };

  const handleBeginnerFriendlyToggle = () => {
    setFilters((current) => ({
      ...current,
      beginnerFriendly: !current.beginnerFriendly,
    }));

    resetPagination();
  };

  const handleGoodFirstIssueToggle = () => {
    setFilters((current) => ({
      ...current,
      goodFirstIssue: !current.goodFirstIssue,
    }));

    resetPagination();
  };

  const handleMinStarsChange = (minStars: number | undefined) => {
    setFilters((current) => ({
      ...current,
      minStars,
    }));

    resetPagination();
  };

  const removeTechnology = (technology: string) => {
    handleTechnologyChange(technology);
  };

  const clearFilters = () => {
    const cleanState: ProjectFilterState = {
      searchQuery: "",
      selectedDomain: "All",
      selectedTechnologies: [],
      selectedDifficulty: "All",
      sortOption: "relevance",
      technologyMatchMode: "any",
      beginnerFriendly: false,
      goodFirstIssue: false,
      minStars: undefined,
    };

    setFilters(cleanState);
    resetPagination();
  };

  const clearSearch = () => {
    setFilters((current) => ({
      ...current,
      searchQuery: "",
    }));

    resetPagination();
  };

  const loadMore = () => {
    setVisibleCount((current) => current + PROJECTS_PER_PAGE);
  };

  /* ========================================
     UNIQUE FILTER OPTIONS
  ======================================== */

  const domains = useMemo(() => getUniqueDomains(), []);
  const technologies = useMemo(() => getUniqueTechnologies(), []);

  /* ========================================
     FILTER & SORT PROJECTS
  ======================================== */

  const filteredProjects = useMemo(
    () => filterProjects(projects, filters),
    [filters]
  );

  const sortedProjects = useMemo(
    () => sortProjects(filteredProjects, filters.sortOption, filters.searchQuery),
    [filteredProjects, filters.sortOption, filters.searchQuery]
  );

  const visibleProjects = sortedProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < sortedProjects.length;

  const activeFilterCount = countActiveFilters(filters);
  const filtersActive = hasActiveFilters(filters);

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
    handleTechnologyMatchModeChange,

    handleDifficultyChange,
    handleSortChange,

    handleBeginnerFriendlyToggle,
    handleGoodFirstIssueToggle,
    handleMinStarsChange,

    removeTechnology,
    clearFilters,
    clearSearch,
    loadMore,
  };
}

export type { SortOption };