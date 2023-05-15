<script lang="ts">
  import { Chart, CandlestickSeries } from 'svelte-lightweight-charts';
  import { darkMode } from '$lib/stores/themes';
  import { formatNumber } from '$lib/utils/format';
  import { CandlestickChartThemes } from './themes';
  import { LineStyle } from 'lightweight-charts';
  import type {
    CandlestickData,
    ChartOptions,
    DeepPartial,
    IChartApi,
    WhitespaceData,
  } from 'lightweight-charts';

  export let width = 400;
  export let height = 150;

  const options = {
    localization: {
      priceFormatter: (price: number) =>
        formatNumber(price, {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
    },
    crosshair: {
      horzLine: {
        visible: true,
        labelVisible: true,
        labelBackgroundColor: 'rgba(20, 184, 166, 0.5)',
      },
      vertLine: {
        width: 8,
        color: 'rgba(20, 184, 166, 0.1)',
        style: LineStyle.Solid,
        labelBackgroundColor: 'rgba(20, 184, 166, 0.5)',
      },
    },
  } satisfies DeepPartial<ChartOptions>;

  export let data: (WhitespaceData | CandlestickData)[] = [];

  let chart: IChartApi | null = null;

  $: width && height && chart?.timeScale().fitContent();

  $: theme = $darkMode
    ? CandlestickChartThemes.dark
    : CandlestickChartThemes.light;

  const seriesOptions = {
    lastValueVisible: false,
    priceLineVisible: false,
  };
</script>

<Chart
  {...options}
  {...theme.chart}
  {width}
  {height}
  ref={(ref) => (chart = ref)}
>
  <CandlestickSeries {data} {...theme.series} {...seriesOptions}>
    <slot name="priceLine" />
  </CandlestickSeries>
</Chart>
