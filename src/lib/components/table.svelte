<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { openModal } from 'svelte-modals';
  import { browser } from '$app/environment';
  import Tag from '$lib/components/badges/Tag.svelte';
  import FileShare from '$lib/components/modals/share/FileShare.svelte';
  import { stagedFiles } from '$lib/stores/share';
  import { selected } from '$lib/stores/table';
  import { formatRelativeDate, fullShortDateTime } from '$lib/utils/datetime';
  import { humanFileSize } from '$lib/utils/files';
  import type { FileResponse } from '$lib/types';

  const dispatch = createEventDispatcher();

  export let data: Partial<FileResponse>[];

  let totalCount = 0;

  const handleSelectAll = (ev: Event) => {
    Object.keys($selected).forEach((id) => {
      $selected[id] = allRowsSelected === false;
    });
  };

  let allRowsSelected = false;
  let someSelected = false;

  $: {
    const selectedCount = Object.values($selected).reduce(
      (acc, val) => acc + (val ? 1 : 0),
      0
    );
    allRowsSelected = selectedCount > 0 && selectedCount === totalCount;
    someSelected = selectedCount > 0 && !allRowsSelected;
  }

  const handleSelectShare = () => {
    const filesToShare = Object.keys($selected).filter(
      (id) => $selected[id] === true
    );
    stagedFiles.set(async () => {
      return filesToShare;
    });
    selected.reset();
    openModal(FileShare);
  };

  const initializeSelections = (d: Partial<FileResponse>[]) => {
    totalCount = 0;
    d?.forEach?.((file) => {
      $selected[file.id] = false;
      ++totalCount;
    });
  };

  onMount(() => {
    $selected = {};
    initializeSelections(data);
  });

  $: browser && initializeSelections(data);
</script>

<div class="table-container">
  <div
    class="absolute top-0 left-12 z-[3] flex h-12 items-center space-x-3 sm:left-16"
    class:hidden={!someSelected && !allRowsSelected}
  >
    <button
      type="button"
      class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
    >
      Bulk edit
    </button>
    <button
      type="button"
      class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
    >
      Delete
    </button>
    <button
      type="button"
      class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
      on:click={handleSelectShare}
    >
      Share
    </button>
  </div>
  <table class="table-auto">
    <thead>
      <tr>
        <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
            checked={allRowsSelected}
            indeterminate={someSelected}
            on:click={handleSelectAll}
          />
        </th>
        <th
          scope="col"
          class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
        >
          Name
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          last modified
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          size
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          public
        </th>
        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr class="group" class:selected={$selected[row?.id]} data-id={row.id}>
          <td class="relative w-12 px-6 sm:w-16 sm:px-8">
            <div
              class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
              class:hidden={!$selected[row?.id]}
            />
            <input
              type="checkbox"
              id="select-{row?.id}"
              class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
              bind:checked={$selected[row?.id]}
            />
          </td>
          <td
            class="whitespace-nowrap pr-3 text-left text-sm font-medium text-gray-900"
          >
            <div class="inline-flex items-center justify-start gap-2">
              <span
                class="inline cursor-pointer font-medium hover:text-indigo-600 hover:underline"
                class:text-indigo-600={$selected[row?.id]}
                on:click={() => dispatch('select', { row })}
              >
                {row.name}
              </span>
              <div class="inline-flex items-center justify-start gap-1">
                {#each row.tags || [] as tag, i}
                  <Tag text={tag.name} color={tag.color} />
                {/each}
              </div>
            </div>
          </td>
          <td class="whitespace-nowrap px-3 text-left text-sm text-gray-500">
            <time
              datetime={row.modified_at.toString()}
              title={fullShortDateTime(row.modified_at)}
            >
              {formatRelativeDate(new Date(row.modified_at))}
            </time>
          </td>
          <td class="whitespace-nowrap px-3 text-left text-sm text-gray-500">
            <span title={row.size}>{humanFileSize(row.size)}</span>
          </td>
          <td class="whitespace-nowrap px-3 text-center text-sm text-gray-500">
            <svg
              class="inline h-4 w-4"
              class:text-indigo-500={row?.public}
              class:text-gray-200={!row?.public}
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
          </td>
          <td
            class="whitespace-nowrap pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
          >
            <a href="#" class="text-gray-300 group-hover:text-indigo-600">
              Edit
              <span class="sr-only">, {row.name}</span>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="postcss">
  div.table-container {
    @apply relative overflow-hidden bg-white shadow-sm ring-1 ring-black/5 md:rounded-lg;
  }

  table {
    @apply relative table w-full border-separate border-spacing-0;
  }

  thead {
    @apply relative w-full;
  }

  :global(.dark) thead {
    @apply bg-neutral-800;
  }
  tr {
    /* grid-template-columns: 1fr 7fr 4fr 6fr 6fr; */
    @apply relative h-12 w-full items-center text-sm;
    /* grid gap-4; */
  }

  tbody > tr {
    @apply h-12;
    /* hover:bg-gray-50; */
  }

  thead th {
    @apply cursor-pointer select-none border-b border-gray-300 bg-white text-xs font-semibold uppercase tracking-wide text-gray-500 backdrop-blur backdrop-filter first:rounded-tl-lg last:rounded-tr-lg;
  }

  thead th::after {
    background: url("data:image/svg+xml,%3Csvg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' height='1em' width='1em' style='display: inline;' %3E %3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E %3C/svg%3E")
      no-repeat;
    @apply bg-contain opacity-0 group-hover:opacity-100;
  }

  /* th[data-sort="asc"] {
        background: url("data:image/svg+xml,%3Csvg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' height='1em' width='1em' style='display: inline;' %3E %3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E %3C/svg%3E")
          no-repeat;
        @apply bg-contain ;
      } */

  td {
    @apply whitespace-nowrap border-b border-gray-200 py-3 sm:py-4;
  }

  tr.selected td {
    @apply bg-gray-50;
    /* first:shadow-[inset_2px_0_0] first:shadow-indigo-500; */
  }
</style>
