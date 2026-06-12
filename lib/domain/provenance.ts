export type DataProvenance = "demo-fixture" | "derived-local" | "manual-input";

export interface ProvenanceBadgeModel {
  id: DataProvenance;
  label: string;
  description: string;
  tone: "neutral" | "warm";
}

export function buildProvenanceList(...items: DataProvenance[]): DataProvenance[] {
  return items;
}

export function buildProvenanceBadgeModel(provenance: DataProvenance): ProvenanceBadgeModel {
  switch (provenance) {
    case "manual-input":
      return {
        id: provenance,
        label: "ikhtyar mennek",
        description: "no3 l produit w ba3dh details dakhalthom enti.",
        tone: "warm"
      };
    case "derived-local":
      return {
        id: provenance,
        label: "ma7soub fel mobile",
        description: "ta7lil fel mobile 3la hsab profil w scan mte3ek.",
        tone: "neutral"
      };
    case "demo-fixture":
    default:
      return {
        id: provenance,
        label: "demo",
        description: "logic mta3 demo, mazel mouch backend wala AI sahi7.",
        tone: "neutral"
      };
  }
}
