<script lang="ts">
  import TradeTable from '$lib/components/TradeTable.svelte';
  import type { Trade } from '$lib/types';

  export let trades: Trade[];

  $: sliced = trades?.slice(start, start + LIMIT) ?? [];

  $: total = trades?.length ?? 0;

  const LIMIT = 10;
  let start = 0;

  const handleNext = () => {
    if (start + LIMIT < total) {
      start += LIMIT;
    }
  };

  const handlePrevious = () => {
    if (start > 0) {
      start -= LIMIT;
    }
  };
</script>

<div class="hidden w-full sm:block">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mt-2 flex flex-col">
      <div
        class="min-w-full overflow-hidden overflow-x-auto align-middle shadow dark:shadow-neutral-700 sm:rounded-lg"
      >
        <TradeTable trades={sliced} />
        <nav
          class="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-black sm:px-6"
          aria-label="Pagination"
        >
          <div class="hidden sm:block">
            <p class="text-sm text-gray-700 dark:text-neutral-300">
              Showing
              <span class="font-medium">{start + 1}</span>
              to
              <span class="font-medium">{Math.min(start + LIMIT, total)}</span>
              of
              <span class="font-medium">{total}</span>
              results
            </p>
          </div>
          <div class="flex flex-1 justify-between sm:justify-end">
            <button
              type="button"
              on:click={handlePrevious}
              class="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              Previous
            </button>
            <button
              type="button"
              on:click={handleNext}
              class="relative ml-3 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</div>
