<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { clickOutside } from '$lib/actions/clickOutside';
  import { tradeColumns as columns } from '$lib/stores/tables';
  import { Select } from 'flowbite-svelte';
  import MultiSelect from 'svelte-multiselect-new';
  const dispatch = createEventDispatcher();

  let showFilters: boolean = false;
  let showColumns: boolean = false;

  let selectAllColumns: boolean = true;

  let selected: string;
  let selectedSymbol: string;
  let selectedIntraday: string;
  let selectedInstrument: string;
  let selectedSide: string;
  let selectedMistakeValues: string[] = [];
  let selectedStatusValues: string[] = [];
  let selectedPlayBookValues: string[] = [];
  let FTOpenCloseOptions = [
    { value: 'open', name: 'open' },
    { value: 'close', name: 'closed' },
  ];

  let FTSetupOptions = [
    {
      label: 'earnings and winner',
      value: 'earnings and winner',
    },
    {
      label: 'gap and go',
      value: 'gap and go',
    },
  ];

  let FTIntradayOptions = [
    {
      value: 'intraday',
      name: 'Intraday',
    },
    {
      value: 'swing',
      name: 'Swing',
    },
  ];

  let FTSymbolOptions = [
    {
      value: 'meta',
      name: 'Meta',
    },
    {
      value: 'panw',
      name: 'PANW',
    },
  ];

  let FTInstrumentOptions = [
    {
      value: 'mobile',
      name: 'mobile',
    },
    {
      value: 'desktop',
      name: 'desktop',
    },
  ];

  let FTMistakeOptions = [
    {
      label: 'chased',
      value: 'chased',
    },
    {
      label: 'did not losses quickly',
      value: 'did not losses quickly',
    },
    {
      label: 'fomo',
      value: 'fomo',
    },
  ];

  let FTStatusOptions = [
    {
      label: 'Win',
      value: 'win',
    },
    {
      label: 'Loss',
      value: 'loss',
    },
    {
      label: 'Break even',
      value: 'break even',
    },
  ];

  let FTPlayBookOptions = [
    {
      label: 'Algo',
      value: 'algo',
    },
  ];

  let FTSideOptions = [
    {
      value: 'long',
      name: 'Long',
    },
    {
      value: 'short',
      name: 'Short',
    },
  ];

  let selectedSetupValues: string[] = [];

  const handleSelectAllColumns = () => {
    const selectedCount = Object.values($columns).filter(
      (value) => value
    ).length;
    if (selectedCount === Object.keys($columns).length) {
      selectAllColumns = false;
    } else {
      selectAllColumns = true;
    }
    $columns = Object.fromEntries(
      Object.keys($columns).map((key) => [key, selectAllColumns])
    );
  };

  let someColumnsSelected = false;

  const cancel = () => {
    console.log('cancel');
  };

  const applyFilters = () => {
    console.log('apply filters');
  };

  $: {
    const selectedCount = Object.values($columns).filter(
      (value) => value
    ).length;
    if (selectedCount > 0 && selectedCount < Object.keys($columns).length) {
      someColumnsSelected = true;
    } else {
      someColumnsSelected = false;
    }
  }

  $: dispatch('update_columns', $columns);
</script>

<div class="flex w-full items-center gap-2">
  <div class="w-full sm:max-w-xs">
    <label for="search" class="sr-only">Search</label>
    <div class="relative">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <!-- Heroicon name: mini/magnifying-glass -->
        <svg
          class="h-5 w-5 text-neutral-600 dark:text-neutral-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        id="search-trades"
        name="search"
        class="block w-full rounded-md border border-transparent bg-neutral-100 py-2 pl-10 pr-3 text-sm text-neutral-600 placeholder-neutral-400 transition-colors duration-200 ease-in-out focus:border-neutral-300 focus:bg-white focus:text-neutral-900 focus:placeholder-neutral-500 focus:outline-none focus:ring-neutral-300 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-600 dark:focus:border-neutral-700 dark:focus:bg-black dark:focus:text-neutral-100 dark:focus:ring-neutral-700 sm:text-sm"
        placeholder="Search"
        type="search"
      />
    </div>
  </div>
  <div class="relative ml-auto">
    <button
      type="button"
      id="trade-list-columns-button"
      on:click={() => {
        showColumns = !showColumns;
      }}
      class="group inline-flex justify-center rounded-md border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium capitalize text-neutral-700 shadow-sm transition-colors duration-200 ease-in-out hover:bg-neutral-100 focus:outline-none dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900"
      aria-expanded={showColumns ? 'true' : 'false'}
      aria-haspopup="true"
    >
      <svg
        class="mr-2 h-5 w-5 text-neutral-500 transition-colors duration-200 ease-in-out"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>

      columns
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    {#if showColumns}
      <div
        class="absolute right-0 top-0 z-[15] mt-12 w-40 origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-900 dark:bg-black dark:text-white dark:ring-white dark:ring-opacity-20"
        role="menu"
        aria-orientation="vertical"
        tabindex="-1"
        in:scale={{ duration: 100, opacity: 0, start: 0.95 }}
        out:scale={{ duration: 100, opacity: 0, start: 0.95 }}
        use:clickOutside={{
          ignore: '#trade-list-columns-button',
          forceInclude: '[id^=trade-list-columns-item]',
        }}
        on:click_outside={() => {
          showColumns = false;
        }}
      >
        <form class="w-full px-4 pb-4 pt-1">
          <fieldset class="space-y-3 pb-3">
            <legend class="sr-only">Columns</legend>
            <div class="relative flex items-start">
              <div class="flex h-4 items-center">
                <input
                  id="columns-all"
                  name="all_columns"
                  type="checkbox"
                  checked={selectAllColumns}
                  indeterminate={someColumnsSelected}
                  on:change={handleSelectAllColumns}
                  class="h-4 w-4 rounded border-neutral-300 text-teal-600 focus:ring-teal-500 dark:border-neutral-700 dark:focus:ring-offset-black dark:[&:not(:checked)]:bg-black"
                />
              </div>
              <div class="ml-3 text-xs">
                <label
                  for="columns-all"
                  class="font-bold uppercase text-neutral-600 dark:text-neutral-300"
                >
                  all</label
                >
                <!-- <p id="comments-description" class="text-neutral-500">Get notified when someones posts a comment on a posting.</p> -->
              </div>
            </div>
            {#each Object.keys($columns) as column (column)}
              <div class="relative flex items-start">
                <div class="flex h-4 items-center">
                  <input
                    id="column-{column}"
                    name={column}
                    type="checkbox"
                    bind:checked={$columns[column]}
                    class="h-4 w-4 rounded border-neutral-300 text-teal-600 focus:ring-teal-500 dark:border-neutral-700 dark:text-teal-400 dark:focus:ring-offset-black dark:[&:not(:checked)]:bg-black"
                  />
                </div>
                <div class="ml-3 text-xs">
                  <label
                    for="column-{column}"
                    class="font-medium uppercase {$columns[column]
                      ? 'text-neutral-500 dark:text-neutral-400'
                      : 'text-neutral-400 dark:text-neutral-500'}"
                    >{column.replace('_', ' ')}</label
                  >
                  <!-- <p id="comments-description" class="text-neutral-500">Get notified when someones posts a comment on a posting.</p> -->
                </div>
              </div>
            {/each}
          </fieldset>
          <button
            type="submit"
            class="w-full rounded-md bg-teal-500 px-2 py-1 text-white transition-colors duration-200 ease-in-out hover:bg-teal-600 active:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 dark:active:bg-teal-800"
          >
            <span class="text-sm font-medium capitalize">save</span>
          </button>
        </form>
      </div>
    {/if}
  </div>
  <div class="relative">
    <button
      type="button"
      id="trade-list-filter-button"
      on:click={() => {
        showFilters = !showFilters;
      }}
      class="group inline-flex justify-center rounded-md border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium capitalize text-neutral-700 shadow-sm transition-colors duration-200 ease-in-out hover:bg-neutral-100 focus:outline-none dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900"
      aria-expanded={showFilters ? 'true' : 'false'}
      aria-haspopup="true"
    >
      <svg
        class="mr-2 mt-0.5 h-4 w-4 text-neutral-500 transition-colors duration-200 ease-in-out"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      filter
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    {#if showFilters}
      <div
        class="absolute right-0 top-0 z-[15] mt-12 w-[31rem] origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-900 dark:bg-emerald-500 dark:text-white dark:ring-white dark:ring-opacity-20"
        role="menu"
        aria-orientation="vertical"
        tabindex="-1"
        in:scale={{ duration: 100, opacity: 0, start: 0.95 }}
        out:scale={{ duration: 100, opacity: 0, start: 0.95 }}
        use:clickOutside={{
          ignore: '#trade-list-filter-button',
          forceInclude: '[id^=trade-list-filter-item]',
        }}
        on:click_outside={() => {
          showFilters = false;
        }}
      >
        <!-- coming soon -->
        <div class="p-1" role="none">
          <div class="grid grid-cols-2 gap-1 text-gray-300">
            <div class="col-span-1">
              <Select
                class="mt-2 cursor-pointer bg-black text-white"
                items={FTOpenCloseOptions}
                bind:value={selected}
                placeholder="Open/Closed"
              />
              <MultiSelect
                options={FTSetupOptions}
                placeholder="Setups"
                bind:selectedValues={selectedSetupValues}
              />
              <Select
                class="mb-[16px] mt-2 cursor-pointer bg-black text-white"
                items={FTIntradayOptions}
                bind:value={selectedIntraday}
                placeholder="Custom"
                disabled
              />
              <Select
                class="mb-[16px] mt-2 cursor-pointer bg-black text-white"
                items={FTIntradayOptions}
                bind:value={selectedIntraday}
                placeholder="Intraday/Swing"
              />
              <Select
                class="mb-[16px] mt-2 cursor-pointer bg-black text-white"
                items={FTSymbolOptions}
                bind:value={selectedSymbol}
                placeholder="Symbol"
              />
            </div>
            <div class="col-span-1">
              <Select
                class="mt-2 cursor-pointer bg-black text-white"
                items={FTInstrumentOptions}
                bind:value={selectedInstrument}
                placeholder="Instrument"
              />
              <MultiSelect
                options={FTMistakeOptions}
                placeholder="Mistakes"
                bind:selectedValues={selectedMistakeValues}
              />
              <MultiSelect
                options={FTStatusOptions}
                placeholder="Status"
                bind:selectedValues={selectedStatusValues}
              />
              <Select
                class="cursor-pointer bg-black text-white"
                placeholder="Side"
                items={FTSideOptions}
                bind:value={selectedSide}
              />
              <MultiSelect
                options={FTPlayBookOptions}
                placeholder="Playbook"
                bind:selectedValues={selectedPlayBookValues}
              />
            </div>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              class="mr-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-neutral-100 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900"
              on:click={() => {
                showFilters = false;
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg border border-neutral-200 px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-neutral-100 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900"
              on:click={() => {
                showFilters = false;
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style global lang="postcss">
  div.multiselect {
    @apply min-h-[39px] cursor-pointer rounded-[8px] !bg-black;
  }
  .multiselect ul {
    @apply bg-black text-white;
  }

  .multiselect ul li:hover {
    @apply bg-blue-500 text-white;
  }
  .multiselect .remove-all {
    @apply hidden;
  }
</style>
