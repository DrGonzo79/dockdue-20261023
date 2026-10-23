export type LoadInput = { id:string; broker:string; facility:string; arrival:string; departure:string; freeMinutes:number; ratePerHour:number; minimumMinutes:number; bol:boolean; rateCon:boolean; gps:boolean; status:string };
export type ClaimResult = { dwellMinutes:number; billableMinutes:number; claimAmount:number; eligible:boolean; readiness:"ready"|"blocked"; missing:string[]; timeline:Array<{day:number;label:string}> };

export function calculateClaim(load: LoadInput): ClaimResult {
  const arrival = new Date(load.arrival).getTime();
  const departure = new Date(load.departure).getTime();
  if (!Number.isFinite(arrival) || !Number.isFinite(departure) || departure <= arrival) throw new Error("Departure must be after arrival.");
  if (load.freeMinutes < 0 || load.ratePerHour <= 0 || load.minimumMinutes <= 0) throw new Error("Policy terms must be positive.");
  const dwellMinutes = Math.round((departure - arrival) / 60_000);
  const rawBillable = Math.max(0, dwellMinutes - load.freeMinutes);
  const billableMinutes = rawBillable ? Math.ceil(rawBillable / load.minimumMinutes) * load.minimumMinutes : 0;
  const missing = [["Signed BOL",load.bol],["Rate confirmation",load.rateCon],["GPS timestamps",load.gps]].filter(([,present]) => !present).map(([label]) => String(label));
  return {dwellMinutes,billableMinutes,claimAmount:Math.round((billableMinutes / 60) * load.ratePerHour * 100) / 100,eligible:billableMinutes > 0,readiness:billableMinutes > 0 && missing.length === 0 ? "ready" : "blocked",missing,timeline:[{day:0,label:"Draft claim"},{day:7,label:"First follow-up"},{day:14,label:"Escalate"},{day:30,label:"Final chase"}]};
}
