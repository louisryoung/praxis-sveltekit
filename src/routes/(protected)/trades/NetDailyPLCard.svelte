<script lang="ts">
  import moment from 'moment';
  import { formatCurrency } from '$lib/utils/format';
  import ColumnChart from '$lib/components/charts/highcharts/Column.svelte';

  let containerHeight = 0;
  let containerWidth = 0;

  let classProp = 'col-span-full sm:col-span-6 lg:col-span-4';
  export { classProp as class };

  export let data: Record<string, number> = {};
  export let averageDailyPL = 0;

  $: chartData = Object.entries(data)
    .map(([key, value]) => {
      return [moment(key).toDate().getTime(), value];
    })
    .sort((a, b) => a[0] - b[0]);

  $: series = [
    {
      name: 'Net P&L',
      type: 'column',
      data: chartData,
      color: 'rgba(20,184,166,0.7)',
      negativeColor: 'rgba(239,68,68,0.7)',
    },
  ] satisfies Highcharts.SeriesOptionsType[];
</script>

<div
  class="overflow-hidden rounded-lg bg-white shadow dark:bg-neutral-900/50 dark:shadow-neutral-800 {classProp} flex flex-col"
>
  <div class="px-6 pb-1 pt-5">
    <div class="flex items-center">
      <div class="w-0 flex-1">
        <dl>
          <dt class="truncate text-sm font-medium capitalize text-teal-500">
            Net Daily P&L
          </dt>
          <dd>
            <div
              class="text-lg font-medium text-neutral-900 dark:text-neutral-100"
            >
              {formatCurrency(averageDailyPL, 'USD')}
              <span class="text-xs text-neutral-500">USD</span>
              /
              <span class="text-xs text-neutral-500">DAY</span>
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
    <ColumnChart id="trade-daily-netpl-container" {series} />
  </div>
</div>
