<script lang="ts">
  import moment from 'moment';
  import { formatCurrency, formatDateTime } from '$lib/utils/format';
  import LineChart from '$lib/components/charts/highcharts/SimpleLine.svelte';
  import { darkMode } from '$lib/stores/themes';

  let containerHeight = 0;
  let containerWidth = 0;

  let classProp = 'col-span-full sm:col-span-6 lg:col-span-4';
  export { classProp as class };

  export let id: string;

  export let data: Record<string, number> = {};

  $: chartData = Object.entries(data)
    .map(([key, value]) => {
      return [moment(key).toDate().getTime(), value];
    })
    .sort((a, b) => a[0] - b[0]);

  $: series = [
    {
      name: 'Net P&L',
      type: 'line',
      data: chartData,
      color: 'rgba(20,184,166,0.7)',
      negativeColor: 'rgba(239,68,68,0.7)',
    },
  ] satisfies Highcharts.SeriesOptionsType[];

  export let tooltipFormatter: (
    this: Highcharts.TooltipFormatterContextObject
  ) => string = function () {
    return `
        <span style="font-size: 0.7rem;">
          ${formatDateTime(this.x, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          })}
        </span>
        <br/>
        <span style="color: ${this.color}">\u25CF</span> ${
      Number(this.y) > 0 ? 'Win' : 'Loss'
    }: <b>${formatCurrency(this.y, 'USD')}</b>
      `;
  };

  const config = {
    tooltip: {
      formatter: tooltipFormatter,
      backgroundColor: $darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
      style: {
        color: $darkMode ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
      },
      borderRadius: 5,
    },
  };
</script>

<div
  class="h-full w-full overflow-hidden rounded-lg bg-white dark:bg-neutral-900/50 dark:shadow-neutral-800 {classProp} flex flex-col"
>
  <div
    class="h-full w-full overflow-hidden"
    bind:clientHeight={containerHeight}
    bind:clientWidth={containerWidth}
  >
    <LineChart {id} {series} options={config} />
  </div>
</div>
