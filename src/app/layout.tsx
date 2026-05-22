import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'SpendLens — Free AI Tool Spend Audit',
  description: 'Find out where your team is overspending on AI tools. Get an instant audit of your Cursor, Claude, ChatGPT, and GitHub Copilot spend.',
  openGraph: {
    title: 'SpendLens — Free AI Tool Spend Audit',
    description: 'Find out where your team is overspending on AI tools.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpendLens — Free AI Tool Spend Audit',
    description: 'Find out where your team is overspending on AI tools.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}