import { redirect } from 'next/navigation'

export const metadata = { title: 'Request a Quote — Lue & Perez' }

export default function Page() {
  redirect('/request-a-quote')
}
