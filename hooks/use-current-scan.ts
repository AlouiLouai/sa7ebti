"use client";

import { useEffect, useSyncExternalStore, useState } from "react";
import type { ProductCategory } from "@/lib/domain/product-fit";
import {
  setActiveAnalysisRecordId,
  upsertHistoryRecord
} from "@/hooks/use-scan-history";
import {
  buildRecordFromCurrentScan,
  createCurrentScanDraft,
  updateCurrentScanDraftCategory,
  type CurrentScanDraft
} from "@/lib/domain/scan-flow";
import type { ScanSource } from "@/lib/domain/scanned-product";

const CURRENT_SCAN_STORAGE_KEY = "sa7ebti-current-scan";
const listeners = new Set<() => void>();
let cachedRawValue: string | null = null;
let cachedDraft: CurrentScanDraft | null = null;

function emitCurrentScanChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      listeners.delete(listener);
    };
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === CURRENT_SCAN_STORAGE_KEY) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getServerSnapshot() {
  return null;
}

function getClientSnapshot() {
  return readStoredCurrentScan();
}

export function useCurrentScan() {
  const currentScanDraft = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    isHydrated,
    currentScanDraft,
    currentScanRecord: buildRecordFromCurrentScan(currentScanDraft),
    saveCurrentScan,
    selectCurrentScanCategory,
    clearCurrentScan
  };
}

export function saveCurrentScan({
  fileName,
  selectedCategory,
  source
}: {
  fileName: string;
  selectedCategory: ProductCategory;
  source: ScanSource;
}) {
  if (typeof window === "undefined") {
    return null;
  }

  const nextDraft = createCurrentScanDraft({
    fileName,
    selectedCategory,
    source
  });

  writeCurrentScan(nextDraft);
  const nextRecord = buildRecordFromCurrentScan(nextDraft);
  upsertHistoryRecord(nextRecord);
  setActiveAnalysisRecordId(nextRecord.id);

  return nextDraft;
}

export function selectCurrentScanCategory(category: Exclude<ProductCategory, "unknown">) {
  if (typeof window === "undefined") {
    return;
  }

  const currentDraft = readStoredCurrentScan();

  if (!currentDraft) {
    return;
  }

  const nextDraft = updateCurrentScanDraftCategory(currentDraft, category);
  writeCurrentScan(nextDraft);
  const nextRecord = buildRecordFromCurrentScan(nextDraft);
  upsertHistoryRecord(nextRecord);
  setActiveAnalysisRecordId(nextRecord.id);
}

export function clearCurrentScan() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CURRENT_SCAN_STORAGE_KEY);
  cachedRawValue = null;
  cachedDraft = null;
  setActiveAnalysisRecordId(null);
  emitCurrentScanChange();
}

function writeCurrentScan(draft: CurrentScanDraft) {
  const rawValue = JSON.stringify(draft);
  window.localStorage.setItem(CURRENT_SCAN_STORAGE_KEY, rawValue);
  cachedRawValue = rawValue;
  cachedDraft = draft;
  emitCurrentScanChange();
}

function readStoredCurrentScan() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(CURRENT_SCAN_STORAGE_KEY);

  if (!rawValue) {
    cachedRawValue = null;
    cachedDraft = null;
    return null;
  }

  if (rawValue === cachedRawValue) {
    return cachedDraft;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as CurrentScanDraft;
    cachedRawValue = rawValue;
    cachedDraft = parsedValue;
    return cachedDraft;
  } catch {
    cachedRawValue = null;
    cachedDraft = null;
    return null;
  }
}
