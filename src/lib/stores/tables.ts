import { writable } from 'svelte/store';
import type { TradeTableColumn } from '$lib/types';

export const tradeColumns = writable<
  Partial<Record<TradeTableColumn, boolean>>
>({
  symbol: true,
  status: true,
  type: true,
  volume: true,
  open: true,
  close: true,
  entry_price: true,
  exit_price: true,
  'net_p&l': true,
  net_roi: true,
  setups: true,
  mistakes: true,
  rating: true,
  feelings: true,
});
