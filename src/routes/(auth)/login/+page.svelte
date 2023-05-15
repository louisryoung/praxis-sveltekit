<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { page } from '$app/stores';
  import type { ActionData } from './$types';

  let email = '';
  let password = '';

  let shakeBool = false;

  export let form: ActionData;
</script>

<div
  class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="w-full max-w-md space-y-8">
    <div>
      <h1
        class="text-center text-6xl font-bold tracking-wide text-emerald-600 drop-shadow-md"
      >
        Praxis
      </h1>

      <h2 class="mt-6 text-center text-3xl font-medium text-gray-900">
        Sign in to your account
      </h2>
    </div>
    {#if form?.success}
      <!-- this message is ephemeral; it exists because the page was rendeemerald in
          response to a form submission. it will vanish if the user reloads -->
      <p class="text-emerald-500">Successfully logged in! Welcome back...</p>
    {/if}
    {#if form?.error}
      {#key shakeBool}
        <p class="form-error text-emerald-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-1.5 inline h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          {form.error}
        </p>
      {/key}
    {/if}
    <form
      class="mt-8 space-y-6"
      method="POST"
      use:enhance={({ form, data, cancel }) => {
        return async ({ result }) => {
          if (result.type === 'failure') {
            shakeBool = !shakeBool;
          } else if (result.type === 'success') {
            form.reset();
            setTimeout(() => {
              const nextUrl =
                `${$page.url.protocol}//${$page.url.host}` +
                ($page.url.searchParams.has('next')
                  ? $page.url.searchParams.get('next')
                  : `/`);
              window.location.href = nextUrl;
            }, 1000);
          }
          await applyAction(result);
        };
      }}
    >
      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            name="username"
            type="email"
            bind:value={email}
            required
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            bind:value={password}
            autocomplete="current-password"
            required
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a
            href="/forgot-password"
            class="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              class="h-5 w-5 text-neutral-200 group-hover:text-neutral-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>

<style lang="postcss">
  .form-error {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    @apply animate-shake;
  }
</style>
