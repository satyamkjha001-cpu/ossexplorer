"use client";

import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

type ShareButtonProps = {
  projectPath: string;
};

export default function ShareButton({ projectPath }: ShareButtonProps) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    const fullUrl = `${window.location.origin}${projectPath}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      showToast("Link copied to clipboard", "info");
    } catch {
      showToast("Could not copy link", "neutral");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      aria-label="Copy project link to clipboard"
      className="w-full sm:w-auto"
    >
      Share Link
    </Button>
  );
}
