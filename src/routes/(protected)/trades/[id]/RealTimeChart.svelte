<script lang="ts">
  import { darkMode } from '$lib/stores/themes';
  import TradingViewWidget from '$lib/components/TradingViewWidget.svelte';

  let containerHeight = 0;
  let containerWidth = 0;
  export let symbol: string;

  let classProp = 'col-span-full sm:col-span-6 lg:col-span-4';
  export { classProp as class };

  const options = {
    symbol,
    autosize: true,
    locale: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hide_side_toolbar: false,
    allow_symbol_change: true,
    show_popup_button: true,
  };
</script>

<div
  class="flex flex-col overflow-hidden bg-white shadow dark:bg-neutral-900/50 dark:shadow-neutral-800 {classProp}"
>
  <div
    class="w-full flex-auto overflow-hidden"
    bind:clientHeight={containerHeight}
    bind:clientWidth={containerWidth}
  >
    <div class="h-full w-full overflow-hidden">
      <TradingViewWidget {...options} theme={$darkMode ? 'dark' : 'light'} />
    </div>
  </div>
</div>
