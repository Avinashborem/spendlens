# DEVLOG

## Day 1 — 2026-05-21

**Hours worked:** 4

**What I did:** Scaffolded Next.js 14 project with TypeScript and Tailwind. Installed all dependencies including shadcn/ui, Supabase, Resend, and Anthropic SDK. Created full folder structure with all required markdown files. Wrote TypeScript types for the entire audit domain. Built pricing data constants for all 8 tools. Implemented the core audit engine with per-tool logic for Cursor, GitHub Copilot, Claude, ChatGPT, and Windsurf, plus redundancy detection. Wrote 8 tests covering all major audit scenarios. Set up GitHub Actions CI — all checks green.

**What I learned:** How Next.js App Router folder structure works. How to set up vitest with path aliases for TypeScript. That shadcn/ui now uses Radix primitives differently in v4.

**Blockers / what I'm stuck on:** Need to set up Supabase and get API keys. Need to reach out to potential users for the required interviews.

**Plan for tomorrow:** Build the spend input form (MVP #1) with all 8 tools, plan selectors, seat counts, and localStorage persistence. Start Supabase setup and database schema.

---

## Day 2 — 2026-05-22

**Hours worked:** 8

**What I did:** Built the complete UI — landing page with hero section, SpendForm component with all 8 AI tools, plan selectors, seat counts, and localStorage persistence. Built the AuditResults page with per-tool breakdown, hero savings display, AI summary card, Credex CTA for high-savings cases, lead capture form, and shareable URL section. Built both API routes — /api/audit (runs audit engine, generates AI fallback summary, saves to Supabase) and /api/lead (captures email, saves to DB, sends Resend confirmation email). Set up Supabase client and admin client. Set up Resend email helper with high-savings conditional messaging. Full end-to-end flow works locally — form submission → audit results page with unique shareable URL. Deployed to Vercel (ran into account routing issue with bom1 error, switching to Netlify). Added Badge shadcn component that was missing. Fixed CSS globals for production build. All 8 tests still passing.

**What I learned:** Next.js App Router params are now Promises in Next.js 16 and need to be awaited. shadcn v4 uses a different init flow than v3. Vercel Hobby accounts can get stuck in broken routing states after Pro trial cancellation. The audit engine logic needs careful TypeScript typing to avoid runtime errors.

**Blockers / what I'm stuck on:** Vercel deployment routing broken (bom1 error) — switching to Netlify. Still need Anthropic API key for live AI summaries. Need to complete user interviews.

**Plan for tomorrow:** Get Netlify deploy working and live URL confirmed. Fill in all required markdown files (PRICING_DATA.md, ARCHITECTURE.md, GTM.md, ECONOMICS.md, LANDING_COPY.md, METRICS.md, PROMPTS.md). Start user interviews — need 3 real conversations.

---

## Day 3 — 2026-05-23

**Hours worked:** 6

**What I did:** Resolved Vercel deployment failure by switching to Netlify — added @netlify/plugin-nextjs and netlify.toml, deployed successfully to https://spendlens-credex.netlify.app. Added all environment variables to Netlify via the import UI (Supabase URL, anon key, service role key, Resend API key, updated app URL to production). Committed netlify.toml to the repo. Rewrote all required markdown files to match assignment spec exactly: PRICING_DATA.md with source URLs and verified dates for all 8 tools, ARCHITECTURE.md with Mermaid system diagram and data flow, GTM.md with specific target persona and 30-day first-100-users plan, ECONOMICS.md with Credex lead value model and $1M ARR path, LANDING_COPY.md with hero copy and 5-question FAQ, METRICS.md with north star and pivot triggers, PROMPTS.md with full AI summary prompt and iteration notes, REFLECTION.md answering all 5 required questions, README.md with 5 decisions section and quick start. Confirmed live URL loads correctly in browser.

**What I learned:** The assignment's ECONOMICS.md specifically asks about Credex lead value, not generic SaaS metrics — the framing matters. Environment variables in Netlify don't apply to existing deploys — must redeploy after setting them. Mermaid diagrams render inline on GitHub without any plugin, just need the ```mermaid code fence.

**Blockers / what I'm stuck on:** Still need Anthropic API key to enable live AI summaries (fallback template is working). Need to complete 3 real user interviews — have reached out to people, waiting on responses. Need to run Lighthouse on deployed URL and add screenshots to README.

**Plan for tomorrow:** Get Anthropic API key from console.anthropic.com and wire it up in the codebase and Netlify env vars. Complete 3 user interviews. Run Lighthouse audit on https://spendlens-credex.netlify.app and fix any score below threshold. Take 3 screenshots of the live app and add to README.

---

## Day 4 — 2026-05-24

**Hours worked:** 3

**What I did:** Verified Open Graph and Twitter Card meta tags are correctly implemented on shareable audit result pages — title and description dynamically pull real savings numbers from Supabase. Added .env.example file so the repo is self-documenting for setup. Ran Lighthouse audit on deployed URL — Performance 95, Accessibility 94, Best Practices 100, SEO 91, all above required thresholds. Fixed button text visibility issue on submit and lead capture buttons (text-white class missing from shadcn Button override). Confirmed all 8 tests still passing and CI green.

**What I learned:** Next.js generateMetadata with async params works cleanly for dynamic OG tags — the savings number renders correctly in link previews. shadcn Button component requires explicit text-white when overriding background color, it doesn't inherit from the default variant.

**Blockers / what I'm stuck on:** Need to verify the AI summary is generating correctly on the live URL with the new Anthropic API key. Anthropic account has $0 balance so API calls will fail gracefully to fallback — documenting this clearly.

**Plan for tomorrow:** Final review of all markdown files. Run the git log day check. Prepare submission form response. Do a full end-to-end test on the live URL.
---

## Day 5 — YYYY-MM-DD

**Hours worked:**

**What I did:**

**What I learned:**

**Blockers / what I'm stuck on:**

**Plan for tomorrow:**

---

## Day 6 — YYYY-MM-DD

**Hours worked:**

**What I did:**

**What I learned:**

**Blockers / what I'm stuck on:**

**Plan for tomorrow:**

---

## Day 7 — YYYY-MM-DD

**Hours worked:**

**What I did:**

**What I learned:**

**Blockers / what I'm stuck on:**

**Plan for tomorrow:** Submitted.
