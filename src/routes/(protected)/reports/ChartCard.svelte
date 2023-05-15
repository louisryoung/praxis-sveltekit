<script lang="ts">
  import moment from 'moment';
  import AreaChart from '$lib/components/charts/finance/Area.svelte';
  import ColumnChart from '$lib/components/charts/highcharts/Column.svelte';
  import type { Time } from 'lightweight-charts';

  let containerHeight = 0;
  let containerWidth = 0;

  let classProp = 'col-span-full sm:col-span-6 lg:col-span-4';
  export { classProp as class };

  export let cumulativeDailyPL: Record<string, number> = {};

  export let dailyPL: Record<string, number> = {};

  const charts = [
    {
      id: 0,
      title: 'Net Cumulative P&L',
      getData: () =>
        Object.entries(cumulativeDailyPL)
          .map(([key, value]) => {
            return {
              time: (moment(key).toDate().getTime() / 1000) as Time,
              value,
            };
          })
          .sort((a, b) => (a.time as number) - (b.time as number)),
    },
    {
      id: 1,
      title: 'Daily P&L',
      getData: () =>
        [
          {
            name: 'Net P&L',
            type: 'column',
            data: Object.entries(dailyPL).map(([key, value]) => [
              moment(key).toDate().getTime(),
              value,
            ]),
            color: 'rgba(20,184,166,0.7)',
            negativeColor: 'rgba(239,68,68,0.7)',
          },
        ] satisfies Highcharts.SeriesOptionsType[],
    },
  ];

  $: chartData = active?.getData() || [];

  $: active = charts[0];
</script>

<div
  class="flex h-full flex-col gap-0 overflow-hidden rounded-lg bg-neutral-50/50 shadow  dark:border-transparent dark:bg-neutral-900/50 dark:shadow-neutral-800 {classProp}"
>
  <div class="px-6 pt-5 pb-2">
    <div class="flex items-center">
      <div class="w-0 flex-1">
        <ul
          class="flex w-fit items-center justify-start gap-1 rounded-lg border border-neutral-300 p-0.5 dark:border-neutral-700"
        >
          {#each charts as chart (chart.id)}
            <li>
              <button
                type="button"
                class="rounded-lg px-4 py-1.5 text-sm font-medium capitalize {active.id ===
                chart.id
                  ? 'bg-teal-500 text-white dark:bg-teal-600'
                  : 'text-teal-500 hover:bg-neutral-200/50 dark:hover:bg-neutral-900'}"
                on:click={() => (active = chart)}
              >
                {chart.title}
              </button>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
  <div
    class="w-full flex-auto overflow-hidden"
    bind:clientHeight={containerHeight}
    bind:clientWidth={containerWidth}
  >
    <div class="h-full w-full overflow-hidden">
      {#if active.id === 0}
        <AreaChart
          data={chartData}
          height={containerHeight}
          width={containerWidth}
        />
      {:else if active.id === 1}
        <ColumnChart id="trade-daily-netpl-container" series={chartData} />
      {/if}
    </div>
  </div>
</div>
