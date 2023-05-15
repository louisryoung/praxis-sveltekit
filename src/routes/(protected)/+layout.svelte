<script lang="ts">
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';

  let el: HTMLElement;
</script>

<div class="bg-blue-gray-50 h-screen w-screen overflow-hidden dark:bg-black">
  <Header scrollContainer={el} />
  <Sidebar />
  <main
    bind:this={el}
    class="scrollbar z-0 min-h-full w-full pt-[calc(var(--app-header-height))] [&::-webkit-scrollbar]:w-2.5"
  >
    <slot />
  </main>
</div>

<style lang="postcss">
  div {
    display: grid;
    grid-template-areas:
      'sidebar content'
      'sidebar content';
    /* grid-template-rows: var(--header-height) 1fr; */
    grid-template-columns: var(--app-sidebar-width) 1fr;
    overflow-y: hidden;
  }

  main {
    grid-area: content;
  }
</style>
