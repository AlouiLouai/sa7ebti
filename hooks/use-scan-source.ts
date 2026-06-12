"use client";

import type { ChangeEvent, RefObject } from "react";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export type ScanSource = "camera" | "gallery";

export function useScanSource() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [flashFrame, setFlashFrame] = useState(false);
  const [activeSource, setActiveSource] = useState<ScanSource | null>("camera");
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  function openSourcePicker(source: ScanSource) {
    if (isPending) return;

    setActiveSource(source);
    getInputRef(source, cameraInputRef, galleryInputRef).current?.click();
  }

  function handleSelection(source: ScanSource, event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) {
      return;
    }

    setActiveSource(source);
    if (source === "camera") {
      setFlashFrame(true);
      window.setTimeout(() => setFlashFrame(false), 160);
    }

    startTransition(() => {
      router.push("/analysis");
    });

    event.currentTarget.value = "";
  }

  return {
    activeSource,
    cameraInputRef,
    flashFrame,
    galleryInputRef,
    handleSelection,
    isPending,
    openSourcePicker
  };
}

function getInputRef(
  source: ScanSource,
  cameraInputRef: RefObject<HTMLInputElement | null>,
  galleryInputRef: RefObject<HTMLInputElement | null>
) {
  return source === "camera" ? cameraInputRef : galleryInputRef;
}
