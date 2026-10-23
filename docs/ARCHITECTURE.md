# Architecture

```text
Fictional fixture / future operator input
          │
          ▼
Next.js claim desk ── calculateClaim() ── readiness + chase UI
          │ future HTTPS (not used by Pages demo)
          ▼
FastAPI /claims/calculate ── validated deterministic rules
          │
          ├── future Postgres claim ledger
          ├── future object storage evidence
          └── future job queue (human-approved follow-ups)
```

The static frontend and backend implement the same bounded domain operation: timestamp validation, free-time subtraction, billing-increment rounding, claim value, and evidence readiness. Shared JSON demo fixtures make the experience explicit and reproducible. GitHub Pages serves only the frontend.

## Four data paths

1. **Happy:** valid timestamps + positive terms + all evidence → amount and ready state.
2. **Nil/invalid:** malformed load ID or timestamps → named validation message / HTTP 422.
3. **Empty/incomplete:** no billable dwell or missing evidence → blocked claim, no packet creation.
4. **Upstream failure:** production OCR/TMS failure → preserve original input, show extraction failure, require manual terms; never send.

## Boundaries

The browser demo has no persistence, auth, network request, secrets, or broker side effect. A production system needs tenant isolation, encrypted evidence, signed authorizations, idempotency keys, immutable communication audit events, retention/deletion, rate limits, and a jurisdiction-specific review of collections activity.
