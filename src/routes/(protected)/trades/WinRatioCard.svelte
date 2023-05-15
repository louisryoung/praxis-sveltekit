<script lang="ts">
  import highChart from '$lib/actions/highChart3D';
  import { formatNumber } from '$lib/utils/format';
  import type { TradePageData } from '$lib/utils/trade';

  let classProp = 'col-span-full sm:col-span-6 lg:col-span-4';

  export { classProp as class };

  export let data: Partial<TradePageData> = {};

  let config: Highcharts.Options;
  $: config = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 10,
      },
    },
    title: {
      text: null,
    },
    // subtitle: {
    //   text: null,
    // },
    plotOptions: {
      pie: {
        innerSize: 55,
        depth: 45,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
    },
    series: [
      {
        name: 'Trades',
        type: 'pie',
        data: [
          ['Wins', data?.totalWins ?? 0],
          ['Losses', data?.totalLosses ?? 0],
        ],
      },
    ],
  };
</script>

<div
  class="overflow-hidden rounded-lg bg-white shadow dark:bg-neutral-900/50 dark:shadow-neutral-800 {classProp}"
>
  <div class="px-6 pt-5 pb-1">
    <div class="flex items-center">
      <div class="w-0 flex-1">
        <dl>
          <dt class="truncate text-sm font-medium capitalize text-teal-500">
            Win Ratio
          </dt>
          <dd>
            <div
              class="text-lg font-medium text-neutral-900 dark:text-neutral-100"
            >
              {formatNumber((data?.winRatio ?? 0) * 100, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span class="text-xs text-neutral-500">%</span>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
  <div class="w-full px-6">
    <!-- <div id="trade-win-ratio-container" class="h-40" use:highChart={config} /> -->
    <div class="flex w-full items-end justify-between">
      <div class="text-sm font-medium capitalize text-neutral-300">
        <div
          class="inline-flex items-center justify-center rounded-md bg-green-500 p-0.5 dark:bg-green-500 dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 -0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="h-3 w-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <span class="ml-1 inline text-base">
          {formatNumber(data?.winRatio ?? 0, {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div class="text-sm font-medium capitalize text-neutral-300">
        <span class="ml-1 inline text-base">
          {formatNumber(1 - (data?.winRatio ?? 0), {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
          <div
            class="ml-1 inline-flex items-center justify-center rounded-md bg-red-500 p-0.5 dark:bg-red-500 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 -0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="h-3 w-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </span>
      </div>
    </div>
    <div class="h-2.5 w-full rounded-full bg-red-500 dark:bg-red-600">
      <div
        class="h-2.5 rounded-l-full bg-green-600 dark:bg-green-500"
        style="width: {(data?.winRatio ?? 0) * 100}%"
      />
    </div>
  </div>
</div>

<style global lang="postcss">
  #trade-win-ratio-container .highcharts-background {
    @apply fill-transparent;
  }
</style>
