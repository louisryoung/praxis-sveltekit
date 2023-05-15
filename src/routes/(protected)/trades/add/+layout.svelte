<script>
  import { browser } from '$app/environment';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { fixedHeader } from '$lib/stores/components';
  import SettingSidebar from './Sidebar.svelte';

  $: if (browser) {
    $fixedHeader = true;
  }
</script>

<!--
    This example requires some changes to your config:
    
    ```
    // tailwind.config.js
    const colors = require('tailwindcss/colors')
    
    module.exports = {
      // ...
      theme: {
        extend: {
          colors: {
            'slate': colors.blueGray,
          },
        },
      },
      plugins: [
        // ...
        require('@tailwindcss/forms'),
      ],
    }
    ```
  -->
<!--
    This example requires updating your template:
  
    ```
    <html class="h-full bg-slate-50">
    <body class="h-full overflow-hidden">
    ```
  -->
<div
  class="scrollbar relative flex h-full max-h-full w-full flex-col xl:overflow-hidden [&::-webkit-scrollbar]:w-2.5"
>
  <Breadcrumb />

  <div class="flex flex-1 xl:overflow-hidden">
    <!-- Secondary sidebar -->
    <SettingSidebar />

    <!-- Main content -->
    <div
      class="scrollbar flex-1 xl:overflow-y-auto [&::-webkit-scrollbar]:w-2.5"
    >
      <slot />
    </div>
  </div>
</div>
