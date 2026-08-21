const STORAGE_KEY = "open-source-project-bookmarks";
const BOOKMARK_CHANGE_EVENT = "bookmark-change";

export const getBookmarks = (): number[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedBookmarks = localStorage.getItem(STORAGE_KEY);

  if (!storedBookmarks) {
    return [];
  }

  try {
    return JSON.parse(storedBookmarks);
  } catch {
    return [];
  }
};

const saveBookmarks = (bookmarks: number[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(bookmarks)
  );

  window.dispatchEvent(new Event(BOOKMARK_CHANGE_EVENT));
};

export const isBookmarked = (projectId: number): boolean => {
  return getBookmarks().includes(projectId);
};

export const addBookmark = (projectId: number) => {
  const bookmarks = getBookmarks();

  if (!bookmarks.includes(projectId)) {
    saveBookmarks([...bookmarks, projectId]);
  }
};

export const removeBookmark = (projectId: number) => {
  const bookmarks = getBookmarks();

  const updatedBookmarks = bookmarks.filter(
    (id) => id !== projectId
  );

  saveBookmarks(updatedBookmarks);
};

export const subscribeToBookmarks = (
  callback: () => void
) => {
  window.addEventListener(
    BOOKMARK_CHANGE_EVENT,
    callback
  );

  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(
      BOOKMARK_CHANGE_EVENT,
      callback
    );

    window.removeEventListener("storage", callback);
  };
};

export const getBookmarkSnapshot = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(STORAGE_KEY) ?? "";
};