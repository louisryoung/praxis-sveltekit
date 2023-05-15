<script lang="ts">
  import { page } from '$app/stores';
  import TradeTable from '$lib/components/TradeTable.svelte';
  import type { Trade, TradeTableColumn } from '$lib/types';

  export let trades: Trade[] = [];
  export let columns: Partial<Record<TradeTableColumn, boolean>>;
</script>

<!-- Trade list (smallest breakpoint only) -->
<div class="shadow dark:shadow-neutral-700 sm:hidden">
  <ul
    role="list"
    class="mt-2 divide-y divide-neutral-200 overflow-hidden shadow sm:hidden"
  >
    {#each trades as trade}
      <li>
        <a href="#" class="block bg-white px-4 py-4 hover:bg-neutral-50">
          <span class="flex items-center space-x-4">
            <span class="flex flex-1 space-x-2 truncate">
              <!-- Heroicon name: mini/banknotes -->
              <svg
                class="h-5 w-5 flex-shrink-0 text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="flex flex-col truncate text-sm text-neutral-500">
                <span class="truncate">Payment to Molly Sanders</span>
                <span
                  ><span
                    class="font-medium text-neutral-900 dark:text-neutral-100"
                    >$20,000</span
                  > USD</span
                >
                <time datetime="2020-07-11">July 11, 2020</time>
              </span>
            </span>
            <!-- Heroicon name: mini/chevron-right -->
            <svg
              class="h-5 w-5 flex-shrink-0 text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </a>
      </li>
    {/each}
    <!-- More trades... -->
  </ul>

  <nav
    class="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3"
    aria-label="Pagination"
  >
    <div class="flex flex-1 justify-between">
      <a
        href="?offset={$page.data.pagination.previous.offset}&limit={$page.data
          .pagination.limit}"
        class="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-500 {$page
          .data.pagination.previous.disabled
          ? 'pointer-events-none cursor-not-allowed opacity-50'
          : ''}"
        aria-disabled={$page.data.pagination.previous.disabled}
      >
        Previous
      </a>
      <a
        href="?offset={$page.data.pagination.next.offset}&limit={$page.data
          .pagination.limit}"
        class="relative ml-3 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-500 {$page
          .data.pagination.next.disabled
          ? 'pointer-events-none cursor-not-allowed opacity-50'
          : ''}"
        aria-disabled={$page.data.pagination.next.disabled}
      >
        Next
      </a>
    </div>
  </nav>
</div>

<!-- Trade table (small breakpoint and up) -->
<div class="hidden sm:block">
  <div class="mx-auto md:max-w-[92rem] 3xl:max-w-[105rem] px-4 sm:px-6 lg:px-8">
    <div class="mt-2 flex flex-col">
      <div
        class="scrollbar min-w-full overflow-hidden overflow-x-auto align-middle shadow dark:shadow-neutral-700 sm:rounded-lg"
      >
        <TradeTable {trades} {columns} />
        <div
          class="sticky left-0 bottom-0 flex w-full items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-black sm:px-6"
        >
          <div class="flex flex-1 justify-between sm:hidden">
            <a
              href="?offset={$page.data.pagination.previous.offset}&limit={$page
                .data.pagination.limit}"
              class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-800 dark:bg-black dark:text-gray-300 dark:hover:bg-neutral-900 {$page
                .data.pagination.previous.disabled
                ? 'pointer-events-none cursor-not-allowed opacity-50'
                : ''}"
              aria-disabled={$page.data.pagination.previous.disabled}
            >
              Previous
            </a>
            <a
              href="?offset={$page.data.pagination.next.offset}&limit={$page
                .data.pagination.limit}"
              class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-800 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-900 {$page
                .data.pagination.next.disabled
                ? 'pointer-events-none cursor-not-allowed opacity-50'
                : ''}"
              aria-disabled={$page.data.pagination.next.disabled}
            >
              Next
            </a>
          </div>
          <div
            class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing
                <span class="font-medium">
                  {$page.data.pagination.start}
                </span>
                to
                <span class="font-medium">
                  {$page.data.pagination.end}
                </span>
                of
                <span class="font-medium">
                  {$page.data.pagination.total}
                </span>
                results
              </p>
            </div>
            <div>
              <nav
                class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href="?offset={$page.data.pagination.previous
                    .offset}&limit={$page.data.pagination.limit}"
                  class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-neutral-800 dark:bg-black dark:text-gray-400 dark:hover:bg-neutral-900 {$page
                    .data.pagination.previous.disabled
                    ? 'pointer-events-none cursor-not-allowed opacity-50'
                    : ''}"
                  aria-disabled={$page.data.pagination.previous.disabled}
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="h-5 w-5"
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
                </a>
                <!-- Current: "z-10 bg-teal-50 border-teal-500 text-teal-600", Default: "bg-white dark:bg-black border-gray-300 dark:border-neutral-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900" -->
                <a
                  href="#"
                  aria-current="page"
                  class="relative z-10 inline-flex items-center border border-teal-500 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-600 focus:z-20 dark:bg-teal-900/50 dark:text-teal-400"
                >
                  {$page.data.pagination.current.index + 1}
                </a>
                <a
                  href="#"
                  class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-neutral-800 dark:bg-black dark:text-gray-400 dark:hover:bg-neutral-900"
                  >2</a
                >
                <a
                  href="#"
                  class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-neutral-800 dark:bg-black dark:text-gray-400 dark:hover:bg-neutral-900 lg:inline-flex"
                  >3</a
                >
                <span
                  class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-neutral-800 dark:bg-black dark:text-gray-300"
                  >...</span
                >
                <a
                  href="#"
                  class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-neutral-800 dark:bg-black dark:text-gray-400 dark:hover:bg-neutral-900 lg:inline-flex"
                  >8</a
                >
                <a
                  href="#"
                  class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-neutral-800 dark:bg-black dark:text-gray-400 dark:hover:bg-neutral-900"
                  >9</a
                >
                <a
                  href="#"
                  class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-neutral-800 dark:bg-black dark:text-gray-400 dark:hover:bg-neutral-900"
                  >10</a
                >
                <a
                  href="?offset={$page.data.pagination.next.offset}&limit={$page
                    .data.pagination.limit}"
                  class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-neutral-800 dark:bg-black dark:text-gray-400 dark:hover:bg-neutral-900 {$page
                    .data.pagination.next.disabled
                    ? 'pointer-events-none cursor-not-allowed opacity-50'
                    : ''}"
                  aria-disabled={$page.data.pagination.next.disabled}
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
