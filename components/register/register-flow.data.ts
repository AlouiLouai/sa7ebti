import type { ComponentProps, ComponentType } from "react";
import {
  ApartmentIcon,
  BalanceIcon,
  BronzeIcon,
  BubbleIcon,
  FlareIcon,
  LeafIcon,
  LightbulbIcon,
  PetalIcon,
  ShieldSunIcon,
  WarmSunIcon,
  WaterDropIcon
} from "@/components/sa7ebti-icons";
import type {
  IngredientAvoidance,
  MakeupUsageLevel,
  ProfileConcern,
  SkinType,
  TunisiaClimateRegion
} from "@/lib/domain/profile";

export type RegisterOption = {
  value: SkinType | TunisiaClimateRegion | MakeupUsageLevel | ProfileConcern | IngredientAvoidance;
  title: string;
  description: string;
  icon: ComponentType<ComponentProps<"svg">>;
  accent?: string;
};

type RegisterTypedOption<T extends RegisterOption["value"]> = Omit<RegisterOption, "value"> & {
  value: T;
};

export const registerProfilePhoto =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA41xPmrDk6rANDbIJl7ITks9UGS0m_Xnlr11Tt2LuXYxsEFuE04YQybPYQL974fC2DCQrq9_bPf48E4ELoM27a6llun8BA39tjaS35HM_otqC5WfuKSXllnKMJVF5TGt2QEgBfxSaE2E5ke4obhaRO10OY9IMUnYMaERMFIWKRNh0-mAzvmWApA6PLKl5MhXlFSQGUW0dalsld6t-vj6gg6bwmcbm2dKDUqhwqmk_Y5RS1xqQQTtKb260ouCEfiSZWyHsP67-EKEPp";

export const profileCriteriaPreview = [
  "No3 lbachra",
  "Manta9a",
  "Kifeh testa3mel makeup",
  "7assasiya"
];

export const skinOptions: RegisterTypedOption<SkinType>[] = [
  {
    value: "oily",
    title: "Dahniya",
    description: "tetlama3 b sra3 w ma t7ebbech textures th9al.",
    icon: WaterDropIcon
  },
  {
    value: "dry",
    title: "Yebsa",
    description: "tet7ess mech mdhou9a b sra3 w testa7a9 ra7a akther.",
    icon: LeafIcon
  },
  {
    value: "combination",
    title: "Mokhtlta",
    description: "zone T adhan w l jouj arye7.",
    icon: BalanceIcon
  },
  {
    value: "sensitive",
    title: "7assasa",
    description: "t7ammar b sra3 w t7eb products hnin.",
    icon: PetalIcon
  }
];

export const climateOptions: RegisterTypedOption<TunisiaClimateRegion>[] = [
  {
    value: "grand-tunis",
    title: "Tunis l kobra",
    description: "rtouba, chwaya talawoth w lama3 fi nhar.",
    icon: ApartmentIcon
  },
  {
    value: "coastal",
    title: "Sa7el",
    description: "hwa b7ar, s5ana w chams a9wa.",
    icon: ShieldSunIcon,
    accent: "text-tertiary"
  },
  {
    value: "center-south",
    title: "Dakhel / Janoub",
    description: "s5ana yebsa, ghobbar w jeld yenshef b sra3.",
    icon: WarmSunIcon
  }
];

export const makeupOptions: RegisterTypedOption<MakeupUsageLevel>[] = [
  {
    value: "bare-minimal",
    title: "Mekyaj khfif",
    description: "SPF, teint khfif w look fresh kol nhar.",
    icon: PetalIcon
  },
  {
    value: "daily-base",
    title: "Base kol nhar",
    description: "fond de teint, concealer w thbat behi nhar kemel.",
    icon: BronzeIcon
  },
  {
    value: "long-wear",
    title: "Thbat twil",
    description: "testa7a9 thbat behi 9oddem s5ana w rtouba.",
    icon: FlareIcon
  },
  {
    value: "treatment-first",
    title: "Bachrti a9bal",
    description: "hemek l bachra 9bal kol chay hata maa makeup khfif.",
    icon: LightbulbIcon
  }
];

export const concernOptions: RegisterTypedOption<ProfileConcern>[] = [
  {
    value: "acne",
    title: "7boub",
    description: "tb3ed 3la eli ysakker pores wala yhayyej.",
    icon: BubbleIcon
  },
  {
    value: "hyperpigmentation",
    title: "B9a3",
    description: "ahamm haja taw7id lawn w tn9is l athar.",
    icon: BronzeIcon
  },
  {
    value: "dehydration",
    title: "Nchaf",
    description: "ra7a, mourouna w a9al tiraillement.",
    icon: WaterDropIcon
  },
  {
    value: "redness",
    title: "7mira",
    description: "products ahda w a9al qaswa 3al bachra.",
    icon: PetalIcon
  }
];

export const filterOptions: RegisterTypedOption<IngredientAvoidance>[] = [
  {
    value: "fragrance-free",
    title: "Bla parfum",
    description: "na9s mel products eli fehom ri7a 9wiya.",
    icon: FlareIcon,
    accent: "text-terracotta"
  },
  {
    value: "non-comedogenic",
    title: "Ma ysakkerch pores",
    description: "tb3ed 3la textures th9al 3al pores.",
    icon: BubbleIcon
  },
  {
    value: "alcohol-caution",
    title: "Alcool 9wi",
    description: "mohem ken bachrek 7assasa wala tnchef b sra3.",
    icon: WarmSunIcon
  },
  {
    value: "spf-friendly",
    title: "Yemshe m3a SPF",
    description: "qaddem products eli yerkbou behi maa protection solaire.",
    icon: ShieldSunIcon
  }
];
