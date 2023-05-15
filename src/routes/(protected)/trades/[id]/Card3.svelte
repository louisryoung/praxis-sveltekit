<script lang="ts">
  import { formatCurrency, formatNumber } from '$lib/utils/format';
  import type { Trade, TradeInput } from '$lib/types';

  let classProp = '';
  export { classProp as class };

  export let trade: Trade = {} as Trade;
  export let inputs: TradeInput = {} as TradeInput;
</script>

<div
  class="w-full overflow-hidden rounded-lg bg-neutral-50 shadow dark:bg-neutral-900/70 dark:shadow-neutral-800 {classProp}"
>
  <div class="w-full p-5">
    <div class="flex w-full items-center justify-between">
      <div class="w-full flex-1">
        <dl class="grid w-full grid-cols-2 gap-y-1">
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
    @apply ml-auto text-sm;
  }
</style>
