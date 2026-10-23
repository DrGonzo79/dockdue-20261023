# DockDue

DockDue is a runnable detention-claim workflow for small US trucking fleets. It turns arrival/departure timestamps and broker terms into a claim amount, blocks incomplete packets, and exposes a day 0/7/14/30 follow-up queue.

The public demo uses fictional loads and simulated broker policies. No emails are sent and no live fleet system is connected. The FastAPI backend performs the real deterministic claim calculation, but is not publicly hosted.

## Run

```bash
npm ci && npm run dev
uv sync --project api --locked --dev
uv run --project api uvicorn api.main:app --reload
```

Try `LD-1048` for a ready claim and `LD-1051` for a blocked claim.

## Verify

```bash
npm run typecheck
npm run test:e2e
npm run build
npm audit --audit-level=high
uv run --project api pytest api/tests
```

## Map

- `app/` — responsive Next.js claim desk
- `lib/claim.ts` — typed claim calculation
- `data/demo_loads.json` — shared fictional fixtures
- `api/` — FastAPI calculation and integration tests
- `tests/` — interaction, state, screenshot, and mobile-overflow tests
- `research/notes.md` — derived source research
- `docs/` — product, architecture, score, review, and phased build prompts

Derived from the public IdeaBrowser Idea of the Day report dated October 23, 2026: https://www.ideabrowser.com/hub/ideas/today. Market figures are directional, not investment advice. GitHub Pages hosts only the static frontend.
