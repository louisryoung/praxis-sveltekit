<script lang="ts">
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  import { applyAction, enhance } from '$app/forms';
  import { clickOutside } from '$lib/actions/clickOutside';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { fixedHeader } from '$lib/stores/components';
  import CircleSpinner from '$lib/components/loaders/spinners/CircleSpinner.svelte';
  import { scale } from 'svelte/transition';

  export let scrollContainer: HTMLElement | null = null;

  let el: HTMLElement;

  let visible = true;
  let atTop = true;
  // Prevents navbar to show/hide when clicking in docs sidebar
  let hash_changed = false;
  function handle_hashchange() {
    hash_changed = true;
  }
  let last_scroll = 0;
  function handle_scroll() {
    const scroll = scrollContainer?.scrollTop || 0;
    const height = el?.offsetHeight || 0;
    atTop = scroll < height;
    if (!hash_changed) {
      visible = $fixedHeader || scroll < height || scroll < last_scroll;
    }
    last_scroll = scroll;
    hash_changed = false;
  }

  const navItems = ['About', 'Support'];

  $: if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handle_scroll);
    scrollContainer.addEventListener('scroll', handle_scroll);
  }

  let showOptions = false;
  let loggingOut = false;

  onDestroy(() => {
    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', handle_scroll);
    }
  });
</script>

<svelte:window on:hashchange={handle_hashchange} />

<header
  bind:this={el}
  class="fixed top-0 right-0 z-10 h-[var(--app-header-height)] w-full translate-y-0 border-b border-b-neutral-200 dark:border-b-neutral-800 md:w-[calc(100%-var(--app-sidebar-width))] {visible
    ? 'show'
    : 'invisible'} bg-white dark:bg-black {$fixedHeader
    ? 'transition-none'
    : 'transition-[transform,color] duration-300 [&:not(.show):not(:focus-within)]:visible [&:not(.show):not(:focus-within)]:-translate-y-[calc(100%+5rem)] [&:not(.show):not(:focus-within)]:transition-none'}"
>
  <div class="flex h-full items-center gap-4  py-2 px-8  sm:gap-6 lg:gap-8">
    <ThemeToggle class="ml-auto" />
    <button
      type="button"
      class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 dark:focus:ring-offset-black"
      id="header-options-button"
      aria-expanded={showOptions ? 'true' : 'false'}
      aria-haspopup="true"
      on:click={() => (showOptions = !showOptions)}
    >
      <span class="sr-only">Open user menu</span>
      <img
        class="h-8 w-8 rounded-full"
        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </button>
    {#if showOptions}
      <div
        class="absolute top-0 right-0 z-20 mt-14 mr-8 w-56 origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-900 dark:bg-black dark:text-white dark:ring-white dark:ring-opacity-20"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
        in:scale={{ duration: 100, opacity: 0, start: 0.95 }}
        out:scale={{ duration: 100, opacity: 0, start: 0.95 }}
        use:clickOutside={{
          ignore: '#header-options-button',
          forceInclude: [
            '#header-options-button ~ div [data-force-click-outside]',
            // '[id^="header-options-menu-item"]'
          ],
        }}
        on:click_outside={() => {
          showOptions = false;
        }}
      >
        <div class="px-4 py-3" role="none">
          <p class="text-sm" role="none">Signed in as</p>
          <p
            class="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100"
            role="none"
          >
            {$page?.data?.user?.email ?? '---'}
          </p>
        </div>
        <div
          class="py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          role="none"
          data-sveltekit-preload-data="off"
          data-sveltekit-preload-code="hover"
        >
          <!-- Active: "bg-neutral-100 text-neutral-900", Not Active: "text-neutral-700" -->
          <a
            href="/settings/account"
            class="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300"
            role="menuitem"
            tabindex="-1"
            id="header-options-menu-item-0"
            data-force-click-outside
          >
            Account settings
          </a>
        </div>
        <div
          class="py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          role="none"
        >
          <form
            method="POST"
            action="/logout"
            role="none"
            use:enhance={() => {
              loggingOut = true;
              return async ({ result }) => {
                await applyAction(result);
                loggingOut = false;
                window.location.href = '/login';
                showOptions = false;
              };
            }}
          >
            <button
              type="submit"
              class="block w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300"
              role="menuitem"
              tabindex="-1"
              id="header-options-menu-item-1"
            >
              Sign out
              <CircleSpinner class="ml-2 inline h-5 w-5" show={loggingOut} />
            </button>
          </form>
        </div>
      </div>
    {/if}
  </div>
</header>

<style lang="postcss">
  header {
    grid-area: header;
  }
</style>
