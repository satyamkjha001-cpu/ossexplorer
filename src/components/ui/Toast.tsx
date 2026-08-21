"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { cn } from "@/lib/cn";

type ToastVariant = "success" | "info" | "neutral";

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}

const variantStyles: Record<ToastVariant, string> = {
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/80 dark:text-green-300",
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/80 dark:text-blue-300",
  neutral:
    "border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "neutral") => {
      const id = Date.now() + Math.random();

      setToasts((current) => [...current, { id, message, variant }]);
    },
    []
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        aria-live="polite"
        className="
          pointer-events-none fixed bottom-4 right-4 z-[100]
          flex max-w-sm flex-col gap-2
          max-sm:left-4 max-sm:right-4
        "
      >
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            toast={toast}
            onDismiss={dismissToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastNotification({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss, toast.id]);

  return (
    <div
      role="status"
      className={cn(
        `
          pointer-events-auto flex items-start justify-between gap-3
          rounded-lg border px-4 py-3 text-sm font-medium shadow-lg
          motion-safe:animate-slide-up
        `,
        variantStyles[toast.variant]
      )}
    >
      <span>{toast.message}</span>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="
          shrink-0 rounded p-0.5 opacity-70 transition-opacity
          hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current
        "
      >
        ×
      </button>
    </div>
  );
}
