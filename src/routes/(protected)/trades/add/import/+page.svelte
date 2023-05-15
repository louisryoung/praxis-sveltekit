<script lang="ts">
  import { filedrop, type FileDropOptions } from 'filedrop-svelte';
  import { humanFileSize } from '$lib/utils/files';
  import CircleSpinner from '$lib/components/loaders/spinners/CircleSpinner.svelte';
  import { parseCSV } from '$lib/utils/parseCSV';
  // import TradeListSimple from '$lib/components/TradeListSimple.svelte';
  import Trades from './Trades.svelte';
  import type { Trade } from '$lib/types';
  import type { PageData } from './$types';

  const options = {
    fileLimit: 1,
    accept: '.csv',
  } as FileDropOptions;

  let files: File[] = [];
  let parsed = false;
  let tradesItems: Trade[] = [];
  export let data: PageData;

  const handleFileDrop = (ev: CustomEvent) => {
    files = ev?.detail?.files?.accepted ?? files;
    parsed = false;
  };

  const handleParse = () => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      const { success, error, trades } = parseCSV(text as string);
      if (!success || error) {
        alert(
          'Error parsing CSV file. Please check the format of your file and try again.'
        );
        return;
      }
      parsed = true;
      tradesItems = trades ?? [];
    };
    reader.readAsText(files[0]);
  };

  let loading = false;

  const handleImport = async () => {
    let loading = true;
    const res = await fetch('/api/trades/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trades: tradesItems,
        tradeAccountIDs: data?.tradeAccounts?.map((ta) => ta.id) ?? [],
      }),
    });
    if (res.ok) {
      alert('Trades imported successfully!');
      parsed = false;
      files = [];
      tradesItems = [];
    } else {
      alert('Error importing trades. Please try again.');
    }
    loading = false;
  };
</script>

<div
  class="flex min-h-full w-full flex-col items-center justify-center gap-4 pt-8"
>
  <div
    class="flex w-full max-w-xl items-center justify-center"
    class:hidden={parsed}
    use:filedrop={options}
    on:filedrop={handleFileDrop}
  >
    <label
      for="trade-file"
      class="group flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 transition-colors duration-200 ease-in-out hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900/50 dark:hover:border-neutral-500 dark:hover:bg-neutral-900"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {#if files.length > 0}
          {#each files as file}
            {file.name}
            {humanFileSize(file.size)}
          {/each}
        {:else}
          <svg
            aria-hidden="true"
            class="mb-3 h-10 w-10 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p class="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            CSV files only
          </p>
        {/if}
      </div>
      <input type="file" name="trade_file" id="trade-file" class="hidden" />
    </label>
  </div>
  {#if files.length > 0 && !parsed}
    <div class="flex w-full max-w-xl items-center justify-end">
      <button
        class="rounded-md border border-amber-500 bg-amber-100 py-1.5 px-8 text-sm font-bold text-amber-600 transition-colors duration-200 ease-in-out hover:bg-amber-200 dark:border-amber-600 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/50"
        on:click={handleParse}
      >
        Read
      </button>
    </div>
  {:else if parsed}
    <div class="mx-auto flex max-w-7xl justify-start px-4 sm:px-6 lg:px-8">
      <button
        class="rounded-md border border-teal-500 bg-teal-100 py-1.5 px-8 text-sm font-bold text-teal-600 transition-colors duration-200 ease-in-out hover:bg-teal-200 dark:border-teal-600 dark:bg-teal-900/20 dark:text-teal-400 dark:hover:bg-teal-900/50"
        on:click={handleImport}
      >
        <CircleSpinner class="mr-2 inline h-5 w-5" show={loading} />
        Import
      </button>
    </div>
  {/if}
  {#if parsed}
    <div class="flex w-full">
      <!-- <TradeListSimple items={tradesItems} bodyClass="h-[30rem]" /> -->
      <Trades trades={tradesItems} />
    </div>
  {/if}
</div>

<!-- <div class="w-full">
    <p class="dark:text-white"> Net Cumulative P&L </p>
        <h1 class="text-xl text-bold text-[#99dcf2b6] dark:text-[#99DCF2] mt-1">
          {data?.totalNetProfit}
        </h1>
  <NetPlChart data={data?.cumulativeDailyPL} />
  </div> -->
