import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  HeartIcon,
  ImageIcon,
  LeafIcon,
  LightbulbIcon,
  PetalIcon,
  ShieldCheckIcon,
  ShieldSunIcon,
  WarmSunIcon,
  WaterDropIcon
} from "@/components/sa7ebti-icons";
import { AnalysisGlassCard } from "@/components/analysis/analysis-glass-card";
import { AnalysisIngredientRow } from "@/components/analysis/analysis-ingredient-row";
import { SparkIcon } from "@/components/icons";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";
import { Sa7ebtiTopBar } from "@/components/sa7ebti-shell";

const topbarAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbWL_OavFB6ye1fYuyGrJlzftJEf8WcVASQnIIxxnrY8aWjini5Z9uaR-wbOgZP1KRn-TGEh8CLTL4NY2z3vJuzkR25LqYeY9UO_FAuAJnvb1PwaTVwjkP6q1vZqXIvTdenL7-Jdd0VcpGRhI0MmhoeNXPWYgnk4S_7giwLUdisn6s8EDFyMSjfSNFaIxxhqDb8Zi2QFhZhlGh36rf48Z5QiNeqEz5H_pur1IWezPcK8swBC_QHC-Tu0yB8bOTQmyVJadHSDoo0nIH";

const productImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBi6LtVNR_-Ja9HrOPu_EfNWqdxpsGGNLQi1LDGXa3lCoKkBtxlFdvSx7X0YLPPg6zOrwp-NZlg3f6YUM-l2L_W2ckamKqHSzvEDSY1nUCOqyOh5eXeQFG7CfPdmWgRrrkEYbbFo6mRIWxQLRZejjzmbuSpSqBU1i8wW8bcv1dX2_u0aHtPDu46pOkEETCkmj4j778ZUEwaACM2YLsSbP9ypQglwaP7x6yROIcSUW1obeGTMynraU8qXShkC-bFBsoi7uO4DoPVaFxV";

export function AnalysisSheet() {
  return (
    <div className="overflow-x-hidden bg-surface font-body text-on-surface">
      <Sa7ebtiTopBar
        leading={
          <Link href="/scan" className="inline-flex items-center justify-center text-primary active:scale-95">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
        }
        avatarSrc={topbarAvatar}
      />

      <main className="sa7ebti-zellige-pattern mx-auto min-h-screen max-w-2xl px-4 pb-28 pt-20">
        <section className="relative mb-8">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
            <div className="group relative">
              <div className="aspect-square overflow-hidden rounded-[1.4rem] shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  alt="produit mamsouh"
                  src={productImage}
                  width={768}
                  height={768}
                  priority
                  quality={72}
                  sizes="(max-width: 768px) calc(100vw - 40px), 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-20" />
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center">
              <div className="relative mb-2.5 h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-secondary-container"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="22"
                    className="text-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-[1.8rem] font-bold leading-none tracking-[-0.02em] text-primary">
                    92%
                  </span>
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.1em] text-on-surface-variant">
                    yensbek
                  </span>
                </div>
              </div>
              <p className="font-display text-[1.15rem] leading-6 text-on-surface">Yji m3ak barcha</p>
              <p className="mt-1 text-[0.82rem] text-on-surface-variant">
                l analyse salet 3la hsab profil mte3ek.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-4">
          <AnalysisGlassCard>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="mb-1 block text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-primary">
                  chams lyoum
                </span>
                <div className="flex items-center gap-2.5">
                  <WarmSunIcon className="h-4 w-4 text-tertiary" />
                  <span className="font-display text-[1.1rem] leading-6 text-on-surface">UV 8 (3ali)</span>
                </div>
                <p className="mt-1 text-[0.78rem] text-on-surface-variant">Tunis, Tounes</p>
              </div>
              <div className="rounded-[0.9rem] bg-tertiary-container/20 p-2.5 text-right">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-tertiary">
                  7meya mel chams
                </p>
                <p className="text-[0.78rem] font-bold text-on-surface">3awed SPF kol 2 se3at</p>
              </div>
            </div>
          </AnalysisGlassCard>

          <AnalysisGlassCard>
            <div className="mb-2.5 flex items-center gap-2.5 text-tertiary">
              <ShieldCheckIcon className="h-4 w-4" />
              <h2 className="font-display text-[1.12rem] leading-6">3leh hedha yji m3a bachretek</h2>
            </div>
            <p className="text-[0.84rem] leading-6 text-on-surface-variant">
              formula hethi khfifa w ma teth9elch 3al pores. tzid ratba b doura mdawza
              w t3awen t9allel lama3. ma fihach SPF ama yemshe m3a routine nhariya ken tzid
              7meya men ba3d.
            </p>
          </AnalysisGlassCard>

          <AnalysisGlassCard>
            <h3 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
              ta7lil l ingredients
            </h3>
            <div className="space-y-4">
              <AnalysisIngredientRow
                icon={<WaterDropIcon className="h-5 w-5 text-[#002020]" />}
                iconClassName="bg-tertiary-container"
                title="Hyaluronic Acid"
                body="ratba behya bla ma ykhallek tethan. yji m3a profil mte3ek."
              />
              <AnalysisIngredientRow
                icon={<LeafIcon className="h-5 w-5 text-[#4c4733]" />}
                iconClassName="bg-secondary-container"
                title="Green Tea Extract"
                body="yheddi l bachra w y9allel l i7mirar."
              />
            </div>
          </AnalysisGlassCard>

          <AnalysisGlassCard>
            <div className="mb-2.5 flex items-center gap-2.5 text-primary">
              <ShieldSunIcon className="h-4 w-4" />
              <h2 className="font-display text-[1.12rem] leading-6">7meya men chams tounes</h2>
            </div>
            <p className="mb-3 text-[0.84rem] leading-6 text-on-surface-variant">
              ma3a chams tounes l 9wiya, a7sen haja tzid m3ah SPF 50. ken bachretk t7ess beha
              s5ouna, tnajjem t7ot masque hedi fil lil.
            </p>
            <div className="flex items-center gap-2.5 rounded-[0.95rem] bg-secondary-container/30 p-2.5">
              <LightbulbIcon className="h-4 w-4 text-primary" />
              <p className="text-[0.76rem] font-semibold">Nasii7a: hot serum 9bal sunscreen b 15 d9i9a.</p>
            </div>
          </AnalysisGlassCard>

          <div className="relative overflow-hidden rounded-[1.2rem] bg-primary-container p-4 text-on-primary-container shadow-lg">
            <div className="absolute -right-8 -top-8 rotate-12 opacity-10">
              <PetalIcon className="h-20 w-20" />
            </div>
            <div className="relative z-10">
              <div className="mb-2 flex items-center gap-2">
                <SparkIcon className="h-4 w-4" />
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em]">
                  conseil sa7ebti
                </span>
              </div>
              <p className="mb-1 font-display text-[1.08rem] italic leading-6">&quot;ra7et l bachra&quot;</p>
              <p className="text-[0.82rem] italic leading-5 text-on-primary-container/90">
                ken t7eb rezultat a7sen, hotou ba3d nettoyage hnin w 5alli l bachra tcherb
                b chwaya chwaya 9bal ma tzid ay produit ekher.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2.5">
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full bg-primary text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-on-primary transition-opacity hover:opacity-90"
          >
            <HeartIcon className="h-4 w-4" />
            7otou fel favoris
          </button>
          <Link
            href="/scan"
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-primary/20 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/5"
          >
            <ImageIcon className="h-4 w-4" />
            jarrab produit ekher
          </Link>
        </div>
      </main>

      <Sa7ebtiBottomNav active="scan" />
    </div>
  );
}
