import moment from 'moment';
import type { Trade, Order } from '$lib/types';

interface ParseCSVReturn {
  trades?: Trade[];
  error?: string;
  success: boolean;
}

function parseFloatToTwoDecimals(nums: string) {
  const num = parseFloat(nums);
  var pow = Math.pow(10, 2);
  return Math.round(num * pow) / pow;
}
function roundToTwo(num: number) {
  var pow = Math.pow(10, 2);
  return Math.round(num * pow) / pow;
}

export function parseCSV(csv: string): ParseCSVReturn {
  try {
    const lines = csv.split('\n');
    const lines2 = csv.split('\n');

    for (let i = 0; i < lines2.length; i++) {
      let line = lines2[i];
      if (line.includes('Cash Balance')) {
        lines2.splice(0, i + 2);
        break;
      }
    }
    let fees = [];
    var once = false;
    for (let i = 0; i < lines2.length; i++) {
      const line = lines2[i];
      if (!line.includes(',')) break;
      const split = line.split(',');
      if (split[4] === 'TOTAL') break;
      if (split[2] !== 'TRD') continue;
      let fee = Math.abs(
        parseFloatToTwoDecimals(split[5]) + parseFloatToTwoDecimals(split[6])
      );
      if (!fee) fee = 0;
      if (once === false) {
        once = true;
      }
      fees.push(fee);
    }

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line.includes('Account Trade History')) {
        lines.splice(0, i + 2);
        break;
      }
    }
    let orders: Order[] = [];
    fees = fees.reverse();
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.includes(',')) break;
      const split = line.split(',');
      const order: Order = {
        fee: fees[orders.length] || 0.65,
        time: new Date(split[1]),
        spread: split[2],
        side: split[3],
        qty: parseInt(split[4]),
        posEffect: split[5],
        symbol: split[6],
        expiration: new Date(split[7]),
        strike: parseFloatToTwoDecimals(split[8]),
        type: split[9],
        price: parseFloatToTwoDecimals(split[10]),
        netPrice: parseFloatToTwoDecimals(split[11]),
        orderType: split[12],
        id:
          Math.random().toString(36).substr(2, 9) +
          Date.now().toString(36) +
          Math.random().toString(36).substr(2, 9) +
          Math.random().toString(36).substr(2, 9),
      };
      orders.push(order);
    }
    orders = orders.sort((a, b) => {
      return a.time.getTime() - b.time.getTime();
    });
    const trades = createTradesFromOrders(orders);
    return { trades: trades, success: true };
  } catch (err) {
    let errorMessage = 'Failed to do import CSV';
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return { error: errorMessage as string, success: false };
  }
}
function createTradesFromOrders(orders: Order[]): Trade[] {
  const activeOrders = new Map<string, Order[]>();
  const trades: Trade[] = [];
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const orderHash = getOrderHash(order);
    if (activeOrders.has(orderHash)) {
      activeOrders.get(orderHash)?.push(order);

      let zeroed = 0;
      const ordersInTrade = activeOrders.get(orderHash);
      ordersInTrade?.map((order) => {
        zeroed += order.qty;
      });
      if (zeroed === 0) {
        const trade = createClosedTrade(ordersInTrade as Order[]);
        trades.push(trade);
        activeOrders.delete(orderHash);
      }
    } else {
      activeOrders.set(orderHash, [order]);
    }
  }

  // check to see if any active orders are left
  activeOrders.forEach((orders, key) => {
    // if there are any active orders, create a trade for them and push it to the trades array
    if (orders[0].expiration.getTime() < Date.now()) {
      orders.push({
        fee: 0,
        time: moment(orders[0].expiration).add(1, 'day').toDate(),
        spread: 'EXPIRED',
        side: 'SELL',
        qty: orders
          .map((order) => {
            if (order.side === 'BUY') return order.qty;
            else return -order.qty;
          })
          .reduce((a, b) => a + b, 0),
        posEffect: 'EXPIRED',
        symbol: orders[0].symbol,
        expiration: orders[0].expiration,
        strike: orders[0].strike,
        type: orders[0].type,
        price: 0,
        netPrice: 0,
        orderType: 'EXPIRED',
        id:
          Math.random().toString(36).substr(2, 9) +
          Date.now().toString(36) +
          Math.random().toString(36).substr(2, 9) +
          Math.random().toString(36).substr(2, 9),
      });
      const trade = createClosedTrade(orders);
      trades.push(trade);
    }
  });

  return trades;
}
const AMOUNT_OF_OPTIONS_IN_A_CONTRACT = 100;
function createClosedTrade(orders: Order[]): Trade {
  let totalCost = 0;
  let totalProfit = 0;
  let totalQty = 0;
  let totalFee = 0;
  let averageEntry = 0;
  let averageExit = 0;
  orders.map((order) => {
    if (order.side === 'BUY') {
      totalCost += order.qty * AMOUNT_OF_OPTIONS_IN_A_CONTRACT * order.price;
      totalQty += order.qty;
      totalFee += order.fee;
      averageEntry += order.price * Math.abs(order.qty);
    } else {
      totalProfit +=
        Math.abs(order.qty * AMOUNT_OF_OPTIONS_IN_A_CONTRACT) * order.price;
      totalFee += order.fee;
      averageExit += order.price * Math.abs(order.qty);
    }
  });
  averageEntry = roundToTwo(averageEntry / totalQty);
  averageExit = roundToTwo(averageExit / totalQty);
  const trade: Trade = {
    id: generateID(),
    orders: orders,
    symbol: orders[0].symbol,
    type: orders[0].type === 'CALL' ? 'CALL' : 'PUT',
    expiration: orders[0].expiration,
    strike: orders[0].strike,
    openDate: orders[0].time,
    closeDate: orders[orders.length - 1].time,
    entryPrice: averageEntry,
    exitPrice: averageExit,
    qty: totalQty,
    netPL: roundToTwo(totalProfit - totalCost - totalFee),
    netROI: roundToTwo(
      ((totalProfit - totalCost - totalFee) / totalCost) * 100
    ),
    totalFee: roundToTwo(totalFee),
    status: roundToTwo(totalProfit - totalCost - totalFee) > 0 ? 'WIN' : 'LOSS',
    log_day:
      moment(orders[orders.length - 1].time).dayOfYear() +
      '-' +
      moment(orders[orders.length - 1].time).year(),
    log_month:
      moment(orders[orders.length - 1].time)
        .month()
        .toString() +
      '-' +
      moment(orders[orders.length - 1].time)
        .year()
        .toString(),
    log_week:
      moment(orders[orders.length - 1].time)
        .week()
        .toString() +
      '-' +
      moment(orders[orders.length - 1].time)
        .year()
        .toString(),
  };
  return trade;
}

function getOrderHash(order: Order) {
  return `${order.symbol}---${order.expiration.getTime()}---${order.strike}---${
    order.type
  }`;
}

function generateID(): string {
  return (
    Math.random().toString(36).substr(2, 9) +
    Date.now().toString(36) +
    Math.random().toString(36).substr(2, 9) +
    Math.random().toString(36).substr(2, 9)
  );
}
