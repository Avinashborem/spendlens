// All prices in USD per user per month
// Full sources with URLs and dates are in PRICING_DATA.md

export const PRICING = {
  cursor: {
    hobby: 0,
    pro: 20,
    business: 40,
    enterprise: null,
  },
  github_copilot: {
    individual: 10,
    business: 19,
    enterprise: 39,
  },
  claude: {
    free: 0,
    pro: 20,
    max: 100,
    team: 30,
    enterprise: null,
    api: null,
  },
  chatgpt: {
    plus: 20,
    team: 30,
    enterprise: null,
    api: null,
  },
  anthropic_api: {
    api: null,
  },
  openai_api: {
    api: null,
  },
  gemini: {
    pro: 19.99,
    ultra: null,
    api: null,
  },
  windsurf: {
    free: 0,
    pro: 15,
    team: 35,
  },
} as const

export const TOOL_DISPLAY_NAMES: Record<string, string> = {
  cursor: 'Cursor',
  github_copilot: 'GitHub Copilot',
  claude: 'Claude',
  chatgpt: 'ChatGPT',
  anthropic_api: 'Anthropic API',
  openai_api: 'OpenAI API',
  gemini: 'Gemini',
  windsurf: 'Windsurf',
}

export const TOOL_PLANS: Record<string, string[]> = {
  cursor: ['hobby', 'pro', 'business', 'enterprise'],
  github_copilot: ['individual', 'business', 'enterprise'],
  claude: ['free', 'pro', 'max', 'team', 'enterprise', 'api'],
  chatgpt: ['plus', 'team', 'enterprise', 'api'],
  anthropic_api: ['api'],
  openai_api: ['api'],
  gemini: ['pro', 'ultra', 'api'],
  windsurf: ['free', 'pro', 'team'],
}

export const USE_CASES = [
  { value: 'coding', label: 'Coding / Engineering' },
  { value: 'writing', label: 'Writing / Content' },
  { value: 'data', label: 'Data Analysis' },
  { value: 'research', label: 'Research' },
  { value: 'mixed', label: 'Mixed / General' },
]

export const ALL_TOOLS = [
  { value: 'cursor', label: 'Cursor' },
  { value: 'github_copilot', label: 'GitHub Copilot' },
  { value: 'claude', label: 'Claude' },
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'anthropic_api', label: 'Anthropic API (direct)' },
  { value: 'openai_api', label: 'OpenAI API (direct)' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'windsurf', label: 'Windsurf' },
]