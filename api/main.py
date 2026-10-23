from datetime import datetime
from typing import Literal
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="DockDue API", version="1.0.0")

class Evidence(BaseModel):
    bol: bool
    rate_con: bool
    gps: bool

class ClaimRequest(BaseModel):
    load_id: str = Field(pattern=r"^LD-[0-9]{4,}$", max_length=30)
    arrival: datetime
    departure: datetime
    free_minutes: int = Field(ge=0, le=1440)
    rate_per_hour: float = Field(gt=0, le=1000)
    billing_increment_minutes: int = Field(gt=0, le=120)
    evidence: Evidence

class ClaimResponse(BaseModel):
    load_id: str
    dwell_minutes: int
    billable_minutes: int
    claim_amount: float
    readiness: Literal["ready", "blocked"]
    missing_evidence: list[str]

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.post("/claims/calculate", response_model=ClaimResponse)
def calculate_claim(payload: ClaimRequest) -> ClaimResponse:
    if payload.departure <= payload.arrival:
        raise HTTPException(status_code=422, detail="Departure must be after arrival")
    dwell = round((payload.departure - payload.arrival).total_seconds() / 60)
    raw_billable = max(0, dwell - payload.free_minutes)
    increment = payload.billing_increment_minutes
    billable = ((raw_billable + increment - 1) // increment) * increment if raw_billable else 0
    missing = [name for name, present in {"signed BOL":payload.evidence.bol,"rate confirmation":payload.evidence.rate_con,"GPS timestamps":payload.evidence.gps}.items() if not present]
    readiness: Literal["ready", "blocked"] = "ready" if billable > 0 and not missing else "blocked"
    return ClaimResponse(load_id=payload.load_id,dwell_minutes=dwell,billable_minutes=billable,claim_amount=round(billable / 60 * payload.rate_per_hour, 2),readiness=readiness,missing_evidence=missing)
