from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def payload(**overrides):
    data = {"load_id":"LD-1048","arrival":"2026-10-20T08:05:00","departure":"2026-10-20T12:35:00","free_minutes":120,"rate_per_hour":75,"billing_increment_minutes":60,"evidence":{"bol":True,"rate_con":True,"gps":True}}
    data.update(overrides)
    return data

def test_health():
    assert client.get("/health").json() == {"status":"ok"}

def test_calculates_ready_claim():
    response = client.post("/claims/calculate", json=payload())
    assert response.status_code == 200
    assert response.json() == {"load_id":"LD-1048","dwell_minutes":270,"billable_minutes":180,"claim_amount":225.0,"readiness":"ready","missing_evidence":[]}

def test_blocks_missing_document():
    response = client.post("/claims/calculate", json=payload(evidence={"bol":True,"rate_con":False,"gps":True}))
    assert response.status_code == 200
    assert response.json()["readiness"] == "blocked"
    assert response.json()["missing_evidence"] == ["rate confirmation"]

def test_rejects_reverse_timestamps():
    response = client.post("/claims/calculate", json=payload(departure="2026-10-20T07:00:00"))
    assert response.status_code == 422

def test_rejects_invalid_terms():
    response = client.post("/claims/calculate", json=payload(rate_per_hour=0))
    assert response.status_code == 422
