import type { ReactNode } from "react";
import Link from "next/link";
import {
  HeartIcon,
  LeafIcon,
  ScannerFocusIcon,
  ShieldSunIcon,
  WaterDropIcon
} from "@/components/sa7ebti-icons";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";
import { Sa7ebtiTopBar } from "@/components/sa7ebti-shell";

const scannedItems = [
  {
    name: "Serum hyaluronic",
    fit: "ynesbek",
    note: "khfif, yratab, w ma yeth9elch 3al bachra.",
    statusTone: "bg-[#E6F2EA] text-[#2F6B45]"
  },
  {
    name: "Fond de teint matte",
    fit: "ynesbek b chwaya",
    note: "thbat behi ama lezem base ratba 9ablou.",
    statusTone: "bg-[#F7EBD8] text-[#8A5A22]"
  },
  {
    name: "Cleanser foaming",
    fit: "ma ynesbekch barcha",
    note: "momken ynachef lbachra ken testa3mlou kol nhar.",
    statusTone: "bg-[#F6DFD9] text-[#9A4C3B]"
  }
];

const dailyRoutine = [
  {
    time: "sbeh",
    title: "routine khfifa",
    body: "cleanser hnin, serum ratba, hydratant, ba3d SPF."
  },
  {
    time: "wost nhar",
    title: "retouche sghira",
    body: "3awed SPF ken khrajt w thabet l makeup ken lezem."
  },
  {
    time: "lil",
    title: "ra7et lbachra",
    body: "na77i makeup, naDhef, w 7ot produit yheddi."
  }
];

export function NtijaScreen() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-espresso">
      <Sa7ebtiTopBar title="ntiija" />

      <main className="sa7ebti-zellige-pattern mx-auto min-h-screen max-w-md px-4 pb-28 pt-20">
        <section className="rounded-[1.8rem] bg-espresso p-5 text-white shadow-soft">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ochre">
            items eli tscannaw
          </p>
          <h1 className="mt-2 font-display text-[1.7rem] font-semibold leading-[1.02]">
            kol produit w kifeh yji m3ak.
          </h1>
          <p className="mt-3 text-[0.9rem] leading-6 text-white/75">
            hne tal9a akher produits eli choufthom, w routine yawmia tnajjem temchi 3liha.
          </p>
        </section>

        <section className="mt-4 space-y-3">
          {scannedItems.map((item) => (
            <article
              key={item.name}
              className="rounded-[1.45rem] border border-espresso/[0.08] bg-white/[0.82] p-4 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[1.06rem] leading-5 text-espresso">{item.name}</p>
                  <p className="mt-2 text-[0.8rem] leading-5 text-espresso/[0.68]">{item.note}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[0.66rem] font-semibold ${item.statusTone}`}>
                  {item.fit}
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-4 rounded-[1.7rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,239,230,0.92))] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                routine yawmia
              </p>
              <p className="mt-1 text-[0.82rem] leading-5 text-espresso/[0.68]">
                routine sahla 3la hsab scanet mte3ek.
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_22px_rgba(38,37,34,0.08)]">
              <HeartIcon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {dailyRoutine.map((step, index) => (
              <div key={step.time} className="rounded-[1.2rem] bg-[#FAF6F0] p-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-[0.7rem] font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
                    {step.time}
                  </p>
                </div>
                <p className="mt-2 font-display text-[0.98rem] text-espresso">{step.title}</p>
                <p className="mt-1 text-[0.78rem] leading-5 text-espresso/[0.68]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-3 gap-2">
          <MiniCard icon={<ScannerFocusIcon className="h-4 w-4" />} label="scan jdida" />
          <MiniCard icon={<ShieldSunIcon className="h-4 w-4" />} label="SPF dima" />
          <MiniCard icon={<WaterDropIcon className="h-4 w-4" />} label="ratba mohema" />
        </section>

        <Link
          href="/scan"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C97A53] text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-white shadow-button transition-all duration-300 active:scale-[0.98]"
        >
          <LeafIcon className="h-4 w-4" />
          a3mel scan ekher
        </Link>
      </main>

      <Sa7ebtiBottomNav active="results" />
    </div>
  );
}

function MiniCard({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="rounded-[1.2rem] border border-espresso/[0.08] bg-white/80 p-3 text-center shadow-[0_14px_28px_rgba(38,37,34,0.04)]">
      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#F5EEE7] text-terracotta">
        {icon}
      </div>
      <p className="mt-2 text-[0.72rem] font-semibold text-espresso/[0.76]">{label}</p>
    </div>
  );
}
