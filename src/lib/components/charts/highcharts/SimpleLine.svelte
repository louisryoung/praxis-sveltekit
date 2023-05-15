<script lang="ts">
  import highChart from '$lib/actions/highChart';
  import { darkMode } from '$lib/stores/themes';
  import { formatCurrency } from '$lib/utils/format';
  import type { DeepPartial } from 'lightweight-charts';

  const fullShortDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format;

  const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format;

  export let id: string;
  export let series: Highcharts.SeriesOptionsType[] = [];
  export let options: Highcharts.Options = {};

  let config: Highcharts.Options;
  $: config = {
    chart: {
      type: 'line',
      marginBottom: 28,
    },
    title: {
      text: undefined,
    },
    yAxis: {
      visible: false,
    },
    xAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    // column: {
    //   pointPadding: 0,
    //   borderWidth: 0,
    //   pointPadding: 0,
    // },
    plotOptions: {
      series: {
        // pointWidth: 15,
        // pointPadding: 0.03,
        // groupPadding: 0,
        // borderWidth: 2,
        shadow: false,
        borderColor: 'transparent',
      },
    },
    series: series,
    ...options,
  };
</script>

<div {id} class="chart-container h-full w-full" use:highChart={config} />

<style global lang="postcss">
  .chart-container .highcharts-background {
    @apply fill-transparent;
  }

  /* #trade-daily-netpl-container .highcharts-button .highcharts-reset-zoom {
        @apply z-[2];
      } */
</style>
