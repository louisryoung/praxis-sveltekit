<script lang="ts">
  import { formatCurrency } from '$lib/utils/format';
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
