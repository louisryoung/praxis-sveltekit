<script lang="ts">
  import {
    formatCurrency,
    formatDateTime,
    formatNumber,
  } from '$lib/utils/format';
  import type { Order, Trade } from '$lib/types';
  import { goto } from '$app/navigation';

  export let trade: Trade = {} as Trade;

  $: orders = trade?.orders || [];

  const getNetReturn = (order: Order) => {
    if (order.side.toLocaleLowerCase() === 'sell') {
      return (
        Math.abs(order.qty) * 100 * order.price -
        order.fee -
        Math.abs(order.qty) * trade.entryPrice * 100
      );
    }
    return 0;
  };
</script>

<table class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
  <thead>
    <tr>
      <th
        class="bg-neutral-50 px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        side
      </th>
      <th
        class="bg-neutral-50 px-6 py-3 text-center text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        size
      </th>
      <th
        class="hidden bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 md:table-cell"
        scope="col"
      >
        price
      </th>
      <th
        class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        expiration
      </th>
      <th
        class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        date
      </th>
      <th
        class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        time
      </th>
      <th
        class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        adjusted cost
      </th>
      <th
        class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        fees
      </th>
      <th
        class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        net return
      </th>
      <th
        class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        scope="col"
      >
        return %
      </th>
    </tr>
  </thead>
  <tbody
    class="divide-y divide-neutral-200 bg-white dark:divide-neutral-800 dark:bg-black"
  >
    {#each orders as order}
      {@const isSell = order.side.toLocaleLowerCase() === 'sell'}
      {@const netReturn = getNetReturn(order)}
      {@const returnPercent =
        netReturn / (Math.abs(order.qty) * trade.entryPrice * 100)}
      <tr
        class="group bg-white dark:bg-black"
        on:click={() => goto(`/trades/${trade.id}`)}
      >
        <td
          class="whitespace-nowrap px-6 py-4 text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-900"
        >
          <span
            class="font-medium {isSell
              ? 'text-red-600 dark:text-red-500'
              : 'text-green-600 dark:text-green-500'}">{order?.side}</span
          >
        </td>
        <td
          class="hidden whitespace-nowrap px-6 py-4 text-center text-sm text-neutral-500 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-900 md:block"
        >
          <span class="font-medium text-neutral-900 dark:text-neutral-100">
            {order?.qty}
          </span>
        </td><td
          class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-400 dark:group-hover:bg-neutral-900"
        >
          <span class="font-medium text-neutral-900 dark:text-neutral-100">
            {formatCurrency(order?.price, 'USD')}
          </span>
          <span class="text-xs">USD</span>
        </td>
        <td
          class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-400 dark:group-hover:bg-neutral-900"
          title={order?.expiration?.toISOString?.()}
        >
          <span
            class="text-xs font-medium text-neutral-900 dark:text-neutral-100"
          >
            {formatDateTime(order?.expiration, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </td>
        <td
          class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-400 dark:group-hover:bg-neutral-900"
          title={order?.time?.toISOString?.().slice(0, 10)}
        >
          <span
            class="text-xs font-medium text-neutral-900 dark:text-neutral-100"
          >
            {formatDateTime(order?.time, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </td>
        <td
          class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-400 dark:group-hover:bg-neutral-900"
          title={order?.time?.toISOString?.()}
        >
          <span
            class="text-xs font-medium text-neutral-900 dark:text-neutral-100"
          >
            {formatDateTime(order?.time, {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </span>
        </td>
        <td
          class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-400 dark:group-hover:bg-neutral-900"
        >
          <span class="font-medium text-neutral-900 dark:text-neutral-100">
            {formatCurrency(order?.price * order?.qty * 100, 'USD')}
          </span>
          <span class="text-xs">USD</span>
        </td>
        <td
          class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-400 dark:group-hover:bg-neutral-900"
        >
          <span class="font-medium text-neutral-900 dark:text-neutral-100">
            {formatCurrency(order?.fee, 'USD')}
          </span>
          <span class="text-xs">USD</span>
        </td>
        <td
          class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-400 dark:group-hover:bg-neutral-900"
        >
          {#if isSell}
            <span class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(netReturn, 'USD')}
            </span>
            <span class="text-xs">USD</span>
          {:else}
            <span
              class="mr-10 font-medium text-neutral-700 dark:text-neutral-300"
            >
              -
            </span>
          {/if}
        </td><td
          class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-900"
        >
          {#if isSell}
            {formatNumber(returnPercent, {
              style: 'percent',
              maximumFractionDigits: 2,
            })}
            {#if returnPercent < 0}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="inline h-4 w-4 text-red-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25"
                />
              </svg>
            {:else if returnPercent > 0}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="inline h-4 w-4 text-emerald-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            {/if}
          {:else}
            <span
              class="mr-8 font-medium text-neutral-700 dark:text-neutral-300"
            >
              -
            </span>
          {/if}
        </td>
        <!-- <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500">
          <time datetime="2020-07-11">July 11, 2020</time>
        </td> -->
      </tr>
    {/each}
    <!-- More transactions... -->
  </tbody>
</table>

<style lang="postcss">
  th {
    @apply text-xs uppercase;
  }
</style>
