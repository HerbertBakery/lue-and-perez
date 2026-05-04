import ServiceTemplate, { buildServiceMetadata } from "@/components/ServiceTemplate";
import { getServiceByKey } from "@/lib/siteContent";

const service = getServiceByKey("consolidation")!;
export const metadata = buildServiceMetadata(service);

export default function Page(){ return <ServiceTemplate service={service} />; }
