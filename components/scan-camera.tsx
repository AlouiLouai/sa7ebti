"use client";

import type { ChangeEvent, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LazyMotion, domAnimation, m } from "motion/react";
import { CameraIcon, GalleryIcon } from "@/components/icons";
import { ArrowLeftIcon, ScannerFocusIcon } from "@/components/elyssette-icons";
import { ElyssetteTopBar } from "@/components/elyssette-shell";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";

const profilePhoto =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuApRR88uZY_z7Q8Sk5TgiC1Za_WbtrIgqHlV46iUZy8xEZK2eBtJIcP1xFiICB7KZcP1btgaYqPK_XR6XKHEwNJ53qcezhKZA8g-0mRkq73x5_2PON7DDY9MthQ4IOXQ4-SyL79Ot8RCxfp8ulEfCRu4sWYjWCeka3-rbDnOqC2V3OoMEcTwAq4SHdUBtRg9_Z1Uyg_26ISBqE5-OXk3cZOdq7zxjUAmL9oTXd-GTUpK8g04i6IDXbuf4lyjZqger5wvEEP99XfKCTT";

const productImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB12EDonJ0ewhZ7mtc5A_9yvHG7c8Pk5ibpIhVhHsP7aaYPlv7Oc8dSriPtThUWX0KhC5LnJKl89H-BW6pb5boUGPH_C0xoOz9raCH8_wBY4cnuvOBKBEAFwc6b3N_HGHemv_-7JkJ9wqUXbJjniK5nNFBcbCyGo4fxf5ORkgBbjSpenWNU_-QbcKABaByDsf_O6QfVqmjpehk4ujvXymlmwfozR5nn9YxcnnW5MFGrsGoW3F_QxHVfVGwQPjNy0bnzjxP-ek8xT6PH";

export function ScanCamera() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [flashFrame, setFlashFrame] = useState(false);
  const [activeSource, setActiveSource] = useState<"camera" | "gallery" | null>("camera");
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  function openSourcePicker(source: "camera" | "gallery") {
    if (isPending) return;

    setActiveSource(source);
    const target = source === "camera" ? cameraInputRef.current : galleryInputRef.current;
    target?.click();
  }

  function handleSelection(source: "camera" | "gallery", event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

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

  return (
    <div className="min-h-screen overflow-hidden bg-[#262522] text-white">
      {flashFrame ? (
        <div className="pointer-events-none fixed inset-0 z-[100] bg-white/90 transition-opacity" />
      ) : null}

      <ElyssetteTopBar
        leading={
          <Link href="/" className="inline-flex items-center justify-center text-terracotta active:scale-95">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
        }
        title="scan"
        avatarSrc={profilePhoto}
      />

      <LazyMotion features={domAnimation}>
        <main className="relative flex h-[100svh] w-full flex-col overflow-hidden pb-20 pt-14">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 z-10 bg-black/45" />
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.55)_78%)]" />
            <Image
              alt="Cosmetic product"
              src={productImage}
              fill
              priority
              quality={68}
              sizes="100vw"
              className="object-cover grayscale-[0.1] contrast-[1.08]"
            />
          </div>

          <m.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-20 z-20 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-white/[0.12] bg-[rgba(255,255,255,0.08)] px-3 py-2 text-center shadow-soft backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-[#C97A53] shadow-[0_0_16px_rgba(201,122,83,0.85)]" />
            <p className="text-[0.72rem] font-semibold tracking-[0.03em] text-white">
              Camera ready
            </p>
          </m.div>

          <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4">
            <div className="ely-scan-frame">
              <span className="block h-full w-full" />
              <div className="absolute left-0 top-[10%] h-[2px] w-full bg-gradient-to-r from-transparent via-primary-fixed-dim to-transparent shadow-[0_0_15px_#91472f] animate-[scanline_3s_linear_infinite]" />
              <div className="absolute -left-5 -top-5 opacity-35">
                <ScannerFocusIcon className="h-10 w-10 text-primary-fixed-dim" />
              </div>
            </div>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-[15rem] rounded-[1.2rem] border border-white/[0.12] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-center backdrop-blur-md"
            >
              <p className="text-[0.82rem] leading-5 text-white/[0.92]">
                Cadrez le code-barres ou la liste INCI, puis ouvrez la camera ou importez depuis
                la galerie.
              </p>
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[5.2rem] left-1/2 z-30 flex w-[calc(100%-1rem)] max-w-sm -translate-x-1/2 gap-2.5 rounded-[1.5rem] border border-white/10 bg-[rgba(20,20,20,0.24)] p-2.5 shadow-soft backdrop-blur-xl"
          >
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

            <ActionButton
              active={activeSource === "camera"}
              label={isPending && activeSource === "camera" ? "Analyse..." : "Ouvrir la camera"}
              icon={<CameraIcon className="h-5 w-5" />}
              onClick={() => openSourcePicker("camera")}
              primary
            />
            <ActionButton
              active={activeSource === "gallery"}
              label="Galerie"
              icon={<GalleryIcon className="h-5 w-5" />}
              onClick={() => openSourcePicker("gallery")}
            />
          </m.div>
        </main>
      </LazyMotion>

      <Sa7ebtiBottomNav active="scan" />
    </div>
  );
}

function ActionButton({
  active,
  icon,
  label,
  onClick,
  primary = false
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <m.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-3 text-left transition-colors duration-300 ${
        primary
          ? active
            ? "flex-[1.4] bg-[#C97A53] text-white shadow-button"
            : "flex-[1.4] bg-white text-espresso"
          : active
            ? "flex-1 bg-white text-espresso"
            : "flex-1 bg-white/[0.12] text-white"
      }`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          primary ? "bg-black/10" : active ? "bg-[#E6CCB2]" : "bg-white/10"
        }`}
      >
        {icon}
      </span>
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.04em]">{label}</span>
    </m.button>
  );
}
