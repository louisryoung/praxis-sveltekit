<script lang="ts">
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { createEventDispatcher } from 'svelte';
  import { formatRelativeDate, fullShortDateTime } from '$lib/utils/datetime';
  import { formatCurrency, formatNumber } from '$lib/utils/format';
  import Tag from './Tag.svelte';
  import type { Trade } from '$lib/types';

  const dispatch = createEventDispatcher();

  let start: number;
  let end: number;

  export let bodyClass: string = 'h-96';

  // $: console.log({ start, end });

  export let items: Trade[] = [];
</script>

<div
  class="relative w-full overflow-hidden bg-white shadow-xl ring-1 ring-black/5 md:rounded-lg"
>
  <table
    class="relative table h-full w-full table-auto border-separate border-spacing-0"
  >
    <thead class="relative table w-full dark:bg-neutral-800">
      <tr>
        <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-neutral-300 text-sky-600 focus:ring-sky-500 sm:left-6"
          />
        </th>
        <th
          scope="col"
          class="py-3.5 pr-3 text-left text-sm font-semibold text-neutral-900"
        >
          symbol
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          status
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          type
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          qty
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          open date
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          close date
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          entry price
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          exit price
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          net p&l
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
        >
          net roi
        </th>
      </tr>
    </thead>
    <tbody class="block w-full resize-y {bodyClass}">
      <VirtualList height="100%" {items} bind:start bind:end let:item>
        <tr class="group table h-12" data-id={item.id}>
          <td class="relative w-12 px-6 sm:w-16 sm:px-8">
            <!-- <div
                class="absolute inset-y-0 left-0 w-0.5 bg-sky-600"
                class:hidden={!$selected[row?.id]}
              /> -->
            <input
              type="checkbox"
              id="select-{item?.id}"
              class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-neutral-300 text-sky-600 focus:ring-sky-500 sm:left-6"
            />
          </td>
          <td
            class="whitespace-nowrap pr-3 text-left text-sm font-medium text-neutral-900"
          >
            <span>{item?.symbol}</span>
          </td>
          <td class="whitespace-nowrap px-3 text-left text-sm text-neutral-500">
            {#if item?.status?.toLocaleLowerCase() === 'win'}
              <Tag text={item?.status} color={[34, 197, 94]} />
            {:else if item?.status?.toLocaleLowerCase() === 'loss'}
              <Tag text={item?.status} color={[239, 68, 68]} />
            {:else}
              <Tag text={item?.status} color={[14, 165, 233]} />
            {/if}
          </td>
          <td class="whitespace-nowrap px-3 text-left text-sm text-neutral-500">
            <span>{item?.type}</span>
          </td>
          <td
            class="whitespace-nowrap px-3 text-center text-sm text-neutral-500"
          >
            <span>{item?.qty}</span>
          </td>
          <td
            class="whitespace-nowrap px-3 text-center text-sm text-neutral-500"
          >
            <span>{formatRelativeDate(item?.openDate)}</span>
          </td>
          <td
            class="whitespace-nowrap px-3 text-center text-sm text-neutral-500"
          >
            <span>{formatRelativeDate(item?.closeDate)}</span>
          </td>
          <td
            class="whitespace-nowrap px-3 text-center text-sm text-neutral-500"
          >
            <span>{formatCurrency(item?.entryPrice, 'usd')}</span>
          </td>
          <td
            class="whitespace-nowrap px-3 text-center text-sm text-neutral-500"
          >
            <span>{formatCurrency(item?.exitPrice, 'usd')}</span>
          </td>
          <td class="whitespace-nowrap px-3 text-left text-sm text-neutral-500">
            <span>{formatCurrency(item.netPL, 'usd')}</span>
          </td>
          <td class="whitespace-nowrap px-3 text-left text-sm text-neutral-500">
            <span>
              {formatNumber(item?.netROI / 100, {
                style: 'percent',
                maximumFractionDigits: 2,
              })}
            </span>
          </td>
        </tr>
      </VirtualList>
    </tbody>
  </table>
</div>

<style lang="postcss">
  tr {
    /* grid-template-columns: 1fr 7fr 4fr 6fr 6fr; */
    @apply relative h-12 w-full items-center text-sm;
    /* grid gap-4; */
  }

  thead th {
    @apply cursor-pointer select-none border-b border-neutral-300 bg-white text-xs font-semibold uppercase tracking-wide text-neutral-500 backdrop-blur backdrop-filter first:rounded-tl-lg last:rounded-tr-lg;
  }

  thead th::after {
    background: url("data:image/svg+xml,%3Csvg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' height='1em' width='1em' style='display: inline;' %3E %3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E %3C/svg%3E")
      no-repeat;
    @apply bg-contain opacity-0 group-hover:opacity-100;
  }

  /* th[data-sort="asc"] {
        background: url("data:image/svg+xml,%3Csvg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' height='1em' width='1em' style='display: inline;' %3E %3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E %3C/svg%3E")
          no-repeat;
        @apply bg-contain ;
      } */

  td {
    @apply whitespace-nowrap border-b border-neutral-200 py-3 sm:py-4;
  }

  tr.selected td {
    @apply bg-neutral-50;
    /* first:shadow-[inset_2px_0_0] first:shadow-sky-500; */
  }

  thead {
    table-layout: fixed;
  }
  tbody tr {
    table-layout: fixed;
  }
  th,
  td {
    width: auto;
  }
</style>
