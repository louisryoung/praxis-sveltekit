import type { Trade } from '$lib/types';

export const parseMongoDBObject = (obj: any) => {
  if (typeof obj !== 'object') return obj;
  // check if obj has method toObject
  // if (typeof obj.toObject !== 'function') {
  //   console.log({ obj });
  //   return obj;
  // }
  const o = obj?.toObject?.() ?? obj;
  delete o._id;
  delete o.__v;

  // parse nested objects
  for (const key in o) {
    if (Array.isArray(o[key])) {
      o[key] = o[key].map((item: any) => parseMongoDBObject(item));
    } else if (typeof o[key] === 'object') {
      o[key] = parseMongoDBObject(o[key]);
    }
  }
  return o;
};

export const parseTrade = (trade: any): Trade => {
  return {
    ...trade,
    openDate: new Date(trade.openDate),
    closeDate: new Date(trade.closeDate),
    orders: trade.orders.map((order: any) => ({
      ...order,
      time: new Date(order.time),
      expiration: new Date(order.expiration),
    })),
  } satisfies Trade;
};
