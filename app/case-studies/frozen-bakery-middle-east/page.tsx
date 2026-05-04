import CaseStudyTemplate, { buildCaseStudyMetadata } from '@/components/CaseStudyTemplate'
import { getCaseStudyBySlug } from '@/lib/siteContent'

const caseStudy = getCaseStudyBySlug('frozen-bakery-middle-east')!;
export const metadata = buildCaseStudyMetadata(caseStudy);
export default function Page(){ return <CaseStudyTemplate caseStudy={caseStudy} />; }
