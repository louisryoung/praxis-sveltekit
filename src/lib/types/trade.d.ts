export interface TradeAcct {
  id: string;
  name: string;
  userID: string;
  createdAt: Date;
}
export interface TradeAcctResponse extends SuccessFail {
  tradeAcct?: TradeAcct;
}
export interface TradeWithInputsResponse extends SuccessFail {
  trade?: Trade;
  inputs?: TradeInput;
}
export interface SuccessFail {
  success: boolean;
  error?: string;
}
export interface UserInfo {
  email: string;
  fullName: string;
  id: string;
  createdAt: Date;
}
export interface Order {
  symbol: string;
  side: string;
  spread: string;
  time: Date;
  qty: number;
  strike: number;
  price: number;
  netPrice: number;
  type: string;
  expiration: Date;
  id: string;
  orderType: string;
  posEffect: string;
  fee: number;
}
export interface Trade {
  userID: string;
  tradeAccountID: string;
  symbol: string;
  strike: number;
  type: 'CALL' | 'PUT';
  qty: number;
  orders: Order[];
  status: 'WIN' | 'LOSS' | 'OPEN';
  openDate: Date;
  closeDate: Date;
  entryPrice: number;
  exitPrice: number;
  netPL: number;
  netROI: number;
  expiration: Date;
  totalFee: number;
  id: string;
  log_day: string;
  log_month: string;
  log_week: string;
  inputs?: TradeInput;
}

export interface TradeInput {
  userID: string;
  tradeID: string;
  feelings: string[];
  notes: {
    whyEntered: string;
    managed: string;
    errors: string;
    improvements: string;
  };
  setups: string[];
  mistakes: string[];
  tradeRating: number;
  profitTarget?: number;
  stopLoss?: number;
}

export type TradeTableColumn =
  | 'symbol'
  | 'status'
  | 'type'
  | 'volume'
  | 'open'
  | 'close'
  | 'entry_price'
  | 'exit_price'
  | 'net_p&l'
  | 'net_roi'
  | 'setups'
  | 'feelings'
  | 'mistakes'
  | 'rating';
