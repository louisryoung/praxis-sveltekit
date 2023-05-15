<script lang="ts">
  import highChart from '$lib/actions/highChart';
  import { darkMode } from '$lib/stores/themes';
  import { formatCurrency } from '$lib/utils/format';

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

  let config: Highcharts.Options;
  $: config = {
    chart: {
      type: 'column',
      marginBottom: 28,
      zoomBySingleTouch: true,
      zoomType: 'x',
      resetZoomButton: {
        position: {
          y: -10,
        },
        theme: {
          zIndex: 1,
          style: {
            color: $darkMode ? 'rgba(215,215,215,1)' : 'rgba(23,23,23, 1)',
            background: $darkMode ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)',
            opacity: 0.5,
          },
          r: 5,
        },
      },
    },
    title: {
      text: undefined,
    },
    yAxis: {
      title: {
        text: undefined,
      },
      gridLineColor: 'transparent',
      labels: {
        style: {
          color: $darkMode ? 'rgba(215,215,215,1)' : 'rgba(23,23,23, 1)',
        },
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return shortDateFormatter(this.value);
        },
        style: {
          color: $darkMode ? 'rgba(215,215,215,1)' : 'rgba(23,23,23, 1)',
        },
      },
      lineColor: $darkMode ? 'rgba(115,115,115,1)' : 'rgba(0, 0, 0, 0.1)',
      tickColor: $darkMode ? 'rgba(115,115,115,1)' : 'rgba(0, 0, 0, 0.1)',
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return `
        <span style="font-size: 0.7rem;">${fullShortDateFormatter(
          this.x
        )}</span>
        <br/>
        <span style="color: ${this.color}">\u25CF</span> ${
          this.series.name
        }: <b>${formatCurrency(this.y, 'USD')}</b>
        `;
      },
      backgroundColor: $darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
      style: {
        color: $darkMode ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
      },
      borderRadius: 5,
    },
    // column: {
    //   pointPadding: 0,
    //   borderWidth: 0,
    //   pointPadding: 0,
    // },
    plotOptions: {
      series: {
        // pointWidth: 15,
        pointPadding: 0.03,
        groupPadding: 0,
        borderWidth: 2,
        shadow: false,
        borderColor: 'transparent',
      },
    },
    series: series,
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
