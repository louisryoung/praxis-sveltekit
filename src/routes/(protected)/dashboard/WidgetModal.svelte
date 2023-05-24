<script>
  import { createEventDispatcher } from 'svelte';
  export let open = false;
  export let title = '';
  const dispatch = createEventDispatcher();
</script>

{#if open}
  <div
    class="modal fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-8 lg:p-0"
  >
    <div class="modal-overlay fixed h-full w-full bg-gray-900 opacity-50" />
    <div
      class="z-50 mx-auto w-1/3 overflow-y-auto rounded-lg bg-white shadow-xl lg:h-max lg:w-1/2"
    >
      <div
        class="head flex items-center justify-between bg-slate-500 px-8 py-5 text-2xl font-extrabold text-white"
      >
        {title}
        <button
          class="ml-4 rounded-full bg-gray-200 p-2 hover:bg-gray-300"
          on:click={() => dispatch('close')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
            ><path d="M0 0h24v24H0V0z" fill="none" /><path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            /></svg
          >
        </button>
      </div>
      <div class="content bg-slate-700 p-8">
        <slot name="body" />
      </div>
    </div>
  </div>
{/if}
