<script lang="ts">
  import highChart3D from '$lib/actions/highChart3D';
  import { darkMode } from '$lib/stores/themes';
  import type { TradePageData } from '$lib/utils/trade';
  import StatCard from './StatCard.svelte';

  let classProp = 'w-full';

  export { classProp as class };

  export let data: Partial<TradePageData> = {};

  let value = 4.23;

  let config: Highcharts.Options;
  $: config = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 10,
      },
      height: '62.5%',
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0],
    },
    title: {
      text: null,
    },
    colors: [
      $darkMode ? '#007270' : '#007270',
      $darkMode ? '#008877' : '#008877',
      $darkMode ? '#009D7C' : '#009D7C',
      $darkMode ? '#00B37E' : '#00B37E',
      $darkMode ? '#4ADE80' : '#4ADE80',
    ],
    // subtitle: {
    //   text: null,
    // },
    plotOptions: {
      pie: {
        innerSize: 35,
        depth: 45,
        //   size: '100%',
        //   minSize: '100%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: 'Ratings',
        type: 'pie',
        data: [
          // star imoji
          ['1 star ★', Math.floor(Math.random() * 1000)],
          ['2 star ★★', Math.floor(Math.random() * 1000)],
          ['3 star ★★★', Math.floor(Math.random() * 1000)],
          ['4 star ★★★★', Math.floor(Math.random() * 1000)],
          ['5 star ★★★★★', Math.floor(Math.random() * 1000)],
        ],
      },
    ],
  };
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-200/70 bg-neutral-50 transition-colors duration-200 ease-in-out hover:bg-neutral-100 dark:border-neutral-800/70 dark:bg-neutral-900/70 dark:hover:bg-neutral-900 {classProp}"
>
  <div class="px-5 py-3">
    <div class="flex items-center">
      <div class="flex-shrink-0" />
      <div class="ml-0 w-0 flex-1">
        <dl>
          <dt>
            <p
              class="truncate text-sm font-medium capitalize text-teal-500 dark:text-teal-500"
            >
              trade ratings
            </p>
          </dt>
          <dd class="relative h-20 w-full">
            <div
              class="block w-full text-lg font-semibold text-neutral-600 dark:text-neutral-300"
            >
              <span class="mr-2">
                {value}
                <span class="text-xs">/ 5</span>
              </span>
              <span class="text-sm capitalize text-neutral-500">avg</span>
            </div>
            <div
              id="trade-win-ratio-container"
              class="absolute -top-8 right-0 z-[0] h-36 w-52 translate-x-10 text-green-400"
              use:highChart3D={config}
            />
          </dd>
        </dl>
        <dl class="mt-auto flex items-center justify-start gap-x-1">
          <dt>
            <span
              class="truncate text-xs font-medium capitalize text-teal-600 dark:text-teal-500"
            >
              Total:
            </span>
          </dt>
          <dd class="mt-0.5 text-sm dark:text-white">
            <span
              class="text-xs font-medium text-neutral-700 dark:text-neutral-300"
            >
              128
            </span>
            <!-- /
      <span class="text-xs font-medium text-neutral-700 dark:text-neutral-300">
        {Object.values(emotions).length}
      </span> -->
          </dd>
        </dl>
      </div>
    </div>
  </div>
</div>

<style global lang="postcss">
  #trade-win-ratio-container .highcharts-background {
    @apply fill-transparent;
  }

  #trade-win-ratio-container .highcharts-container {
    @apply mt-0.5;
  }
</style>
