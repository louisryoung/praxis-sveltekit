<script lang="ts">
  import { Chart, AreaSeries } from 'svelte-lightweight-charts';
  import { darkMode } from '$lib/stores/themes';
  import { formatNumber } from '$lib/utils/format';
  import { AreaChartThemes } from './themes';
  import { LineStyle } from 'lightweight-charts';
  import type {
    ChartOptions,
    DeepPartial,
    IChartApi,
    SingleValueData,
    WhitespaceData,
  } from 'lightweight-charts';

  export let width = 400;
  export let height = 150;
  export let options: DeepPartial<ChartOptions> = {};

  const config = {
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
    ...options,
  } satisfies DeepPartial<ChartOptions>;

  export let data: (SingleValueData | WhitespaceData)[] = [];

  let chart: IChartApi | null = null;

  $: width && height && chart?.timeScale().fitContent();

  $: theme = $darkMode ? AreaChartThemes.dark : AreaChartThemes.light;

  const seriesOptions = {
    lastValueVisible: false,
    priceLineVisible: false,
  };
</script>

<Chart
  {...config}
  {...theme.chart}
  {width}
  {height}
  ref={(ref) => (chart = ref)}
>
  <AreaSeries {data} {...theme.series} {...seriesOptions}>
    <slot name="priceLine" />
  </AreaSeries>
</Chart>
