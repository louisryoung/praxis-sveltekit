import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [sveltekit()],
  ssr: {
    noExternal: ['svelte-lightweight-charts', 'lightweight-charts'],
  },
};

export default config;
