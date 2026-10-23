# CEO review

**Mode:** Scope reduction. The source proposes an always-on AI collections employee; the validated scope is a deterministic, evidence-gated claim desk plus manual recovery test.

## Nuclear challenge and alternatives

The real outcome is recovered cash, not claims generated. Doing nothing preserves a costly manual process but also avoids broker-relationship and compliance risk. The prototype reuses the prior factory's Next.js/FastAPI/test/deploy spine only; its domain operation, fixtures, interface, and tests are detention-specific.

| Approach | Effort | Risk | Verdict |
|---|---:|---:|---|
| Manual audit + three claim packets | S | Low | Best demand test; do first. |
| Evidence-gated claim desk | M | Medium | Build as product prototype. |
| Autonomous multi-system agent | XL | High | Defer until authorization, trust, and economics are proven. |

`Manual audit → current prototype → permissioned recovery ledger` is the coherent 12-month path. The prototype is useful only if it drives observed audits.

## 1. Architecture

Keep claim math deterministic and isolate extraction from eligibility. Production dependencies must fail closed. Rollback is disabling message jobs while preserving the claim ledger. The public demo intentionally has no backend dependency.

## 2. Error and rescue map

- `InvalidLoadId`: client blocks lookup and shows an example.
- `InvalidTimestampOrder`: domain/API reject; user must correct departure.
- `InvalidPolicyTerms`: API 422; no calculation.
- `MissingEvidence`: blocked state names exact documents; packet button disabled.
- Future `ExtractionTimeout` / `IntegrationUnavailable`: retain originals, mark manual review, never infer or send.
- Future `DuplicateSubmission`: idempotency key returns the existing claim.

## 3. Security and threat model

BOLs and rate confirmations contain sensitive commercial data. Production requires least-privilege tenancy, encryption, malware scanning, signed URLs, secret rotation, audit logs, deletion SLAs, and redaction. Prompt injection from documents cannot reach tools; extracted text is untrusted data. No secrets or real carrier data are in this repository.

## 4. Data and interaction edge cases

Validate nil, blank, malformed, negative, reverse, cross-time-zone, DST, >24-hour dwell, zero billable time, fractional rates, missing pages, duplicate uploads, stale terms, navigation mid-action, double-submit, and broker policy conflict. The demo covers malformed ID, missing proof, ready flow, disabled actions, and mobile overflow.

## 5. Code quality

The claim operation is pure, typed, and small. Fixture fields are explicit. Duplication between TypeScript and Python is acceptable for this deploy boundary but needs contract vectors before production. Avoid a generic “AI agent” abstraction until two integrations share behavior.

## 6. Tests

Current coverage: health, deterministic math, missing evidence, timestamp order, invalid terms, client validation, packet creation, chase state, blocked state, and mobile overflow. Gaps: cross-language contract vectors, DST/time zone handling, document extraction, persistence, idempotency, auth, and communication sandbox.

## 7. Observability

Production metrics: extraction failure/field accuracy, eligible and submitted claim dollars, acceptance/rejection by broker/reason, recovered dollars, review minutes, job lag, email bounce/opt-out, days-to-payment, and authorization revocations. Alert on cross-tenant access, send without approval, job backlog, and acceptance-rate collapse. Runbook first action: pause sends without pausing audits.

## 8. Database and state

Enforce tenant-scoped foreign keys, one active claim per load/policy version, immutable communication events, evidence hashes, and unique idempotency keys. Index tenant+state+next_action_at. Never overwrite extracted terms; version them with provenance.

## 9. API contract

The prototype exposes `POST /claims/calculate` with bounded fields and a typed response. Production needs `/v1`, auth, request IDs, idempotency, explicit timezone offsets, policy source/version, and structured error codes. Rate-limit uploads and calculations separately.

## 10. Performance and scale

Math is trivial. OCR, document storage, and partner imports dominate. At 10×, asynchronous extraction and per-tenant quotas suffice; at 100×, partition jobs, cap document size/pages, deduplicate hashes, and isolate outbound messaging. Never scale automation faster than review accuracy.

## 11. Design and UX

Hierarchy is amount → readiness → missing proof → next action. Ready and blocked states cannot rely on color alone. Controls expose focus, disabled state, and status text. Mobile turns the queue into a horizontal scroller and stacks evidence/claim details. Fictional data and simulated side effects are labeled at the top and footer.

## Decision summary

- **Strongest challenges:** no first-party authorization; trust/compliance around broker contact; incumbents can copy calculation.
- **Accepted:** deterministic calculator, proof gate, simulated packet, chase checklist, manual validation assignment.
- **Deferred:** OCR/LLM, real messages, persistence, integrations, payments, contingency operations.
- **Not in scope:** claiming live recovery, billable hosting, autonomous collections, legal advice.
- **Status:** DONE_WITH_CONCERNS—the build is appropriate as a validation artifact, not as evidence of a business.
