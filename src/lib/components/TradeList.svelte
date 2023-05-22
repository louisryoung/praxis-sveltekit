<script lang="ts">
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let start: number;
  let end: number;

  const items: any[] = [];
</script>

<ol
  class="flex h-[25rem] h-full flex-col items-stretch overflow-hidden text-sm leading-6 text-gray-500"
>
  <VirtualList height="100%" {items} bind:start bind:end let:item>
    <li
      class="relative flex flex-wrap items-center justify-start gap-x-4 gap-y-1 px-6"
    />
  </VirtualList>
</ol>
