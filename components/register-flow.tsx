"use client";

import type { ComponentProps, ComponentType, ReactNode } from "react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ApartmentIcon,
  BalanceIcon,
  BronzeIcon,
  BubbleIcon,
  CloseIcon,
  FlareIcon,
  LeafIcon,
  PetalIcon,
  WarmSunIcon,
  WaterDropIcon
} from "@/components/elyssette-icons";
import { ElyssetteTopBar } from "@/components/elyssette-shell";

type Option = {
  value: string;
  title: string;
  description: string;
  icon: ComponentType<ComponentProps<"svg">>;
  accent?: string;
};

type FormState = {
  skinType: string;
  climate: string;
  concerns: string[];
  ingredientFilters: string[];
};

const profilePhoto =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA41xPmrDk6rANDbIJl7ITks9UGS0m_Xnlr11Tt2LuXYxsEFuE04YQybPYQL974fC2DCQrq9_bPf48E4ELoM27a6llun8BA39tjaS35HM_otqC5WfuKSXllnKMJVF5TGt2QEgBfxSaE2E5ke4obhaRO10OY9IMUnYMaERMFIWKRNh0-mAzvmWApA6PLKl5MhXlFSQGUW0dalsld6t-vj6gg6bwmcbm2dKDUqhwqmk_Y5RS1xqQQTtKb260ouCEfiSZWyHsP67-EKEPp";

const skinOptions: Option[] = [
  {
    value: "oily",
    title: "Oily",
    description: "Visible shine, enlarged pores, prone to breakouts.",
    icon: WaterDropIcon
  },
  {
    value: "dry",
    title: "Dry",
    description: "Feels tight, may flake, lacks natural radiance.",
    icon: LeafIcon
  },
  {
    value: "combination",
    title: "Combination",
    description: "Oily T-zone, softer cheeks and jawline.",
    icon: BalanceIcon
  },
  {
    value: "sensitive",
    title: "Sensitive",
    description: "Reactive skin that prefers calm, barrier-safe formulas.",
    icon: PetalIcon
  }
];

const climateOptions: Option[] = [
  {
    value: "tunis-ariana",
    title: "Tunis / Ariana",
    description: "Humid city air with daily pollution and midday shine.",
    icon: ApartmentIcon
  },
  {
    value: "gafsa-sened",
    title: "Gafsa / Sened",
    description: "Dry and dusty heat that can dehydrate skin quickly.",
    icon: WarmSunIcon
  },
  {
    value: "sfax-coastal",
    title: "Sfax",
    description: "Coastal warmth with salt air and stronger UV exposure.",
    icon: WaterDropIcon,
    accent: "text-tertiary"
  }
];

const concernOptions: Option[] = [
  {
    value: "hyperpigmentation",
    title: "Melasma",
    description: "Uneven tone, marks, and stubborn pigmentation.",
    icon: BronzeIcon
  },
  {
    value: "acne",
    title: "Acne",
    description: "Clarify texture and reduce congestion.",
    icon: BubbleIcon
  },
  {
    value: "sun-sensitivity",
    title: "Sun Sensitive",
    description: "Needs extra UV-friendly support through the day.",
    icon: WarmSunIcon
  },
  {
    value: "dehydration",
    title: "Dehydration",
    description: "Tightness, dullness, and water-loss through the day.",
    icon: WaterDropIcon
  }
];

const filterOptions: Option[] = [
  {
    value: "clean-only",
    title: "Clean / Organic",
    description: "Prefer shorter formulas and botanical options.",
    icon: LeafIcon
  },
  {
    value: "fragrance-free",
    title: "Fragrance-Free",
    description: "Avoid perfume-heavy formulas and sensitizers.",
    icon: FlareIcon,
    accent: "text-terracotta"
  },
  {
    value: "non-comedogenic",
    title: "Non-Comedogenic",
    description: "Prioritize lighter textures that do not clog pores.",
    icon: BubbleIcon
  },
  {
    value: "spf-priority",
    title: "SPF Priority",
    description: "Push UV-safe matches and daily protection first.",
    icon: WarmSunIcon
  }
];

export function RegisterFlow() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<FormState>({
    skinType: "",
    climate: "",
    concerns: [],
    ingredientFilters: []
  });
  const isReady = Boolean(form.skinType && form.climate);

  function toggleConcern(value: string) {
    setForm((current) => ({
      ...current,
      concerns: current.concerns.includes(value)
        ? current.concerns.filter((item) => item !== value)
        : [...current.concerns, value]
    }));
  }

  function toggleFilter(value: string) {
    setForm((current) => ({
      ...current,
      ingredientFilters: current.ingredientFilters.includes(value)
        ? current.ingredientFilters.filter((item) => item !== value)
        : [...current.ingredientFilters, value]
    }));
  }

  function handleSubmit() {
    if (!isReady) return;

    startTransition(() => {
      router.push("/scan");
    });
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-espresso">
      <ElyssetteTopBar
        leading={
          <Link href="/" className="inline-flex items-center justify-center text-terracotta active:scale-95">
            <CloseIcon className="h-6 w-6" />
          </Link>
        }
        avatarSrc={profilePhoto}
      />

      <main className="ely-zellige-pattern mx-auto min-h-screen max-w-xl px-4 pb-28 pt-20">
        <section className="rounded-[1.6rem] bg-espresso p-4.5 text-ivory shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ochre">
                  Profil botanique
                </p>
                <h1 className="mt-2 font-display text-[1.62rem] font-semibold leading-[1.04]">
                  Un profil rapide, sans etapes inutiles.
                </h1>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <PetalIcon className="h-5 w-5 text-ochre" />
              </div>
            </div>
            <p className="mt-3 text-[0.84rem] leading-5 text-white/[0.72]">
              On garde l&apos;essentiel: ta peau, ton climat, tes priorites et tes filtres
              ingredients.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <SummaryBadge label={skinOptions.find((item) => item.value === form.skinType)?.title ?? "Type de peau"} />
              <SummaryBadge label={climateOptions.find((item) => item.value === form.climate)?.title ?? "Micro-climat"} />
              <SummaryBadge label={form.concerns.length > 0 ? `${form.concerns.length} concerns` : "Concerns"} />
              <SummaryBadge
                label={
                  form.ingredientFilters.length > 0
                    ? `${form.ingredientFilters.length} filters`
                    : "Ingredient filters"
                }
              />
            </div>
        </section>

        <div className="mt-4 space-y-3">
            <FormSection
              eyebrow="01"
              title="Type de peau"
              description="Choisissez la texture qui vous ressemble le plus la plupart des jours."
            >
              <div className="grid grid-cols-2 gap-2.5">
                {skinOptions.map((option) => (
                  <IconChip
                    key={option.value}
                    option={option}
                    selected={form.skinType === option.value}
                    onClick={() => setForm((current) => ({ ...current, skinType: option.value }))}
                  />
                ))}
              </div>
            </FormSection>

            <FormSection
              eyebrow="02"
              title="Micro-climat tunisien"
              description="Ces variations changent vraiment la tenue du makeup et la tolerance skincare."
            >
              <div className="-mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 pb-1.5">
                {climateOptions.map((option) => (
                  <ClimateCard
                    key={option.value}
                    option={option}
                    selected={form.climate === option.value}
                    onClick={() => setForm((current) => ({ ...current, climate: option.value }))}
                  />
                ))}
              </div>
            </FormSection>

            <FormSection
              eyebrow="03"
              title="Ce qui compte le plus"
              description="Ajoutez vos priorites pour des recommandations plus nettes."
            >
              <div className="grid grid-cols-2 gap-2.5">
                {concernOptions.map((option) => (
                  <IconChip
                    key={option.value}
                    option={option}
                    selected={form.concerns.includes(option.value)}
                    onClick={() => toggleConcern(option.value)}
                  />
                ))}
              </div>
            </FormSection>

            <FormSection
              eyebrow="04"
              title="Filtres ingredients"
              description="Ajoutez les preferences qui doivent guider vos prochains scans."
            >
              <div className="grid gap-2.5">
                {filterOptions.map((option) => (
                  <SelectionRow
                    key={option.value}
                    option={option}
                    selected={form.ingredientFilters.includes(option.value)}
                    onClick={() => toggleFilter(option.value)}
                  />
                ))}
              </div>
            </FormSection>
          </div>
      </main>

      <footer className="fixed bottom-0 left-0 z-40 w-full bg-[rgba(253,251,247,0.88)] px-4 pb-safe pt-2 backdrop-blur-md">
        <div className="mx-auto flex max-w-xl items-center gap-2.5 rounded-[1.35rem] border border-espresso/[0.08] bg-white/[0.72] p-2.5 shadow-soft">
          <div className="min-w-0 flex-1">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
              Pret pour le scan
            </p>
            <p className="truncate text-[0.76rem] text-espresso/[0.68]">
              {isReady
                ? "Profil valide. Vos prochains scans seront personnalises."
                : "Choisissez au moins votre type de peau et votre climat."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isReady || isPending}
            className="flex h-10.5 shrink-0 items-center justify-center rounded-full bg-[#C97A53] px-4 text-[0.72rem] font-semibold uppercase tracking-[0.04em] text-white shadow-button transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Chargement..." : "Creer mon Profil Botanique"}
          </button>
        </div>
      </footer>
    </div>
  );
}

function FormSection({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.45rem] border border-espresso/[0.08] bg-white/[0.72] p-3.5 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md">
      <div className="mb-3">
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
          {eyebrow}
        </p>
        <h2 className="mt-1.5 font-display text-[1.28rem] leading-none text-espresso">{title}</h2>
        <p className="mt-1.5 text-[0.8rem] leading-5 text-espresso/[0.66]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function SummaryBadge({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[0.64rem] font-medium text-white/[0.88]">
      {label}
    </div>
  );
}

function SelectionRow({
  option,
  selected,
  onClick
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-[1.1rem] border p-3 text-left transition-all duration-300 ${
        selected
          ? "border-terracotta bg-[#E6CCB2]/40 shadow-[0_16px_32px_rgba(201,122,83,0.12)]"
          : "border-espresso/[0.08] bg-white/[0.45] hover:border-terracotta/40"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-white ${
          option.accent ?? "text-terracotta"
        } shadow-[0_10px_22px_rgba(38,37,34,0.08)]`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-[0.96rem] leading-5 text-espresso">{option.title}</h3>
        <p className="text-[0.7rem] leading-4.5 text-espresso/[0.62]">{option.description}</p>
      </div>
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-terracotta bg-terracotta text-white" : "border-espresso/[0.14] text-transparent"
        }`}
      >
        <span className="text-[0.62rem] font-bold">+</span>
      </div>
    </button>
  );
}

function IconChip({
  option,
  selected,
  onClick
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[1.1rem] border p-3 text-left transition-all duration-300 ${
        selected
          ? "border-terracotta bg-[#E6CCB2]/[0.38] shadow-[0_16px_30px_rgba(201,122,83,0.1)]"
          : "border-espresso/[0.08] bg-white/50 hover:border-terracotta/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_20px_rgba(38,37,34,0.06)]">
          <Icon className="h-4 w-4" />
        </div>
        {selected ? (
          <div className="rounded-full bg-sage px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-white">
            match
          </div>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-[0.96rem] leading-5 text-espresso">{option.title}</h3>
      <p className="mt-1 text-[0.7rem] leading-4.5 text-espresso/[0.62]">{option.description}</p>
    </button>
  );
}

function ClimateCard({
  option,
  selected,
  onClick
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[186px] shrink-0 snap-start rounded-[1.2rem] border p-3 text-left transition-all duration-300 ${
        selected
          ? "border-terracotta bg-[#262522] text-white shadow-soft"
          : "border-espresso/[0.08] bg-white/[0.58] text-espresso hover:border-terracotta/40"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          selected ? "bg-white/[0.14] text-ivory" : "bg-[#FAFAED] text-terracotta"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-3 font-display text-[1rem] leading-5">{option.title}</h3>
      <p
        className={`mt-1.5 text-[0.72rem] leading-4.5 ${
          selected ? "text-white/[0.76]" : "text-espresso/[0.62]"
        }`}
      >
        {option.description}
      </p>
    </button>
  );
}
