export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed'

export type ToolName =
  | 'cursor'
  | 'github_copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic_api'
  | 'openai_api'
  | 'gemini'
  | 'windsurf'

export type CursorPlan = 'hobby' | 'pro' | 'business' | 'enterprise'
export type CopilotPlan = 'individual' | 'business' | 'enterprise'
export type ClaudePlan = 'free' | 'pro' | 'max' | 'team' | 'enterprise' | 'api'
export type ChatGPTPlan = 'plus' | 'team' | 'enterprise' | 'api'
export type GeminiPlan = 'pro' | 'ultra' | 'api'
export type WindsurfPlan = 'free' | 'pro' | 'team'

export type AnyPlan =
  | CursorPlan
  | CopilotPlan
  | ClaudePlan
  | ChatGPTPlan
  | GeminiPlan
  | WindsurfPlan

export interface ToolEntry {
  tool: ToolName
  plan: AnyPlan
  monthlySpend: number
  seats: number
}

export interface FormData {
  tools: ToolEntry[]
  teamSize: number
  useCase: UseCase
}

export interface ToolAuditResult {
  tool: ToolName
  plan: AnyPlan
  currentMonthlySpend: number
  recommendedAction: string
  monthlySavings: number
  annualSavings: number
  reason: string
  severity: 'optimal' | 'minor' | 'significant' | 'critical'
}

export interface AuditResult {
  toolResults: ToolAuditResult[]
  totalMonthlySavings: number
  totalAnnualSavings: number
  teamSize: number
  useCase: UseCase
  aiSummary?: string
  shareId: string
}

export interface StoredAudit {
  id: string
  share_id: string
  tools: ToolEntry[]
  team_size: number
  use_case: UseCase
  total_monthly_savings: number
  total_annual_savings: number
  ai_summary: string | null
  created_at: string
}

export interface LeadData {
  email: string
  companyName?: string
  role?: string
  teamSize?: number
  auditId: string
}