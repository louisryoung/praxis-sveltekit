<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import type { PageData } from './$types';
  import TradingAccountList from './TradingAccountList.svelte';

  export let data: PageData;
  let adding = false;
  const handleAddTrade = () => {
    adding = true;
  };

  const BROKER_LIST = [
    'DasTrader',
    'E-Trade',
    'Generic',
    'LightSpeed',
    'MetaTrader4',
    'MetaTrader5',
    'NinjaTrader',
    'Questrade',
    'Refinitiv Redi',
    'Rithmic R Trader',
    'Sierra Chart',
    'Silexx',
    'Sterling Trader Pro',
    'Tastyworks',
    'TC2000',
    'TD Direct Investments',
    'Thinkorswim',
    'Trade Station',
    'TradeZero',
    'TradingView',
    'Tradovate',
    'Webull',
  ];
</script>

<div class="w-full">
  <div class="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
    <div class="flex items-end justify-between">
      <h1
        class="text-3xl font-bold capitalize tracking-tight text-neutral-900 dark:text-neutral-100"
      >
        Trading Accounts
      </h1>
      <button
        type="button"
        disabled={adding}
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
        Add Trading Account
      </button>
    </div>
  </div>
  <div
    class={`3xl:max-w-[105rem] mx-auto px-4 sm:px-6 md:max-w-[92rem] lg:px-8 ${
      adding ? '' : 'hidden'
    }`}
  >
    <form
      method="POST"
      action="?/add_trading_account"
      class="relative flex w-full items-center justify-start text-neutral-900 dark:text-neutral-100"
      use:enhance={({ form }) => {
        return async ({ result }) => {
          adding = false;
          if (result.type === 'failure') {
          } else if (result.type === 'success') {
            form.reset();
            location.reload();
          }
          await applyAction(result);
        };
      }}
    >
      <div class="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
        <div class="sm:col-span-3">
          <label
            for="name"
            class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >Name</label
          >
          <input
            type="text"
            name="name"
            id="name"
            autocomplete="email"
            class="mt-1 block w-full rounded-md border-neutral-300 text-neutral-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 sm:text-sm"
          />
        </div>

        <div class="sm:col-span-3">
          <label
            for="broker"
            class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >Broker</label
          >
          <select
            name="broker"
            id="broker"
            class="mt-1 block w-full rounded-md border-neutral-300 text-neutral-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 sm:text-sm"
          >
            {#each BROKER_LIST as broker}
              <option>{broker}</option>
            {/each}
          </select>
        </div>

        <button
          type="button"
          class="rounded-md border border-neutral-300 bg-white px-6 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors duration-200 ease-in-out hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black dark:border-neutral-700 dark:bg-black dark:text-neutral-100 dark:hover:bg-neutral-900"
          on:click={() => {
            adding = false;
          }}>Cancel</button
        >
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-teal-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black dark:bg-teal-500 dark:text-black dark:hover:bg-teal-600 dark:hover:text-neutral-800"
          >Save</button
        >
      </div>

      <div class="flex justify-end pt-8" />
    </form>
  </div>

  <TradingAccountList tradingAccounts={data?.tradingAccounts ?? []} />

  <div class="h-28 w-full" aria-hidden="true" />
</div>
