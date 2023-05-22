<script lang="ts">
  import moment from 'moment';
  import { page } from '$app/stores';
  import AreaChart from '$lib/components/charts/finance/Area.svelte';
  import { formatCurrency, formatDateTime } from '$lib/utils/format';
  import type { Time } from 'lightweight-charts';

  let containerHeight = 0;
  let containerWidth = 0;

  let classProp = 'col-span-full sm:col-span-6 lg:col-span-4';
  export { classProp as class };

  export let data: Record<string, number> = {};
  export let totalNetProfit = 0;

  $: chartData = Object.entries(data)
    .map(([key, value]) => {
      return {
        time: (moment(key).toDate().getTime() / 1000) as Time,
        value,
      };
    })
    .sort((a, b) => a.time - b.time);
</script>

<div
  class="flex flex-col overflow-hidden rounded-lg bg-white shadow dark:bg-neutral-900/50 dark:shadow-neutral-800 {classProp}"
>
  <div class="px-6 pb-1 pt-5">
    <div class="flex items-center">
      <div class="w-0 flex-1">
        <dl>
          <dt class="truncate text-sm font-medium capitalize text-teal-500">
            Net Cumulative P&L
          </dt>
          <dd>
            <div
              class="text-lg font-medium text-neutral-900 dark:text-neutral-100"
            >
              {formatCurrency(totalNetProfit, 'USD')}
              <span class="text-xs text-neutral-500">USD</span>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
  <div
    class="w-full flex-auto overflow-hidden"
    bind:clientHeight={containerHeight}
    bind:clientWidth={containerWidth}
  >
    <div class="h-full w-full overflow-hidden">
      <AreaChart
        data={chartData}
        height={containerHeight}
        width={containerWidth}
        options={{
          localization: {
            timeFormatter: (time) => {
              moment(time * 1000).toDate();
              return $page.params.type === 'month'
                ? formatDateTime(moment(time * 1000).toDate(), {
                    month: 'short',
                    day: 'numeric',
                  })
                : formatDateTime(moment(time * 1000).toDate(), {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                  });
            },
          },
        }}
      />
    </div>
  </div>
</div>
