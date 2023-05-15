<script lang="ts">
  export let autosize = true;
  export let symbol = 'NASDAQ:AAPL';
  // export let interval = 'D';
  export let timezone = 'Etc/UTC';
  export let theme: 'light' | 'dark' = 'light';
  export let locale = 'en';
  export let hide_side_toolbar = false;
  export let allow_symbol_change = true;
  export let show_popup_button = true;

  let id = 'svelte-tradingview-widget-' + Math.random().toString(36).substr(2, 9);

  function createWidget(options: Record<string, any>) {
    if ('TradingView' in window) {
      new window.TradingView.widget(options);
    }
  }

  function initializeScript() {
    return new Promise<void>((resolve) => {
      let script = document.getElementById('tradingview-widget-loading-script') as HTMLScriptElement | null;
      if (script !== null) {
        // script.onload = resolve;
        resolve();
      } else {
        script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      }
    });
  }

  function widget(node: HTMLElement, opts: any) {
    initializeScript().then(() => createWidget(opts));
    return {
      update(opts: any) {
        createWidget(opts);
      },
      destroy() {
        document.getElementById(id)?.remove();
        // if ('TradingView' in window && 'widget' in window.TradingView) {
        //   window.TradingView?.widget?.()?.remove();
        // }
      },
    };
  }
</script>

<div
  {id}
  class:autosize
  use:widget={{
    autosize,
    symbol,
    // interval,
    timezone,
    theme,
    locale,
    hide_side_toolbar,
    allow_symbol_change,
    show_popup_button,
    container_id: id,
  }}
/>

<style>
  .autosize {
    width: 100%;
    height: 100%;
  }
</style>
