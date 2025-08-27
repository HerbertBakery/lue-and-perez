'use server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().optional().default(''),
  b2b: z.string().min(1)
})

export async function sendRfp(formData: FormData): Promise<void> {
  const result = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    b2b: formData.get('b2b')
  })
  if (!result.success) throw new Error('Invalid submission')

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
  const to = process.env.SALES_EMAIL || 'sales@lueandperez.com'
  const from = process.env.SITE_FROM_EMAIL || 'web@lueandperez.com'
  const body = `New B2B RFP:
Company/Contact: ${result.data.name}
Email: ${result.data.email}

Requirements:
${result.data.message}`

  if (resend) {
    await resend.emails.send({ from, to, subject: 'New B2B RFP — Lue & Perez', text: body })
  } else {
    console.log('[RFP]', body) // Visible in logs locally or on Vercel
  }
  // Return nothing (void) to satisfy Next.js Server Actions typing
}
