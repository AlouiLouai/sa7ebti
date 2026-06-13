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
import { RegisterReminderCard } from "@/components/register/register-reminder-card";
import { useRegisterForm } from "@/hooks/use-register-form";
import { useUserProfile } from "@/hooks/use-user-profile";
import { sa7ebtiCopy } from "@/lib/copy/sa7ebti-copy";
import { RescanSuggestionsCard } from "@/components/profile/rescan-suggestions-card";
import { UvReminderCard } from "@/components/notifications/uv-reminder-card";

export function RegisterFlow() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { profileDraft: savedProfileDraft, saveProfileDraft } = useUserProfile();
  const {
    form,
    isReady,
    profileDraft,
    selectClimate,
    selectMakeupStyle,
    selectSkinType,
    toggleConcern,
    toggleIngredientFilter,
    setUvReminderPreference
  } = useRegisterForm(savedProfileDraft);

  function handleSubmit() {
    if (!isReady) {
      return;
    }

    startTransition(() => {
      saveProfileDraft(profileDraft);
      router.push("/scan");
    });
  }

  const skinLabel = skinOptions.find((item) => item.value === form.skinType)?.title ?? "Bachra";
  const climateLabel = climateOptions.find((item) => item.value === form.climate)?.title ?? "Manta9a";
  const makeupLabel = makeupOptions.find((item) => item.value === form.makeupStyle)?.title ?? "Mekyaj";
  const spfLabel = profileDraft.spfHabit === "daily" ? "SPF dima" : "SPF mouch m3abbi";
  const lifestyleSummary = [skinLabel, climateLabel, makeupLabel, spfLabel].join(" - ");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-espresso">
      <Sa7ebtiTopBar
        leading={
          <Link href="/" className="inline-flex items-center justify-center text-terracotta active:scale-95">
            <CloseIcon className="h-6 w-6" />
          </Link>
        }
        title={sa7ebtiCopy.routes.register}
        avatarSrc={registerProfilePhoto}
      />

      <main className="sa7ebti-page-shell sa7ebti-zellige-pattern min-h-screen">
        <section className="rounded-[1.6rem] bg-espresso p-4.5 text-ivory shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ochre">
                preferences
              </p>
              <h1 className="mt-2 font-display text-[1.62rem] font-semibold leading-[1.04]">
                homek w scansk lezmhom ya3rfou kifeh ta3ich bachretk.
              </h1>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <PetalIcon className="h-5 w-5 text-ochre" />
            </div>
          </div>
          <p className="mt-3 text-[0.84rem] leading-5 text-white/[0.72]">
            no3 lbachra, manta9a, style mekiaj, w SPF habit. hedha howa l style mte3ek fil app.
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <RegisterSummaryBadge
              label={skinOptions.find((item) => item.value === form.skinType)?.title ?? "Bachra"}
            />
            <RegisterSummaryBadge
              label={climateOptions.find((item) => item.value === form.climate)?.title ?? "Manta9a"}
            />
            <RegisterSummaryBadge
              label={makeupOptions.find((item) => item.value === form.makeupStyle)?.title ?? "Mekyaj"}
            />
            <RegisterSummaryBadge
              label={form.concerns.length > 0 ? `${form.concerns.length} awlawiyet` : "Awlawiyet"}
            />
            <RegisterSummaryBadge
              label={profileDraft.spfHabit === "daily" ? "SPF dima" : "SPF mouch m3abbi"}
            />
            <RegisterSummaryBadge
              label={form.uvReminderPreference === "enabled" ? "tnabih SPF cha3el" : "tnabih SPF mtafi"}
            />
          </div>
        </section>

        <section className="mt-4 rounded-[1.6rem] border border-espresso/[0.08] bg-white/[0.84] p-4 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                summary mte3ek
              </p>
              <h2 className="mt-2 font-display text-[1.18rem] leading-[1.04] text-espresso">
                {lifestyleSummary}
              </h2>
              <p className="mt-2 text-[0.8rem] leading-5 text-espresso/[0.68]">
                badel ay preference men taht ken 7kitk tabdlet wala 7abbet home twali ad9a9.
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEE7] text-terracotta">
              <PetalIcon className="h-5 w-5" />
            </div>
          </div>
        </section>

        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <UvReminderCard />
            <RescanSuggestionsCard />
          </div>

          <RegisterFormSection
            eyebrow="01"
            title="Lifestyle"
            description="hedha howa base profilk: bachra, manta9a, w rythme l mekiaj."
            defaultOpen
          >
            <div className="space-y-3">
              <div>
                <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
                  no3 lbachra
                </p>
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
              </div>

              <div>
                <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
                  manta9tek
                </p>
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
              </div>

              <div>
                <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
                  style mekiaj
                </p>
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
              </div>
            </div>
          </RegisterFormSection>

          <RegisterFormSection
            eyebrow="02"
            title="Awlawiyet w filters"
            description="ikhtar chnouwa ahamm 7aja lik fil scan w chnouwa t7eb teb3ed 3lih."
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

          <RegisterFormSection
            eyebrow="03"
            title="Comfort w tnabihet"
            description="kifeh t7eb home tkalmek w tfakrek fil nhar."
          >
            <div className="grid gap-2.5">
              <RegisterReminderCard
                title="Cha3el tnabih"
                description="bech tal9a fil home w ntiija tfakra b SPF w 3awda."
                selected={form.uvReminderPreference === "enabled"}
                onClick={() => setUvReminderPreference("enabled")}
              />
              <RegisterReminderCard
                title="Sakrou taw"
                description="ken t7eb cards akther khfifa w bla tnabih zeyed."
                selected={form.uvReminderPreference === "disabled"}
                onClick={() => setUvReminderPreference("disabled")}
              />
            </div>
          </RegisterFormSection>
        </div>
      </main>

      <RegisterSubmitBar isPending={isPending} isReady={isReady} onSubmit={handleSubmit} />
    </div>
  );
}
