import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ComponentProps, ComponentType } from "react";
import { DailyUsefulnessPanel } from "@/components/daily/daily-usefulness-panel";
import { profileCriteriaPreview } from "@/components/register/register-flow.data";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";
import {
  GoogleMark,
  PetalIcon,
  ScannerFocusIcon,
  ShieldCheckIcon,
  ShieldSunIcon,
  WarmSunIcon
} from "@/components/sa7ebti-icons";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBPfZJpf6JJfBRIn5xZJnJwoBCpujMAOYIwiabyGlN-RJkZr9tnS3ZD4RXX7K9FW1O89wAFRSrj9KPFF4eLZncgNYmsvgpYc4wlIyf5JgBjDF9o5C4B5u354DTjUMyiP8i1SwmpDUKz02P_MsaH7CY79tS0YxapSIuZCTVimlrdMGsS4Da9MEcierZuVmmIYiOyb8X2dltPqJZ13_fy6wkxCVTcWUKt9nsOL3zdwEBM3tRYidwH8YUfynBYyJYR8V2Jno3BKdNa5ICq";

const valueCards = [
  {
    title: "Scan srii3",
    body: "scanni produit w chouf b sra3 ida ynesbek.",
    icon: ScannerFocusIcon
  },
  {
    title: "Yensbek wala le",
    body: "l AI yfassarlek 3leh b klem sahl.",
    icon: ShieldCheckIcon
  },
  {
    title: "3la hsab twensa",
    body: "s5ana, rtouba w SPF ma7souba.",
    icon: WarmSunIcon
  }
];

const quickActions = [
  {
    title: "Scanni tawa",
    href: "/scan" as Route,
    tone:
      "bg-espresso text-white shadow-[0_20px_44px_rgba(38,37,34,0.18)]"
  },
  {
    title: "A3mel profil",
    href: "/register" as Route,
    tone:
      "border border-espresso/[0.08] bg-white text-espresso shadow-[0_16px_36px_rgba(38,37,34,0.06)]"
  }
];

export function MainScreen() {
  return (
    <main className="sa7ebti-jasmine-pattern relative bg-[#FDFBF7] text-espresso">
      <section className="relative flex min-h-screen items-end overflow-hidden">
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,37,34,0.03)_0%,rgba(38,37,34,0.14)_40%,rgba(38,37,34,0.82)_100%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-8 pt-20 text-center text-white">
          <div className="rounded-[1.7rem] border border-white/18 bg-[rgba(253,251,247,0.14)] px-5 py-4 shadow-soft backdrop-blur-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.14)] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white">
              <PetalIcon className="h-3 w-3" />
              sa7ebti
            </div>
            <h1 className="mt-3 font-display text-[2.55rem] font-semibold leading-[0.92] tracking-[-0.07em] text-white">
              Scanni. Efhem. 9arrer.
            </h1>
            <p className="mt-3 text-[0.9rem] leading-6 text-white/82">
              makeup wala skincare, 3zizti na3tik mellekher ken l produit ynesbek wala le.
            </p>
          </div>

          <Link
            href="#mobile-home"
            className="mt-7 inline-flex flex-col items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/92 transition-opacity hover:opacity-100"
          >
            scrolli
            <ScrollCue />
          </Link>
        </div>
      </section>

      <section
        id="mobile-home"
        className="relative z-10 -mt-6 rounded-t-[2rem] bg-[#FDFBF7] px-4 pb-28 pt-6 shadow-[0_-18px_60px_rgba(38,37,34,0.12)]"
      >
        <div className="mx-auto max-w-md space-y-4">
          <div className="rounded-[1.7rem] bg-espresso p-4 text-white shadow-soft">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ochre">
              sa7ebti AI
            </p>
            <h2 className="mt-2 font-display text-[1.5rem] font-semibold leading-[1.02]">
              kol chay f screen wa7da, bla scroll twil.
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {valueCards.map((card) => (
                <ValueCard key={card.title} {...card} />
              ))}
            </div>
          </div>

          <DailyUsefulnessPanel variant="compact" />

          <div className="rounded-[1.7rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,239,230,0.92))] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                  profil AI
                </p>
                <p className="mt-1 text-[0.82rem] leading-5 text-espresso/[0.68]">
                  chwaya ma3loumet 9bal awel scan.
                </p>
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
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className="group relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-espresso/10 bg-white/[0.92] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(38,37,34,0.08)] active:scale-[0.98]"
            >
              <GoogleMark className="h-5 w-5" />
              <span className="text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-espresso">
                Kamel b Google
              </span>
            </button>

            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`flex h-12 w-full items-center justify-center rounded-full text-[0.78rem] font-semibold uppercase tracking-[0.05em] transition-all duration-300 active:scale-[0.98] ${action.tone}`}
              >
                {action.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Sa7ebtiBottomNav active="home" hiddenUntilScroll />
    </main>
  );
}

function ValueCard({
  title,
  body,
  icon: Icon
}: {
  title: string;
  body: string;
  icon: ComponentType<ComponentProps<"svg">>;
}) {
  return (
    <div className="rounded-[1.15rem] border border-white/10 bg-white/7 p-2.5 text-left">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-3 text-[0.72rem] font-semibold leading-4.5 text-white">{title}</p>
      <p className="mt-1 text-[0.66rem] leading-4.5 text-white/72">{body}</p>
    </div>
  );
}

function ScrollCue() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/22 bg-[rgba(255,255,255,0.08)] shadow-[0_18px_32px_rgba(0,0,0,0.18)] backdrop-blur-md">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 animate-bounce"
        aria-hidden="true"
      >
        <path d="M7 14l5-5 5 5" />
        <path d="M7 19l5-5 5 5" className="opacity-55" />
      </svg>
    </span>
  );
}
