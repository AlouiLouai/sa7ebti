export function RegisterSummaryBadge({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[0.64rem] font-medium text-white/[0.88]">
      {label}
    </div>
  );
}
