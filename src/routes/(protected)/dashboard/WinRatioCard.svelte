<script lang="ts">
  import { formatNumber } from '$lib/utils/format';
  import StatCard from './StatCard.svelte';

  let classProp = '';
  export { classProp as class };
  export let title: string;
  export let wins: number;
  export let losses: number;

  $: ratio = wins / (wins + losses);
</script>

<StatCard
  {title}
  value={formatNumber(ratio, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    style: 'percent',
  })}
  class={classProp}
>
  <svelte:fragment slot="value" let:value>
    <dd class="w-full">
      <div
        class="block w-full text-lg font-semibold text-neutral-600 dark:text-neutral-300"
      >
        <span class="mr-2">
          {value}
        </span>
      </div>
      <div class="w-full">
        <div class="mt-1 flex w-full">
          <div class="flex-1 text-xs text-neutral-600 dark:text-neutral-400">
            W
            <span class="text-green-600 dark:text-green-400">
              {wins}
            </span>
          </div>
          <div
            class="flex-1 text-right text-xs text-neutral-600 dark:text-neutral-400"
          >
            L <span class="text-red-600 dark:text-red-400">{losses}</span>
          </div>
        </div>
        <div
          class="my-1 flex h-4 w-full divide-x-2 divide-white rounded-sm border dark:divide-black dark:border-neutral-700"
        >
          <div
            class="rounded-l-sm bg-green-400 dark:bg-green-600"
            style="min-width: {ratio * 100}%;"
          >
            &nbsp;
          </div>
          <div
            class="rounded-r-sm bg-red-400 dark:bg-red-700"
            style="width: {(1 - ratio) * 100}%;"
          >
            &nbsp;
          </div>
        </div>
      </div>
    </dd>
  </svelte:fragment>
</StatCard>
