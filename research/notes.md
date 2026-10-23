# Source notes — detention recovery agent

- **Report date:** 2026-10-23
- **IdeaBrowser title:** Software that recovers money trucking fleets lose at loading docks
- **Public URL:** https://www.ideabrowser.com/hub/ideas/today
- **IB Index:** 7.5
- **Revenue potential:** $8M–$15M ARR ceiling; year-one report range is $60K–$140K, while the report's aggressive 90-day model reaches ~$320K ARR run rate.
- **Difficulty / capital / first revenue:** Moderate; $5K–$25K; 60–90 days.

## Customer and status quo

The target is a 5–100 truck US carrier, especially refrigerated or spot-market operators, where an owner, dispatcher, or small back office already has signed BOLs, rate confirmations, GPS/ELD timestamps, and broker contact history scattered across systems. The team manually checks dwell, files accessorial paperwork, calls or emails repeatedly, and often abandons a $150–$300 claim.

The report anchors pain with ATRI's 2024 study: 94.5% of surveyed fleets charge detention but fewer than half of detention invoices are paid, contributing to an estimated $3.6B in direct unrecovered expense in 2023. It cites 135M detained hours, 39.3% of stops affected, and 117–209 detained hours per driver annually depending on segment. These are strong industry-level signals, not proof that DockDue will recover a given claim.

## Wedge, why now, and market gap

The gap is not timestamp collection alone. Multiple tools draft a charge; small carriers still give up during the broker chase. The narrow wedge is an evidence-gated claim packet plus visible day 7/14/30 follow-up sequence. The full vision is an always-on collections employee that reads documents, applies rate-con terms, files, and follows up without requiring a full TMS migration.

Why now: average dwell reportedly increased 11 minutes year over year to 1h49 per stop in 2025; Congress and FMCSA are examining detention; freight AI agents have moved into production. The report cites HappyRobot's August 2026 $150M Series C at a $1.2B valuation, 30+ C.H. Robinson agents across 3M+ shipment tasks, and Chain's 3M loads across 80+ brokerages. Those prove agent adoption in freight operations, not carrier-side collections demand.

## Competitor map

- **ChargeGuard:** direct detention recovery for 5–150 truck carriers; manual driver start/stop and broker-specific free-time rules; stops at submission-ready claims.
- **DwellWatch:** ELD-based detection across many integrations, live broker notices, drafted invoices.
- **DockClaim / DMRG:** mobile-first logging, GPS, BOL capture, and notifications.
- **OTR Solutions:** detention assistance bundled with freight factoring.
- **Detention Source:** enterprise facility wait-time data and benchmarking.
- **Navix:** AI freight audit/payment workflows, including broker-side detention overcharge detection.
- **Dispatch services:** human follow-up bundled into a 5–10% gross-revenue service.

Incumbent risk is concentrated: a factoring company, TMS, Navix, or ChargeGuard can add follow-up. Trust and broker relationships—not the calculation—are the defensible work.

## Demand, pricing, offer ladder, GTM

The report supplies carrier and broker complaints from Reddit, TruckersReport, and Trustpilot about ignored messages, missing revised rate sheets, denied detention, and repetitive follow-up. Solution-search volume is reported as effectively zero, so SEO is not a credible first channel.

Offer ladder:
1. Free 90-day detention audit.
2. Back-claim recovery at 20% of recovered cash for claims older than 60 days.
3. Always-on agent at $99/truck/month.
4. Fleet operations add-ons at $29–$79/truck/month.

GTM should begin with 3–5 factoring or dispatch partners, operator-led teardown content in carrier communities, and a manual audit. The report's 90-day model assumes 180 community comments, 70 audits, 25% audit-to-paid conversion, 18 fleets × 15 trucks × $99 = $26,730 MRR, plus $15K contingency revenue. Seven of eleven inputs are assumptions; conversion and partner access are unproven.

## Biggest risks

Zero solution-search demand; carrier distrust of an outsider touching broker relationships; contingency work being treated as debt collection; rejected claims due to rate-con language or weak evidence; broker retaliation fears; incumbent bundling; document privacy; and unit economics if claims require human review. A founder without freight operations or factoring expertise has a material credibility deficit.

## Prototype decision

Build the deterministic core: calculate billable dwell under explicit demo terms, surface missing evidence, generate a clearly simulated claim packet, and activate the chase timeline. Do not simulate autonomous document extraction, broker communication, payment recovery, or a deployed backend.

## Source domains named in the report

ATRI / truckingresearch.org, Transport Topics, FreightVero, Tenfold AI research, FMCSA / transportation.gov, Reddit, TruckersReport, Trustpilot, ChargeGuard, DwellWatch, DockClaim, DMRG, OTR Solutions, Detention Source, Navix, and FF Dispatch. Claims should be revalidated against primary sources before commercial use.
