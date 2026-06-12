import type { ProductCategory } from "@/lib/domain/product-fit";

export type ScanRecordOverride = {
  name: string;
  brand: string;
  summary?: string;
  whyItFits?: string[];
  cautions?: string[];
  recommendedUsage?: string[];
  ingredientInsights?: Array<{
    name: string;
    signal:
      | "hydration"
      | "soothing"
      | "barrier-support"
      | "fragrance-risk"
      | "comedogenic-risk"
      | "alcohol-risk"
      | "uv-support";
    reasonTag: string;
    summary: string;
  }>;
  recommendationSummary?: {
    shortNote: string;
    dailyRoutineNote: string;
    actionLabel: string;
  };
  todayContext?: {
    uvIndex: number;
    uvLevelLabel: string;
    cityLabel: string;
    advice: string;
  } | null;
};

export const scanRecordOverrides: Record<Exclude<ProductCategory, "unknown">, ScanRecordOverride> = {
  cleanser: {
    name: "Cleanser balance",
    brand: "Sa7ebti Care"
  },
  serum: {
    name: "Serum hydra calm",
    brand: "Sa7ebti Lab"
  },
  moisturizer: {
    name: "Hydratant comfort",
    brand: "Sa7ebti Care",
    summary: "yratab w yheddi, khassatan ken bachretk tnchef.",
    whyItFits: [
      "texture creamy khfifa ma teth9elch barcha",
      "yheddi lbachra ba3d naDafa",
      "y3awen bachretk teb9a merta7a fil nhar"
    ],
    recommendedUsage: [
      "hotou ba3d serum wala direct ba3d cleanser",
      "fil lil tnajem tzid tab9a raye7a"
    ],
    ingredientInsights: [
      {
        name: "Panthenol",
        signal: "barrier-support",
        reasonTag: "barrier",
        summary: "y3awen lbachra tebni ra7etha."
      },
      {
        name: "Glycerin",
        signal: "hydration",
        reasonTag: "ratba",
        summary: "yched el ratba w y9allel ennchaf."
      }
    ],
    recommendationSummary: {
      shortNote: "hydratant hnin w yji m3a routine yawmia.",
      dailyRoutineNote: "asta3mlou ba3d cleanser w 9bal SPF.",
      actionLabel: "7otou fil routine"
    }
  },
  sunscreen: {
    name: "SPF invisible 50",
    brand: "Sa7ebti Sun",
    summary: "SPF khfif, ma yeth9elch, w mzyen ta7t makeup.",
    whyItFits: [
      "fiha 7meya UV mhemma lyoum",
      "texture khfifa tnajem temchi ta7t makeup",
      "moufid ken enti testa3mel SPF b sifa yawmia"
    ],
    cautions: ["3awedou ken enti barra w ba3d 2 se3at fil chams"],
    recommendedUsage: [
      "akher step fil routine sbeh 9bal makeup",
      "3awedou fil wost nhar ken enti barra"
    ],
    ingredientInsights: [
      {
        name: "UV Filters",
        signal: "uv-support",
        reasonTag: "7meya",
        summary: "y7mi lbachra mel chams."
      },
      {
        name: "Glycerin",
        signal: "hydration",
        reasonTag: "comfort",
        summary: "y5alli formula arye7 3al bachra."
      }
    ],
    recommendationSummary: {
      shortNote: "SPF khfif w moufid barcha l nhar.",
      dailyRoutineNote: "khalih akher step sbeh w 3awedou ba3d.",
      actionLabel: "dima m3ak barra"
    },
    todayContext: {
      uvIndex: 8,
      uvLevelLabel: "3ali",
      cityLabel: "Tunis, Tounes",
      advice: "hedha no3 lezmou retouche ken enti barra."
    }
  },
  foundation: {
    name: "Fond de teint soft matte",
    brand: "Sa7ebti Makeup"
  },
  primer: {
    name: "Primer blur soft",
    brand: "Sa7ebti Makeup",
    summary: "primer ysa3ed 3al thbat ama lezem intibeh lil texture.",
    whyItFits: [
      "ynajjem y3awen 3al thbat 9bal fond de teint",
      "mzyen ken makeup style mte3ek yhemmou thbat"
    ],
    cautions: ["ken bachretk tetsakker b sra3, jarrab me9dar sghir awel"],
    recommendedUsage: [
      "asta3melou 9bal teint fil zones elli te7taj thbat",
      "ma tkatharch mennou fil zones hassa"
    ],
    ingredientInsights: [
      {
        name: "Silica",
        signal: "uv-support",
        reasonTag: "blur",
        summary: "y9allel lama3 w y3awen 3al finish matte."
      },
      {
        name: "Heavy Esters",
        signal: "comedogenic-risk",
        reasonTag: "pores",
        summary: "momken teth9el chwaya 3al pores ken bachretk tetsakker."
      }
    ],
    recommendationSummary: {
      shortNote: "moufid lel thbat ama b chwaya intibeh fil pores.",
      dailyRoutineNote: "khallih juste fil zones elli te7taj smoothing.",
      actionLabel: "asta3mlou b chwaya"
    }
  },
  mask: {
    name: "Mask calm reset",
    brand: "Sa7ebti Care",
    summary: "mask yheddi w yratab, ama mch lel ista3mel kol nhar.",
    whyItFits: [
      "ynajem yheddi bachra m3abya b s5ana wala fatigue",
      "fiha ratba behya ken bachretk tnchef"
    ],
    cautions: ["mch lezem kol nhar, marrtin fil jom3a ykafiw"],
    recommendedUsage: [
      "asta3mlou fil lil ba3d naDafa",
      "ba3dou hydratant hnin"
    ],
    ingredientInsights: [
      {
        name: "Aloe Vera",
        signal: "soothing",
        reasonTag: "mask care",
        summary: "yheddi lbachra ba3d nhar t3ib."
      },
      {
        name: "Glycerin",
        signal: "hydration",
        reasonTag: "ratba",
        summary: "y3awen bachretk ma tnchefch."
      }
    ],
    recommendationSummary: {
      shortNote: "mask hnin ken t7eb session care srii3a.",
      dailyRoutineNote: "marrtin fil jom3a kif bachretk te7taj reset.",
      actionLabel: "7otou fil lil"
    }
  }
};
