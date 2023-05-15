<script lang="ts">
  import {
    createDataTableStore,
    dataTableHandler,
    tableInteraction,
    tableA11y,
  } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import Tag from '$lib/components/Tag.svelte';
  import {
    formatCurrency,
    formatDateTime,
    formatNumber,
  } from '$lib/utils/format';
  import type { Trade, TradeTableColumn } from '$lib/types';

  export let trades: Trade[] = [];

  const dataTableStore = createDataTableStore(trades, {
    search: '',
    sort: '',
    // pagination: { offset: 0, limit: 5, size: 0, amounts: [1, 2, 5, 10] }
  });

  dataTableStore.subscribe((model) => dataTableHandler(model));

  $: browser && dataTableStore.updateSource(trades);

  const handleSelectAll = (ev: Event & { currentTarget: HTMLInputElement }) => {
    dataTableStore.selectAll(ev?.currentTarget?.checked);
  };

  let allRowsSelected = false;
  let someSelected = false;

  $: {
    allRowsSelected = $dataTableStore.selection.length === trades.length;
    someSelected =
      $dataTableStore.selection.length !== trades.length &&
      $dataTableStore.selection.length > 0;
  }

  const defaultColumns = {
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
  } satisfies Partial<Record<TradeTableColumn, boolean>>;

  export let columns: Partial<Record<TradeTableColumn, boolean>> =
    defaultColumns;
</script>

<table
  class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800"
  role="grid"
  use:tableA11y
  use:tableInteraction
>
  <thead
    on:click={(e) => {
      dataTableStore.sort(e);
    }}
    on:keypress
  >
    <tr>
      <th
        scope="col"
        class="relative h-12 w-16 cursor-pointer select-none bg-neutral-50 px-6 text-neutral-500 first:rounded-tl-lg last:rounded-tr-lg dark:bg-neutral-900"
      >
        <input
          type="checkbox"
          class="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded border-neutral-300 text-teal-600 focus:ring-teal-500 dark:border-neutral-600 dark:focus:ring-offset-black dark:[&:not(:checked):not(:indeterminate)]:bg-black"
          checked={allRowsSelected}
          indeterminate={someSelected}
          on:click={handleSelectAll}
        />
      </th>
      {#if columns?.symbol}
        <th
          class="bg-neutral-50 px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="symbol"
        >
          symbol
        </th>
      {/if}
      {#if columns?.status}
        <th
          class="bg-neutral-50 px-6 py-3 text-center text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="status"
        >
          status
        </th>
      {/if}
      {#if columns?.type}
        <th
          class="bg-neutral-50 px-6 py-3 text-center text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="type"
        >
          type
        </th>
      {/if}
      {#if columns?.volume}
        <th
          class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="qty"
        >
          volume
        </th>
      {/if}
      {#if columns?.open}
        <th
          class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="openDate"
        >
          open
        </th>
      {/if}
      {#if columns?.close}
        <th
          class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="closeDate"
        >
          close
        </th>
      {/if}
      {#if columns?.entry_price}
        <th
          class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="entryPrice"
        >
          entry price
        </th>
      {/if}
      {#if columns?.exit_price}
        <th
          class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="exitPrice"
        >
          exit price
        </th>
      {/if}
      {#if columns?.['net_p&l']}
        <th
          class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="netPL"
        >
          net p&l
        </th>
      {/if}
      {#if columns?.net_roi}
        <th
          class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="netROI"
        >
          net rOI
        </th>
      {/if}
      {#if columns?.setups}
        <th
          class="bg-neutral-50 px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
        >
          setups
        </th>
      {/if}
      {#if columns?.mistakes}
        <th
          class="bg-neutral-50 px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
        >
          mistakes
        </th>
      {/if}
      {#if columns?.rating}
        <th
          class="bg-neutral-50 px-6 py-3 text-right text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
          data-sort="rating"
        >
          rating
        </th>
      {/if}
      {#if columns?.feelings}
        <th
          class="bg-neutral-50 px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
          scope="col"
        >
          feelings
        </th>
      {/if}
    </tr>
  </thead>
  <tbody
    class="divide-y divide-neutral-200 bg-white dark:divide-neutral-800 dark:bg-black"
  >
    {#each $dataTableStore.filtered as row, rowIndex (row.id)}
      <tr
        class="group peer bg-white dark:bg-black"
        class:selected={row.dataTableChecked}
        data-id={row.id}
        aria-rowindex={rowIndex + 1}
      >
        <td
          class="relative h-12 w-16 px-8 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
          role="gridcell"
          aria-colindex={1}
          tabindex="0"
        >
          <div
            class="absolute inset-y-0 left-0 w-0.5 bg-teal-600"
            class:hidden={!row.dataTableChecked}
          />
          <input
            type="checkbox"
            id="select-{row?.id}"
            class="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded border-neutral-300 text-teal-600 focus:ring-teal-500 dark:border-neutral-600 dark:focus:ring-offset-black dark:[&:not(:checked)]:bg-black"
            bind:checked={row.dataTableChecked}
          />
        </td>
        {#if columns?.symbol}
          <td
            class="whitespace-nowrap px-6 py-4 text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={2}
            tabindex="0"
          >
            <a href="/trades/{row.id}" class="hover:text-teal-500">
              <span>
                {row?.symbol}
              </span>
            </a>
          </td>
        {/if}
        {#if columns?.status}
          <td
            class="whitespace-nowrap px-6 py-4 text-center text-sm text-neutral-500 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={3}
            tabindex="0"
          >
            {#if row?.status?.toLocaleLowerCase() === 'win'}
              <span
                class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium capitalize text-green-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                >win</span
              >
            {:else if row?.status?.toLocaleLowerCase() === 'loss'}
              <span
                class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium capitalize text-red-800 dark:bg-red-900/30 dark:text-red-400"
                >loss</span
              >
            {:else}
              <span
                class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium capitalize text-yellow-800 dark:bg-amber-900/30 dark:text-amber-400"
                >open</span
              >
            {/if}
          </td>
        {/if}
        {#if columns?.type}
          <td
            class="whitespace-nowrap px-6 py-4 text-center text-sm text-neutral-500 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={4}
            tabindex="0"
          >
            <span
              class="font-medium uppercase text-neutral-900 dark:text-neutral-100"
              >{row?.type}</span
            >
          </td>
        {/if}
        {#if columns?.volume}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={5}
            tabindex="0"
          >
            {row?.qty}
          </td>
        {/if}
        {#if columns?.open}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            title={row?.openDate?.toISOString?.()}
            role="gridcell"
            aria-colindex={6}
            tabindex="0"
          >
            <span class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatDateTime(row?.openDate, {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span class="text-xs">
              {formatDateTime(row?.openDate, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })}
            </span>
          </td>
        {/if}
        {#if columns?.close}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            title={row?.closeDate?.toISOString?.()}
            role="gridcell"
            aria-colindex={7}
            tabindex="0"
          >
            <span class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatDateTime(row?.closeDate, {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span class="text-xs">
              {formatDateTime(row?.closeDate, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })}
            </span>
          </td>
        {/if}
        {#if columns?.entry_price}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={8}
            tabindex="0"
          >
            <span class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(row?.entryPrice, 'USD')}
            </span>
            <span class="text-xs">USD</span>
          </td>
        {/if}
        {#if columns?.exit_price}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={9}
            tabindex="0"
          >
            <span class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(row?.exitPrice, 'USD')}
            </span>
            <span class="text-xs">USD</span>
          </td>
        {/if}
        {#if columns?.['net_p&l']}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-500 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={10}
            tabindex="0"
          >
            <span class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(row?.netPL, 'USD')}
            </span>
            <span class="text-xs">USD</span>
            {#if row?.netPL < 0}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="inline h-4 w-4 text-red-600 dark:text-red-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25"
                />
              </svg>
            {:else if row?.netPL > 0}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="inline h-4 w-4 text-emerald-600 dark:text-emerald-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            {/if}
          </td>
        {/if}
        {#if columns?.net_roi}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={11}
            tabindex="0"
          >
            {formatNumber(row?.netROI / 100, {
              style: 'percent',
              maximumFractionDigits: 2,
            })}
            {#if row?.netROI < 0}
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
            {:else if row?.netROI > 0}
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
              <!-- {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="inline h-4 w-4 text-neutral-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15"
              />
            </svg> -->
            {/if}
          </td>
        {/if}
        {#if columns?.setups}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={12}
            tabindex="0"
          >
            <ul
              role="list"
              class="flex items-center justify-start text-teal-600"
            >
            {#each (row?.inputs?.setups ?? []) as setup}
            <li>
              <Tag text="{setup}" color={959987}>
                <span slot="text" let:text class="font-medium capitalize">
                  {text}
                </span>
              </Tag>
            </li>
          {/each}
            </ul>
          </td>
        {/if}
        {#if columns?.mistakes}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={13}
            tabindex="0"
          >
            <ul
              role="list"
              class="flex items-center justify-start text-teal-600"
            >
              {#each (row?.inputs?.mistakes ?? []) as mistake}
                <li>
                  <Tag text="{mistake}" color={[245, 158, 11]}>
                    <span slot="text" let:text class="font-medium capitalize">
                      {text}
                    </span>
                  </Tag>
                </li>
              {/each}
            </ul>
          </td>
        {/if}
        {#if columns?.rating}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={14}
            tabindex="0"
          >
            -
          </td>
        {/if}
        {#if columns?.feelings}
          <td
            class="whitespace-nowrap px-6 py-4 text-right text-sm text-neutral-900 group-hover:bg-neutral-100 dark:text-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
            role="gridcell"
            aria-colindex={15}
            tabindex="0"
          >
            -
          </td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>

<style lang="postcss">
  th {
    @apply whitespace-nowrap text-xs uppercase;
  }
</style>
