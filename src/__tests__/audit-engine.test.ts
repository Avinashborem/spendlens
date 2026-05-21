import { describe, it, expect } from 'vitest'
import { runAudit } from '@/lib/audit-engine'
import type { ToolEntry } from '@/types'

describe('Audit Engine', () => {

  it('flags Cursor Business as overkill for teams of 5 or fewer', () => {
    const tools: ToolEntry[] = [{
      tool: 'cursor',
      plan: 'business',
      seats: 3,
      monthlySpend: 120,
    }]
    const result = runAudit(tools, 3, 'coding')
    const cursorResult = result.toolResults[0]
    expect(cursorResult.monthlySavings).toBeGreaterThan(0)
    expect(cursorResult.severity).toBe('significant')
    expect(cursorResult.recommendedAction).toContain('Pro')
  })

  it('marks Cursor Pro as optimal for a coding team', () => {
    const tools: ToolEntry[] = [{
      tool: 'cursor',
      plan: 'pro',
      seats: 4,
      monthlySpend: 80,
    }]
    const result = runAudit(tools, 4, 'coding')
    expect(result.toolResults[0].severity).toBe('optimal')
    expect(result.toolResults[0].monthlySavings).toBe(0)
  })

  it('flags Claude Team with fewer than 5 users as critical', () => {
    const tools: ToolEntry[] = [{
      tool: 'claude',
      plan: 'team',
      seats: 3,
      monthlySpend: 150,
    }]
    const result = runAudit(tools, 3, 'writing')
    const claudeResult = result.toolResults[0]
    expect(claudeResult.severity).toBe('critical')
    expect(claudeResult.monthlySavings).toBeGreaterThan(0)
  })

  it('detects redundancy between Cursor and Windsurf for coding teams', () => {
    const tools: ToolEntry[] = [
      { tool: 'cursor', plan: 'pro', seats: 2, monthlySpend: 40 },
      { tool: 'windsurf', plan: 'pro', seats: 2, monthlySpend: 30 },
    ]
    const result = runAudit(tools, 2, 'coding')
    const windsurfResult = result.toolResults.find(r => r.tool === 'windsurf')
    expect(windsurfResult?.reason).toContain('Cursor')
  })

  it('calculates total annual savings as 12x monthly savings', () => {
    const tools: ToolEntry[] = [{
      tool: 'cursor',
      plan: 'business',
      seats: 5,
      monthlySpend: 200,
    }]
    const result = runAudit(tools, 5, 'coding')
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
  })

  it('returns zero savings for an already optimal setup', () => {
    const tools: ToolEntry[] = [{
      tool: 'cursor',
      plan: 'pro',
      seats: 10,
      monthlySpend: 200,
    }]
    const result = runAudit(tools, 10, 'coding')
    expect(result.totalMonthlySavings).toBe(0)
  })

  it('flags Copilot Business as overkill for teams of 3 or fewer', () => {
    const tools: ToolEntry[] = [{
      tool: 'github_copilot',
      plan: 'business',
      seats: 2,
      monthlySpend: 38,
    }]
    const result = runAudit(tools, 2, 'coding')
    expect(result.toolResults[0].severity).toBe('significant')
    expect(result.toolResults[0].monthlySavings).toBeGreaterThan(0)
  })

  it('flags ChatGPT Team as overkill for teams under 4', () => {
    const tools: ToolEntry[] = [{
      tool: 'chatgpt',
      plan: 'team',
      seats: 2,
      monthlySpend: 60,
    }]
    const result = runAudit(tools, 2, 'writing')
    expect(result.toolResults[0].severity).toBe('significant')
    expect(result.toolResults[0].monthlySavings).toBeGreaterThan(0)
  })

})