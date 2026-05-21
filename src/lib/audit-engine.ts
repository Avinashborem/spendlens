import { PRICING, TOOL_DISPLAY_NAMES } from './pricing-data'
import type { ToolEntry, ToolAuditResult, AuditResult, UseCase } from '@/types'

function auditCursor(entry: ToolEntry, teamSize: number, useCase: UseCase): ToolAuditResult {
  const { plan, seats, monthlySpend } = entry
  const prices = PRICING.cursor

  let recommendedAction = 'Keep current plan'
  let monthlySavings = 0
  let reason = 'Your Cursor plan is well-matched to your team size and use case.'
  let severity: ToolAuditResult['severity'] = 'optimal'

  if (plan === 'business' && teamSize <= 5) {
    const savingsPerSeat = prices.business - prices.pro
    monthlySavings = savingsPerSeat * seats
    recommendedAction = `Downgrade to Cursor Pro ($${prices.pro}/user/month)`
    reason = `Cursor Business adds SSO and audit logs — features you don't need at ${teamSize} people. Pro at $${prices.pro}/user has identical coding features and saves $${savingsPerSeat}/seat/month.`
    severity = 'significant'
  } else if (plan === 'enterprise') {
    reason = 'Cursor Enterprise pricing is custom. Verify you are getting value from enterprise-only features like self-hosting and dedicated support.'
    severity = 'minor'
  } else if (useCase !== 'coding' && plan !== 'hobby') {
    reason = `Cursor is optimised for coding workflows. Your primary use case is ${useCase} — confirm your team actively uses it to justify the cost.`
    severity = 'minor'
  }

  return {
    tool: entry.tool,
    plan,
    currentMonthlySpend: monthlySpend,
    recommendedAction,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    reason,
    severity,
  }
}

function auditCopilot(entry: ToolEntry, teamSize: number): ToolAuditResult {
  const { plan, seats, monthlySpend } = entry
  const prices = PRICING.github_copilot

  let recommendedAction = 'Keep current plan'
  let monthlySavings = 0
  let reason = 'GitHub Copilot plan is appropriate for your team.'
  let severity: ToolAuditResult['severity'] = 'optimal'

  if (plan === 'business' && seats <= 3) {
    const savings = (prices.business - prices.individual) * seats
    monthlySavings = savings
    recommendedAction = `Downgrade to Individual plans ($${prices.individual}/user/month)`
    reason = `Copilot Business adds policy management and audit logs — unnecessary for a ${seats}-person team. Individual at $${prices.individual}/user is functionally identical for coding, saving $${prices.business - prices.individual}/seat/month.`
    severity = 'significant'
  } else if (plan === 'enterprise' && teamSize < 25) {
    monthlySavings = (prices.enterprise - prices.business) * seats
    recommendedAction = `Downgrade to Business plan ($${prices.business}/user/month)`
    reason = `Copilot Enterprise is built for large orgs needing Bing search integration and fine-tuned models. At ${teamSize} people, Business delivers the same completions at $${prices.enterprise - prices.business}/seat less.`
    severity = 'significant'
  }

  return {
    tool: entry.tool,
    plan,
    currentMonthlySpend: monthlySpend,
    recommendedAction,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    reason,
    severity,
  }
}

function auditClaude(entry: ToolEntry, teamSize: number): ToolAuditResult {
  const { plan, seats, monthlySpend } = entry
  const proPrice = PRICING.claude.pro
  const teamPrice = PRICING.claude.team
  const maxPrice = PRICING.claude.max

  let recommendedAction = 'Keep current plan'
  let monthlySavings = 0
  let reason = 'Claude plan is well-matched to your usage.'
  let severity: ToolAuditResult['severity'] = 'optimal'

  if (plan === 'team' && teamSize < 5) {
    const unusedSeats = 5 - teamSize
    monthlySavings = unusedSeats * (teamPrice ?? 30)
    recommendedAction = `Switch to Claude Pro individual plans ($${proPrice}/user/month)`
    reason = `Claude Team requires a minimum of 5 seats at $${teamPrice}/user. With only ${teamSize} people you are paying for ${unusedSeats} unused seat(s). Individual Pro plans at $${proPrice}/user would cost $${proPrice * teamSize}/month vs $${(teamPrice ?? 30) * 5}/month minimum.`
    severity = 'critical'
  } else if (plan === 'max' && seats === 1) {
    monthlySavings = (maxPrice ?? 100) - (proPrice ?? 20)
    recommendedAction = `Try Claude Pro ($${proPrice}/month) and upgrade only if you hit limits`
    reason = `Claude Max at $${maxPrice}/month gives 5x the usage limits of Pro. Unless you are consistently hitting Pro rate limits, start with Pro at $${proPrice}/month and upgrade if needed. That is an $${(maxPrice ?? 100) - (proPrice ?? 20)}/month saving.`
    severity = 'minor'
  }

  return {
    tool: entry.tool,
    plan,
    currentMonthlySpend: monthlySpend,
    recommendedAction,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    reason,
    severity,
  }
}

function auditChatGPT(entry: ToolEntry, teamSize: number): ToolAuditResult {
  const { plan, seats, monthlySpend } = entry
  const prices = PRICING.chatgpt

  let recommendedAction = 'Keep current plan'
  let monthlySavings = 0
  let reason = 'ChatGPT plan is appropriate for your usage.'
  let severity: ToolAuditResult['severity'] = 'optimal'

  if (plan === 'team' && teamSize < 4) {
    const savings = ((prices.team ?? 30) - (prices.plus ?? 20)) * seats
    monthlySavings = Math.max(0, savings)
    recommendedAction = `Switch to ChatGPT Plus individual plans ($${prices.plus}/user/month)`
    reason = `ChatGPT Team at $${prices.team}/user adds workspace tools. With only ${teamSize} people, Plus plans at $${prices.plus}/user give the same GPT-4o access at $${(prices.team ?? 30) - (prices.plus ?? 20)}/seat less.`
    severity = 'significant'
  }

  return {
    tool: entry.tool,
    plan,
    currentMonthlySpend: monthlySpend,
    recommendedAction,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    reason,
    severity,
  }
}

function auditWindsurf(entry: ToolEntry, teamSize: number): ToolAuditResult {
  const { plan, seats, monthlySpend } = entry
  const prices = PRICING.windsurf

  let recommendedAction = 'Keep current plan'
  let monthlySavings = 0
  let reason = 'Windsurf plan looks reasonable for your team.'
  let severity: ToolAuditResult['severity'] = 'optimal'

  if (plan === 'team' && teamSize <= 3) {
    const savings = (prices.team - prices.pro) * seats
    monthlySavings = savings
    recommendedAction = `Downgrade to Windsurf Pro ($${prices.pro}/user/month)`
    reason = `Windsurf Team at $${prices.team}/user adds admin controls unnecessary for ${teamSize} people. Pro at $${prices.pro}/user is identical for individual coding workflows.`
    severity = 'significant'
  }

  return {
    tool: entry.tool,
    plan,
    currentMonthlySpend: monthlySpend,
    recommendedAction,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    reason,
    severity,
  }
}

function checkRedundancy(tools: ToolEntry[], useCase: UseCase): Map<string, string> {
  const warnings = new Map<string, string>()
  const toolNames = tools.map(t => t.tool)

  if (toolNames.includes('cursor') && toolNames.includes('windsurf') && useCase === 'coding') {
    warnings.set('windsurf', 'You are paying for both Cursor and Windsurf — near-identical AI coding editors. Pick one. Most teams standardise on Cursor for its model ecosystem or Windsurf for its lower price.')
  }

  if (toolNames.includes('claude') && toolNames.includes('chatgpt') && useCase !== 'coding') {
    warnings.set('chatgpt', `You are paying for both Claude and ChatGPT for ${useCase} tasks. These have significant capability overlap. Evaluate which your team actually uses and consolidate.`)
  }

  if (toolNames.includes('anthropic_api') && toolNames.includes('claude')) {
    warnings.set('claude', 'You have both an Anthropic API account and a Claude subscription. If you are building on the API, the Claude.ai subscription may be redundant unless team members use it for personal productivity.')
  }

  if (toolNames.includes('openai_api') && toolNames.includes('chatgpt')) {
    warnings.set('chatgpt', 'You have both OpenAI API access and a ChatGPT subscription. If your team primarily builds with the API, the ChatGPT subscription may be redundant.')
  }

  return warnings
}

export function runAudit(
  tools: ToolEntry[],
  teamSize: number,
  useCase: UseCase,
): Omit<AuditResult, 'shareId' | 'aiSummary'> {
  const redundancyWarnings = checkRedundancy(tools, useCase)

  const toolResults: ToolAuditResult[] = tools.map(entry => {
    let result: ToolAuditResult

    switch (entry.tool) {
      case 'cursor':
        result = auditCursor(entry, teamSize, useCase)
        break
      case 'github_copilot':
        result = auditCopilot(entry, teamSize)
        break
      case 'claude':
        result = auditClaude(entry, teamSize)
        break
      case 'chatgpt':
        result = auditChatGPT(entry, teamSize)
        break
      case 'windsurf':
        result = auditWindsurf(entry, teamSize)
        break
      default:
        result = {
          tool: entry.tool,
          plan: entry.plan,
          currentMonthlySpend: entry.monthlySpend,
          recommendedAction: 'Keep current plan',
          monthlySavings: 0,
          annualSavings: 0,
          reason: 'No specific optimisation identified. Your spend looks reasonable for this tool.',
          severity: 'optimal',
        }
    }

    const warning = redundancyWarnings.get(entry.tool)
    if (warning) {
      result.reason = warning
      result.severity = result.severity === 'optimal' ? 'minor' : result.severity
    }

    return result
  })

  const totalMonthlySavings = toolResults.reduce((sum, r) => sum + r.monthlySavings, 0)
  const totalAnnualSavings = totalMonthlySavings * 12

  return {
    toolResults,
    totalMonthlySavings,
    totalAnnualSavings,
    teamSize,
    useCase,
  }
}