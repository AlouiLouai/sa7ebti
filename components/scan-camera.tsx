"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "motion/react";
import { CameraIcon, GalleryIcon } from "@/components/icons";
import { ArrowLeftIcon, ScannerFocusIcon } from "@/components/sa7ebti-icons";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";
import { Sa7ebtiTopBar } from "@/components/sa7ebti-shell";
import { useScanSource } from "@/hooks/use-scan-source";
import { sa7ebtiCopy } from "@/lib/copy/sa7ebti-copy";
import { scanCategoryOptions } from "@/lib/domain/scan-flow";

export function ScanCamera() {
  const {
    activeSource,
    cameraInputRef,
    flashFrame,
    galleryInputRef,
    handleSelection,
    isPending,
    openSourcePicker,
    selectedCategory,
    setSelectedCategory
  } = useScanSource();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-espresso">
      {flashFrame ? <div className="pointer-events-none fixed inset-0 z-[100] bg-white/80 transition-opacity" /> : null}

      <Sa7ebtiTopBar
        leading={
          <Link href="/" className="inline-flex items-center justify-center text-terracotta active:scale-95">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
        }
        title={sa7ebtiCopy.routes.scan}
      />

      <LazyMotion features={domAnimation}>
        <main className="sa7ebti-zellige-pattern mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 pb-28 pt-20">
          <m.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.8rem] bg-espresso p-5 text-white shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ochre">
                  scan srii3
                </p>
                <h1 className="mt-2 font-display text-[1.7rem] font-semibold leading-[1.02]">
                  ekhtar camera wala galerie.
                </h1>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <ScannerFocusIcon className="h-5 w-5 text-ochre" />
              </div>
            </div>

            <p className="mt-3 text-[0.9rem] leading-6 text-white/75">
              scanni produit makeup wala skincare, w sa7ebti twarik bel wade7 ida yji m3ak wala le.
            </p>
          </m.section>

          <m.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 rounded-[1.8rem] border border-espresso/[0.08] bg-white/[0.82] p-4 shadow-[0_18px_40px_rgba(38,37,34,0.06)] backdrop-blur-md"
          >
            <div className="grid gap-3">
              <ScanSourceCard
                active={activeSource === "camera"}
                title="7ell l camera"
                body="sawer l produit direct men mobile."
                icon={<CameraIcon className="h-5 w-5" />}
                onClick={() => openSourcePicker("camera")}
                loading={isPending && activeSource === "camera"}
                primary
              />

              <ScanSourceCard
                active={activeSource === "gallery"}
                title="ekhtar men galerie"
                body="ken 3andek tswira deja, jibha men galerie."
                icon={<GalleryIcon className="h-5 w-5" />}
                onClick={() => openSourcePicker("gallery")}
                loading={isPending && activeSource === "gallery"}
              />
            </div>

            <div className="mt-4 rounded-[1.2rem] bg-[#FAF6F0] p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
                    no3 l produit
                  </p>
                  <p className="mt-1.5 text-[0.8rem] leading-5 text-espresso/[0.72]">
                    ken ta3rfou men tawa, ikhtarah. ken le, sa7ebti t5allik tkammel ba3d.
                  </p>
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-[0.64rem] font-semibold text-terracotta">
                  ikhtyari
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {scanCategoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedCategory(option.value)}
                    className={`rounded-full px-3 py-2 text-[0.72rem] font-semibold transition-all duration-300 active:scale-[0.98] ${
                      selectedCategory === option.value
                        ? "bg-[#C97A53] text-white shadow-button"
                        : "border border-espresso/[0.08] bg-white text-espresso/[0.72]"
                    }`}
                  >
                    {option.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-[1.2rem] bg-[#FAF6F0] p-3">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
                chnoua nscannou
              </p>
              <p className="mt-2 text-[0.8rem] leading-5 text-espresso/[0.72]">
                barcode, face produit, wala liste ingredients. aham haja tswira tkoun wadh7a.
              </p>
            </div>

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(event) => handleSelection("camera", event)}
            />
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleSelection("gallery", event)}
            />
          </m.section>
        </main>
      </LazyMotion>

      <Sa7ebtiBottomNav active="scan" />
    </div>
  );
}

function ScanSourceCard({
  active,
  body,
  icon,
  loading,
  onClick,
  primary = false,
  title
}: {
  active: boolean;
  body: string;
  icon: ReactNode;
  loading: boolean;
  onClick: () => void;
  primary?: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-[1.35rem] border p-3 text-left transition-all duration-300 active:scale-[0.98] ${
        primary
          ? active
            ? "border-terracotta bg-[#C97A53] text-white shadow-button"
            : "border-[#C97A53]/20 bg-[#F7E5DB] text-espresso"
          : active
            ? "border-terracotta bg-[#E6CCB2]/45 shadow-[0_16px_34px_rgba(201,122,83,0.08)]"
            : "border-espresso/[0.08] bg-white"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          primary
            ? active
              ? "bg-white/15 text-white"
              : "bg-white text-terracotta"
            : active
              ? "bg-white text-terracotta"
              : "bg-[#FAF6F0] text-terracotta"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display text-[1rem] leading-5">{loading ? "tsanna..." : title}</p>
        <p className={`mt-1 text-[0.76rem] leading-5 ${primary && active ? "text-white/78" : "text-espresso/[0.68]"}`}>
          {body}
        </p>
      </div>
    </button>
  );
}
