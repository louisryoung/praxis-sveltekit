<script lang="ts">
  import type { TradeAcct } from '$lib/types';

  export let tradingAccounts: TradeAcct[] = [];
</script>

<!-- TradingAccount list (smallest breakpoint only) -->
<div class="shadow dark:shadow-neutral-700 sm:hidden">
  <ul
    role="list"
    class="mt-2 divide-y divide-neutral-200 overflow-hidden shadow sm:hidden"
  >
    {#each tradingAccounts as tradingAccount}
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
                <span class="truncate">{tradingAccount.name}</span>
                <span class="truncate">{tradingAccount.broker}</span>
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
    <!-- More tradingAccounts... -->
  </ul>
</div>

<!-- TradingAccount table (small breakpoint and up) -->
<div class="hidden sm:block">
  <div class="3xl:max-w-[105rem] mx-auto px-4 sm:px-6 md:max-w-[92rem] lg:px-8">
    <div class="mt-2 flex flex-col">
      <div
        class="scrollbar min-w-full overflow-hidden overflow-x-auto align-middle shadow dark:shadow-neutral-700 sm:rounded-lg"
      >
        <table
          class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800"
          role="grid"
        >
          <thead>
            <tr>
              <th
                class="bg-neutral-50 px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                scope="col"
                data-sort="name"
              >
                Name
              </th>
              <th
                class="bg-neutral-50 px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                scope="col"
                data-sort="broker"
              >
                Broker
              </th>

              <th
                class="bg-neutral-50 px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                scope="col"
                data-sort="createdAt"
              >
                Created
              </th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-neutral-200 bg-white dark:divide-neutral-800 dark:bg-black"
          >
            {#each tradingAccounts as tradingAccount}
              <tr class="group peer bg-white text-white dark:bg-black">
                <td
                  class="relative h-12 w-16 px-8 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
                  role="gridcell"
                  aria-colindex={1}
                  tabindex="0"
                >
                  {tradingAccount.name}
                </td>
                <td
                  class="relative h-12 w-16 px-8 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
                  role="gridcell"
                  aria-colindex={1}
                  tabindex="0"
                >
                  {tradingAccount.broker}
                </td>
                <td
                  class="relative h-12 w-16 px-8 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 [.selected_&]:bg-neutral-50 dark:[.selected_&]:bg-neutral-900"
                  role="gridcell"
                  aria-colindex={1}
                  tabindex="0"
                >
                  {new Date(tradingAccount.createdAt).toLocaleDateString()}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
