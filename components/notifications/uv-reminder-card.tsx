"use client";

import { ShieldSunIcon } from "@/components/sa7ebti-icons";
import { useUvReminder } from "@/hooks/use-uv-reminder";
import { sa7ebtiCopy } from "@/lib/copy/sa7ebti-copy";
import { isFeatureEnabled } from "@/lib/feature-flags";

export function UvReminderCard() {
  if (!isFeatureEnabled("localUvReminderMvp")) {
    return null;
  }

  const { disableReminderPreference, enableReminderPreference, setPermissionState, settings } = useUvReminder();

  return (
    <section className="rounded-[1.6rem] border border-espresso/[0.08] bg-white/[0.82] p-4 shadow-[0_16px_34px_rgba(38,37,34,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
            {sa7ebtiCopy.reminder.title}
          </p>
          <h3 className="mt-2 font-display text-[1.18rem] leading-[1.02] text-espresso">
            {settings.preference === "enabled"
              ? sa7ebtiCopy.reminder.enabled
              : sa7ebtiCopy.reminder.disabled}
          </h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEE7] text-terracotta">
          <ShieldSunIcon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-2 text-[0.8rem] leading-5 text-espresso/[0.68]">{getPermissionLabel(settings.permission)}</p>
      <p className="mt-2 text-[0.76rem] leading-5 text-espresso/[0.56]">{settings.note}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={enableReminderPreference}
          className="rounded-full bg-[#C97A53] px-3 py-2 text-[0.72rem] font-semibold text-white"
        >
          cha3el tnabih
        </button>
        <button
          type="button"
          onClick={() => setPermissionState("granted-demo")}
          className="rounded-full border border-espresso/[0.08] bg-white px-3 py-2 text-[0.72rem] font-semibold text-espresso"
        >
          {sa7ebtiCopy.reminder.request}
        </button>
        <button
          type="button"
          onClick={() => setPermissionState("denied")}
          className="rounded-full border border-espresso/[0.08] bg-white px-3 py-2 text-[0.72rem] font-semibold text-espresso"
        >
          ma n7ebch idhn
        </button>
        <button
          type="button"
          onClick={disableReminderPreference}
          className="rounded-full border border-espresso/[0.08] bg-white px-3 py-2 text-[0.72rem] font-semibold text-espresso"
        >
          {sa7ebtiCopy.reminder.dismiss}
        </button>
      </div>
    </section>
  );
}

function getPermissionLabel(permission: ReturnType<typeof useUvReminder>["settings"]["permission"]) {
  switch (permission) {
    case "granted-demo":
      return sa7ebtiCopy.reminder.granted;
    case "denied":
      return sa7ebtiCopy.reminder.denied;
    default:
      return sa7ebtiCopy.reminder.unknown;
  }
}
