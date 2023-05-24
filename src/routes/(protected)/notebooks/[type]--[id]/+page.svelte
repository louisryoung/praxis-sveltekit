<script lang="ts">
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import TradeDetailTable from '$lib/components/TradeDetailTable.svelte';
  import { tradeColumns } from '$lib/stores/tables';
  import { formatCurrency, formatDateTime } from '$lib/utils/format';
  import Card from './Card.svelte';
  import Card2 from './Card2.svelte';
  import Card3 from './Card3.svelte';
  import RealTimeChart from './RealTimeChart.svelte';
  import type { PageData } from './$types';
  import TradeList from './TradeList.svelte';
  import NetPlChart from './NetPlChart.svelte';
  import Tag from '$lib/components/Tag.svelte';

  export let data: PageData;

  const handleBack = () => {
    history.back();
  };

  $: columns = Object.fromEntries(
    Object.entries($tradeColumns).map(([k, _]) => [k, true])
  );
</script>

<div
  class="scrollbar relative flex h-full max-h-full w-full flex-col pb-16 [&::-webkit-scrollbar]:w-2.5"
>
  <Breadcrumb class="xl:!flex" />
  <div class="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
    <div class="flex w-full items-center justify-start gap-2">
      <button
        class="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm font-medium leading-6 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900"
        on:click={handleBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="inlne -mt-1 mr-2 h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        <span class="capitalize">back</span>
      </button>
    </div>
    <h2
      class="mb-2 mt-10 flex items-center justify-start gap-2 text-3xl font-semibold capitalize leading-6 dark:text-white"
    >
      notebook
      <Tag
        text={data?.notebook?.type}
        color={[20, 184, 166]}
        showBullet
        class="!px-3.5"
      >
        <span slot="text" let:text class="text-[0.65rem] font-bold uppercase">
          {text}
        </span>
      </Tag>
    </h2>
    <!-- <div class="flex items-center justify-between">
      <span
        class="text-lg font-medium capitalize leading-6 text-neutral-900 dark:text-neutral-100"
      >
        {formatDateTime(data?.trade?.closeDate || new Date(), {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </span>
      <div class="flex items-center">
        <span
          class="text-lg font-medium capitalize leading-6 text-neutral-900 dark:text-neutral-100"
        >
          gross p&l:
        </span>
        {#if (data?.trade?.netPL ?? 0) > 0}
          <span
            class="ml-2 font-medium capitalize leading-6 text-green-600 dark:text-green-500"
          >
            {formatCurrency(data?.trade?.netPL ?? 0, 'USD')}
          </span>
        {:else if (data?.trade?.netPL ?? 0) < 0}
          <span
            class="ml-2 font-medium capitalize leading-6 text-red-600 dark:text-red-500"
          >
            {formatCurrency(data?.trade?.netPL ?? 0, 'USD')}
          </span>
        {:else}
          <span
            class="ml-2 font-medium capitalize leading-6 text-neutral-500 dark:text-neutral-400"
          >
            {formatCurrency(data?.trade?.netPL ?? 0, 'USD')}
          </span>
        {/if}
      </div>
    </div>
    <div class="mt-6 grid w-full grid-cols-12 gap-4">
      <Card2
        trade={data?.trade}
        inputs={data?.inputs}
        class="col-span-full md:col-span-6 xl:col-span-4"
      />
    </div> -->
  </div>
  <div
    class="mx-auto w-full max-w-[92rem] px-4 pb-2 pt-4 sm:px-6 lg:px-8 lg:pt-6"
  >
    <NetPlChart
      data={data?.tradeData?.chartData}
      totalNetProfit={data?.tradeData?.totalNetProfit}
      class="col-span-full h-56 xl:col-span-6"
    />
  </div>
  <div
    class="mx-auto w-full max-w-[92rem] px-4 pb-2 pt-4 sm:px-6 lg:px-8 lg:pt-6"
  >
    <h2
      class="mb-2 text-lg font-medium capitalize leading-6 text-neutral-900 dark:text-neutral-100"
    >
      history
    </h2>
  </div>
  <TradeList trades={data?.trades ?? []} {columns} />
  <!-- <div class="mx-auto w-full max-w-[92rem] py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
    <h2
      class="mb-2 text-lg font-medium capitalize leading-6 text-neutral-900 dark:text-neutral-100"
    >
      Trade Chart
    </h2>
    <RealTimeChart
      class="h-80 lg:h-96 xl:h-[30rem]"
      symbol={data?.trade?.symbol}
    />
  </div> -->
</div>
