import { ReactNode } from 'react'
export default function Section({children, className}:{children:ReactNode, className?:string}){
  return <section className={className}><div className="container mx-auto px-4">{children}</div></section>
}
