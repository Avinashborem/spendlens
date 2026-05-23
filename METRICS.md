# Metrics

## North Star Metric

**Audits completed per week.**

This is the right north star because SpendLens is a lead-generation tool for Credex — every completed audit is a potential converted lead. An audit started but abandoned has zero lead value. An audit completed means the user saw their result and potentially entered their email. All other metrics flow from this one.

Note: DAU would be wrong here. This is a tool people use once per quarter when they're reviewing budgets, not daily. Weekly audit completions captures the funnel at the right granularity.

---

## 3 Input Metrics That Drive the North Star

**1. Audit form start rate (visitors → form interactions)**
The percentage of visitors who interact with the form (add at least one tool). If this is low, the hero copy or the form's first impression isn't converting. Target: >40% of unique visitors start the form.

**2. Form completion rate (form starts → audit submitted)**
The percentage of users who start the form and submit it. If this drops, the form is too long, too confusing, or asking for information users don't have handy. Target: >60% of form starts complete submission.

**3. Email capture rate (audits completed → email entered)**
The percentage of users who, after seeing their result, enter their email. This is the lead generation event. Target: >20% of completed audits. This is the metric most directly tied to Credex revenue.

---

## What I'd Instrument First

1. **Supabase audit count** — already captured on every `/api/audit` call. Queryable as `SELECT COUNT(*), DATE_TRUNC('week', created_at) FROM audits GROUP BY 2 ORDER BY 2 DESC`. This is the north star.

2. **Supabase lead count** — already captured on every `/api/lead` call. Email capture rate = `leads / audits` per week.

3. **Form field drop-off** — which tool slot do users abandon at? Add a `field_abandoned` event (client-side, send to a `/api/analytics` endpoint or use Plausible goals) when users leave the page with a partially filled form. This tells us if the form length is the problem.

4. **Share link clicks** — track when the copy-link button is clicked (client-side event). Share rate = clicks / audits. A high share rate means the results page is compelling enough to forward.

5. **Source/UTM tracking** — add `utm_source` capture on the form submission so we know which channel (HN, Reddit, Twitter, direct) produces the highest audit completion rates, not just visit rates.

---

## Pivot Triggers

**Trigger 1 — Email capture rate <10% for 2 consecutive weeks**
If fewer than 1 in 10 users who complete an audit enter their email, the lead-gen value of the tool collapses. Action: A/B test showing the savings estimate before the email gate vs. fully behind it. Interview 5 users who didn't enter their email. If rate stays below 10% after iteration, consider removing the email gate entirely and relying on Credex CTA clicks instead.

**Trigger 2 — Audit form completion rate <30%**
Most users start but don't finish. The form is too long or asks for information they don't have. Action: Ship a "quick audit" mode — just 2 tools, no seat count required, instant estimate. If completion rate recovers, make quick mode the default.

**Trigger 3 — Zero Credex consultation bookings after 200 high-savings audits**
If users who see the Credex CTA (savings >$500/mo) never click through to book a consultation, the Credex value prop isn't landing. Action: Interview 5 users who saw the CTA. If the credit discount isn't compelling enough vs. just switching plans, the business model needs re-examination — SpendLens may have value as a standalone tool but not as a Credex funnel.

**Trigger 4 — <5% of completed audits show >$500/mo savings**
The Credex lead-gen hypothesis depends on users having significant spend. If most audits show minimal savings, either the target audience is wrong (too small, already optimized) or the audit engine is underestimating overlap. Action: Analyze the distribution of savings amounts in Supabase. If the median is <$100/mo, shift acquisition to target larger teams (30+ seats) where the dollar amounts are meaningful.
