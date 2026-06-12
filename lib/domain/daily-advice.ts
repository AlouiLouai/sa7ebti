import { buildProvenanceList, type DataProvenance } from "@/lib/domain/provenance";
import { createEmptyUserProfileDraft, type UserProfileDraft } from "@/lib/domain/profile";
import type { ScannedProductRecord } from "@/lib/domain/scanned-product";

export type DailyAdviceMoment = "sbeh" | "wost-nhar" | "lil";
export type DailyAdviceTone = "sun" | "calm" | "warn";

export interface DailyUvCardModel {
  state: "ready" | "fallback";
  title: string;
  body: string;
  cityLabel: string;
  severityLabel: string;
  reminderLabel: string;
}

export interface DailyAdviceItem {
  id: string;
  moment: DailyAdviceMoment;
  title: string;
  body: string;
  tone: DailyAdviceTone;
}

export interface DailyAdviceModel {
  uvCard: DailyUvCardModel;
  items: DailyAdviceItem[];
  warning: string | null;
  provenance: DataProvenance[];
}

export function resolveActiveProfileDraft(
  storedProfile: UserProfileDraft | null | undefined,
  recentRecords: ScannedProductRecord[]
) {
  const fallbackProfile = recentRecords[0]?.profileSnapshot;

  return {
    ...createEmptyUserProfileDraft(),
    ...fallbackProfile,
    ...storedProfile,
    concerns: storedProfile?.concerns ?? fallbackProfile?.concerns ?? [],
    ingredientAvoidances:
      storedProfile?.ingredientAvoidances ?? fallbackProfile?.ingredientAvoidances ?? [],
    sensitivityFlags: storedProfile?.sensitivityFlags ?? []
  } satisfies UserProfileDraft;
}

export function buildDailyAdviceModel({
  profile,
  recentRecords
}: {
  profile: UserProfileDraft;
  recentRecords: ScannedProductRecord[];
}): DailyAdviceModel {
  const compatibleRecord =
    recentRecords.find((record) => record.fitResult.status === "ynesbek") ?? recentRecords[0] ?? null;
  const latestRecord = recentRecords[0] ?? null;
  const uvContext = recentRecords.find((record) => record.fitResult.todayContext)?.fitResult.todayContext ?? null;
  const uvCard = buildUvCard(profile, uvContext, compatibleRecord);
  const items = [
    buildMorningAdvice(profile, compatibleRecord),
    buildMiddayAdvice(profile, uvCard, compatibleRecord),
    buildNightAdvice(profile, latestRecord)
  ];

  return {
    uvCard,
    items,
    warning: buildConflictWarning(latestRecord),
    provenance: buildProvenanceList("demo-fixture", "derived-local")
  };
}

function buildUvCard(
  profile: UserProfileDraft,
  uvContext: ScannedProductRecord["fitResult"]["todayContext"],
  compatibleRecord: ScannedProductRecord | null
): DailyUvCardModel {
  const reminderLabel =
    profile.uvReminderPreference === "enabled" ? "tnabih SPF mch3al" : "tnabih SPF mouch mch3al";

  if (!uvContext) {
    return {
      state: "fallback",
      title: "UV mazel ma wsalch",
      body: "ken enti barra lyoum, hot SPF 50 w khammem fil 3awda kol chwaya.",
      cityLabel: "tawa ma fama ch city live",
      severityLabel: "fallback",
      reminderLabel
    };
  }

  const spfFirst =
    profile.spfHabit === "daily" || profile.ingredientAvoidances.includes("spf-friendly");
  const productLabel = compatibleRecord?.product.name ?? "routine mte3ek";

  if (uvContext.uvIndex >= 8) {
    return {
      state: "ready",
      title: `UV ${uvContext.uvIndex} - 3ali barcha`,
      body: spfFirst
        ? `${productLabel} yji m3ak, ama 3awed SPF kol 2 se3at.`
        : "lyoum lezem SPF 50 w retouche ken enti barra.",
      cityLabel: uvContext.cityLabel,
      severityLabel: uvContext.uvLevelLabel,
      reminderLabel
    };
  }

  if (uvContext.uvIndex >= 5) {
    return {
      state: "ready",
      title: `UV ${uvContext.uvIndex} - mezyen`,
      body: spfFirst
        ? "SPF yeb9a mohem, khassatan ken ta3mel sorties fil nhar."
        : "hot SPF 9bal ma tokhroj, hata ken chams mouch 9wiya barcha.",
      cityLabel: uvContext.cityLabel,
      severityLabel: uvContext.uvLevelLabel,
      reminderLabel
    };
  }

  return {
    state: "ready",
    title: `UV ${uvContext.uvIndex} - hedi`,
    body: "SPF yeb9a choice behi l nhar kemel, ama retouche tnajem tetsahal.",
    cityLabel: uvContext.cityLabel,
    severityLabel: uvContext.uvLevelLabel,
    reminderLabel
  };
}

function buildMorningAdvice(
  profile: UserProfileDraft,
  compatibleRecord: ScannedProductRecord | null
): DailyAdviceItem {
  const focusProduct = compatibleRecord?.product.name ?? "routine sbeh";

  if (profile.concerns.includes("dehydration") || profile.skinType === "dry") {
    return {
      id: "daily-sbeh",
      moment: "sbeh",
      title: "sbeh ratba w khfifa",
      body: `ebda b cleanser hnin, ba3d ${focusProduct}, ba3d hydratant.`,
      tone: "calm"
    };
  }

  return {
    id: "daily-sbeh",
    moment: "sbeh",
    title: "sbeh mratba",
    body: `ken bech tescanni wala ta3mel makeup, ${focusProduct} yji awel step m3a bachretk.`,
    tone: "calm"
  };
}

function buildMiddayAdvice(
  profile: UserProfileDraft,
  uvCard: DailyUvCardModel,
  compatibleRecord: ScannedProductRecord | null
): DailyAdviceItem {
  const productName = compatibleRecord?.product.name ?? "produit yensbek";

  if (uvCard.state === "ready" && uvCard.severityLabel === "3ali") {
    return {
      id: "daily-wost-nhar",
      moment: "wost-nhar",
      title: "wost nhar intibeh lel chams",
      body:
        profile.makeupUsage === "long-wear"
          ? `retouche SPF bchwaya bech makeup ma yethallech m3a ${productName}.`
          : "3awed SPF, w ken bachretk tlamma3 esta3mel blotting paper khfif.",
      tone: "sun"
    };
  }

  return {
    id: "daily-wost-nhar",
    moment: "wost-nhar",
    title: "wost nhar check srii3",
    body: "chouf bachretk: ken fama lama3 wala nchaf, 3adel routinek b retouche sghira.",
    tone: "sun"
  };
}

function buildNightAdvice(
  profile: UserProfileDraft,
  latestRecord: ScannedProductRecord | null
): DailyAdviceItem {
  if (latestRecord?.fitResult.status === "ma-ynesbekch-jemla") {
    return {
      id: "daily-lil",
      moment: "lil",
      title: "lil raye9",
      body: "ma trajja3ch lel produit eli ma yjiich m3ak, rakkaz 3ala barrier support w hydratation.",
      tone: "warn"
    };
  }

  if (profile.makeupUsage === "long-wear" || latestRecord?.product.category === "foundation") {
    return {
      id: "daily-lil",
      moment: "lil",
      title: "lil nettoyage bel behi",
      body: "na77i makeup bel behi, ba3d hot step yheddi bachretk 9bal ma torkod.",
      tone: "warn"
    };
  }

  return {
    id: "daily-lil",
    moment: "lil",
    title: "lil comfort",
    body: "5alli lil formla hnin: naDafa, ratba, w ma tkatharch mn products.",
    tone: "calm"
  };
}

function buildConflictWarning(latestRecord: ScannedProductRecord | null) {
  if (!latestRecord || latestRecord.fitResult.status !== "ma-ynesbekch-jemla") {
    return null;
  }

  return `intibeh: ${latestRecord.product.name} ma yensbekch tawa 3la hsab profil mte3ek.`;
}
