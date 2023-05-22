<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { ActionData } from './$types';

  export let form: ActionData;

  let first_name = '';
  let last_name = '';
  let email = '';
  let password = '';
  let password_again = '';

  let shakeBool = false;
</script>

<div
  class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
>
  <div class="w-full max-w-md space-y-8">
    <div>
      <h1
        class="text-center text-7xl font-bold text-emerald-600 drop-shadow-md"
      >
        Praxis
      </h1>

      <h2 class="mt-6 text-center text-3xl font-medium text-gray-900">
        Create your account
      </h2>
    </div>
    {#if form?.success}
      <p class="text-emerald-500">Account successfully created! Welcome..</p>
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
      method="POST"
      class="mt-8 space-y-6"
      use:enhance={({ form }) => {
        return async ({ result }) => {
          if (result.type === 'success') {
            form.reset();
            setTimeout(() => {
              goto('/login');
            }, 2000);
          } else if (result.type === 'failure') {
            shakeBool = !shakeBool;
          }
          await applyAction(result);
        };
      }}
    >
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="first-name" class="sr-only">First Name</label>
          <input
            id="first-name-field"
            name="profile__first_name"
            type="text"
            bind:value={first_name}
            required
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            placeholder="First Name"
          />
          {#if form?.profile__first_name}
            <p class="text-xs italic text-emerald-500">
              {form.profile__first_name}
            </p>
          {/if}
        </div>
        <div>
          <label for="last-name" class="sr-only">Last Name</label>
          <input
            id="last-name-field"
            name="profile__last_name"
            type="text"
            bind:value={last_name}
            required
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            placeholder="Last Name"
          />
          {#if form?.profile__last_name}
            <p class="text-xs italic text-emerald-500">
              {form.profile__last_name}
            </p>
          {/if}
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            bind:value={email}
            required
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            placeholder="Email Address"
          />
          {#if form?.email}
            <p class="text-xs italic text-emerald-500">{form.email}</p>
          {/if}
        </div>
        <div>
          <label for="password" class="sr-only">Create a Password</label>
          <input
            id="password"
            name="password"
            type="password"
            bind:value={password}
            autocomplete="off"
            required
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            placeholder="Create a password"
          />
          {#if form?.password}
            <p class="text-xs italic text-emerald-500">{form.password}</p>
          {/if}
        </div>
        <div>
          <label for="password-again" class="sr-only">Repeat Password</label>
          <input
            id="password-again"
            name="password_again"
            type="password"
            bind:value={password_again}
            autocomplete="off"
            required
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            placeholder="Repeat Password"
          />
          {#if form?.password_again}
            <p class="text-xs italic text-emerald-500">{form.password_again}</p>
          {/if}
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
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              class="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
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
          Create Account
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
