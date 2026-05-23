# Prompts

## AI Summary Prompt (used in production)

This prompt runs inside `/api/audit` after the hardcoded audit engine completes. It receives the structured audit result and generates a ~100-word personalized summary paragraph.

```
You are an AI spend analyst. A startup team has just completed an audit of their AI tool subscriptions. Write a concise, direct, 80–120 word summary of their situation.

Here is their audit data:
- Team size: {{teamSize}}
- Primary use case: {{useCase}}
- Tools in use: {{toolList}} (format: "Tool — Plan — $X/seat/mo × N seats")
- Total monthly spend: ${{totalMonthlySpend}}
- Estimated monthly savings: ${{estimatedSavings}}
- Top recommendations: {{topRecommendations}} (list of 1–3 action items)

Write the summary in second person ("Your team..."). Be specific — use the actual numbers. Be direct and practical. Do not use filler phrases like "great news" or "exciting opportunity." Do not recommend Credex — that is handled separately. End with one concrete next action.
```

### Why it's written this way

**Second person ("Your team..."):** Creates a personalized feel vs. "The team has..." which reads like a report about someone else.

**Specific numbers required:** Without the `use the actual numbers` instruction, the model tends to be vague ("you could save significantly"). The audit's value is the specificity.

**"Do not use filler phrases":** Early iterations returned summaries starting with "Great news!" or "Exciting findings!". This instruction eliminates that pattern.

**80–120 word constraint:** Tighter than a natural LLM response. Forces the model to be concise. Shorter summaries get read; longer ones get skimmed.

**"Do not recommend Credex":** The Credex CTA is rendered separately by the UI based on `estimatedSavings > 500`. Having the AI also mention it would feel pushy and duplicate the message.

**"End with one concrete next action":** Without this, summaries often end vaguely. Ending with an action gives the user something to do.

---

### What I tried that didn't work

**Version 1 — No constraints:**
```
Summarize this AI tool audit for a startup team: {{auditData}}
```
Result: 250+ word summaries, generic language, no specific numbers used despite being in the prompt data.

**Version 2 — Third person:**
```
Write a summary of the following audit results as if writing a report for an executive...
```
Result: Formal, distant tone. Felt like a consultant report, not a helpful tool. Users in testing said it felt "cold."

**Version 3 — Asked for bullet points:**
```
...summarize in 3–5 bullet points...
```
Result: Bullets don't fit the "summary paragraph" UI card design. Also felt less like insight and more like a list.

---

### Fallback behavior

If the Anthropic API call fails (timeout, rate limit, missing key, or any error), the system falls back to a template summary:

```
Your team of {{teamSize}} is spending ${{totalMonthlySpend}}/month across {{toolCount}} AI tools for {{useCase}} work. 
{{#if estimatedSavings > 0}}
Our audit found ${{estimatedSavings}}/month in potential savings ({{annualSavings}}/year) from overlapping subscriptions. 
{{topRecommendation}}
{{else}}
Your AI tool stack appears well-optimized for your team size and use case. No major redundancies detected.
{{/if}}
```

The fallback is rendered synchronously with the rest of the audit result — users never see a loading state or error for the summary.

---

## Other prompts used during development

**Audit engine TypeScript scaffold:**
> "Write a TypeScript function `processAudit(input: AuditInput): AuditResult` that takes team size, use case, and an array of tools (each with name, plan, seats, monthlySpend). Calculate total monthly spend, detect redundant tool pairs from a configurable overlap rules table, check plan fit, return ranked recommendations with savings amounts and one-sentence reasons. Export the overlap rules as a separate constant so they can be unit tested independently."

**Supabase schema:**
> "Write a Supabase SQL schema for two tables: audits (UUID primary key, share_id unique text, team_size int, use_case text, tools JSONB, total_monthly_spend numeric, estimated_savings numeric, recommendations JSONB, ai_summary text, created_at timestamptz) and leads (UUID primary key, email text, audit_id UUID FK to audits, company_name text, role text, created_at timestamptz). Include an index on share_id."

**Resend email template:**
> "Write an HTML transactional email template for SpendLens. Two variants: (1) high savings (>$500/mo): include total savings figure prominently, mention Credex as a way to save even more with discounted credits, include the shareable report link. (2) low savings (<$100/mo): congratulate on an optimized stack, offer to be notified when new optimizations apply. Both: plain HTML, no external CSS, works in Gmail and Outlook."
