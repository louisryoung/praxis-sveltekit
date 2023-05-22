<script lang="ts">
  import { formatNumber } from '$lib/utils/format';

  export let title: string;
  export let value: any;
  export let change = 0;
  let classProp = '';
  export { classProp as class };
</script>

<div
  class="group/card relative overflow-hidden rounded-lg border border-neutral-200/70 bg-neutral-50 px-4 py-5 transition-colors duration-200 ease-in-out hover:border-teal-400/20 hover:bg-teal-100/20 dark:border-neutral-800/70 dark:bg-neutral-900/70 dark:hover:border-teal-500/20 dark:hover:bg-teal-900/20 sm:px-6 sm:py-6 {classProp}"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="absolute right-6 top-6 h-6 w-6 -translate-x-1 scale-90 text-black/50 transition-transform duration-200 ease-in-out group-hover/card:translate-x-0 group-hover/card:scale-100 group-hover/card:text-black/80 dark:text-white/50 dark:group-hover/card:text-white/80"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
  <dt>
    <p
      class="truncate text-sm font-medium capitalize text-teal-500 dark:text-teal-500"
    >
      {title}
    </p>
  </dt>
  <dd
    class="mt-1 flex flex-wrap items-baseline justify-between md:block lg:flex"
  >
    <div
      class="flex items-baseline text-xl font-semibold text-neutral-600 dark:text-neutral-300"
    >
      <slot name="value" {value}>
        {value}
      </slot>
    </div>

    {#if change > 0}
      <div
        class="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-700 dark:bg-green-900/50 dark:text-green-300 md:mt-2 lg:mt-0"
      >
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
        <span class="text-green-600 dark:text-green-300" aria-hidden="true">
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
        <svg
          class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 rotate-180 self-center text-red-500"
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
        <span class="text-red-600 dark:text-red-300" aria-hidden="true">
          {formatNumber(change, {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    {/if}
    <slot name="other" />
  </dd>
</div>
