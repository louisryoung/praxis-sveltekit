<script lang="ts">
  import TradeTable from '$lib/components/TradeTable.svelte';
  import type { Trade, TradeTableColumn } from '$lib/types';

  export let trades: Trade[] = [];
  export let columns: Partial<Record<TradeTableColumn, boolean>>;
</script>

<!-- Trade table (small breakpoint and up) -->
<div class="hidden sm:block">
  <div class="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
    <div class="mt-2 flex flex-col">
      <div
        class="scrollbar min-w-full overflow-hidden overflow-x-auto align-middle shadow dark:shadow-neutral-700 sm:rounded-lg"
      >
        <TradeTable {trades} {columns} />
      </div>
    </div>
  </div>
</div>
