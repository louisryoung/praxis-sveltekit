<script lang="ts">
  import { tick } from 'svelte';
  import Select from 'svelte-select';
  // import Select from 'svelte-select/no-styles/Select.svelte'
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import CircleSpinner from '$lib/components/loaders/spinners/CircleSpinner.svelte';
  import { formatCurrency, formatNumber } from '$lib/utils/format';
  import type { Trade, TradeInput } from '$lib/types';
  import Tag from '$lib/components/Tag.svelte';

  let classProp = '';
  export { classProp as class };

  const forms = {
    setups: {
      validating: false,
      data: [],
      errors: {},
    },
    mistakes: {
      validating: false,
      data: [],
      errors: {},
    },
    feelings: {
      validating: false,
      data: [],
      errors: {},
    },
    rating: {
      validating: false,
      data: 0,
      errors: {},
    },
  };

  export let trade: Trade = {} as Trade;
  export let inputs: TradeInput = {} as TradeInput;

  const setInputSetups = (setups: string[]) => {
    forms.setups.data = setups.map((item) => ({ label: item, value: item }));
  };
  const setInputMistakes = (mistakes: string[]) => {
    forms.mistakes.data = mistakes.map((item) => ({ label: item, value: item }));
  };
  const setInputFeelings = (feelings: string[]) => {
    forms.feelings.data = feelings.map((item) => ({ label: item, value: item }));
  };

  $: setInputSetups(inputs.setups);
  $: setInputMistakes(inputs.mistakes);
  $: setInputFeelings(inputs.feelings);

  const setupOptions = [
    'Earnings and Winner',
    'Gap and Go',
    'Green To Red',
    'Morning Breakout',
    'Contract Winner',
    'Red To Green',
    'Multi Month Breakout',
    'News Hype',
    'Volume Gainer',
    'Morning Panic',
    'Algo',
    'Reverse Lowercase h',
    'Lowercase h',
  ].map((item) => ({ label: item, value: item }));

  const mistakeOptions = [
    'Chased',
    'Did Not Cut Losses Quickly',
    'Fomo',
    'Not in Plan',
    'Overtrade',
    'Red To Green',
    'Revenge Trade',
    'Bored',
    'No Volume',
    'Red on the day',
    'Early Exit',
  ].map((item) => ({ label: item, value: item }));
  const feelingsOptions = [
    'Fear',
    'Greed',
    'Hope',
    'Anxiety',
    'Boredom',
    'Frustration',
    'Revenge',
    'Conviction',
    'Excitement',
  ];
</script>

<div
  class="grid grid-cols-4 gap-4 {classProp}"
  style:grid-auto-rows="min-content"
>
  <div class="col-span-full lg:col-span-2">
    <form
      id="form-{trade.id}-rating"
      method="POST"
      action="?/rating"
      class="relative flex w-full items-center justify-start text-neutral-900 dark:text-neutral-100"
      use:enhance={({ form, data, cancel }) => {
        forms.rating.validating = true;
        return async ({ result }) => {
          forms.rating.validating = false;
          if (result.type === 'failure') {
          } else if (result.type === 'success') {
            form.reset();
          }
          await invalidateAll();
          await applyAction(result);
        };
      }}
    >
    <div class="flex w-full flex-col items-start justify-start">
      <label
          for="form-{trade.id}-rating-field"
          class="mb-2 block w-full text-sm font-semibold text-black/70 dark:text-white/70"
        >
          Rating
        </label>
        <input id="form-{trade.id}-rating-field" name="rating" type="number" bind:value={forms.rating.data} class="w-full border border-neutral-300 dark:border-neutral-700 rounded-md px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
      </div>
    </form>
  </div>
  <div class="col-span-full">
    <form
      id="form-{trade.id}-feelings"
      method="POST"
      action="?/feelings"
      class="relative flex w-full items-center justify-start text-neutral-900 dark:text-neutral-100"
      use:enhance={({ form, data, cancel }) => {
        forms.feelings.validating = true;
        return async ({ result }) => {
          forms.feelings.validating = false;
          if (result.type === 'failure') {
          } else if (result.type === 'success') {
            form.reset();
          }
          await invalidateAll();
          await applyAction(result);
        };
      }}
    >
    <div class="flex w-full flex-col items-start justify-start">
      <label
          for="form-{trade.id}-feelings-field"
          class="mb-2 block w-full text-sm font-semibold text-black/70 dark:text-white/70"
        >
          Feelings
        </label>
        <input id="form-{trade.id}-feelings-field" name="feelings" type="number" bind:value={forms.rating.data} class="w-full border border-neutral-300 dark:border-neutral-700 rounded-md px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500 focus:ring-blue-500" />
      </div>
    </form>
  </div>
  <div class="col-start-1 col-span-full lg:col-start-1 lg:col-span-2">
    <form
      id="form-{trade.id}-setups"
      method="POST"
      action="?/setups"
      class="relative flex w-full items-center justify-start text-neutral-900 dark:text-neutral-100"
      use:enhance={({ form, data, cancel }) => {
        forms.setups.validating = true;
        return async ({ result }) => {
          forms.setups.validating = false;
          if (result.type === 'failure') {
          } else if (result.type === 'success') {
            form.reset();
          }
          await invalidateAll();
          await applyAction(result);
        };
      }}
    >
      <div class="flex w-full flex-col items-start justify-start">
        <label
          for="form-{trade.id}-setups-field"
          class="mb-2 block w-full text-sm font-semibold text-black/70 dark:text-white/70"
        >
          Setups
        </label>
        <Select
          inputAttributes={{
            id: `form-${trade.id}-setups-field`,
            // class: "outline-none focus:outline-none focus:border-none focus:ring-none",
            // style: `outline: none !important; border: none !important;`
          }}
          items={setupOptions}
          bind:value={forms.setups.data}
          multiple
          showChevron
          clearable={false}
          name="setups"
          on:input={async (e) => {
            await tick();
            const form = document.getElementById(`form-${trade.id}-setups`);
            form?.dispatchEvent(new Event('submit'));
          }}
        >
          <div slot="item" let:item let:index>
            <span class="dark:text-white">
              {item.label}
            </span>
          </div>
          <div slot="selection" let:selection let:index>
            <span class="hidden dark:text-white">
              {selection.label}
            </span>
          </div>
        </Select>
      </div>
    </form>
    <ul class="mt-4 flex flex-wrap items-center justify-start gap-2">
      {#each inputs.setups as setup (setup)}
        <li>
          <Tag
            text={setup}
            color={959987}
            removeable
            on:remove={async (e) => {
              const {text} = e.detail;
              forms.setups.data = forms.setups.data.filter(
                (item) => item.value !== text
              );
              await tick();
              const form = document.getElementById(`form-${trade.id}-setups`);
              form?.dispatchEvent(new Event('submit'));
            }}
          >
            <span
              slot="text"
              let:text
              class="px-1 text-sm font-medium capitalize"
            >
              {text}
            </span>
          </Tag>
        </li>
      {/each}
    </ul>
  </div>
  <div class="col-span-full lg:col-span-2">
    <form
    id="form-{trade.id}-mistakes"
      method="POST"
      action="?/mistakes"
      class="relative flex w-full items-center justify-start text-neutral-900 dark:text-neutral-100"
      use:enhance={({ form, data, cancel }) => {
        forms.mistakes.validating = true;
        return async ({ result }) => {
          forms.mistakes.validating = false;
          if (result.type === 'failure') {
          } else if (result.type === 'success') {
            form.reset();
          }
          await invalidateAll();
          await applyAction(result);
        };
      }}
    >
      <div class="flex w-full flex-col items-start justify-start">
        <label
          for="form-{trade.id}-mistakes-field"
          class="mb-2 block w-full text-sm font-semibold text-black/70 dark:text-white/70"
        >
            Mistakes
        </label>
        <Select
            class="bg-transparent"
          inputAttributes={{
            id: `form-${trade.id}-mistakes-field`,
          }}
          items={mistakeOptions}
          bind:value={forms.mistakes.data}
          multiple
          showChevron
          clearable={false}
          name="mistakes"
          on:input={async (e) => {
            await tick();
            const form = document.getElementById(`form-${trade.id}-mistakes`);
            form?.dispatchEvent(new Event('submit'));
          }}
        >
          <div slot="item" let:item let:index>
            <span class="dark:text-white">
              {item.label}
            </span>
          </div>
          <div slot="selection" let:selection let:index>
            <span class="hidden dark:text-white">
              {selection.label}
            </span>
          </div>
        </Select>
      </div>
    </form>
    <ul class="mt-4 flex flex-wrap items-center justify-start gap-2">
      {#each inputs.mistakes as mistake (mistake)}
        <li>
          <Tag
            text={mistake}
            color={[245, 158, 11]}
            removeable
            on:remove={async (e) => {
              const {text} = e.detail;
              forms.mistakes.data = forms.mistakes.data.filter(
                (item) => item.value !== text
              );
              await tick();
              const form = document.getElementById(`form-${trade.id}-mistakes`);
              form?.dispatchEvent(new Event('submit'));
            }}
          >
            <span
              slot="text"
              let:text
              class="px-1 text-sm font-medium capitalize"
            >
              {text}
            </span>
          </Tag>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="postcss">
    :global(.multi-item) {
        @apply !hidden;
    }
    :global(.svelte-select) {
      --background: transparent;
      --border: 1px solid rgb(212 212 212);
      --border-focused: 1px solid rgb(163 163 163);
      --border-radius: 0.5rem;
      --selected-item-color: black;
      --selected-item-padding: 0;
      --item-padding: 0.5rem 1rem;
      /* --item-background: rgb(16 185 129); */
      --item-is-active-bg: white;
      --item-is-active-color: rgb(16 185 129);
      --item-hover-bg: rgb(13 148 136);
      --item-hover-color: white;
      --chevron-color: rgb(163 163 163);
      --height: 100%;
      --chevron-height: 0.5rem;
      --width: 100%;
      --font-size: 0.875rem;
      --list-background: white;
      --list-border-radius: 0.5rem;
    }

    :global(.svelte-select) input {
        box-shadow: none !important;
    }
  
    .dark :global(.svelte-select) {
      --background: rgb(15 15 15);
      --border: 1px solid rgb(64 64 64);
      --border-focused: 1px solid rgb(128 128 128);
      --selected-item-color: rgb(255 255 255);
      --item-color: rgb(255 255 255);
      --item-is-active-bg: rgb(64 64 64);
      --item-is-active-color: rgb(16 185 129);
      --list-background: rgb(36 36 36);
    }

    /* :global(.svelte-select-list) {
      @apply scrollbar [&::-webkit-scrollbar]:w-1.5;
    } */
    :global(.svelte-select-list)::-webkit-scrollbar {
      @apply my-0 h-[0.4rem] w-2;
    }
    :global(.svelte-select-list)::-webkit-scrollbar-thumb,
    :global(.svelte-select-list)::-webkit-scrollbar-track {
      @apply rounded-full;
    }

    :global(.svelte-select-list)::-webkit-scrollbar-thumb {
      @apply bg-[rgb(209,209,211)];
    }

    .auto-hide-scroll-thumb::-webkit-scrollbar-thumb,
    :global(.svelte-select-list)::-webkit-scrollbar-track {
      @apply rounded-full bg-transparent;
    }

    :global(.svelte-select-list):hover::-webkit-scrollbar-thumb {
      @apply bg-[rgb(209,209,211)] hover:shadow-[inset_0_0_100px_100px_rgba(0,0,0,0.2)] dark:hover:shadow-[inset_0_0_100px_100px_rgba(0,0,0,0.3)];
    }

    :global(.svelte-select-list):hover::-webkit-scrollbar-track {
      @apply hover:bg-[rgb(242,243,244)] dark:hover:bg-[rgb(38,38,38)];
    }
  </style>