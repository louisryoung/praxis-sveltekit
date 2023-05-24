<script lang="ts">
  import { page } from '$app/stores';

  let classProp = '';
  export { classProp as class };

  $: breadcrumbs = $page.url.pathname
    .split('/')
    .slice(0, -1)
    .filter(Boolean)
    .map((path, index, paths) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const name = path
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toLocaleLowerCase());
      return { href, name };
    });
</script>

<!-- <nav aria-label="Breadcrumb" class="sticky w-full top-0 border-b border-slate-200 bg-white xl:hidden z-10">
    <div class="mx-auto flex max-w-3xl items-start py-3 px-4 sm:px-6 lg:px-8">
      <a href="/settings" class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-slate-900">
        <svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
        </svg>
        <span class="capitalize">Settings</span>
      </a>

    </div>
  </nav> -->

{#if breadcrumbs.length > 0}
  <nav
    aria-label="Breadcrumb"
    class="sticky top-0 z-10 flex w-full border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black xl:hidden {classProp}"
  >
    <ol
      role="list"
      class="flex max-w-3xl items-start px-4 py-3 sm:px-8 xl:px-16"
    >
      <li class="mr-2 md:mr-3 lg:mr-4">
        <div>
          <a
            href="/"
            class="text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-300"
          >
            <svg
              class="h-5 w-5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      {#each breadcrumbs as { href, name } (href)}
        <li>
          <div class="flex items-center">
            <svg
              class="h-5 w-5 flex-shrink-0 text-neutral-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <a
              {href}
              class="ml-2 text-sm font-medium capitalize text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 md:ml-3 lg:ml-4"
              >{name}</a
            >
          </div>
        </li>
      {/each}
    </ol>
  </nav>
{/if}
