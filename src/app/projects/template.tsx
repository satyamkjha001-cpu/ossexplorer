"use client";

export default function ProjectsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="motion-safe:animate-page-enter">{children}</div>
  );
}
