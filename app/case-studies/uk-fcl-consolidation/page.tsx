import CaseStudyTemplate, { buildCaseStudyMetadata } from '@/components/CaseStudyTemplate'
import { getCaseStudyBySlug } from '@/lib/siteContent'

const caseStudy = getCaseStudyBySlug('uk-fcl-consolidation')!;
export const metadata = buildCaseStudyMetadata(caseStudy);

export default function Page(){ return <CaseStudyTemplate caseStudy={caseStudy} />; }
