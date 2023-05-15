<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { darkMode } from '$lib/stores/themes';

  const dispatch = createEventDispatcher();

  let classProp = '';
  export { classProp as class };
  export let text: string;
  export let color: number | [number, number, number];
  export let removeable = false;
  export let showBullet = false;

  const intToRGB = (i: number) => {
    const r = (i >> 16) & 0xff;
    const g = (i >> 8) & 0xff;
    const b = i & 0xff;
    return `${r} ${g} ${b}`;
  };

  const parseColor = (color: number | [number, number, number] | string) => {
    if (typeof color === 'number') {
      return intToRGB(color);
    } else if (typeof color === 'string') {
      if (color.startsWith('#')) {
        return intToRGB(parseInt(color.slice(1), 16));
      } else if (color.startsWith('rgb') && color.includes(',')) {
        return color
          .split('(')[1]
          .split(')')[0]
          .split(',')
          .map((s) => s.trim())
          .join(' ');
      }
      return color;
    }
    return color.join(' ');
  };

  $: RGB = parseColor(color);
</script>

<span
  class="inline-flex items-center rounded-full py-0.5 px-2.5 text-[0.65rem] font-medium {classProp}"
  class:pr-1={removeable}
  style:color="rgb({RGB})"
  style:background-color="rgb({RGB} / {$darkMode ? 0.2 : 0.1})"
>
  {#if showBullet}
    <svg class="mr-1.5 inline h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="3" />
    </svg>
  {/if}
  <slot name="text" {text}>
    {text}
  </slot>
  {#if removeable}
    <button
      type="button"
      class="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full hover:!text-black hover:shadow-[inset_0_0_100px_100px_rgba(0,0,0,0.05)] focus:!text-black focus:shadow-[inset_0_0_100px_100px_rgba(0,0,0,0.05)] focus:outline-none active:!text-gray-500 dark:hover:!text-white dark:focus:!text-white"
      style="color: rgb({color});"
      on:click={() => dispatch('remove', { text, color })}
    >
      <span class="sr-only">{text}</span>
      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  {/if}
</span>
