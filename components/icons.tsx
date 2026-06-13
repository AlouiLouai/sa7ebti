import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

export function CameraIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4.5 8.25h2.28a1.5 1.5 0 0 0 1.2-.6l.84-1.05a1.5 1.5 0 0 1 1.2-.6h3.96a1.5 1.5 0 0 1 1.2.6l.84 1.05a1.5 1.5 0 0 0 1.2.6h2.28A1.5 1.5 0 0 1 21 9.75v7.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.25v-7.5a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M12 16.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z" />
    </svg>
  );
}

export function GalleryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="m6.5 16 4.2-4.2a1 1 0 0 1 1.4 0l1.9 1.9a1 1 0 0 0 1.4 0l1-1a1 1 0 0 1 1.4 0L20.5 15" />
      <path d="M8.5 9.25h.01" />
    </svg>
  );
}
