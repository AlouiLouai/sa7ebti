"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, PetalIcon } from "@/components/sa7ebti-icons";
import { Sa7ebtiTopBar } from "@/components/sa7ebti-shell";
import {
  climateOptions,
  concernOptions,
  filterOptions,
  makeupOptions,
  registerProfilePhoto,
  skinOptions
} from "@/components/register/register-flow.data";
import { RegisterClimateCard } from "@/components/register/register-climate-card";
import { RegisterFormSection } from "@/components/register/register-form-section";
import { RegisterOptionCard } from "@/components/register/register-option-card";
import { RegisterSelectionRow } from "@/components/register/register-selection-row";
import { RegisterSubmitBar } from "@/components/register/register-submit-bar";
import { RegisterSummaryBadge } from "@/components/register/register-summary-badge";
import { useRegisterForm } from "@/hooks/use-register-form";

export function RegisterFlow() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    form,
    isReady,
    selectClimate,
    selectMakeupStyle,
    selectSkinType,
    toggleConcern,
    toggleIngredientFilter
  } = useRegisterForm();

  function handleSubmit() {
    if (!isReady) {
      return;
    }

    startTransition(() => {
      router.push("/scan");
    });
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-espresso">
      <Sa7ebtiTopBar
        leading={
          <Link href="/" className="inline-flex items-center justify-center text-terracotta active:scale-95">
            <CloseIcon className="h-6 w-6" />
          </Link>
        }
        avatarSrc={registerProfilePhoto}
      />

      <main className="sa7ebti-zellige-pattern mx-auto min-h-screen max-w-xl px-4 pb-28 pt-20">
        <section className="rounded-[1.6rem] bg-espresso p-4.5 text-ivory shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ochre">
                Profil AI
              </p>
              <h1 className="mt-2 font-display text-[1.62rem] font-semibold leading-[1.04]">
                chwaya ikhtiyarat bech na3rfou ida l produit ynesbek.
              </h1>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <PetalIcon className="h-5 w-5 text-ochre" />
            </div>
          </div>
          <p className="mt-3 text-[0.84rem] leading-5 text-white/[0.72]">
            no3 lbachra, manta9a, makeup kol nhar w 7assasiya. hedha el kolli y3awen l scan.
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <RegisterSummaryBadge
              label={skinOptions.find((item) => item.value === form.skinType)?.title ?? "Peau"}
            />
            <RegisterSummaryBadge
              label={climateOptions.find((item) => item.value === form.climate)?.title ?? "Manta9a"}
            />
            <RegisterSummaryBadge
              label={makeupOptions.find((item) => item.value === form.makeupStyle)?.title ?? "Makeup"}
            />
            <RegisterSummaryBadge
              label={form.concerns.length > 0 ? `${form.concerns.length} awlawiyet` : "Awlawiyet"}
            />
          </div>
        </section>

        <div className="mt-4 space-y-3">
          <RegisterFormSection
            eyebrow="01"
            title="No3 lbachra"
            description="men hne nebdew bech na3rfou ida formula tenfa3lek."
          >
            <div className="grid grid-cols-2 gap-2.5">
              {skinOptions.map((option) => (
                <RegisterOptionCard
                  key={option.value}
                  option={option}
                  selected={form.skinType === option.value}
                  onClick={() => selectSkinType(option.value)}
                />
              ))}
            </div>
          </RegisterFormSection>

          <RegisterFormSection
            eyebrow="02"
            title="Manta9tek"
            description="5ater skincare w makeup ytabadl 7asb win toskon."
          >
            <div className="-mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 pb-1.5">
              {climateOptions.map((option) => (
                <RegisterClimateCard
                  key={option.value}
                  option={option}
                  selected={form.climate === option.value}
                  onClick={() => selectClimate(option.value)}
                />
              ))}
            </div>
          </RegisterFormSection>

          <RegisterFormSection
            eyebrow="03"
            title="Kifeh testa3mel makeup"
            description="bech n7okmou 3al thbat, ra7a w compatibility m3a base."
          >
            <div className="grid grid-cols-2 gap-2.5">
              {makeupOptions.map((option) => (
                <RegisterOptionCard
                  key={option.value}
                  option={option}
                  selected={form.makeupStyle === option.value}
                  onClick={() => selectMakeupStyle(option.value)}
                />
              ))}
            </div>
          </RegisterFormSection>

          <RegisterFormSection
            eyebrow="04"
            title="Awlawiyet l scan"
            description="zid chnou l AI lezm ychouf awel haja."
          >
            <div className="grid grid-cols-2 gap-2.5">
              {concernOptions.map((option) => (
                <RegisterOptionCard
                  key={option.value}
                  option={option}
                  selected={form.concerns.includes(option.value)}
                  onClick={() => toggleConcern(option.value)}
                />
              ))}
            </div>

            <div className="mt-3 grid gap-2.5">
              {filterOptions.map((option) => (
                <RegisterSelectionRow
                  key={option.value}
                  option={option}
                  selected={form.ingredientFilters.includes(option.value)}
                  onClick={() => toggleIngredientFilter(option.value)}
                />
              ))}
            </div>
          </RegisterFormSection>
        </div>
      </main>

      <RegisterSubmitBar isPending={isPending} isReady={isReady} onSubmit={handleSubmit} />
    </div>
  );
}
