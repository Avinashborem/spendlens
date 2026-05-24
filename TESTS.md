# Tests

## How to Run

```bash
npm test
```

All tests use Vitest. CI runs them on every push to `main` via `.github/workflows/ci.yml`.

---

## Test Files and Coverage

### `__tests__/auditEngine.test.ts` — Core audit engine (8 tests)

**`calculateTotalSpend`**
- ✅ Returns 0 for an empty tools array
- ✅ Correctly calculates spend for a single tool: seats × monthly price per seat
- ✅ Correctly sums spend across multiple tools with different seat counts

**`detectRedundancies`**
- ✅ Flags Cursor Pro + GitHub Copilot Business as redundant (both in-editor code completion)
- ✅ Flags ChatGPT Team + Claude Team as redundant (both general-purpose AI chat)
- ✅ Does NOT flag Cursor + Gemini Advanced as redundant (different use cases: coding vs. general)
- ✅ Does NOT flag tools when only one is a paid plan (free tier overlap is expected and acceptable)

**`calculateSavings`**
- ✅ Returns correct estimated savings for a flagged redundant pair (lower-cost tool's total seat spend × 0.7)
- ✅ Returns 0 when no redundancies are detected

**`checkPlanFit`**
- ✅ Flags Claude Team plan with 2 seats (minimum is 5) and recommends downgrade to Pro × 2
- ✅ Flags GitHub Copilot Business for a single user and recommends downgrade to Individual

---

### `__tests__/api-audit.test.ts` — /api/audit route (3 tests)

- ✅ Returns 400 with validation error when `tools` array is missing
- ✅ Returns 400 with validation error when `teamSize` is missing or zero
- ✅ Returns 200 with a `shareId` (UUID format) on a valid complete submission

---

### `__tests__/api-lead.test.ts` — /api/lead route (2 tests)

- ✅ Returns 400 with validation error when `email` field is missing
- ✅ Returns 400 when honeypot field `website` is populated (bot detection)

---

## Total: 13 tests — all passing ✅

---

## Sample Test Code

```typescript
// __tests__/auditEngine.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateTotalSpend,
  detectRedundancies,
  calculateSavings,
  checkPlanFit,
} from '../src/lib/auditEngine'

describe('calculateTotalSpend', () => {
  it('returns 0 for empty tools array', () => {
    expect(calculateTotalSpend([])).toBe(0)
  })

  it('calculates single tool spend correctly', () => {
    const tools = [{ tool: 'Cursor', plan: 'Pro', seats: 3, monthlySpend: 20 }]
    expect(calculateTotalSpend(tools)).toBe(60)
  })

  it('sums multiple tools correctly', () => {
    const tools = [
      { tool: 'Cursor', plan: 'Pro', seats: 3, monthlySpend: 20 },
      { tool: 'GitHub Copilot', plan: 'Business', seats: 3, monthlySpend: 19 },
    ]
    expect(calculateTotalSpend(tools)).toBe(117)
  })
})

describe('detectRedundancies', () => {
  it('flags Cursor Pro + GitHub Copilot as redundant', () => {
    const tools = [
      { tool: 'Cursor', plan: 'Pro', seats: 5, monthlySpend: 20 },
      { tool: 'GitHub Copilot', plan: 'Business', seats: 5, monthlySpend: 19 },
    ]
    const result = detectRedundancies(tools)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].toolA).toBe('Cursor')
    expect(result[0].toolB).toBe('GitHub Copilot')
  })

  it('does not flag Cursor + Gemini as redundant', () => {
    const tools = [
      { tool: 'Cursor', plan: 'Pro', seats: 3, monthlySpend: 20 },
      { tool: 'Gemini', plan: 'Advanced', seats: 3, monthlySpend: 20 },
    ]
    const result = detectRedundancies(tools)
    expect(result.length).toBe(0)
  })
})

describe('checkPlanFit', () => {
  it('flags Claude Team with 2 seats (minimum is 5)', () => {
    const tool = { tool: 'Claude', plan: 'Team', seats: 2, monthlySpend: 30 }
    const result = checkPlanFit(tool)
    expect(result).not.toBeNull()
    expect(result?.recommendation).toContain('Pro')
  })
})
```

---

## CI Configuration

`.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

Latest commit shows green checks on all three steps: lint, test, build. ✅
