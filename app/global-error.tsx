"use client";

import { Sa7ebtiRouteStatus } from "@/components/sa7ebti-route-status";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <Sa7ebtiRouteStatus
          badge="ghalta kbira"
          title="sa7ebti testa7a9 t3awed t7el."
          description={error.message || "saret ghalta kbira w wa9fet chargement l app."}
          tone="error"
          action={
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-[#C97A53] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-white shadow-button transition-opacity hover:opacity-95"
            >
              3awed 7ell
            </button>
          }
        />
      </body>
    </html>
  );
}
