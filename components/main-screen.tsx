import Image from "next/image";
import Link from "next/link";
import { GoogleMark, PetalIcon } from "@/components/elyssette-icons";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBPfZJpf6JJfBRIn5xZJnJwoBCpujMAOYIwiabyGlN-RJkZr9tnS3ZD4RXX7K9FW1O89wAFRSrj9KPFF4eLZncgNYmsvgpYc4wlIyf5JgBjDF9o5C4B5u354DTjUMyiP8i1SwmpDUKz02P_MsaH7CY79tS0YxapSIuZCTVimlrdMGsS4Da9MEcierZuVmmIYiOyb8X2dltPqJZ13_fy6wkxCVTcWUKt9nsOL3zdwEBM3tRYidwH8YUfynBYyJYR8V2Jno3BKdNa5ICq";

export function MainScreen() {
  return (
    <main className="ely-jasmine-pattern relative min-h-screen overflow-hidden bg-[#FDFBF7] text-espresso">
      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col md:grid md:grid-cols-[1.02fr_0.98fr]">
        <section className="relative min-h-[52svh] overflow-hidden animate-rise md:min-h-screen">
          <Image
            alt="Radiant Tunisian beauty with glowing skin"
            src={heroImage}
            fill
            priority
            quality={72}
            sizes="(max-width: 768px) 100vw, 52vw"
            className="object-cover object-[center_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(38,37,34,0.62)] via-[rgba(38,37,34,0.12)] to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[rgba(253,251,247,0)]" />

          <div className="absolute inset-x-4 bottom-8 z-10 max-w-[19rem] rounded-[1.6rem] border border-white/20 bg-[rgba(253,251,247,0.54)] p-4 shadow-soft backdrop-blur-md animate-rise md:left-16 md:bottom-20 md:inset-x-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-espresso px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-ivory">
              <PetalIcon className="h-3 w-3" />
              AI beauty companion
            </div>
            <h1 className="mt-3 font-display text-[2.35rem] font-semibold leading-none tracking-[-0.06em] text-[#8E4C2F]">
              sa7ebti
            </h1>
            <p className="mt-2.5 max-w-[15rem] text-[0.88rem] leading-5 text-espresso/[0.78]">
              L&apos;assistante skincare et makeup pensee pour les routines tunisiennes, la
              chaleur, l&apos;humidite et vos vraies habitudes.
            </p>
          </div>
        </section>

        <section className="relative -mt-6 flex flex-1 items-end rounded-t-[1.7rem] bg-[#FDFBF7] px-4 pb-8 pt-7 animate-rise md:mt-0 md:rounded-none md:px-16 md:pb-16 md:pt-20">
          <div className="w-full max-w-md space-y-6 text-center md:text-left">
            <header className="space-y-2.5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-terracotta">
                Personal beauty ritual
              </p>
              <h2 className="font-display text-[1.9rem] font-semibold leading-[1.03] text-espresso">
                Une beaute premium, adaptee a ton quotidien.
              </h2>
              <p className="text-[0.92rem] leading-6 text-espresso/[0.72]">
                Scanne un produit, cree ton profil botanique et recois des recommandations pensees
                pour la Tunisie.
              </p>
            </header>

            <div className="grid grid-cols-3 gap-2 text-left">
              <FeatureChip title="Climat" body="Humidite, chaleur et UV pris en compte." />
              <FeatureChip title="INCI" body="Lecture ingredient par ingredient." />
              <FeatureChip title="Local" body="Alternatives para et tunisiennes." />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="group relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-espresso/10 bg-white/[0.85] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(38,37,34,0.08)] active:scale-[0.98]"
              >
                <GoogleMark className="h-5 w-5" />
                <span className="text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-espresso">
                  Continuer avec Google
                </span>
              </button>

              <Link
                href="/register"
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#C97A53] text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-white shadow-button transition-all duration-300 hover:opacity-95 active:scale-[0.98]"
              >
                Creer mon profil
              </Link>

              <Link
                href="/scan"
                className="flex h-10.5 w-full items-center justify-center rounded-full border border-espresso/[0.12] bg-transparent text-[0.74rem] font-medium uppercase tracking-[0.07em] text-espresso/[0.72] transition-colors hover:bg-white/60"
              >
                Explorer en invite
              </Link>
            </div>

            <footer className="pt-1">
              <p className="text-[0.68rem] leading-relaxed text-espresso/[0.56]">
                En continuant, vous acceptez les conditions d&apos;utilisation et la politique de
                confidentialite de sa7ebti.
              </p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureChip({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.2rem] border border-espresso/[0.08] bg-white/70 p-2.5 shadow-[0_10px_24px_rgba(38,37,34,0.04)]">
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
        {title}
      </p>
      <p className="mt-1.5 text-[0.7rem] leading-4.5 text-espresso/[0.68]">{body}</p>
    </div>
  );
}
