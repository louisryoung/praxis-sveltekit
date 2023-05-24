<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import SidebarIcon from './SidebarIcon.svelte';

  let expanded = true;

  const navItems = [
    {
      name: 'Dashboard',
      icon: 'home',
      href: '/',
    },
    {
      name: 'Trading Accounts',
      icon: 'accounts',
      href: '/tradingaccounts',
    },
    {
      name: 'My Trades',
      icon: 'arrow-trending-up',
      href: '/trades',
    },
    {
      name: 'Notebook',
      icon: 'book-open',
      href: '/notebooks',
    },
    {
      name: 'Reports',
      icon: 'chart-bar',
      href: '/reports',
    },
    {
      name: 'Research',
      icon: 'search',
      href: '/research',
    },
  ] as const;

  let windowWidth = 0;

  const width = tweened(14, {
    duration: 0,
    easing: cubicOut,
  });

  const handleToggle = () => {
    expanded = !expanded;
    // document.documentElement.style.setProperty('--app-sidebar-width', expanded ? '14rem' : '4rem');
    width.set(expanded ? 14 : 4);
  };

  const setWidthVariable = () => {
    document.documentElement.style.setProperty(
      '--app-sidebar-width',
      `${$width}rem`
    );
  };

  $: if (browser && $width) {
    // width.set(expanded ? 14 : 4);
    setWidthVariable();
  }

  $: if (browser) {
    if (windowWidth < 768) {
      document.documentElement.style.setProperty('--app-sidebar-width', `0`);
    } else {
      setWidthVariable();
    }
  }

  const getCloseActiveMatch = (href: string) => {
    let activeHref = '';
    for (const item of navItems) {
      if (href.startsWith(item.href) && item.href.length > activeHref.length) {
        activeHref = item.href;
      }
    }
    return activeHref;
  };

  $: activeMatch = getCloseActiveMatch($page.url.pathname);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  id="sidebar"
  class="relative hidden flex-col items-center justify-start border-r border-r-neutral-200 bg-transparent dark:border-neutral-800 md:flex"
>
  <div
    class="absolute right-0 top-16 z-[11] -translate-y-1/2 translate-x-1/2 scale-125 rounded-full border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black dark:text-white"
  >
    <button type="button" class="p-1.5" on:click={handleToggle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3"
        class:rotate-180={!expanded}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  </div>
  <div
    class="relative mt-16 inline-flex w-full items-start justify-start text-left text-white"
  />
  <nav class="w-full">
    <img src="favicon.png" alt="" />
    <ul class="mt-2 flex w-full flex-col items-center justify-start">
      {#each navItems as item (item.name)}
        {@const active = activeMatch === item.href}
        <li class="w-full">
          <a
            href={item.href}
            class="group relative mx-auto flex w-[calc(100%-1rem)] items-center justify-start rounded-lg py-3 text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-900 dark:text-[#c1c1c1] dark:hover:bg-neutral-800 {active
              ? 'bg-neutral-200/50 !text-teal-500 dark:bg-neutral-900 dark:!text-teal-500'
              : ''} {expanded ? 'px-6' : 'px-1'}"
          >
            <!-- {#if expanded}
              <div
                class="absolute left-2 top-0 h-2/3 w-1 translate-y-[25%] rounded-full bg-teal-500 {active
                  ? 'visible'
                  : 'invisible'}"
              />
            {/if} -->
            <SidebarIcon icon={item.icon} class={expanded ? '' : 'mx-auto'} />
            {#if expanded}
              <span class="pl-4 text-sm font-medium">{item.name}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <!-- <button
    type="button"
    class="mt-auto flex w-full items-center justify-center rounded-lg py-6 hover:bg-white/10"
  >
    <svg
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="mb-6 h-6 w-6 text-white"
    >
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11l-2.378-.605z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button> -->
</div>

<style lang="postcss">
  div#sidebar {
    grid-area: sidebar;
  }
</style>
