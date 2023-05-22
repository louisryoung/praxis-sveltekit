<script lang="ts">
  import { goto } from '$app/navigation';
  import { tradeColumns as columns } from '$lib/stores/tables';
  import NetPlCard from './NetPLCard.svelte';
  import TradeList from './TradeList.svelte';
  import NetDailyPlCard from './NetDailyPLCard.svelte';
  import TradeListControlOptions from './TradeListControlOptions.svelte';
  import type { PageData } from './$types';
  import { browser } from '$app/environment';

  export let data: PageData;

  const handleAddTrade = () => {
    goto('/trades/add/import');
  };
</script>

<div class="w-full">
  <div class="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
    <div class="flex items-end justify-between">
      <h1
        class="text-3xl font-bold capitalize tracking-tight text-neutral-900 dark:text-neutral-100"
      >
        Trades
      </h1>
      <button
        type="button"
        class="rounded-lg border border-neutral-200 px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
        on:click={handleAddTrade}
      >
        <svg
          class="-mt-1 inline h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Trades
      </button>
    </div>
    <h2
      class="mt-6 text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100"
    >
      Overview
    </h2>
    <div class="mt-2 grid grid-cols-12 gap-5">
      <NetPlCard
        data={data?.tradeData?.cumulativeDailyPL}
        totalNetProfit={data?.tradeData?.totalNetProfit}
        class="col-span-full h-56 xl:col-span-6"
      />
      <NetDailyPlCard
        data={data?.tradeData?.dailyPL}
        averageDailyPL={data?.tradeData?.averageDailyPL}
        class="col-span-full h-56 xl:col-span-6"
      />
    </div>
  </div>

  <h2
    class="mx-auto mt-8 w-full max-w-[92rem] px-4 text-lg font-medium capitalize leading-6 text-neutral-900 dark:text-neutral-100 sm:px-6 md:mt-2 lg:px-8"
  >
    history
  </h2>
  <div class="mx-auto mt-8 w-full max-w-[92rem] px-4 sm:px-6 md:mt-2 lg:px-8">
    <TradeListControlOptions />
  </div>
  <TradeList trades={data?.trades ?? []} columns={$columns} />
  <div class="h-28 w-full" aria-hidden="true" />
</div>
