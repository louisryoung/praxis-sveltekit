<script lang="ts">
  import { page } from '$app/stores';
  const navItems = [
    {
      name: 'accounts',
      href: '/settings/account',
      description: 'Change your account settings.',
      svgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />`,
    },
    {
      name: 'security',
      href: '/settings/security',
      description: 'Change your password and other security settings.',
      svgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />`,
    },
    {
      name: 'billing',
      href: '/settings/billing',
      description: 'View and manage your billing history.',
      svgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />`,
    },
    // {
    //   name: 'integrations',
    //   href: '/settings/integrations',
    //   description: 'Connect with third-party tools that you\'re already using.',
    //   svgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />`
    // },
    // {
    //   name: 'additional resources',
    //   href: '/settings/additional-resources',
    //   description: 'Learn how to maximize our platform to get the most out of it.',
    //   svgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
    // },
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
      Settings
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
