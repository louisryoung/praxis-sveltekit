<script lang="ts">
  import { page } from '$app/stores';
  const navItems = [
    {
      name: 'manual',
      href: '/trades/add/manual',
      description: 'Add a trade manually.',
      svgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112slate.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />`,
    },
    {
      name: 'import',
      href: '/trades/add/import',
      description: 'Import trades from a CSV file.',
      svgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />`,
    },
  ];
</script>

<nav
  aria-label="Sections"
  class="hidden w-96 flex-shrink-0 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/70 xl:flex xl:flex-col"
>
  <div
    class="flex h-16 flex-shrink-0 items-center border-b border-neutral-200 px-6 dark:border-neutral-800"
  >
    <p
      class="text-lg font-medium capitalize text-neutral-900 dark:text-neutral-100"
    >
      Add trades
    </p>
  </div>
  <div class="scrollbar min-h-0 flex-1 [&::-webkit-scrollbar]:w-[7px]">
    {#each navItems as { name, href, description, svgPath } (name)}
      {@const active = $page.url.pathname === href}
      <a
        {href}
        class="flex border-b border-neutral-200 p-6 dark:border-neutral-800 {active
          ? 'bg-neutral-200/50 dark:bg-neutral-800'
          : 'hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50'}"
        aria-current="page"
      >
        <svg
          class="-mt-0.5 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          {@html svgPath}
        </svg>
        <div class="ml-3 text-sm">
          <p
            class="font-medium capitalize {active
              ? 'text-teal-600 dark:text-teal-500'
              : 'text-neutral-900 dark:text-neutral-200'}"
          >
            {name}
          </p>
          <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </a>
    {/each}
  </div>
</nav>
