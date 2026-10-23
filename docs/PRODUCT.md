# Product plan

## ICP and JTBD

Start with US refrigerated or spot-market carriers operating 5–30 trucks, one dispatcher/back-office generalist, ELD timestamps, and recurring detention. **JTBD:** “When a truck leaves a slow dock, assemble a defensible claim and keep chasing it so recoverable cash does not disappear into my inbox.”

## MVP

One load at a time: ingest explicit arrival/departure timestamps and rate terms, calculate billable dwell, require BOL/rate-con/GPS proof, create a claim packet, and schedule day 7/14/30 follow-up. No autonomous email, OCR, TMS integration, payment handling, or legal conclusions in the first validation.

## Data model

- Fleet → trucks, users, broker permissions.
- Load → broker, facility, timestamps, shipment status.
- Policy → free time, rate, increment, source rate confirmation.
- Evidence → BOL, rate confirmation, GPS/ELD event, provenance.
- Claim → amount, readiness, state, submission timestamp.
- Chase event → scheduled date, channel, outcome, next action.
- Recovery → approved amount, paid amount/date, dispute reason.

## Architecture and AI strategy

Use Next.js for the operator desk, FastAPI for deterministic domain rules, Postgres/object storage for production records, and a queue for follow-ups. An LLM may extract candidate terms from documents and draft communications, but never decides eligibility or sends without rule validation and human approval. Store extracted field provenance and confidence. OCR/LLM failure falls back to manual entry.

## Economics

Test a free 90-day audit, then 20% of recovered aged claims. Only after observed retention test $99/truck/month for always-on monitoring. Track recovered dollars per review minute, claim acceptance rate, days-to-payment, gross margin after human exception handling, and partner CAC. The report's 25% audit conversion and partner volume are assumptions, not targets to report as facts.

## Validation

Within 30 days: observe five dispatchers, audit 200 historical loads, obtain three data authorizations, identify at least $5K in defensible claims, and secure one contingency agreement. Kill or reframe if fewer than 10% of reviewed detained loads produce a document-complete claim, no partner grants access, or carriers refuse authorization because of broker relationship risk.

## Moat

Potential moat is a permissioned, outcome-linked corpus of broker policy interpretations, evidence patterns, rejection reasons, follow-up paths, and partner distribution. UI and claim math are not a moat. Do not claim network effects until the data improves acceptance or time-to-payment.

## Risks

Incorrect policy interpretation, missing evidence, data sensitivity, unauthorized communication, debt-collection classification, broker retaliation, integration drift, low claim values, long payment cycles, human-review cost, and incumbent bundling. Require explicit authorization, audit logs, retention controls, manual approval, and qualified legal review before live sending.

## 30 / 60 / 90 days

- **30:** five workflow observations, manual audits, policy schema, one contingency pilot.
- **60:** evidence-gated claim desk, human-approved messages, recovery outcome tracking, one partner cohort.
- **90:** prove acceptance and gross margin; only then add one ELD/TMS connector and test flat per-truck pricing.
