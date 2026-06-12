"use client";

import Link from "next/link";
import { useState } from "react";
import { LazyMotion, domAnimation, m, useMotionValueEvent, useScroll } from "motion/react";
import { DiscoverIcon, LeafIcon, PersonIcon, ScannerFocusIcon } from "@/components/sa7ebti-icons";

type BottomNavProps = {
  active: "home" | "scan" | "results" | "profile";
  hiddenUntilScroll?: boolean;
};

const navItems = [
  { id: "home", href: "/", label: "Dar", icon: DiscoverIcon },
  { id: "scan", href: "/scan", label: "Scan", icon: ScannerFocusIcon },
  { id: "results", href: "/ntija", label: "Ntiija", icon: LeafIcon },
  { id: "profile", href: "/register", label: "Profil", icon: PersonIcon }
] as const;

export function Sa7ebtiBottomNav({ active, hiddenUntilScroll = false }: BottomNavProps) {
  const { scrollY } = useScroll();
  const [isCondensed, setIsCondensed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(!hiddenUntilScroll);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isNearTop = latest < 28;
    const isScrollingUp = latest < lastScrollY;
    const nextCondensed = isNearTop ? false : !isScrollingUp;

    setIsCondensed((current) => (current === nextCondensed ? current : nextCondensed));
    setIsVisible((current) =>
      current === (!hiddenUntilScroll || latest > 24) ? current : !hiddenUntilScroll || latest > 24
    );
    setLastScrollY(latest);
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        initial={{ opacity: hiddenUntilScroll ? 0 : 1, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
          pointerEvents: isVisible ? "auto" : "none"
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 z-50 w-full pb-safe"
      >
        <div className="mx-auto flex w-full max-w-md justify-center px-3 pb-1">
          <m.div
            animate={{
              scale: isCondensed ? 0.92 : 1,
              y: isCondensed ? 5 : 0,
              height: isCondensed ? 54 : 64
            }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative flex w-full max-w-[17.5rem] items-center justify-between overflow-hidden rounded-[24px] border border-white/[0.38] bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.14))] px-2 shadow-[0_12px_30px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl"
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
                      scale: isActive ? (isCondensed ? 1.02 : 1.12) : isCondensed ? 0.9 : 1,
                      opacity: isActive ? 1 : 0.74
                    }}
                    className="relative z-10 flex min-w-[54px] flex-col items-center justify-center"
                  >
                    <m.div
                      layout
                      animate={{
                        boxShadow: isActive
                          ? isCondensed
                            ? "0 8px 16px rgba(15, 23, 42, 0.1)"
                            : "0 12px 24px rgba(15, 23, 42, 0.14)"
                          : "0 0 0 rgba(38, 37, 34, 0)"
                        ,
                        width: isCondensed ? 30 : 34,
                        height: isCondensed ? 30 : 34
                      }}
                      transition={{ duration: 0.22 }}
                      className={`flex items-center justify-center rounded-full border transition-colors duration-200 ${
                        isActive
                          ? "border-white/[0.5] bg-[rgba(255,255,255,0.5)] text-espresso"
                          : "border-transparent bg-transparent text-espresso/[0.78]"
                      }`}
                    >
                      <Icon className={isCondensed ? "h-[0.96rem] w-[0.96rem]" : "h-[1.04rem] w-[1.04rem]"} />
                    </m.div>
                    <m.span
                      animate={{
                        opacity: isCondensed && !isActive ? 0 : 1,
                        height: isCondensed && !isActive ? 0 : isCondensed ? 8 : 10,
                        marginTop: isCondensed && !isActive ? 0 : isCondensed ? 1 : 3
                      }}
                      transition={{ duration: 0.2 }}
                      className={`overflow-hidden font-medium tracking-[0.01em] text-espresso/[0.8] ${
                        isCondensed ? "text-[7px]" : "text-[8px]"
                      }`}
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
