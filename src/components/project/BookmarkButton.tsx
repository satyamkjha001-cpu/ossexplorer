"use client";

import { useSyncExternalStore } from "react";

import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import {
  addBookmark,
  getBookmarkSnapshot,
  isBookmarked,
  removeBookmark,
  subscribeToBookmarks,
} from "@/lib/bookmarks";

type BookmarkButtonProps = {
  projectId: number;
};

const BookmarkButton = ({ projectId }: BookmarkButtonProps) => {
  const { showToast } = useToast();

  const bookmarkSnapshot = useSyncExternalStore(
    subscribeToBookmarks,
    getBookmarkSnapshot,
    () => ""
  );

  const bookmarked =
    bookmarkSnapshot !== "" && isBookmarked(projectId);

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(projectId);
      showToast("Project removed from saved", "neutral");
    } else {
      addBookmark(projectId);
      showToast("Project saved to your collection", "success");
    }
  };

  return (
    <Button
      variant={bookmarked ? "primary" : "secondary"}
      onClick={handleBookmark}
      aria-pressed={bookmarked}
      aria-label={
        bookmarked
          ? "Remove project from saved projects"
          : "Save project"
      }
      fullWidth
      className={cn(
        "sm:w-auto motion-safe:transition-transform motion-safe:duration-200",
        bookmarked && "motion-safe:scale-[1.02]"
      )}
    >
      <span
        className={cn(
          "inline-block motion-safe:transition-transform motion-safe:duration-200",
          bookmarked && "motion-safe:scale-110"
        )}
        aria-hidden="true"
      >
        {bookmarked ? "★" : "☆"}
      </span>{" "}
      {bookmarked ? "Saved" : "Save"}
    </Button>
  );
};

export default BookmarkButton;
