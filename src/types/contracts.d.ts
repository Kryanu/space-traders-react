export interface ContractDeliverable {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

export interface Contract {
  id: string;
  accepted: boolean;
  terms: {
    payment: {
      onAccepted: number;
      onFulfilled: number;
    };
    deliver: ContractDeliverable[];
  };
}
