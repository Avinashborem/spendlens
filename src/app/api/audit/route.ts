import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { runAudit } from '@/lib/audit-engine'
import { supabaseAdmin } from '@/lib/supabase'
import type { ToolEntry, UseCase } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tools, teamSize, useCase } = body as {
      tools: ToolEntry[]
      teamSize: number
      useCase: UseCase
    }

    // Validate
    if (!tools || !Array.isArray(tools) || tools.length === 0) {
      return NextResponse.json({ error: 'No tools provided' }, { status: 400 })
    }

    // Run audit engine
    const auditResult = runAudit(tools, teamSize, useCase)

    // Generate AI summary with fallback
    let aiSummary = generateFallbackSummary(auditResult.totalMonthlySavings, teamSize, useCase, tools)

    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const Anthropic = (await import('@anthropic-ai/sdk')).default
        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

        const toolsList = tools.map(t => `${t.tool} (${t.plan})`).join(', ')
        const prompt = `You are an AI spend optimization expert. A team of ${teamSize} people primarily uses AI for ${useCase}. They currently pay for: ${toolsList}. Their total monthly AI spend is $${tools.reduce((s, t) => s + t.monthlySpend, 0)}. The audit found $${auditResult.totalMonthlySavings.toFixed(0)}/month in potential savings. Write a 80-100 word personalized summary paragraph for this specific team explaining their spending pattern, the key optimization opportunity, and what they should do first. Be specific, not generic. Do not use bullet points.`

        const message = await client.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 200,
          messages: [{ role: 'user', content: prompt }],
        })

        const content = message.content[0]
        if (content.type === 'text') {
          aiSummary = content.text
        }
      } catch (err) {
        console.error('Anthropic API error, using fallback:', err)
      }
    }

    // Save to Supabase
    const shareId = nanoid(10)
    const { error: dbError } = await supabaseAdmin
      .from('audits')
      .insert({
        share_id: shareId,
        tools,
        team_size: teamSize,
        use_case: useCase,
        total_monthly_savings: auditResult.totalMonthlySavings,
        total_annual_savings: auditResult.totalAnnualSavings,
        ai_summary: aiSummary,
      })

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save audit' }, { status: 500 })
    }

    return NextResponse.json({
      shareId,
      ...auditResult,
      aiSummary,
    })
  } catch (error) {
    console.error('Audit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateFallbackSummary(
  totalMonthlySavings: number,
  teamSize: number,
  useCase: string,
  tools: ToolEntry[]
): string {
  const toolCount = tools.length
  const totalSpend = tools.reduce((s, t) => s + t.monthlySpend, 0)

  if (totalMonthlySavings === 0) {
    return `Your team of ${teamSize} is spending $${totalSpend}/month across ${toolCount} AI tool${toolCount > 1 ? 's' : ''} for ${useCase} — and doing it efficiently. Your current plans are well-matched to your team size and usage patterns. No immediate changes recommended, but revisit this audit when your team grows or your usage patterns shift.`
  }

  return `Your team of ${teamSize} is spending $${totalSpend}/month across ${toolCount} AI tool${toolCount > 1 ? 's' : ''} for ${useCase} work. The audit identified $${totalMonthlySavings.toFixed(0)}/month — $${(totalMonthlySavings * 12).toFixed(0)}/year — in potential savings, primarily from plan mismatches for your team size. The highest-impact action is to address the flagged recommendations below, starting with the items marked critical or significant.`
}