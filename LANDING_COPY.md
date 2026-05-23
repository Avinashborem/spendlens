# Landing Page Copy

## Hero

**Headline (≤10 words):**
> Is your team overspending on AI tools?

**Subheadline (≤25 words):**
> Enter your subscriptions, get an instant audit — where you're overspending, what to switch, and how much you'd save.

**Primary CTA:**
> Run My Free Audit →

**Trust line (below CTA):**
> Free — no login required. Results are instant.

**Tool trust strip:**
> ✓ Cursor ✓ Claude ✓ ChatGPT ✓ GitHub Copilot ✓ Gemini ✓ Windsurf ✓ More

---

## Social Proof Block

> *(Mocked — replace with real quotes post-launch. Mark as mocked when submitting.)*

> "We were paying for Cursor Business, GitHub Copilot, and ChatGPT Team simultaneously. SpendLens showed us we could cut $420/month in under 3 minutes."
> — *S.R., Engineering Manager, Series A SaaS startup (mocked)*

> "Sent the report link to our CTO before the budget meeting. Saved 20 minutes of explanation."
> — *A.P., Senior Developer, 25-person team (mocked)*

> "I didn't realize our 2-person team was on Claude Team (requires 5 seats minimum). Switched to Pro × 2 and saved $100/month immediately."
> — *M.K., Founder, early-stage startup (mocked)*

**Stats (mocked — replace with real Supabase query post-launch):**
- 1,400+ audits run *(mocked)*
- $2.8M in potential savings identified *(mocked)*
- Average team saves $310/month *(mocked)*

---

## FAQ

**Q: Is this actually free? What's the catch?**
The audit is completely free, no login required, no credit card, no trial. You enter your tools, you get your results instantly. We optionally capture an email after showing you the results — never before. The business model is that SpendLens is a lead-generation tool for Credex, which sells discounted AI infrastructure credits. If your audit shows significant savings, Credex is surfaced as one option. There's no obligation.

**Q: How accurate are the savings estimates?**
The pricing data is pulled from official vendor pricing pages and verified at submission. The savings calculations are conservative — we only flag overlap when tools genuinely duplicate functionality for your stated use case, and we calculate savings at 70% of the redundant cost (not 100%) to account for partial overlap and transition costs. A finance person reading your report should be able to follow the reasoning on every line.

**Q: Do you store my data? Who can see my report?**
Your audit result is stored in our database so the shareable link works. The public shareable URL strips your email address and company name — only tool names, plans, team size, and savings numbers are shown. We don't sell your data and don't share it with third parties except Resend (for sending your report email) and Supabase (our database host).

**Q: What is Credex and why does it appear on some reports?**
Credex sources discounted AI infrastructure credits from companies that overforecast usage or pivoted. For teams with significant savings opportunities (>$500/month), we surface Credex as a way to capture additional savings beyond switching plans. This is clearly labeled in the report. There's no obligation to use Credex — it's one option among others.

**Q: My tools aren't all listed — what do I do?**
The current version supports the 8 most common AI tools used by dev teams: Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, and Windsurf. If you're paying for something else, you can still enter your total monthly spend and team size to get a baseline audit. We're adding tools based on what users request most — email hello@spendlens.com with your request.

---

## Results Page Copy

**Savings banner (positive):**
> 💰 Your team could save **$[X]/month** — that's **$[Y]/year**

**No savings found:**
> ✅ Your AI stack looks well-optimized. No major redundancies detected for your use case.
> *Want to be notified when new optimizations apply to your stack?*

**Recommendations header:**
> What to do about it

**Per-tool recommendation format:**
> **Cut [Tool B]** — You're paying for [Tool A] and [Tool B], which both provide [overlap description] for [use case] teams. Keeping [Tool A] saves **$[Z]/month** ($[Z×12]/year). [One sentence of reasoning.]

**Credex CTA (shown when savings >$500/mo):**
> Capture even more savings with Credex
> Credex offers discounted AI credits for Cursor, Claude, ChatGPT Enterprise, and more — sourced from companies that overforecast. Teams your size typically save an additional 20–30% on top of these plan optimizations.
> [Book a free Credex consultation →]

**Share section:**
> 📎 Share this audit
> Send this link to your manager or finance team — it doesn't require login to view.
> [Copy link]

**Lead capture:**
> Get this report by email
> We'll send a clean summary — no spam, ever.
> [Email input] [Optional: Company, Role] [Send Report →]

---

## Email Subject Lines (Resend)

- Confirmation (high savings): `Your SpendLens audit — $[X]/mo savings identified`
- Confirmation (low savings): `Your SpendLens audit — your stack looks good`
- Follow-up (day 7, optional): `Did you act on your AI spend audit?`
