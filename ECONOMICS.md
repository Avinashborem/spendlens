# Unit Economics

## What a Converted Lead Is Worth to Credex

Credex sells discounted AI infrastructure credits. A typical deal: a 20-person engineering team currently paying $800/month retail for AI tools (Cursor Business + Claude Team + GitHub Copilot Business) switches to Credex credits and pays $560/month — a 30% discount. Credex's margin on credits is approximately 15–25% (sourced from overforecast inventory).

**Per-customer math:**
- Team monthly spend: $800/month retail
- Credex price: $560/month (30% discount)
- Credex revenue: $560/month
- Credex gross margin (~20%): $112/month
- Annual gross profit per customer: $1,344

A 20-seat team that stays for 18 months generates ~$2,000 in gross profit. This is the value of one converted lead.

For a 50-seat team (not uncommon at Series B): $5,000+ gross profit over 18 months.

**Conservative blended LTV per converted lead: $1,500**

## CAC at Each GTM Channel

| Channel | Estimated CAC | Basis |
|---|---|---|
| Show HN | $0 | Organic, time cost only |
| Reddit | $0 | Organic, time cost only |
| Cold DM on X | $0 | Organic, time cost only |
| Dev newsletter mention | $0–200 | Some newsletters charge for listings |
| Existing Credex customers (warm email) | $0 | Already owned channel |
| LinkedIn paid ads | $150–400/lead | B2B LinkedIn CPL benchmarks |
| Google Ads (intent keywords) | $80–200/lead | "AI tool cost calculator" keywords |

At $0 CAC for organic channels and $1,500 LTV: LTV:CAC is effectively infinite for the first 100 customers.

## Conversion Funnel Math

```
Visitors:                    1,000
Audits completed (8%):          80
Emails captured (20%):          16
Consult booked (15%):            2.4
Credit purchase (60%):           1.4

Revenue per visitor: $1,500 × 1.4 / 1,000 = $2.10
```

For this to be profitable with paid acquisition at $100 CAC, SpendLens needs:
- Audit completion rate ≥ 8%
- Email capture rate ≥ 20%
- Consult-to-purchase rate ≥ 60%

The email capture rate is the highest-leverage number. Moving it from 20% to 30% increases revenue per visitor by 50%. This is why the results page design matters — it's a conversion page, not just a display page.

## What Would Have to Be True for $1M ARR in 18 Months

Credex's revenue on a $1M ARR base (at 20% gross margin) = $200k gross profit. Working backward:

**Path A — High-volume, lower ACV:**
- 667 customers at $125/month average credit purchase
- Requires: 667 / 18 months = 37 new customers/month
- At 1.4% audit-to-customer conversion: 2,600 audits/month needed
- At 80 audits per 1,000 visitors: 32,500 visitors/month
- Achievable with: HN front page 2x + consistent Reddit presence + newsletter mentions

**Path B — Lower-volume, higher ACV:**
- 100 customers at $833/month (50-seat teams)
- Requires: 100 / 18 months = 6 new enterprise customers/month
- More achievable via Credex's existing customer warm outreach
- Each enterprise deal requires a consultation call — bottleneck is sales capacity

**Most realistic path:** Hybrid. Organic channels feed a self-serve funnel for 10–30 seat teams. Credex's existing customer list feeds enterprise deals. At month 18: 400 self-serve customers ($200/mo avg) + 50 enterprise customers ($800/mo avg) = $80k + $40k = $120k MRR = $1.44M ARR.

**Key assumption that has to be true:** Credex's credit discount is real and substantial enough that a warm lead who sees a $600/month savings estimate converts to a consultation at 15%+. If the discount isn't compelling at the comparison stage, the funnel breaks at the bottom.

## Infrastructure Cost at Scale

| Scale | Monthly infra cost | Gross profit per customer needed to break even |
|---|---|---|
| 0–100 audits/day | ~$1 | N/A (nearly free) |
| 1k audits/day | ~$65 | $65 / customers |
| 10k audits/day | ~$400 | $400 / customers |

Infrastructure is never the constraint. Sales and conversion rate are.
