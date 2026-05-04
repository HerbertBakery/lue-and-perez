import CaseStudyTemplate, { buildCaseStudyMetadata } from '@/components/CaseStudyTemplate'
import { getCaseStudyBySlug } from '@/lib/siteContent'

const caseStudy = getCaseStudyBySlug('private-label-pepper-sauce')!;
export const metadata = buildCaseStudyMetadata(caseStudy);

export default function Page(){ return <CaseStudyTemplate caseStudy={caseStudy} />; }
