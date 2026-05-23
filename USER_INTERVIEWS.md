# User Interviews

Three conversations with potential users, conducted over WhatsApp chat in May 2026. Participants are students and developers in my network who use AI tools regularly.

---

## Interview 1

**Participant:** M.V.R., CSE AIML final year student, SR University. Actively building personal dev projects alongside studies.
**Date:** May 2026
**Format:** WhatsApp chat

**Tools they use:** ChatGPT (free) — for coding help, learning new concepts, and getting unstuck on projects.

**Direct quotes:**
- "ChatGPT feels worth it because I use it almost every day. It helps me with coding, learning, and project work."
- "No, not really. Since I mostly use free tools, I've never actually calculated how much I spend overall."
- "Sometimes it gets confusing to figure out which AI tools are actually worth using and provide good value."

**The most surprising thing:** He uses AI every single day and is actively building projects, but has never once thought about his total AI spend or which tool is actually best for his workflow. The confusion isn't about cost — it's about which tool is even worth trying. He's making tool decisions completely blindly.

**What it changed about the design:** Made me realize SpendLens needs to serve users who haven't started paying yet, not just teams overspending. The "you're spending well" message for zero-spend users feels dismissive — it should instead say "here's the best tool for your use case given what you told us." The audit engine's zero-savings path needs a recommendation, not just a confirmation.

---

## Interview 2

**Participant:** S.K., undergraduate student, uses AI tools for studying, coding help, and project ideation.
**Date:** May 2026
**Format:** WhatsApp chat

**Tools they use:** ChatGPT (free), Gemini (free), Claude (free) — rotates between them depending on the task.

**Direct quotes:**
- "The free versions are enough for most of my work, so I don't really feel the need for many subscriptions."
- "Yes, I would use it if it was easy to use and didn't ask for too much personal information."
- "Sometimes the pricing plans and feature limits are confusing, especially when different tools offer almost the same things."

**The most surprising thing:** She uses three different AI tools but has never paid for any of them — yet she still finds the pricing pages confusing. She's not a paying customer but she's already feeling the friction of figuring out what's different between tools. The confusion is a pre-purchase problem, not a post-purchase one.

**What it changed about the design:** The trust signal "no login required" on the landing page matters more than I thought — she explicitly said she'd only use it if it didn't ask for too much personal information. Reinforced the decision to show results before asking for email. Also made me think the tool comparison angle ("these tools basically do the same thing") is a stronger hook than the savings angle for student users.

---

## Interview 3

**Participant:** R.T., developer/student, uses multiple AI tools casually across different workflows.
**Date:** May 2026
**Format:** WhatsApp chat

**Tools they use:** ChatGPT (free), Gemini (free, as backup), GitHub Copilot (tried once), Claude (free, for long-form answers). No paid subscriptions.

**Direct quotes:**
- "I do feel some tools are overhyped. A lot of them basically do the same thing with different branding."
- "If I start calculating every subscription in life, I'll get stressed for no reason. Thankfully AI tools aren't part of that list for me yet."
- "The most annoying thing is how every AI tool suddenly wants a monthly subscription. Like why does everything need a premium plan now."
- "You think something is free and then suddenly it's 'limited access.' Also the pricing pages are confusing on purpose sometimes."

**The most surprising thing:** He would use SpendLens specifically to check if two tools are doing the same thing — not to save money, but to justify not paying for both. The overlap detection feature ("these tools are redundant") resonated more than the savings number. He also had the sharpest trust filter: "the second a tool starts asking weird permissions, I'm out." He'd close the tab immediately if anything felt sketchy.

**What it changed about the design:** The redundancy detection message needs to be the headline feature on the results page, not just a line item. "You're paying for the same thing twice" is more viscerally useful than "$40/month savings." Also hardened the decision to never ask for permissions beyond email — no OAuth, no account creation, nothing that looks like surveillance. The honeypot-only abuse protection approach is right for this audience.

---

## Patterns Across All 3 Interviews

| Theme | Count |
|---|---|
| Uses only free AI tools currently | 3/3 |
| Never calculated total AI spend | 3/3 |
| Confused about what's different between tools | 3/3 |
| Would use SpendLens if easy and low-friction | 3/3 |
| Privacy / "don't ask for too much info" as trust signal | 2/3 |
| Overlap detection more compelling than savings number | 2/3 |
| Annoyed by subscription creep across all software | 2/3 |

## Key insight

All three participants are pre-paying users — they haven't started paying for AI tools yet. This was unexpected. It means SpendLens has a secondary audience beyond "teams overspending": individuals who are about to start paying and want to make the right first choice. The "you're spending well / here's what to use" path for zero-savings audits matters more than originally thought.
