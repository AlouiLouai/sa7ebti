import type { ScannedProductRecord } from "@/lib/domain/scanned-product";
import { getFitHeadline, getFitLabel, hasMinimumFitData } from "@/lib/domain/product-fit";
import { buildProvenanceList } from "@/lib/domain/provenance";

export const scannedProductRecordsFixture: ScannedProductRecord[] = [
  {
    id: "scan-serum-001",
    product: {
      id: "prod-serum-001",
      name: "Serum hyaluronic",
      brand: "Sa7ebti Lab",
      category: "serum",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBi6LtVNR_-Ja9HrOPu_EfNWqdxpsGGNLQi1LDGXa3lCoKkBtxlFdvSx7X0YLPPg6zOrwp-NZlg3f6YUM-l2L_W2ckamKqHSzvEDSY1nUCOqyOh5eXeQFG7CfPdmWgRrrkEYbbFo6mRIWxQLRZejjzmbuSpSqBU1i8wW8bcv1dX2_u0aHtPDu46pOkEETCkmj4j778ZUEwaACM2YLsSbP9ypQglwaP7x6yROIcSUW1obeGTMynraU8qXShkC-bFBsoi7uO4DoPVaFxV",
      scannedAtIso: "2026-06-12T10:15:00.000Z",
      source: "camera",
      ingredientList: ["Hyaluronic Acid", "Green Tea Extract", "Panthenol"]
    },
    profileSnapshot: {
      skinType: "oily",
      climateRegion: "grand-tunis",
      makeupUsage: "daily-base",
      concerns: ["acne", "dehydration"],
      ingredientAvoidances: ["non-comedogenic", "spf-friendly"]
    },
    fitResult: {
      status: "ynesbek",
      confidence: "high",
      compatibilityScore: 92,
      missingInputs: [],
      headline: "yji m3ak barcha",
      summary: "khfif, yratab, w ma yeth9elch 3al bachra.",
      whyItFits: [
        "formula khfifa tnajem temchi ma3a bachra dahniya",
        "fiha ratba behya bel ma39oul",
        "ma fihach signals kbar mta3 clogging"
      ],
      cautions: ["ma fihach SPF, lezem tkammlou b 7meya men chams"],
      recommendedUsage: [
        "hotou sbeh 9bal hydratant w 9bal SPF",
        "ynajem zeda yemchi fil lil ken bachretk tnchef"
      ],
      profileSignals: ["oily", "acne", "dehydration", "non-comedogenic", "spf-friendly"],
      ingredientInsights: [
        {
          name: "Hyaluronic Acid",
          signal: "hydration",
          reasonTag: "ratba",
          summary: "yratab bla ma yeth9el."
        },
        {
          name: "Green Tea Extract",
          signal: "soothing",
          reasonTag: "yheddi",
          summary: "yheddi l bachra w y9allel l i7mirar."
        }
      ],
      todayContext: {
        uvIndex: 8,
        uvLevelLabel: "3ali",
        cityLabel: "Tunis, Tounes",
        advice: "3awed SPF kol 2 se3at khassatan ken enti barra."
      },
      profileSnapshot: {
        skinType: "oily",
        climateRegion: "grand-tunis",
        makeupUsage: "daily-base",
        concerns: ["acne", "dehydration"],
        ingredientAvoidances: ["non-comedogenic", "spf-friendly"]
      }
    },
    recommendationSummary: {
      shortNote: "khfif w yji m3a bachra mte3ek.",
      dailyRoutineNote: "sbeh ba3d cleanser, ba3d hydratant w SPF.",
      actionLabel: "a3melou men routine sbeh"
    },
    dailyRoutine: [
      {
        time: "sbeh",
        title: "ratba khfifa",
        body: "cleanser hnin, serum, hydratant, ba3d SPF."
      },
      {
        time: "wost-nhar",
        title: "retouche SPF",
        body: "3awed SPF ken enti barra wala 3andek chams 9wiya."
      },
      {
        time: "lil",
        title: "ra7et l bachra",
        body: "naDhef w hot serum ken bachretk tnchef."
      }
    ],
    provenance: buildProvenanceList("demo-fixture")
  },
  {
    id: "scan-foundation-002",
    product: {
      id: "prod-foundation-002",
      name: "Fond de teint matte",
      brand: "Matte Wear",
      category: "foundation",
      imageUrl: null,
      scannedAtIso: "2026-06-11T14:30:00.000Z",
      source: "gallery",
      ingredientList: ["Silica", "Dimethicone", "Fragrance"]
    },
    profileSnapshot: {
      skinType: "combination",
      climateRegion: "coastal",
      makeupUsage: "long-wear",
      concerns: ["redness"],
      ingredientAvoidances: ["fragrance-free"]
    },
    fitResult: {
      status: "ynesbek-chwaya",
      confidence: "medium",
      compatibilityScore: 68,
      missingInputs: [],
      headline: "ynajem yji m3ak b chwaya intibeh",
      summary: "thbat behi ama fih ri7a momken t3amel 7assasiya.",
      whyItFits: [
        "thbat behi ma3a s5ana w rtouba",
        "texture matte tnajem tsa3ed zone T"
      ],
      cautions: ["fih parfum, ken bachretk 7assasa ahsen tjarbou b chwaya"],
      recommendedUsage: ["asta3mlou ma3a base ratba w ma tkatharch mennou"],
      profileSignals: ["combination", "redness", "fragrance-free"],
      ingredientInsights: [
        {
          name: "Silica",
          signal: "uv-support",
          reasonTag: "matte",
          summary: "y3awen 3al thbat w tn9is lama3."
        },
        {
          name: "Fragrance",
          signal: "fragrance-risk",
          reasonTag: "intibeh",
          summary: "momken yhayyej bachra 7assasa."
        }
      ],
      todayContext: null,
      profileSnapshot: {
        skinType: "combination",
        climateRegion: "coastal",
        makeupUsage: "long-wear",
        concerns: ["redness"],
        ingredientAvoidances: ["fragrance-free"]
      }
    },
    recommendationSummary: {
      shortNote: "ynesbek b chwaya ama fih point intibeh.",
      dailyRoutineNote: "asta3mlou fil sorties wala ay nhar t7eb fih thbat.",
      actionLabel: "jarrbou ma3a base ratba"
    },
    dailyRoutine: [
      {
        time: "sbeh",
        title: "base 9bal teint",
        body: "base ratba sghira 9bal fond de teint."
      },
      {
        time: "wost-nhar",
        title: "retouche matte",
        body: "paper matte wala powder khfifa ken lezem."
      },
      {
        time: "lil",
        title: "na77i teint kollo",
        body: "double nettoyage ken makeup th9il."
      }
    ],
    provenance: buildProvenanceList("demo-fixture")
  },
  {
    id: "scan-cleanser-003",
    product: {
      id: "prod-cleanser-003",
      name: "Cleanser foaming",
      brand: "Fresh Foam",
      category: "cleanser",
      imageUrl: null,
      scannedAtIso: "2026-06-09T19:45:00.000Z",
      source: "camera",
      ingredientList: ["Sulfate Base", "Alcohol", "Fragrance"]
    },
    profileSnapshot: {
      skinType: "dry",
      climateRegion: "center-south",
      makeupUsage: "treatment-first",
      concerns: ["dehydration", "redness"],
      ingredientAvoidances: ["alcohol-caution", "fragrance-free"]
    },
    fitResult: {
      status: "ma-ynesbekch-jemla",
      confidence: "high",
      compatibilityScore: 24,
      missingInputs: [],
      headline: "ahsen tab3ed 3lih",
      summary: "ynachef w yhayyej bachra mte3ek akther.",
      whyItFits: [],
      cautions: [
        "fih alcool 9wi",
        "fih parfum",
        "momken ynachchef lbachra yebsa w yzid l 7mira"
      ],
      recommendedUsage: ["lawja 3la cleanser a7naf w akthar ratba"],
      profileSignals: ["dry", "dehydration", "redness", "alcohol-caution", "fragrance-free"],
      ingredientInsights: [
        {
          name: "Alcohol",
          signal: "alcohol-risk",
          reasonTag: "risk",
          summary: "momken ynachef bachra mte3ek."
        },
        {
          name: "Fragrance",
          signal: "fragrance-risk",
          reasonTag: "risk",
          summary: "momken yzid l i7mirar."
        }
      ],
      todayContext: null,
      profileSnapshot: {
        skinType: "dry",
        climateRegion: "center-south",
        makeupUsage: "treatment-first",
        concerns: ["dehydration", "redness"],
        ingredientAvoidances: ["alcohol-caution", "fragrance-free"]
      }
    },
    recommendationSummary: {
      shortNote: "ahsen tab3ed 3lih.",
      dailyRoutineNote: "lawja 3la cleanser creamy wala hnin akther.",
      actionLabel: "badlou b cleanser hnin"
    },
    dailyRoutine: [
      {
        time: "sbeh",
        title: "naDafa hnin",
        body: "ista3mel cleanser creamy khfif."
      },
      {
        time: "wost-nhar",
        title: "spray ratba ken lezem",
        body: "ken bachretk tnchef, spray ratba tnajem t3awen."
      },
      {
        time: "lil",
        title: "barrier support",
        body: "cleanser, ba3d serum yheddi, ba3d hydratant."
      }
    ],
    provenance: buildProvenanceList("demo-fixture")
  }
];

export const latestScannedProductRecord = scannedProductRecordsFixture[0];

export const missingDataAnalysisFixture: ScannedProductRecord = {
  ...latestScannedProductRecord,
  id: "scan-missing-004",
  fitResult: {
    ...latestScannedProductRecord.fitResult,
    status: "ma3loumet-na9sa",
    confidence: "low",
    compatibilityScore: null,
    headline: getFitHeadline("ma3loumet-na9sa"),
    summary: "mazelna n7ebbou no3 l produit w ba3dh details okhrin.",
    missingInputs: ["product.category", "product.ingredients"],
    whyItFits: [],
    cautions: [],
    recommendedUsage: [],
    ingredientInsights: [],
    todayContext: null,
    profileSnapshot: latestScannedProductRecord.profileSnapshot
  }
};

export function getAnalysisDisplayRecord() {
  return hasMinimumFitData(latestScannedProductRecord.fitResult)
    ? latestScannedProductRecord
    : missingDataAnalysisFixture;
}

export function getFitStatusLabelForRecord(record: ScannedProductRecord) {
  return getFitLabel(record.fitResult.status);
}
