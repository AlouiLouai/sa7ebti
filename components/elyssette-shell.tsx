import Image from "next/image";
import type { ReactNode } from "react";

type TopBarProps = {
  leading?: ReactNode;
  title?: string;
  avatarSrc?: string;
};

const defaultAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA41xPmrDk6rANDbIJl7ITks9UGS0m_Xnlr11Tt2LuXYxsEFuE04YQybPYQL974fC2DCQrq9_bPf48E4ELoM27a6llun8BA39tjaS35HM_otqC5WfuKSXllnKMJVF5TGt2QEgBfxSaE2E5ke4obhaRO10OY9IMUnYMaERMFIWKRNh0-mAzvmWApA6PLKl5MhXlFSQGUW0dalsld6t-vj6gg6bwmcbm2dKDUqhwqmk_Y5RS1xqQQTtKb260ouCEfiSZWyHsP67-EKEPp";

export function ElyssetteTopBar({
  leading,
  title = "sa7ebti",
  avatarSrc = defaultAvatar
}: TopBarProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-espresso/[0.04] bg-[rgba(253,251,247,0.72)] shadow-ambient backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-5">
        <div className="flex h-9 w-9 items-center justify-center text-terracotta">
          {leading ?? <span />}
        </div>
        <h1 className="font-display text-[1.4rem] font-semibold tracking-[-0.04em] text-espresso">
          {title}
        </h1>
        <div className="h-9 w-9 overflow-hidden rounded-full border border-espresso/10 bg-secondary-container">
          <Image
            alt="User profile"
            src={avatarSrc}
            width={36}
            height={36}
            quality={60}
            sizes="36px"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
