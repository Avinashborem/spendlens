'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Copy, Check, TrendingDown, AlertTriangle, CheckCircle, Info, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { TOOL_DISPLAY_NAMES } from '@/lib/pricing-data'
import type { AuditResult, ToolAuditResult } from '@/types'

interface Props {
  auditResult: AuditResult & { aiSummary?: string | null }
  auditDbId: string
}

function SeverityIcon({ severity }: { severity: ToolAuditResult['severity'] }) {
  if (severity === 'critical' || severity === 'significant') {
    return <AlertTriangle size={16} className="text-red-500" />
  }
  if (severity === 'minor') {
    return <Info size={16} className="text-yellow-500" />
  }
  return <CheckCircle size={16} className="text-green-500" />
}

function SeverityBadge({ severity }: { severity: ToolAuditResult['severity'] }) {
  const styles = {
    critical: 'bg-red-100 text-red-700',
    significant: 'bg-orange-100 text-orange-700',
    minor: 'bg-yellow-100 text-yellow-700',
    optimal: 'bg-green-100 text-green-700',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[severity]}`}>
      {severity}
    </span>
  )
}

export default function AuditResults({ auditResult, auditDbId }: Props) {
  const [copied, setCopied] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [role, setRole] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { toolResults, totalMonthlySavings, totalAnnualSavings, aiSummary, shareId } = auditResult
  const isHighSavings = totalMonthlySavings > 200
  const hasAnySavings = totalMonthlySavings > 0
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/audit/${shareId}`
    : `/audit/${shareId}`

  function copyShareUrl() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success('Link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  async function submitLead() {
    if (!email) { toast.error('Email is required'); return }
    setSubmitting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, companyName, role,
          auditId: auditDbId,
          totalMonthlySavings,
          shareId,
        }),
      })
      setLeadSubmitted(true)
      toast.success('Report sent to your email!')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="font-semibold text-slate-900">SpendLens</span>
          </a>
          <button onClick={copyShareUrl} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            Share this audit
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Hero savings */}
        <Card className="p-8 text-center bg-slate-900 text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown size={24} className="text-green-400" />
            <span className="text-green-400 font-medium">Audit Complete</span>
          </div>
          {hasAnySavings ? (
            <>
              <h1 className="text-5xl font-bold mb-2">
                ${totalMonthlySavings.toFixed(0)}
                <span className="text-2xl text-slate-400">/mo</span>
              </h1>
              <p className="text-slate-400 text-lg">
                in potential savings — that's <strong className="text-white">${totalAnnualSavings.toFixed(0)}/year</strong>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-2">You're spending well ✓</h1>
              <p className="text-slate-400 text-lg">No significant optimisations found for your current setup.</p>
            </>
          )}
        </Card>

        {/* AI Summary */}
        {aiSummary && (
          <Card className="p-6 border-l-4 border-l-slate-900">
            <h2 className="font-semibold text-slate-900 mb-2">Personalised analysis</h2>
            <p className="text-slate-600 leading-relaxed">{aiSummary}</p>
          </Card>
        )}

        {/* Credex CTA for high savings */}
        {isHighSavings && (
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 mb-1">
                  You qualify for a Credex consultation
                </h3>
                <p className="text-green-800 text-sm mb-3">
                  With ${totalMonthlySavings.toFixed(0)}/month in potential savings, you may be able to capture even more through Credex — the marketplace for discounted AI infrastructure credits sourced from companies that overforecast.
                </p>
                <a>
                  href="https://credex.rocks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
                
                  {'Learn about Credex'} <ExternalLink size={14} />
                </a>
              </div>
            </div>
        </Card>
        )}

        {/* Per-tool breakdown */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Tool-by-tool breakdown</h2>
          <div className="space-y-3">
            {toolResults.map((result, i) => (
              <Card key={i} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <SeverityIcon severity={result.severity} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900">
                          {TOOL_DISPLAY_NAMES[result.tool] || result.tool}
                        </span>
                        <span className="text-slate-400 text-sm capitalize">{result.plan}</span>
                        <SeverityBadge severity={result.severity} />
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{result.reason}</p>
                      <p className="text-sm font-medium text-slate-800">
                        → {result.recommendedAction}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm text-slate-500">Current</div>
                    <div className="font-semibold text-slate-900">${result.currentMonthlySpend}/mo</div>
                    {result.monthlySavings > 0 && (
                      <div className="text-green-600 font-semibold text-sm mt-1">
                        Save ${result.monthlySavings.toFixed(0)}/mo
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Lead capture */}
        <Card className="p-6">
          {!leadSubmitted ? (
            <>
              <h2 className="font-semibold text-slate-900 mb-1">
                {hasAnySavings ? 'Get this report in your inbox' : 'Stay updated on new optimisations'}
              </h2>
              <p className="text-slate-500 text-sm mb-4">
                {hasAnySavings
                  ? 'We\'ll email you the full report. For high-savings cases, Credex will reach out about discounted credits.'
                  : 'We\'ll notify you when new optimisation opportunities apply to your stack.'}
              </p>
              {!showLeadForm ? (
                <Button onClick={() => setShowLeadForm(true)} className="bg-slate-900 hover:bg-slate-700 text-white">
                  Send me the report →
                </Button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label>Email *</Label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Company (optional)</Label>
                      <Input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Acme Inc" className="mt-1" />
                    </div>
                    <div>
                      <Label>Role (optional)</Label>
                      <Input value={role} onChange={e => setRole(e.target.value)} placeholder="Engineering Manager" className="mt-1" />
                    </div>
                  </div>
                  <Button onClick={submitLead} disabled={submitting} className="bg-slate-900 hover:bg-slate-700 text-white">
                    {submitting ? 'Sending...' : 'Send report →'}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <CheckCircle size={32} className="text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-slate-900">Report sent!</h3>
              <p className="text-slate-500 text-sm mt-1">Check your inbox for the full audit.</p>
            </div>
          )}
        </Card>

        {/* Share */}
        <Card className="p-6">
          <h2 className="font-semibold text-slate-900 mb-2">Share this audit</h2>
          <p className="text-slate-500 text-sm mb-3">Personal details are not included in the shared version.</p>
          <div className="flex gap-2">
            <Input value={shareUrl} readOnly className="text-sm" />
            <Button onClick={copyShareUrl} variant="outline">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        </Card>

        <div className="text-center">
          <a href="/" className="text-sm text-slate-500 hover:text-slate-900">
            ← Run a new audit
          </a>
        </div>
      </div>
    </div>
  )
}