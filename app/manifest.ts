import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "sa7ebti",
    short_name: "sa7ebti",
    description:
      "App tounsia lel skincare w makeup. Tscanni produit w ta3ref ida ynesbek wala le.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FAF9F6",
    theme_color: "#FAF9F6",
    categories: ["beauty", "lifestyle", "health"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
