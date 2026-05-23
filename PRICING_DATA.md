# Pricing Data

All pricing current as of submission week (May 2026). Every number traces to the vendor's official pricing page.

---

## Cursor

- Hobby: $0/user/month — https://cursor.com/pricing — verified 2026-05-23
- Pro: $20/user/month — https://cursor.com/pricing — verified 2026-05-23
- Business: $40/user/month — https://cursor.com/pricing — verified 2026-05-23
- Enterprise: custom pricing — https://cursor.com/pricing — verified 2026-05-23

## GitHub Copilot

- Individual: $10/user/month (or $100/year) — https://github.com/features/copilot#pricing — verified 2026-05-23
- Business: $19/user/month — https://github.com/features/copilot#pricing — verified 2026-05-23
- Enterprise: $39/user/month — https://github.com/features/copilot#pricing — verified 2026-05-23

## Claude (Anthropic)

- Free: $0/month — https://anthropic.com/pricing — verified 2026-05-23
- Pro: $20/user/month — https://anthropic.com/pricing — verified 2026-05-23
- Max: $100/user/month — https://anthropic.com/pricing — verified 2026-05-23
- Team: $30/user/month (min 5 seats) — https://anthropic.com/pricing — verified 2026-05-23
- Enterprise: custom pricing — https://anthropic.com/pricing — verified 2026-05-23
- API direct: usage-based, no flat seat fee — https://anthropic.com/pricing — verified 2026-05-23

## ChatGPT (OpenAI)

- Free: $0/month — https://openai.com/chatgpt/pricing — verified 2026-05-23
- Plus: $20/user/month — https://openai.com/chatgpt/pricing — verified 2026-05-23
- Team: $30/user/month (min 2 seats) — https://openai.com/chatgpt/pricing — verified 2026-05-23
- Enterprise: custom pricing — https://openai.com/chatgpt/pricing — verified 2026-05-23
- API direct: usage-based, no flat seat fee — https://openai.com/api/pricing — verified 2026-05-23

## Anthropic API Direct

- Usage-based only, no flat subscription — https://anthropic.com/pricing — verified 2026-05-23
- Claude Sonnet 4: $3/M input tokens, $15/M output tokens (representative model)
- Tracked by spend, not seats

## OpenAI API Direct

- Usage-based only, no flat subscription — https://openai.com/api/pricing — verified 2026-05-23
- GPT-4o: $2.50/M input tokens, $10/M output tokens (representative model)
- Tracked by spend, not seats

## Gemini (Google)

- Gemini Advanced (individual): $19.99/month via Google One AI Premium — https://one.google.com/about/ai-premium — verified 2026-05-23
- Gemini for Google Workspace Business: $24/user/month (add-on) — https://workspace.google.com/products/gemini — verified 2026-05-23
- Gemini API: usage-based — https://ai.google.dev/pricing — verified 2026-05-23

## Windsurf (Codeium)

- Free: $0/user/month — https://codeium.com/windsurf/pricing — verified 2026-05-23
- Pro: $15/user/month — https://codeium.com/windsurf/pricing — verified 2026-05-23
- Teams: $35/user/month — https://codeium.com/windsurf/pricing — verified 2026-05-23
- Enterprise: custom pricing — https://codeium.com/windsurf/pricing — verified 2026-05-23

---

## Overlap / Redundancy Rules

These are the defensible rules the audit engine uses to flag redundant tool pairs. Each is justified for a finance-literate reader.

| Tool A | Tool B | Overlap | Reasoning |
|---|---|---|---|
| Cursor (any paid) | GitHub Copilot (any) | In-editor AI code completion | Both provide inline code suggestions and chat inside the editor. A team using both is paying twice for the same primary workflow. Keep the one with better plan-fit for team size. |
| ChatGPT Plus/Team | Claude Pro/Team | General-purpose AI chat + reasoning | Both serve the same use cases: writing, summarization, Q&A, coding help in chat. Teams rarely need both unless there is a specific model preference. Flag when both are paid. |
| ChatGPT Plus/Team | Gemini Advanced | General-purpose AI chat | Same overlap as above. Google Workspace users may get Gemini bundled — if so, ChatGPT Plus is redundant. |
| Cursor (any paid) | Windsurf Pro/Teams | In-editor AI code completion | Both are AI-first code editors with completion and chat. Running both simultaneously is unusual and almost always redundant. |
| Claude Pro/Team | Anthropic API direct | Anthropic model access | If a team is paying for Claude Pro seats AND running API spend, audit whether the API access covers their use cases — API is cheaper per token for high-volume coding workflows. |
| ChatGPT Team | OpenAI API direct | OpenAI model access | Same logic as above for OpenAI. Teams paying for ChatGPT Team AND API access should consolidate to whichever channel is cheaper for their actual usage pattern. |

## Plan Fit Rules

| Situation | Recommendation | Savings |
|---|---|---|
| Team plan with <5 seats (Claude Team requires min 5) | Downgrade to Pro × number of users | Difference between team rate and Pro rate |
| GitHub Copilot Business for a solo developer | Downgrade to Individual | $9/user/month |
| ChatGPT Team with 2 users | Acceptable (min 2 seats), but flag if usage is low | Consider Plus × 2 instead |
| Cursor Business for <5 users with no SSO need | Downgrade to Pro | $20/user/month |
