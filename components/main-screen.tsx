"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ComponentProps, ComponentType } from "react";
import { useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import { profileCriteriaPreview } from "@/components/register/register-flow.data";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";
import { useDailyAdvice } from "@/hooks/use-daily-advice";
import { useScanHistory } from "@/hooks/use-scan-history";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useUvReminder } from "@/hooks/use-uv-reminder";
import {
  PetalIcon,
  ScannerFocusIcon,
  ShieldCheckIcon,
  ShieldSunIcon,
  WarmSunIcon
} from "@/components/sa7ebti-icons";
import { buildRescanSuggestions } from "@/lib/domain/rescan-reminders";
import { getCategoryOption } from "@/lib/domain/scan-flow";
import { getFitLabel } from "@/lib/domain/product-fit";
import type { RoutinePlanStep } from "@/lib/domain/history-routine";
import type { ScannedProductRecord } from "@/lib/domain/scanned-product";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBPfZJpf6JJfBRIn5xZJnJwoBCpujMAOYIwiabyGlN-RJkZr9tnS3ZD4RXX7K9FW1O89wAFRSrj9KPFF4eLZncgNYmsvgpYc4wlIyf5JgBjDF9o5C4B5u354DTjUMyiP8i1SwmpDUKz02P_MsaH7CY79tS0YxapSIuZCTVimlrdMGsS4Da9MEcierZuVmmIYiOyb8X2dltPqJZ13_fy6wkxCVTcWUKt9nsOL3zdwEBM3tRYidwH8YUfynBYyJYR8V2Jno3BKdNa5ICq";

const heroTextItems = [
  { key: "badge", delay: 0.08 },
  { key: "title", delay: 0.16 },
  { key: "body", delay: 0.24 },
  { key: "cue", delay: 0.34 }
] as const;

type AnimatedHeroWord = {
  text: string;
  highlightedIndexes?: readonly number[];
};

const heroTitleWords: readonly AnimatedHeroWord[] = [
  { text: "Scanni.", highlightedIndexes: [4] },
  { text: "Efhem.", highlightedIndexes: [1] },
  { text: "9arrer.", highlightedIndexes: [0] }
] as const;

const heroBodyWords: readonly AnimatedHeroWord[] = [
  { text: "makeup", highlightedIndexes: [0] },
  { text: "wala" },
  { text: "skincare," },
  { text: "3zizti" },
  { text: "na3tik" },
  { text: "mellekher" },
  { text: "ken" },
  { text: "l" },
  { text: "produit" },
  { text: "ynesbek", highlightedIndexes: [6] },
  { text: "wala" },
  { text: "le." }
] as const;

export function MainScreen() {
  const reducedMotionPreference = useReducedMotion();
  const prefersReducedMotion = reducedMotionPreference ?? false;
  const { scrollY } = useScroll();
  const { activeProfile, dailyAdvice, isHydrated: isDailyHydrated } = useDailyAdvice();
  const { isHydrated: isProfileHydrated, profileDraft } = useUserProfile();
  const {
    favoriteRecords,
    isHydrated: isHistoryHydrated,
    latestRecord,
    records,
    routinePlan,
    setActiveAnalysisRecordId
  } = useScanHistory();
  const { settings } = useUvReminder();

  const isHydrated = isDailyHydrated && isProfileHydrated && isHistoryHydrated;
  const hasProfileSetup = Boolean(
    profileDraft.skinType && profileDraft.climateRegion && profileDraft.makeupUsage
  );

  const scrollProgress = useTransform(scrollY, [0, 320], [0, 1]);
  const heroLiftY = useSpring(
    useTransform(scrollProgress, [0, 1], [0, prefersReducedMotion ? -60 : -180]),
    { stiffness: 180, damping: 28, mass: 0.28 }
  );
  const heroOpacity = useTransform(scrollProgress, [0, 0.92], [1, 0]);
  const heroScale = useTransform(scrollProgress, [0, 1], [1, prefersReducedMotion ? 0.99 : 0.9]);
  const heroTextY = useTransform(scrollProgress, [0, 1], [0, prefersReducedMotion ? -24 : -72]);
  const heroTextOpacity = useTransform(scrollProgress, [0, 0.8], [1, 0.06]);
  const contentLiftY = useSpring(
    useTransform(scrollProgress, [0, 1], [prefersReducedMotion ? 0 : 56, 0]),
    { stiffness: 190, damping: 30, mass: 0.3 }
  );
  const contentScale = useTransform(scrollProgress, [0, 1], [0.985, 1]);
  const scrollCueOpacity = useTransform(scrollProgress, [0, 0.32], [1, 0]);

  const heroLoopTransition = useMemo(
    () =>
      prefersReducedMotion
        ? undefined
        : {
            duration: 7.4,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut" as const
          },
    [prefersReducedMotion]
  );

  const utilityProducts = useMemo(() => {
    const compatibleRecords = records.filter(
      (record) =>
        record.fitResult.status === "ynesbek" || record.fitResult.status === "ynesbek-chwaya"
    );

    return (favoriteRecords.length > 0 ? favoriteRecords : compatibleRecords).slice(0, 3);
  }, [favoriteRecords, records]);

  const alerts = useMemo(() => {
    const nextAlerts: string[] = [];

    if (!hasProfileSetup) {
      nextAlerts.push("kammel profil sghir bech home twali 3la hsabek akther.");
    }

    if (settings.preference !== "enabled") {
      nextAlerts.push("cha3el tnabih SPF ken t7eb tfakra sghira fil nhar.");
    }

    if (latestRecord?.fitResult.status === "ma-ynesbekch-jemla") {
      nextAlerts.push(`${latestRecord.product.name} ma yensbekch tawa 3la hsab profil mte3ek.`);
    }

    const suggestions = buildRescanSuggestions({
      currentProfile: activeProfile,
      records
    });

    if (suggestions.length > 0) {
      nextAlerts.push(`${suggestions.length} produits yesta7a9ou rescan ba3d tabdil profil.`);
    }

    return nextAlerts.slice(0, 3);
  }, [activeProfile, hasProfileSetup, latestRecord, records, settings.preference]);

  const utilityActions = hasProfileSetup
    ? [
        { title: "Scanni tawa", href: "/scan" as Route, tone: "primary" as const },
        { title: "Chouf ntiija", href: "/ntija" as Route, tone: "secondary" as const }
      ]
    : [
        { title: "A3mel profil", href: "/register" as Route, tone: "primary" as const },
        { title: "Scanni tawa", href: "/scan" as Route, tone: "secondary" as const }
      ];

  return (
    <LazyMotion features={domAnimation}>
      <main className="sa7ebti-jasmine-pattern relative bg-[#FDFBF7] text-espresso">
        <section className="sticky top-0 overflow-hidden" style={{ minHeight: "100dvh" }}>
          <m.div style={{ y: heroLiftY, opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
            <m.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: [1, 1.035, 1],
                      x: [0, 8, 0],
                      y: [0, -14, 0]
                    }
              }
              transition={heroLoopTransition}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                alt="tofla tounsia chedda box sa7ebti"
                src={heroImage}
                fill
                loading="eager"
                fetchPriority="high"
                unoptimized
                sizes="100vw"
                className="object-cover object-[center_18%]"
              />
            </m.div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,37,34,0.02)_0%,rgba(38,37,34,0.12)_32%,rgba(38,37,34,0.84)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(38,37,34,0.18),transparent)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom,rgba(201,122,83,0.22),transparent_60%)]" />
          </m.div>

          <m.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            className="sa7ebti-app-shell relative z-10 flex flex-col items-center justify-end px-4 text-center text-white"
            data-home-hero
          >
            <div
              className="flex min-h-[100svh] w-full flex-col items-center justify-between pb-10 pt-16"
              style={{
                minHeight: "100dvh",
                paddingTop: "calc(env(safe-area-inset-top) + 3.5rem)",
                paddingBottom: "calc(env(safe-area-inset-bottom) + 2.5rem)"
              }}
            >
              <div className="w-full" />

              <div className="w-full">
                <div className="rounded-[1.9rem] border border-white/18 bg-[rgba(253,251,247,0.14)] px-5 py-4 shadow-soft backdrop-blur-md">
                  {heroTextItems.map((item) => {
                    if (item.key === "badge") {
                      return (
                        <m.div
                          key={item.key}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={{ duration: 0.55, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.14)] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white"
                        >
                          <PetalIcon className="h-3 w-3" />
                          sa7ebti
                        </m.div>
                      );
                    }

                    if (item.key === "title") {
                      return (
                        <m.h1
                          key={item.key}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={{ duration: 0.72, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 font-display text-[clamp(2.45rem,11vw,3.35rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white"
                        >
                          {heroTitleWords.map((word, wordIndex) => (
                            <AnimatedWordMark
                              key={word.text}
                              text={word.text}
                              highlightedIndexes={word.highlightedIndexes}
                              prefersReducedMotion={prefersReducedMotion}
                              delay={item.delay + wordIndex * 0.08}
                              size="title"
                            />
                          ))}
                        </m.h1>
                      );
                    }

                    if (item.key === "body") {
                      return (
                        <m.p
                          key={item.key}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={{ duration: 0.58, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-3 text-[0.92rem] leading-6 text-white/82"
                        >
                          <span className="inline-flex flex-wrap justify-center gap-x-1.5">
                            {heroBodyWords.map((word, wordIndex) => (
                              <AnimatedWordMark
                                key={`${word.text}-${wordIndex}`}
                                text={word.text}
                                highlightedIndexes={word.highlightedIndexes}
                                prefersReducedMotion={prefersReducedMotion}
                                delay={item.delay + wordIndex * 0.03}
                                size="body"
                              />
                            ))}
                          </span>
                        </m.p>
                      );
                    }

                    return (
                      <m.div
                        key={item.key}
                        style={{ opacity: scrollCueOpacity }}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.52, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href="#mobile-home"
                          className="mt-7 inline-flex flex-col items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/92 transition-opacity hover:opacity-100"
                        >
                          scrolli
                          <ScrollCue reducedMotion={prefersReducedMotion} />
                        </Link>
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </m.div>
        </section>

        <m.section
          id="mobile-home"
          style={{ y: contentLiftY, scale: contentScale }}
          className="relative z-20 -mt-14 rounded-t-[2rem] bg-[#FDFBF7] px-4 pb-28 pt-6 shadow-[0_-18px_60px_rgba(38,37,34,0.12)]"
        >
          <div className="sa7ebti-app-shell space-y-4">
            <div className="mx-auto mb-1 h-1.5 w-14 rounded-full bg-espresso/10" />

            {!isHydrated ? (
              <HomeDashboardSkeleton />
            ) : (
              <>
                <TodayUtilityCard
                  actions={utilityActions}
                  body={dailyAdvice.uvCard.body}
                  cityLabel={dailyAdvice.uvCard.cityLabel}
                  hasProfileSetup={hasProfileSetup}
                  reminderLabel={dailyAdvice.uvCard.reminderLabel}
                  title={dailyAdvice.uvCard.title}
                />

                {hasProfileSetup ? (
                  <HomeQuickOverview
                    alerts={alerts.slice(0, 2)}
                    latestRecord={latestRecord}
                    onOpenAnalysis={setActiveAnalysisRecordId}
                    routinePlan={routinePlan.slice(0, 2)}
                  />
                ) : (
                  <FirstTimeCard />
                )}

                <ProductsInUseCard
                  products={utilityProducts}
                  hasFavorites={favoriteRecords.length > 0}
                  onOpenAnalysis={setActiveAnalysisRecordId}
                />
              </>
            )}
          </div>
        </m.section>

        <Sa7ebtiBottomNav active="home" hiddenUntilScroll />
      </main>
    </LazyMotion>
  );
}

function TodayUtilityCard({
  actions,
  body,
  cityLabel,
  hasProfileSetup,
  reminderLabel,
  title
}: {
  actions: { title: string; href: Route; tone: "primary" | "secondary" }[];
  body: string;
  cityLabel: string;
  hasProfileSetup: boolean;
  reminderLabel: string;
  title: string;
}) {
  return (
    <section className="rounded-[1.8rem] bg-espresso p-4 text-white shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ochre">
            lyoum m3ak
          </p>
          <h2 className="mt-2 font-display text-[1.45rem] font-semibold leading-[1.02]">{title}</h2>
          <p className="mt-2 text-[0.84rem] leading-5 text-white/78">
            {hasProfileSetup
              ? body
              : "9bal ma tkathar scans, kammel profil bech l nsi7a twali a9rab lik."}
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
          <WarmSunIcon className="h-5 w-5 text-ochre" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-medium text-white/92">
          {cityLabel}
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-medium text-white/92">
          {reminderLabel}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className={`flex h-11 items-center justify-center rounded-full text-[0.74rem] font-semibold uppercase tracking-[0.05em] transition-all duration-300 active:scale-[0.98] ${
              action.tone === "primary"
                ? "bg-white text-espresso shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
                : "border border-white/18 bg-white/10 text-white"
            }`}
          >
            {action.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

function FirstTimeCard() {
  return (
    <section className="rounded-[1.7rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(246,239,230,0.96))] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
            profil awal
          </p>
          <h3 className="mt-2 font-display text-[1.2rem] leading-[1.02] text-espresso">
            5allina na3rfou routinek 9bal ma nebniw home 3la hsabek.
          </h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_22px_rgba(38,37,34,0.08)]">
          <ShieldSunIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {profileCriteriaPreview.map((item) => (
          <span
            key={item}
            className="rounded-full border border-espresso/[0.08] bg-white px-3 py-1.5 text-[0.72rem] font-medium text-espresso/[0.76]"
          >
            {item}
          </span>
        ))}
      </div>

      <Link
        href="/register"
        className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-[#C97A53] text-[0.74rem] font-semibold uppercase tracking-[0.05em] text-white shadow-button transition-all duration-300 active:scale-[0.98]"
      >
        kamel profil
      </Link>
    </section>
  );
}

function HomeQuickOverview({
  alerts,
  latestRecord,
  onOpenAnalysis,
  routinePlan
}: {
  alerts: string[];
  latestRecord: ScannedProductRecord | null;
  onOpenAnalysis: (recordId: string | null) => void;
  routinePlan: RoutinePlanStep[];
}) {
  return (
    <section className="grid grid-cols-2 gap-3">
      <div className="rounded-[1.55rem] border border-espresso/[0.08] bg-white/[0.86] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
              routine lyoum
            </p>
            <p className="mt-1 text-[0.76rem] leading-5 text-espresso/[0.68]">
              2 steps sra3 bech tebda.
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5EEE7] text-terracotta">
            <PetalIcon className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {routinePlan.map((step) => (
            <article key={`${step.time}-${step.title}`} className="rounded-[1rem] bg-[#FAF6F0] p-2.5">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
                {step.time}
              </p>
              <p className="mt-1 font-display text-[0.88rem] leading-5 text-espresso">{step.title}</p>
              <p className="mt-1 text-[0.68rem] leading-4.5 text-espresso/[0.62]">{step.productName}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {latestRecord ? (
          <article className="rounded-[1.55rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,239,230,0.92))] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)]">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
              akher scan
            </p>
            <p className="mt-2 font-display text-[0.98rem] leading-5 text-espresso">{latestRecord.product.name}</p>
            <p className="mt-1 text-[0.72rem] leading-5 text-espresso/[0.64]">
              {latestRecord.recommendationSummary.shortNote}
            </p>
            <Link
              href="/analysis"
              onClick={() => onOpenAnalysis(latestRecord.id)}
              className="mt-3 inline-flex rounded-full bg-[#F5EEE7] px-3 py-1.5 text-[0.66rem] font-semibold text-terracotta"
            >
              chouf
            </Link>
          </article>
        ) : null}

        <div className="rounded-[1.55rem] border border-terracotta/12 bg-[#F6E8E2] p-4">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
            intibeh
          </p>
          <div className="mt-2 space-y-2">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <p key={alert} className="rounded-[0.95rem] bg-white/80 px-3 py-2 text-[0.7rem] leading-4.5 text-espresso/[0.72]">
                  {alert}
                </p>
              ))
            ) : (
              <p className="rounded-[0.95rem] bg-white/80 px-3 py-2 text-[0.7rem] leading-4.5 text-espresso/[0.72]">
                ma fama ch alert kbira tawa.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsInUseCard({
  products,
  hasFavorites,
  onOpenAnalysis
}: {
  products: ScannedProductRecord[];
  hasFavorites: boolean;
  onOpenAnalysis: (recordId: string | null) => void;
}) {
  return (
    <section className="rounded-[1.7rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,239,230,0.92))] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
            {hasFavorites ? "produits nesta3melhom" : "produits yjiw m3ak"}
          </p>
          <p className="mt-1 text-[0.82rem] leading-5 text-espresso/[0.68]">
            {hasFavorites
              ? "men favoris mte3ek bech traja3hom b sra3."
              : "men scans elli tban yensbou m3a bachretk."}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_22px_rgba(38,37,34,0.08)]">
          <ShieldCheckIcon className="h-5 w-5" />
        </div>
      </div>

      {products.length > 0 ? (
        <div className="mt-4 space-y-2.5">
          {products.map((record) => (
            <article key={record.id} className="rounded-[1.2rem] bg-white/90 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[0.98rem] text-espresso">{record.product.name}</p>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.08em] text-terracotta">
                    {getCategoryOption(record.product.category)?.label ?? record.product.category}
                  </p>
                  <p className="mt-2 text-[0.76rem] leading-5 text-espresso/[0.68]">
                    {record.recommendationSummary.actionLabel}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[0.66rem] font-semibold ${getStatusTone(record)}`}>
                  {getFitLabel(record.fitResult.status)}
                </span>
              </div>

              <Link
                href="/analysis"
                onClick={() => onOpenAnalysis(record.id)}
                className="mt-3 inline-flex rounded-full bg-[#F5EEE7] px-3 py-1.5 text-[0.68rem] font-semibold text-terracotta"
              >
                chouf tafasil
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[1.2rem] bg-white/90 p-4">
          <p className="text-[0.8rem] leading-5 text-espresso/[0.68]">
            mazel ma 3andekch produits metkarrra fil home. ebda b scan wala 7ot favorit ba3d.
          </p>
        </div>
      )}
    </section>
  );
}

function HomeDashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-44 animate-pulse rounded-[1.8rem] bg-[#EEE7E0]" />
      <div className="h-56 animate-pulse rounded-[1.7rem] bg-[#F2ECE6]" />
      <div className="h-52 animate-pulse rounded-[1.7rem] bg-[#EEE7E0]" />
    </div>
  );
}

function AnimatedWordMark({
  text,
  highlightedIndexes = [],
  prefersReducedMotion,
  delay,
  size
}: {
  text: string;
  highlightedIndexes?: readonly number[];
  prefersReducedMotion: boolean;
  delay: number;
  size: "title" | "body";
}) {
  const highlightedIndexSet = new Set(highlightedIndexes);
  const letters = Array.from(text);
  const baseClassName =
    size === "title"
      ? "inline-flex items-end whitespace-pre text-white"
      : "inline-flex items-end whitespace-pre text-white/82";

  return (
    <span className={baseClassName}>
      {letters.map((letter, index) => {
        const isHighlighted = highlightedIndexSet.has(index);

        return (
          <m.span
            key={`${text}-${index}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={
              prefersReducedMotion
                ? undefined
                : isHighlighted
                  ? {
                      opacity: [1, 0.78, 1],
                      y: [0, -2, 0]
                    }
                  : { opacity: 1, y: 0 }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : isHighlighted
                  ? {
                      delay: delay + index * 0.02,
                      duration: size === "title" ? 2.2 : 2.4,
                      repeat: Infinity,
                      repeatDelay: size === "title" ? 2.2 : 2.8,
                      ease: "easeInOut"
                    }
                  : {
                      delay: delay + index * 0.015,
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1]
                    }
            }
            className={isHighlighted ? "relative inline-block will-change-transform" : "relative inline-block"}
          >
            {letter}
          </m.span>
        );
      })}
    </span>
  );
}

function ScrollCue({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <m.span
      animate={reducedMotion ? undefined : { y: [0, 6, 0], scale: [1, 1.03, 1] }}
      transition={
        reducedMotion
          ? undefined
          : {
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }
      }
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/22 bg-[rgba(255,255,255,0.08)] shadow-[0_18px_32px_rgba(0,0,0,0.18)] backdrop-blur-md"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M7 14l5-5 5 5" />
        <path d="M7 19l5-5 5 5" className="opacity-55" />
      </svg>
    </m.span>
  );
}

function getStatusTone(record: ScannedProductRecord) {
  switch (record.fitResult.status) {
    case "ynesbek":
      return "bg-[#E6F2EA] text-[#2F6B45]";
    case "ynesbek-chwaya":
      return "bg-[#F7EBD8] text-[#8A5A22]";
    default:
      return "bg-[#F6DFD9] text-[#9A4C3B]";
  }
}
