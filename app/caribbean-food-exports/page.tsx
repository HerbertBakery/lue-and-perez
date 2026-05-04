import ServiceTemplate, { buildServiceMetadata } from "@/components/ServiceTemplate";
import { getServiceByKey } from "@/lib/siteContent";

const service = getServiceByKey("caribbean-food-exports")!;
export const metadata = buildServiceMetadata(service);

export default function CaribbeanFoodExportsPage() { return <ServiceTemplate service={service} />; }
