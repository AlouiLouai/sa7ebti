"use client";

import Link from "next/link";
import { useState } from "react";
import { LazyMotion, domAnimation, m, useMotionValueEvent, useScroll } from "motion/react";
import { DiscoverIcon, LeafIcon, PersonIcon, ScannerFocusIcon } from "@/components/elyssette-icons";

type BottomNavProps = {
  active: "home" | "scan" | "analysis" | "profile";
};

const navItems = [
  { id: "home", href: "/", label: "Accueil", icon: DiscoverIcon },
  { id: "scan", href: "/scan", label: "Scan", icon: ScannerFocusIcon },
  { id: "analysis", href: "/analysis", label: "Analyse", icon: LeafIcon },
  { id: "profile", href: "/register", label: "Profil", icon: PersonIcon }
] as const;

export function Sa7ebtiBottomNav({ active }: BottomNavProps) {
  const { scrollY } = useScroll();
  const [isCondensed, setIsCondensed] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextCondensed = latest > 24;
    setIsCondensed((current) => (current === nextCondensed ? current : nextCondensed));
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 z-50 w-full pb-safe"
      >
        <div className="mx-auto flex w-full max-w-md justify-center px-3 pb-1">
          <m.div
            animate={{
              scale: isCondensed ? 0.95 : 1,
              y: isCondensed ? 3 : 0
            }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative flex h-[58px] w-full items-center justify-between overflow-hidden rounded-[22px] border border-white/[0.38] bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.14))] px-2 shadow-[0_12px_30px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_58%)]" />
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === active;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="flex flex-1 items-center justify-center"
                >
                  <m.div
                    layout
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    animate={{
                      scale: isActive ? (isCondensed ? 1.02 : 1.08) : isCondensed ? 0.94 : 0.98,
                      opacity: isActive ? 1 : 0.74
                    }}
                    className="relative z-10 flex min-w-[54px] flex-col items-center justify-center"
                  >
                    <m.div
                      layout
                      animate={{
                        boxShadow: isActive
                          ? "0 10px 18px rgba(15, 23, 42, 0.12)"
                          : "0 0 0 rgba(38, 37, 34, 0)"
                      }}
                      transition={{ duration: 0.22 }}
                      className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border transition-colors duration-200 ${
                        isActive
                          ? "border-white/[0.5] bg-[rgba(255,255,255,0.5)] text-espresso"
                          : "border-transparent bg-transparent text-espresso/[0.78]"
                      }`}
                    >
                      <Icon className="h-[0.98rem] w-[0.98rem]" />
                    </m.div>
                    <m.span
                      animate={{
                        opacity: isCondensed && !isActive ? 0 : 1,
                        height: isCondensed && !isActive ? 0 : 9,
                        marginTop: isCondensed && !isActive ? 0 : 2
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden text-[8px] font-medium tracking-[0.01em] text-espresso/[0.8]"
                    >
                      {item.label}
                    </m.span>
                  </m.div>
                </Link>
              );
            })}
          </m.div>
        </div>
      </m.nav>
    </LazyMotion>
  );
}
