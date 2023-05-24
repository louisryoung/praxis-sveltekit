<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import CircleSpinner from '$lib/components/loaders/spinners/CircleSpinner.svelte';
  import { formatCurrency, formatNumber } from '$lib/utils/format';
  import type { Trade, TradeInput } from '$lib/types';

  let classProp = '';
  export { classProp as class };

  const forms = {
    profitTarget: {
      validating: false,
    },
    stopLoss: {
      validating: false,
    },
  };

  export let trade: Trade = {} as Trade;
  export let inputs: TradeInput = {} as TradeInput;

  let editProfitTarget = false;
  let editStopLoss = false;
</script>

<div
  class="w-full overflow-hidden rounded-lg bg-neutral-50 shadow dark:bg-neutral-900/70 dark:shadow-neutral-800 {classProp}"
>
  <div class="w-full p-5">
    <div class="flex w-full items-center justify-between">
      <div class="w-full flex-1">
        <dl class="grid w-full grid-cols-2 gap-y-1.5">
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            Status
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {#if trade?.status?.toLocaleLowerCase() === 'win'}
                <span
                  class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium capitalize text-green-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                  >win</span
                >
              {:else if trade?.status?.toLocaleLowerCase() === 'loss'}
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
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            entry price
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(trade?.entryPrice, 'USD')}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            exit price
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(trade?.exitPrice, 'USD')}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            commission and fees
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(trade?.totalFee, 'USD')}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            options traded
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {trade?.qty}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            net ROI
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {#if trade?.netROI > 0}
                <span class="text-green-600 dark:text-green-500">
                  {formatNumber(trade?.netROI / 100, {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              {:else if trade?.netROI < 0}
                <span class="text-red-600 dark:text-red-500">
                  {formatNumber(trade?.netROI / 100, {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              {:else}
                {formatNumber(trade?.netROI / 100, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              {/if}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            gross p&l
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {#if trade?.netPL > 0}
                <span class="text-green-600 dark:text-green-500">
                  {formatCurrency(trade?.netPL, 'USD')}
                </span>
              {:else if trade?.netPL < 0}
                <span class="text-red-600 dark:text-red-500">
                  {formatCurrency(trade?.netPL, 'USD')}
                </span>
              {:else}
                {formatCurrency(trade?.netPL, 'USD')}
              {/if}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            adjusted cost
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(trade?.entryPrice * trade?.qty * 100, 'USD')}
            </div>
          </dd>
          <dt
            class="group relative inline-flex items-center justify-start gap-2 text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            <div class="w-full truncate">profit target</div>
            <button
              type="button"
              class="absolute ml-[5.5rem] rounded-lg p-1 px-1.5 text-neutral-400 transition-colors duration-200 ease-in-out hover:bg-gray-200 hover:text-black dark:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-white"
              on:click={() => (editProfitTarget = true)}
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
                class="inline h-4 w-4"
              >
                <path
                  d="M2 26H30V28H2zM25.4 9c.8-.8.8-2 0-2.8 0 0 0 0 0 0l-3.6-3.6c-.8-.8-2-.8-2.8 0 0 0 0 0 0 0l-15 15V24h6.4L25.4 9zM20.4 4L24 7.6l-3 3L17.4 7 20.4 4zM6 22v-3.6l10-10 3.6 3.6-10 10H6z"
                />
                <title>Edit</title>
              </svg>
            </button>
          </dt>
          <dd>
            {#if !editProfitTarget}
              <div
                class="inline font-medium text-neutral-900 dark:text-neutral-100"
              >
                {inputs?.profitTarget
                  ? formatCurrency(inputs?.profitTarget, 'USD')
                  : '-'}
              </div>
            {:else}
              <form
                method="POST"
                action="?/profit_target"
                class="relative flex w-full items-center justify-start text-neutral-900 dark:text-neutral-100"
                use:enhance={({ form, data, cancel }) => {
                  forms.profitTarget.validating = true;
                  return async ({ result }) => {
                    forms.profitTarget.validating = false;
                    editProfitTarget = false;
                    if (result.type === 'failure') {
                    } else if (result.type === 'success') {
                      form.reset();
                    }
                    await invalidateAll();
                    await applyAction(result);
                  };
                }}
              >
                <div
                  class="relative w-[calc(100%-1.25rem)] rounded-l-lg shadow-sm"
                >
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <span class="text-gray-500 dark:text-neutral-400 sm:text-sm"
                      >$</span
                    >
                  </div>
                  <input
                    type="number"
                    name="profitTarget"
                    id="profit-target"
                    class="block w-full rounded-l-lg border border-neutral-200 bg-transparent py-0.5 pl-7 text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-0 dark:border-neutral-800 dark:text-neutral-100 dark:focus:border-teal-500 sm:text-sm"
                    placeholder="0.00"
                    value={inputs?.profitTarget}
                  />
                </div>
                <button
                  type="submit"
                  class="inline-flex items-center border border-neutral-200 px-2 py-0.5 capitalize transition-colors duration-200 ease-in-out hover:bg-teal-600 hover:text-white dark:border-neutral-800"
                >
                  <CircleSpinner
                    class="mr-1.5 inline h-3.5 w-3.5"
                    show={forms.profitTarget.validating}
                  />
                  <span>save</span>
                </button>
                <button
                  type="button"
                  class="rounded-r-md border border-neutral-200 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-red-600 hover:text-white dark:border-neutral-800"
                  on:click={() => (editProfitTarget = false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </form>
            {/if}
          </dd>
          <dt
            class="relative inline-flex items-center justify-start gap-2 text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            <div class="w-full truncate">stop loss</div>
            <button
              type="button"
              class="absolute ml-[4.5rem] rounded-lg p-1 px-1.5 text-neutral-400 transition-colors duration-200 ease-in-out hover:bg-gray-200 hover:text-black dark:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-white"
              on:click={() => (editStopLoss = true)}
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
                class="inline h-4 w-4"
              >
                <path
                  d="M2 26H30V28H2zM25.4 9c.8-.8.8-2 0-2.8 0 0 0 0 0 0l-3.6-3.6c-.8-.8-2-.8-2.8 0 0 0 0 0 0 0l-15 15V24h6.4L25.4 9zM20.4 4L24 7.6l-3 3L17.4 7 20.4 4zM6 22v-3.6l10-10 3.6 3.6-10 10H6z"
                />
                <title>Edit</title>
              </svg>
            </button>
          </dt>
          <dd>
            {#if !editStopLoss}
              <div class="font-medium text-neutral-900 dark:text-neutral-100">
                {inputs?.stopLoss
                  ? formatCurrency(inputs?.stopLoss, 'USD')
                  : '-'}
              </div>
            {:else}
              <form
                method="POST"
                action="?/stop_loss"
                class="relative flex w-full items-center justify-start text-neutral-900 dark:text-neutral-100"
                use:enhance={({ form, data, cancel }) => {
                  forms.stopLoss.validating = true;
                  return async ({ result }) => {
                    forms.stopLoss.validating = false;
                    editStopLoss = false;
                    // forms.stopLoss.validating = false;
                    if (result.type === 'failure') {
                    } else if (result.type === 'success') {
                      form.reset();
                    }
                    await invalidateAll();
                    await applyAction(result);
                  };
                }}
              >
                <div
                  class="relative w-[calc(100%-1.25rem)] rounded-l-lg shadow-sm"
                >
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <span class="text-gray-500 dark:text-neutral-400 sm:text-sm"
                      >$</span
                    >
                  </div>
                  <input
                    type="number"
                    name="stopLoss"
                    id="stop-loss"
                    class="block w-full rounded-l-lg border border-neutral-200 bg-transparent py-0.5 pl-7 text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-0 dark:border-neutral-800 dark:text-neutral-100 dark:focus:border-teal-500 sm:text-sm"
                    placeholder="0.00"
                    value={inputs?.stopLoss}
                  />
                </div>
                <button
                  type="submit"
                  class="inline-flex items-center border border-neutral-200 px-2 py-0.5 capitalize transition-colors duration-200 ease-in-out hover:bg-teal-600 hover:text-white dark:border-neutral-800"
                >
                  <CircleSpinner
                    class="mr-1.5 inline h-3.5 w-3.5"
                    show={forms.stopLoss.validating}
                  />
                  <span>save</span>
                </button>
                <button
                  type="button"
                  class="rounded-r-md border border-neutral-200 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-red-600 hover:text-white dark:border-neutral-800"
                  on:click={() => (editStopLoss = false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </form>
            {/if}
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            strike price
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(trade?.strike, 'USD')}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            trade risk
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {#if inputs?.stopLoss}
                {formatCurrency(
                  (trade.entryPrice - inputs?.stopLoss) * trade.qty * 100,
                  'USD'
                )}
              {:else}
                <span class="font-medium text-neutral-900 dark:text-neutral-100"
                  >-</span
                >
              {/if}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            initial target
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {#if inputs?.profitTarget}
                {formatCurrency(
                  (inputs?.profitTarget - trade?.entryPrice) * trade?.qty * 100,
                  'USD'
                )}
              {:else}
                <span class="font-medium text-neutral-900 dark:text-neutral-100"
                  >-</span
                >
              {/if}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            realized r-multiple
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {#if inputs?.stopLoss}
                {formatNumber(
                  trade?.netPL /
                    ((trade?.entryPrice - inputs?.stopLoss) * trade.qty * 100),
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                )}R
              {:else}
                <span class="font-medium text-neutral-900 dark:text-neutral-100"
                  >-</span
                >
              {/if}
            </div>
          </dd>
          <dt
            class="truncate text-sm font-medium capitalize text-neutral-500 dark:text-neutral-400"
          >
            planned r-multiple
          </dt>
          <dd>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {#if inputs?.stopLoss && inputs?.profitTarget}
                {formatNumber(
                  (inputs?.profitTarget - trade?.entryPrice) /
                    (trade?.entryPrice - inputs?.stopLoss),
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                )}R
              {:else}
                <span class="font-medium text-neutral-900 dark:text-neutral-100"
                  >-</span
                >
              {/if}
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</div>

<style land="postcss">
  dd {
    @apply w-full text-right text-sm;
  }
</style>
