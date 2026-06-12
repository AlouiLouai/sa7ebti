"use client";

import { useEffect, useMemo, useSyncExternalStore, useState } from "react";
import { buildRoutinePlan, mergeHistoryRecords } from "@/lib/domain/history-routine";
import type { ScannedProductRecord } from "@/lib/domain/scanned-product";
import { scannedProductRecordsFixture } from "@/lib/fixtures/p0-core-data";

const SCAN_HISTORY_STORAGE_KEY = "sa7ebti-scan-history";
const FAVORITES_STORAGE_KEY = "sa7ebti-favorite-record-ids";
const ACTIVE_ANALYSIS_STORAGE_KEY = "sa7ebti-active-analysis-record-id";
const EMPTY_HISTORY: ScannedProductRecord[] = [];
const EMPTY_FAVORITES: string[] = [];
const EMPTY_ACTIVE_ANALYSIS_RECORD_ID = null;

const listeners = new Set<() => void>();
let cachedHistoryRawValue: string | null = null;
let cachedHistoryRecords: ScannedProductRecord[] = EMPTY_HISTORY;
let cachedFavoritesRawValue: string | null = null;
let cachedFavoriteIds: string[] = EMPTY_FAVORITES;
let cachedActiveAnalysisRawValue: string | null = null;
let cachedActiveAnalysisRecordId: string | null = EMPTY_ACTIVE_ANALYSIS_RECORD_ID;

export function useScanHistory() {
  const persistedHistory = useSyncExternalStore(subscribe, getClientHistorySnapshot, getServerHistorySnapshot);
  const favoriteRecordIds = useSyncExternalStore(
    subscribe,
    getClientFavoriteSnapshot,
    getServerFavoriteSnapshot
  );
  const activeAnalysisRecordId = useSyncExternalStore(
    subscribe,
    getClientActiveAnalysisSnapshot,
    getServerActiveAnalysisSnapshot
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const records = useMemo(
    () => mergeHistoryRecords(persistedHistory, scannedProductRecordsFixture),
    [persistedHistory]
  );
  const favoriteSet = useMemo(() => new Set(favoriteRecordIds), [favoriteRecordIds]);
  const favoriteRecords = useMemo(
    () => records.filter((record) => favoriteSet.has(record.id)),
    [favoriteSet, records]
  );
  const activeAnalysisRecord =
    records.find((record) => record.id === activeAnalysisRecordId) ?? records[0] ?? null;
  const latestRecord = records[0] ?? null;
  const routinePlan = buildRoutinePlan(records);

  return {
    isHydrated,
    records,
    latestRecord,
    favoriteRecordIds,
    favoriteRecords,
    activeAnalysisRecordId,
    activeAnalysisRecord,
    routinePlan,
    upsertHistoryRecord,
    toggleFavoriteRecord,
    isFavoriteRecord: (recordId: string) => favoriteSet.has(recordId),
    setActiveAnalysisRecordId,
    clearActiveAnalysisRecordId
  };
}

export function upsertHistoryRecord(record: ScannedProductRecord) {
  if (typeof window === "undefined") {
    return;
  }

  const currentRecords = readStoredHistory();
  const nextRecords = [record, ...currentRecords.filter((currentRecord) => currentRecord.id !== record.id)];
  writeHistory(nextRecords);
}

export function toggleFavoriteRecord(recordId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const currentFavoriteIds = readStoredFavoriteIds();
  const nextFavoriteIds = currentFavoriteIds.includes(recordId)
    ? currentFavoriteIds.filter((currentRecordId) => currentRecordId !== recordId)
    : [recordId, ...currentFavoriteIds];

  writeFavoriteIds(nextFavoriteIds);
}

export function setActiveAnalysisRecordId(recordId: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!recordId) {
    clearActiveAnalysisRecordId();
    return;
  }

  window.localStorage.setItem(ACTIVE_ANALYSIS_STORAGE_KEY, recordId);
  cachedActiveAnalysisRawValue = recordId;
  cachedActiveAnalysisRecordId = recordId;
  emitScanHistoryChange();
}

export function clearActiveAnalysisRecordId() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ACTIVE_ANALYSIS_STORAGE_KEY);
  cachedActiveAnalysisRawValue = null;
  cachedActiveAnalysisRecordId = null;
  emitScanHistoryChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      listeners.delete(listener);
    };
  }

  function handleStorage(event: StorageEvent) {
    if (
      event.key === SCAN_HISTORY_STORAGE_KEY ||
      event.key === FAVORITES_STORAGE_KEY ||
      event.key === ACTIVE_ANALYSIS_STORAGE_KEY
    ) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function emitScanHistoryChange() {
  listeners.forEach((listener) => listener());
}

function getServerHistorySnapshot() {
  return EMPTY_HISTORY;
}

function getClientHistorySnapshot() {
  return readStoredHistory();
}

function getServerFavoriteSnapshot() {
  return EMPTY_FAVORITES;
}

function getClientFavoriteSnapshot() {
  return readStoredFavoriteIds();
}

function getServerActiveAnalysisSnapshot() {
  return EMPTY_ACTIVE_ANALYSIS_RECORD_ID;
}

function getClientActiveAnalysisSnapshot() {
  return readStoredActiveAnalysisRecordId();
}

function writeHistory(records: ScannedProductRecord[]) {
  const rawValue = JSON.stringify(records);
  window.localStorage.setItem(SCAN_HISTORY_STORAGE_KEY, rawValue);
  cachedHistoryRawValue = rawValue;
  cachedHistoryRecords = records;
  emitScanHistoryChange();
}

function readStoredHistory() {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(SCAN_HISTORY_STORAGE_KEY);

  if (!rawValue) {
    cachedHistoryRawValue = null;
    cachedHistoryRecords = EMPTY_HISTORY;
    return cachedHistoryRecords;
  }

  if (rawValue === cachedHistoryRawValue) {
    return cachedHistoryRecords;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as ScannedProductRecord[];
    cachedHistoryRawValue = rawValue;
    cachedHistoryRecords = Array.isArray(parsedValue) ? parsedValue.map(normalizeHistoryRecord) : EMPTY_HISTORY;
    return cachedHistoryRecords;
  } catch {
    cachedHistoryRawValue = null;
    cachedHistoryRecords = EMPTY_HISTORY;
    return cachedHistoryRecords;
  }
}

function writeFavoriteIds(recordIds: string[]) {
  const rawValue = JSON.stringify(recordIds);
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, rawValue);
  cachedFavoritesRawValue = rawValue;
  cachedFavoriteIds = recordIds;
  emitScanHistoryChange();
}

function readStoredFavoriteIds() {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!rawValue) {
    cachedFavoritesRawValue = null;
    cachedFavoriteIds = EMPTY_FAVORITES;
    return cachedFavoriteIds;
  }

  if (rawValue === cachedFavoritesRawValue) {
    return cachedFavoriteIds;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as string[];
    cachedFavoritesRawValue = rawValue;
    cachedFavoriteIds = Array.isArray(parsedValue) ? parsedValue : EMPTY_FAVORITES;
    return cachedFavoriteIds;
  } catch {
    cachedFavoritesRawValue = null;
    cachedFavoriteIds = EMPTY_FAVORITES;
    return cachedFavoriteIds;
  }
}

function readStoredActiveAnalysisRecordId() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(ACTIVE_ANALYSIS_STORAGE_KEY);

  if (!rawValue) {
    cachedActiveAnalysisRawValue = null;
    cachedActiveAnalysisRecordId = EMPTY_ACTIVE_ANALYSIS_RECORD_ID;
    return cachedActiveAnalysisRecordId;
  }

  if (rawValue === cachedActiveAnalysisRawValue) {
    return cachedActiveAnalysisRecordId;
  }

  cachedActiveAnalysisRawValue = rawValue;
  cachedActiveAnalysisRecordId = rawValue;

  return cachedActiveAnalysisRecordId;
}

function normalizeHistoryRecord(record: ScannedProductRecord): ScannedProductRecord {
  return {
    ...record,
    provenance: Array.isArray(record.provenance) && record.provenance.length > 0 ? record.provenance : ["demo-fixture"]
  };
}
