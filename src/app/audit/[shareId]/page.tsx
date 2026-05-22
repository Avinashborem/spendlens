import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { runAudit } from '@/lib/audit-engine'
import AuditResults from '@/components/AuditResults'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ shareId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shareId } = await params
  const { data } = await supabase
    .from('audits')
    .select('total_monthly_savings, total_annual_savings')
    .eq('share_id', shareId)
    .single()

  if (!data) return { title: 'Audit Not Found — SpendLens' }

  return {
    title: `AI Spend Audit — $${data.total_monthly_savings}/mo savings found | SpendLens`,
    description: `This team could save $${data.total_monthly_savings}/month ($${data.total_annual_savings}/year) on AI tools.`,
    openGraph: {
      title: `AI Spend Audit — $${data.total_monthly_savings}/mo savings found`,
      description: `This team could save $${data.total_monthly_savings}/month on AI tools. Run your free audit at SpendLens.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `AI Spend Audit — $${data.total_monthly_savings}/mo savings found`,
      description: `This team could save $${data.total_monthly_savings}/month on AI tools.`,
    },
  }
}

export default async function AuditPage({ params }: Props) {
  const { shareId } = await params

  const { data: audit, error } = await supabase
    .from('audits')
    .select('*')
    .eq('share_id', shareId)
    .single()

  if (error || !audit) notFound()

  const auditResult = runAudit(audit.tools, audit.team_size, audit.use_case)

  return (
    <AuditResults
      auditResult={{
        ...auditResult,
        aiSummary: audit.ai_summary,
        shareId,
      }}
      auditDbId={audit.id}
    />
  )
}