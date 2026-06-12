import { Sa7ebtiRouteStatus } from "@/components/sa7ebti-route-status";

export default function NotFound() {
  return (
    <Sa7ebtiRouteStatus
      badge="ma fama ch"
      title="hedhi l page mahech mawjouda."
      description="ymken lien 9dim wala route tbaddlet."
      tone="error"
    />
  );
}
