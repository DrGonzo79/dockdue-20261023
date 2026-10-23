"use client";

import { useMemo, useState } from "react";
import fixture from "@/data/demo_loads.json";
import { calculateClaim, type LoadInput } from "@/lib/claim";

export default function Home() {
  const [selectedId, setSelectedId] = useState("LD-1048");
  const [customId, setCustomId] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const selected = fixture.loads.find((load) => load.id === selectedId) as LoadInput;
  const result = useMemo(() => calculateClaim(selected), [selected]);

  function findLoad(event: React.FormEvent) {
    event.preventDefault(); setError(""); setSent(false);
    const normalized = customId.trim().toUpperCase();
    if (!/^LD-\d{4}$/.test(normalized)) { setError("Use a load ID like LD-1048."); return; }
    if (!fixture.loads.some((load) => load.id === normalized)) { setError("That load is not in this fictional demo fleet."); return; }
    setLoading(true);
    window.setTimeout(() => { setSelectedId(normalized); setSubmittedId(normalized); setCompleted([]); setLoading(false); }, 350);
  }

  function generatePacket() {
    if (result.readiness !== "ready") return;
    setSent(true); setCompleted((days) => days.includes(0) ? days : [...days, 0]);
  }

  return <main>
    <header className="topbar"><a className="brand" href="#top"><span>DD</span>DockDue</a><div className="demo-pill">Fictional fleet · simulated claims</div></header>
    <section className="hero" id="top"><div><p className="eyebrow">DETENTION RECOVERY DESK</p><h1>Turn dock time<br/>into <em>money due.</em></h1><p className="lede">Calculate detention, catch missing proof, and create a broker-ready follow-up schedule before a valid claim goes cold.</p></div><form className="lookup" onSubmit={findLoad} noValidate><label htmlFor="load-id">Open a demo load</label><div className="input-row"><input id="load-id" value={customId} onChange={(event) => setCustomId(event.target.value)} placeholder="LD-1048"/><button disabled={loading}>{loading ? "Checking…" : "Check claim"}</button></div><small>Try LD-1048 (ready), LD-1051 (missing rate confirmation), or LD-1057.</small>{error && <p className="error" role="alert">{error}</p>}{submittedId && !loading && <p className="success" role="status">Loaded {submittedId}.</p>}</form></section>
    <section className="workspace" aria-label="Detention claims workspace"><aside><p className="section-label">DEMO LOAD QUEUE</p>{fixture.loads.map((load) => { const preview = calculateClaim(load as LoadInput); return <button key={load.id} className={`load-tab ${load.id === selectedId ? "active" : ""}`} onClick={() => { setSelectedId(load.id); setSent(false); setCompleted([]); }}><span>{load.id}</span><small>{load.broker}</small><b>${preview.claimAmount.toFixed(0)}</b></button>; })}</aside><div className="panel">
      <div className="panel-head"><div><p className="section-label">{selected.broker} · {selected.facility}</p><h2>{selected.id} claim desk</h2></div><div className={`amount ${result.readiness}`}><span>estimated claim</span><strong>${result.claimAmount.toFixed(0)}</strong></div></div>
      <div className="metrics"><div><span>Total dwell</span><strong>{Math.floor(result.dwellMinutes/60)}h {result.dwellMinutes%60}m</strong></div><div><span>Free time</span><strong>{selected.freeMinutes/60}h</strong></div><div><span>Billable</span><strong>{result.billableMinutes} min</strong></div><div><span>Rate</span><strong>${selected.ratePerHour}/hr</strong></div></div>
      <div className="split"><section className="proof"><h3>Proof check</h3>{[["Signed BOL",selected.bol],["Rate confirmation",selected.rateCon],["GPS timestamps",selected.gps]].map(([label,present]) => <div className={present ? "ok" : "missing"} key={String(label)}><span>{present ? "✓" : "!"}</span><b>{String(label)}</b><small>{present ? "Attached" : "Required before sending"}</small></div>)}</section><section className="claim-card"><div><h3>{result.readiness === "ready" ? "Ready to file" : "Claim blocked"}</h3><p>{result.readiness === "ready" ? `All evidence is present for a simulated $${result.claimAmount.toFixed(0)} claim.` : `Missing: ${result.missing.join(", ")}. Add this evidence before contacting the broker.`}</p></div><button onClick={generatePacket} disabled={result.readiness !== "ready" || sent}>{sent ? "Packet created" : "Create claim packet"}</button>{sent && <p className="success" role="status">Demo claim packet created. Nothing was sent.</p>}</section></div>
      <section className="timeline"><div><p className="section-label">BROKER CHASE</p><h3>Follow-up schedule</h3></div>{result.timeline.map((step) => <button key={step.day} disabled={!sent} aria-pressed={completed.includes(step.day)} onClick={() => setCompleted((days) => days.includes(step.day) ? days.filter((day) => day !== step.day) : [...days, step.day])}><span>DAY {step.day}</span><b>{step.label}</b><i>{completed.includes(step.day) ? "Done" : sent ? "Mark done" : "Create packet first"}</i></button>)}</section>
    </div></section>
    <footer><span>DockDue prototype</span><span>Demo only · No broker messages are sent · Python API is source-only</span></footer>
  </main>;
}
