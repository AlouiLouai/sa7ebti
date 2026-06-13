import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

function BaseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </BaseIcon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m14.5 6.5-5 5 5 5" />
      <path d="M10 11.5H20" />
    </BaseIcon>
  );
}

export function WaterDropIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3.8c2.9 3.6 5.5 6.2 5.5 9.2A5.5 5.5 0 0 1 6.5 13c0-3 2.6-5.6 5.5-9.2Z" />
    </BaseIcon>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M18 5c-7 .3-11.5 4.8-12 12 7-.3 11.5-4.8 12-12Z" />
      <path d="M8 16c1.8-2 4.1-4 8-6" />
    </BaseIcon>
  );
}

export function BalanceIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 4v14" />
      <path d="M7 8h10" />
      <path d="M5 20h14" />
      <path d="m7 8-3 5h6L7 8Z" />
      <path d="m17 8-3 5h6l-3-5Z" />
    </BaseIcon>
  );
}

export function WarmSunIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.5 5.5 17 7M7 17l-1.5 1.5M18.5 18.5 17 17M7 7 5.5 5.5" />
    </BaseIcon>
  );
}

export function FlareIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 2 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
    </BaseIcon>
  );
}

export function BubbleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="8.5" cy="10" r="2.5" />
      <circle cx="14.5" cy="8" r="1.8" />
      <circle cx="14.5" cy="14.5" r="4" />
    </BaseIcon>
  );
}

export function PetalIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 7c1.5-2.2 3.4-3.3 5.5-3 0 2.8-1.2 4.8-3.7 6" />
      <path d="M12 7c-1.5-2.2-3.4-3.3-5.5-3 0 2.8 1.2 4.8 3.7 6" />
      <path d="M12 7v10" />
      <path d="M8 17c1 .9 2.3 1.4 4 1.5 1.7-.1 3-.6 4-1.5" />
    </BaseIcon>
  );
}

export function ApartmentIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 20V7.5L12 4l6 3.5V20" />
      <path d="M9 20v-4h6v4" />
      <path d="M9 9h.01M12 9h.01M15 9h.01M9 12h.01M12 12h.01M15 12h.01" />
    </BaseIcon>
  );
}

export function BronzeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 12a8 8 0 1 0 16 0A8 8 0 0 1 4 12Z" />
      <path d="M12 4a8 8 0 0 1 0 16" />
    </BaseIcon>
  );
}

export function DiscoverIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 2 1.6 4.2L18 7.8 13.8 9.4 12 14l-1.8-4.6L6 7.8l4.4-1.6L12 2Z" />
      <path d="m18 15 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />
    </BaseIcon>
  );
}

export function ScannerFocusIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 4H5a1 1 0 0 0-1 1v3" />
      <path d="M16 4h3a1 1 0 0 1 1 1v3" />
      <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M16 20h3a1 1 0 0 0 1-1v-3" />
      <circle cx="12" cy="12" r="2.8" />
    </BaseIcon>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c1.9-3 4.2-4.5 7-4.5s5.1 1.5 7 4.5" />
    </BaseIcon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3.5 6 6v5c0 4.2 2.4 7 6 9 3.6-2 6-4.8 6-9V6l-6-2.5Z" />
      <path d="m9.3 12.1 1.8 1.8 3.6-3.9" />
    </BaseIcon>
  );
}

export function ShieldSunIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3.5 6 6v5c0 4.2 2.4 7 6 9 3.6-2 6-4.8 6-9V6l-6-2.5Z" />
      <circle cx="12" cy="11.5" r="2.2" />
      <path d="M12 7.5v1M12 14.5v1M16 11.5h-1M9 11.5H8M14.8 8.7l-.7.7M9.9 13.6l-.7.7M14.8 14.3l-.7-.7M9.9 9.4l-.7-.7" />
    </BaseIcon>
  );
}

export function LightbulbIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9.5 16.5h5" />
      <path d="M10 19h4" />
      <path d="M12 3.8a5 5 0 0 0-3 9l.8.7c.5.4.7 1 .7 1.6h3c0-.6.2-1.2.7-1.6l.8-.7a5 5 0 0 0-3-9Z" />
    </BaseIcon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />
    </BaseIcon>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2.5" />
      <path d="m7 15 3.4-3.4a1 1 0 0 1 1.4 0l1.9 1.9a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 1 1.4 0L20 14.6" />
      <path d="M8.5 9.2h.01" />
    </BaseIcon>
  );
}
