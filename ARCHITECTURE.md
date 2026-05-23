# Architecture

## System Diagram

```mermaid
graph TD
    A[User — Browser] -->|fills audit form| B[Next.js App Router\nspendlens-credex.netlify.app]
    B -->|POST /api/audit| C[Audit Engine\nserver-side TypeScript]
    C -->|hardcoded rules| D[Savings Calculator\n& Recommendations]
    D -->|optional| E[Anthropic API\nAI summary paragraph]
    E -->|fallback if API fails| F[Template Summary]
    D --> G[(Supabase\naudit table)]
    G -->|shareId returned| B
    B -->|redirect| H[/audit/shareId\nResults Page]
    H -->|fetch by shareId| G
    H -->|user enters email| I[POST /api/lead]
    I --> J[(Supabase\nleads table)]
    I --> K[Resend API\nconfirmation email]
```

## Data Flow — Audit Submission

```
1. User fills form: tools + plans + seats + team size + use case
2. Form state persisted to localStorage on every change
3. POST /api/audit { tools, teamSize, useCase }
4. Server runs audit engine:
   a. Calculate total monthly spend per tool (price × seats)
   b. Detect redundant tool pairs against overlap rules table
   c. Check plan fit (e.g. Team plan for 2 users = overkill)
   d. Generate ranked recommendations with savings amounts
   e. Call Anthropic API for personalized summary paragraph
   f. Fall back to template summary if API fails or times out
5. Result saved to Supabase audits table with UUID shareId
6. shareId returned to client
7. Client redirects to /audit/[shareId]
8. Results page fetches audit from Supabase by shareId
9. Renders savings hero, per-tool breakdown, recommendations
10. If savings > $500/mo: Credex CTA rendered prominently
```

## Data Flow — Lead Capture

```
1. User enters email on results page (after value shown, never before)
2. POST /api/lead { email, auditId, companyName?, role? }
3. Honeypot field checked — bot submissions rejected silently
4. Lead saved to Supabase leads table (email + audit foreign key)
5. Resend API sends confirmation email
   - High savings (>$500/mo): mentions Credex consultation
   - Low savings (<$100/mo): "notify me" framing
6. 200 response returned; UI shows success state
```

## Why This Stack

**Next.js 14 App Router** — Server components and Route Handlers let me colocate API logic with the pages that use it. No separate Express server needed. TypeScript support is first-class.

**Supabase** — Managed Postgres with a good free tier, instant REST and realtime APIs, and Row Level Security for future auth. Faster to set up than a raw Postgres instance on Render.

**Resend** — Cleaner API than SendGrid for transactional email, generous free tier (3k emails/month), and React Email integration if I want to upgrade templates later.

**Netlify + @netlify/plugin-nextjs** — Chosen after Vercel deployment failed with a bom1 routing error on all URLs (account-level routing issue after Pro trial cancellation). Netlify handled App Router serverless functions automatically with zero configuration beyond netlify.toml.

**shadcn/ui** — Unstyled Radix primitives with Tailwind — gives full control over design without writing component CSS from scratch. Not a template.

**Vitest** — Faster than Jest for TypeScript projects, works natively with the same config as Next.js, path aliases resolve without extra setup.

## What I'd Change for 10k Audits/Day

At 10k audits/day (~7 audits/minute sustained, with spikes):

**Database:** Supabase free tier caps at 500MB storage and 2GB bandwidth. Would upgrade to Supabase Pro ($25/mo) or migrate to a dedicated Postgres instance on Render/Railway. Add an index on `share_id` (currently unindexed) and `created_at` for time-range queries. Consider partitioning the audits table by month.

**Anthropic API:** At 10k audits/day with a ~200 token summary each, that's ~2M tokens/day. Would implement a queue (Upstash QStash or Inngest) so summary generation is async — the results page loads immediately with the template summary, then updates when the AI summary arrives. This also makes the fallback seamless rather than a degraded state.

**Caching:** Add Redis (Upstash) to cache audit results by shareId. Most shared reports are read many more times than written. A 1-hour TTL on shareId lookups would cut Supabase reads by ~80%.

**Rate limiting:** Move from honeypot-only to token bucket rate limiting per IP on /api/audit, using Upstash Redis. Prevents audit spam that could exhaust Anthropic API quota.

**Edge deployment:** Move the results page rendering to Netlify Edge Functions (Deno) for sub-50ms TTFB globally. The audit API stays as a standard serverless function since it needs longer execution time for the Anthropic call.

**Monitoring:** Add Sentry for error tracking and Plausible for privacy-respecting analytics. Set up Supabase alerts for table size and query latency.

## Database Schema

```sql
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id TEXT UNIQUE NOT NULL,
  team_size INTEGER NOT NULL,
  use_case TEXT NOT NULL,
  tools JSONB NOT NULL,
  total_monthly_spend NUMERIC,
  estimated_savings NUMERIC,
  recommendations JSONB,
  ai_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audits_share_id ON audits(share_id);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  audit_id UUID REFERENCES audits(id),
  company_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
