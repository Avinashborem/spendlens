# Reflection

## 1. The hardest bug you hit this week, and how you debugged it

The hardest bug was the Vercel deployment routing failure — every URL on the deployed app, including the homepage, returned a bom1 routing error. The build succeeded cleanly, TypeScript compiled without errors, and the app worked perfectly on localhost. But every route on the live URL was broken.

My first hypothesis was a misconfigured `next.config.ts` — I checked output modes, trailing slash settings, and basePath. Nothing. Second hypothesis: the build output was wrong for Vercel's edge network. I checked the build logs carefully — `.next` directory was generated correctly, all routes were listed. Third hypothesis: account-level routing issue. I found references to Vercel Hobby accounts getting stuck in broken routing states after Pro trial cancellation, which matched my situation exactly.

I tried: redeploying from scratch, deleting and recreating the project, checking the team/account settings, clearing build cache. None of it worked. The error persisted on every new deploy.

What finally worked: abandoning Vercel entirely and switching to Netlify. I added `@netlify/plugin-nextjs` and a `netlify.toml` with the correct publish directory. The same codebase deployed and worked on the first try. Total time lost: about 90 minutes.

The lesson was about recognizing when a problem is environmental rather than code-related. The moment I started suspecting "this is a platform issue, not my bug," I should have moved faster to the alternative. I kept trying to fix something that wasn't mine to fix.

## 2. A decision you reversed mid-week, and what made you reverse it

I initially planned to build the audit engine using an LLM for the core recommendation logic — send the user's tool list to Claude and have it generate the analysis dynamically. My reasoning was that it would handle edge cases better and feel more personalized.

I reversed this completely after re-reading the assignment brief carefully. It says explicitly: "For the audit math itself, hardcoded rules are correct — knowing when not to use AI is part of the test." That sentence reframed the whole thing. The assignment is testing whether I understand when AI adds value and when it introduces unnecessary complexity, latency, and cost.

Hardcoded rules are better for the audit engine because: the logic is deterministic and auditable (a finance person can verify the reasoning), it's instant (no API latency on the critical path), it's free to run at scale, and it can't hallucinate a fake savings number. The one place AI genuinely adds value — the personalized summary paragraph — is exactly where I kept it.

Reversing this decision also forced me to write cleaner overlap detection logic, which ended up being more testable. The 8 tests I wrote cover the rule engine directly, which wouldn't have been possible with a black-box LLM approach.

## 3. What I would build in week 2

The clearest week-2 priority is **billing API integration** — instead of asking users to manually enter their monthly spend, connect directly to their Stripe receipts, credit card statements, or vendor billing portals. Every user I spoke to during interviews mentioned that manual entry is friction. One said "I'd use this more if it just read my receipts." This single feature would dramatically improve data accuracy and reduce abandonment on the input form.

Second priority: **continuous monitoring with monthly email digests**. Right now SpendLens is a one-time audit. The value compounds if it runs monthly and alerts you when something changes — a new team member added to an expensive plan, a price increase from a vendor, or a new tool launched that's cheaper than what you're using. This turns a free tool into a retained product with a reason to come back.

Third: **team collaboration** — let multiple people contribute tool entries to one audit. Right now one person has to know the whole stack. In reality, different people own different tools. A shared audit URL that teammates can edit before submitting would match how spend decisions actually get made.

Fourth: **benchmark mode** — "your AI spend per developer is $X, companies your size average $Y." This was requested unprompted by two of the three people I interviewed. It adds social comparison pressure that makes the savings feel more real.

## 4. How I used AI tools

I used Claude (Sonnet) as my primary development assistant throughout the week, Cursor for in-editor completions, and ChatGPT occasionally for second opinions on architectural decisions.

**What I used AI for:** Scaffolding the initial Next.js project structure, writing the shadcn/ui form components (the plan-selector dropdown that updates reactively based on tool selection took two iterations to get right), generating the Supabase schema SQL, writing the Resend email template HTML, and drafting the markdown documentation files.

**What I didn't trust AI with:** The audit engine's overlap rules and savings calculations. I wrote those by hand because correctness matters — a wrong savings number would undermine the entire product's credibility. I also didn't trust AI-generated test cases; I wrote those manually to ensure they actually covered the logic I cared about, not the logic that was easiest to test.

**One specific time the AI was wrong:** When I asked Claude to help set up vitest with TypeScript path aliases, it generated a `vitest.config.ts` that referenced `@vitejs/plugin-react` but didn't include it in the install command. The config looked correct and I didn't catch it until the test run failed with a module-not-found error. The fix was trivial (one `npm install`), but it was a good reminder that AI-generated setup instructions often miss a dependency that the author assumed was already present. I now always run AI-generated install sequences in a clean directory to catch these.

## 5. Self-ratings

**Discipline: 6/10** — I front-loaded heavily on Days 1 and 2 and let Day 3 become a documentation and deployment day rather than a feature day. The commit history shows this unevenness. I should have paced the feature work more deliberately across the week.

**Code quality: 7/10** — The TypeScript types are clean, the audit engine is well-separated from the API layer, and the components are reasonably composable. I'd dock points for the API routes being longer than I'd like and for not adding error boundary components to the UI.

**Design sense: 7/10** — The results page is visually clear and the savings hero number is prominent. The form is functional but plain. I didn't invest enough in the micro-interactions — hover states, loading skeletons, empty states — that separate a polished product from a functional one.

**Problem-solving: 8/10** — The Vercel-to-Netlify pivot was fast once I correctly diagnosed the problem as environmental. The decision to use hardcoded rules for the audit engine rather than LLM was the right call and I made it quickly after re-reading the brief.

**Entrepreneurial thinking: 7/10** — I identified a real pain point, validated it with three actual user conversations, and built something that creates immediate quantifiable value. I'd give myself a higher score if I'd done the user interviews before building rather than after — the right order is talk first, build second.
