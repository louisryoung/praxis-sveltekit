<script lang="ts">
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import TradeDetailTable from '$lib/components/TradeDetailTable.svelte';
  import { formatCurrency, formatDateTime } from '$lib/utils/format';
  import Card from './Card.svelte';
  import Card2 from './Card2.svelte';
  import Card3 from './Card3.svelte';
  import RealTimeChart from './RealTimeChart.svelte';
  import type { PageData } from './$types';
  import InputSection from './InputSection.svelte';

  export let data: PageData;

  const handleBack = () => {
    history.back();
  };
</script>

<div
  class="scrollbar relative flex h-full max-h-full w-full flex-col pb-16 [&::-webkit-scrollbar]:w-2.5"
>
  <Breadcrumb class="xl:!flex" />
  <div class="mx-auto w-full max-w-[92rem] py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
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
      <a
        href="/trades/{data?.previousTrade?.id}"
        class="relative ml-auto inline-flex items-center rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm font-medium leading-6 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900 {data
          ?.previousTrade?.id
          ? ''
          : 'pointer-events-none opacity-50'}"
      >
        <svg
          class="mr-1.5 inline h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="mr-2 capitalize">Previous Trade</span>
      </a>
      <a
        href="/trades/{data?.nextTrade?.id}"
        class="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm font-medium leading-6 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900 {data
          ?.nextTrade?.id
          ? ''
          : 'pointer-events-none opacity-50'}"
      >
        <span class="ml-2 capitalize">Next Trade</span>
        <svg
          class="ml-1.5 inline h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          ><path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          /></svg
        >
      </a>
    </div>
    <h2
      class="mt-10 mb-2 text-3xl font-semibold uppercase leading-6 text-teal-500"
    >
      {data?.trade?.symbol}
    </h2>
    <div class="flex items-center justify-between">
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
      <InputSection
        trade={data?.trade}
        inputs={data?.inputs}
        class="col-span-full md:col-span-6 xl:col-span-8"
      />
    </div>
  </div>
  <div class="mx-auto w-full max-w-[92rem] py-4 px-4 sm:px-6 lg:py-6 lg:px-8">
    <h2
      class="mb-2 text-lg font-medium capitalize leading-6 text-neutral-900 dark:text-neutral-100"
    >
      history
    </h2>
    <div
      class="scrollbar min-w-full overflow-hidden overflow-x-auto align-middle shadow dark:shadow-neutral-700 sm:rounded-lg"
    >
      <TradeDetailTable trade={data?.trade} />
    </div>
  </div>
  <div class="mx-auto w-full max-w-[92rem] py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
    <h2
      class="mb-2 text-lg font-medium capitalize leading-6 text-neutral-900 dark:text-neutral-100"
    >
      Trade Chart
    </h2>
    <RealTimeChart
      class="h-80 lg:h-96 xl:h-[30rem]"
      symbol={data?.trade?.symbol}
    />
  </div>
</div>
