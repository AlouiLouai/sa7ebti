type RegisterSubmitBarProps = {
  isPending: boolean;
  isReady: boolean;
  onSubmit: () => void;
};

export function RegisterSubmitBar({
  isPending,
  isReady,
  onSubmit
}: RegisterSubmitBarProps) {
  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full bg-[rgba(253,251,247,0.88)] px-4 pb-safe pt-2 backdrop-blur-md">
      <div className="mx-auto flex max-w-xl items-center gap-2.5 rounded-[1.35rem] border border-espresso/[0.08] bg-white/[0.72] p-2.5 shadow-soft">
        <div className="min-w-0 flex-1">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
            wa9t l scan
          </p>
          <p className="truncate text-[0.76rem] text-espresso/[0.68]">
            {isReady
              ? "profil wajed. scans jeyin bech ykounou ad9a9."
              : "ekhtar no3 lbachra, manta9a w style l makeup."}
          </p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isReady || isPending}
          className="flex h-10.5 shrink-0 items-center justify-center rounded-full bg-[#C97A53] px-4 text-[0.72rem] font-semibold uppercase tracking-[0.04em] text-white shadow-button transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "tsanna..." : "kamel profil"}
        </button>
      </div>
    </footer>
  );
}
