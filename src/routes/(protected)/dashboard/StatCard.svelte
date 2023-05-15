<script lang="ts">
  import { formatNumber } from '$lib/utils/format';

  export let title: string;
  export let value: any;
  export let change = 0;
  let classProp = '';
  export { classProp as class };
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-200/70 bg-neutral-50 transition-colors duration-200 ease-in-out hover:bg-neutral-100 dark:border-neutral-800/70 dark:bg-neutral-900/70 dark:hover:bg-neutral-900 {classProp}"
>
  <div class="px-5 py-3">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <!-- <svg
        class="h-6 w-6 text-neutral-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
        />
      </svg> -->
      </div>
      <div class="ml-0 w-0 flex-1">
        <dl>
          <dt>
            <p
              class="truncate text-sm font-medium capitalize text-teal-500 dark:text-teal-500"
            >
              {title}
            </p>
          </dt>
          <slot name="value" {value}>
            <dd class="flex items-baseline justify-between md:block lg:flex">
              <div
                class="flex items-baseline text-lg font-semibold text-neutral-600 dark:text-neutral-300"
              >
                {value}
              </div>

              <!-- <span class="ml-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">from 70,946</span> -->

              {#if change > 0}
                <div
                  class="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-700 dark:bg-green-900/50 dark:text-green-300 md:mt-2 lg:mt-0"
                >
                  <!-- Heroicon name: mini/arrow-up -->
                  <svg
                    class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only"> Increased by </span>
                  <span
                    class="text-green-600 dark:text-green-300"
                    aria-hidden="true"
                  >
                    {formatNumber(change, {
                      style: 'percent',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              {:else if change < 0}
                <div
                  class="inline-flex items-baseline rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-700 dark:bg-red-900/50 dark:text-red-300 md:mt-2 lg:mt-0"
                >
                  <!-- Heroicon name: mini/arrow-up -->
                  <svg
                    class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only"> Increased by </span>
                  <span
                    class="text-red-600 dark:text-red-300"
                    aria-hidden="true"
                  >
                    {formatNumber(change, {
                      style: 'percent',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              {/if}
            </dd>
          </slot>
        </dl>
      </div>
    </div>
  </div>
</div>
