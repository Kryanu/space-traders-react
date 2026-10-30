export interface AccountRegisterPayload {
  symbol: string;
  faction: string;
}
export interface AgentPayload {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
}
