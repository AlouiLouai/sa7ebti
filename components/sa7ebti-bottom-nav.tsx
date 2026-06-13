"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, useMotionValueEvent, useScroll } from "motion/react";
import { DiscoverIcon, LeafIcon, PersonIcon, ScannerFocusIcon } from "@/components/sa7ebti-icons";
import { sa7ebtiCopy } from "@/lib/copy/sa7ebti-copy";

type BottomNavProps = {
  active: "home" | "scan" | "results" | "profile";
  hiddenUntilScroll?: boolean;
};

const navItems = [
  { id: "home", href: "/", label: sa7ebtiCopy.nav.home, icon: DiscoverIcon },
  { id: "scan", href: "/scan", label: sa7ebtiCopy.nav.scan, icon: ScannerFocusIcon },
  { id: "results", href: "/ntija", label: sa7ebtiCopy.nav.results, icon: LeafIcon },
  { id: "profile", href: "/register", label: sa7ebtiCopy.nav.profile, icon: PersonIcon }
] as const;

export function Sa7ebtiBottomNav({ active, hiddenUntilScroll = false }: BottomNavProps) {
  const { scrollY } = useScroll();
  const [isCondensed, setIsCondensed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(!hiddenUntilScroll);
  const [viewportBottomOffset, setViewportBottomOffset] = useState(0);

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let frameId = 0;

    const syncViewportBottomOffset = () => {
      frameId = 0;

      const visualViewport = window.visualViewport;

      if (!visualViewport) {
        setViewportBottomOffset(0);
        return;
      }

      const nextOffset = Math.max(
        0,
        Math.round(window.innerHeight - visualViewport.height - visualViewport.offsetTop)
      );

      setViewportBottomOffset((current) => (current === nextOffset ? current : nextOffset));
    };

    const requestSync = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(syncViewportBottomOffset);
    };

    requestSync();

    window.addEventListener("resize", requestSync);
    window.addEventListener("orientationchange", requestSync);
    window.visualViewport?.addEventListener("resize", requestSync);
    window.visualViewport?.addEventListener("scroll", requestSync);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("resize", requestSync);
      window.removeEventListener("orientationchange", requestSync);
      window.visualViewport?.removeEventListener("resize", requestSync);
      window.visualViewport?.removeEventListener("scroll", requestSync);
    };
  }, []);

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
        style={{
          bottom: `calc(env(safe-area-inset-bottom, 0px) + ${viewportBottomOffset}px + 0.35rem)`
        }}
        className="fixed inset-x-0 z-50 w-full"
      >
        <div className="sa7ebti-app-shell flex justify-center px-3">
          <m.div
            animate={{
              scale: isCondensed ? 0.96 : 1,
              y: isCondensed ? 3 : 0,
              height: isCondensed ? 54 : 60
            }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative flex w-full max-w-[21rem] items-center justify-between overflow-hidden rounded-[999px] border border-[#F1E6DB] bg-[linear-gradient(180deg,rgba(253,251,247,0.96),rgba(247,239,230,0.94))] px-2 py-1.5 shadow-[0_14px_34px_rgba(38,37,34,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_58%)]" />
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
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    animate={{
                      scale: isActive ? 1 : isCondensed ? 0.95 : 0.98,
                      opacity: isActive ? 1 : 0.74
                    }}
                    className="relative z-10 flex h-11 w-11 items-center justify-center"
                  >
                    {isActive ? (
                      <m.span
                        layoutId="sa7ebti-nav-active"
                        transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.72 }}
                        className="absolute inset-0 rounded-full border border-[#EAD7C6] bg-[#fffaf4] shadow-[0_10px_24px_rgba(38,37,34,0.12)]"
                      />
                    ) : null}

                    <span className="relative flex items-center justify-center">
                      <Icon
                        className={`${
                          isCondensed ? "h-[0.96rem] w-[0.96rem]" : "h-[1.04rem] w-[1.04rem]"
                        } ${isActive ? "text-espresso" : "text-espresso/[0.66]"}`}
                      />
                    </span>

                    {isActive ? (
                      <m.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.18 }}
                        className="absolute -bottom-0.5 h-1.5 w-1.5 rounded-full bg-[#C97A53]"
                      />
                    ) : null}
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
