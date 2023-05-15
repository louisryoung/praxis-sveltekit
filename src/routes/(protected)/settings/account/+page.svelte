<script lang="ts">
  import { page } from '$app/stores';
  import { fullLongDateTime } from '$lib/utils/datetime';
  import type { PageData } from './$types';

  export let data: PageData;

  let username = '';
  let email = '';
  let first_name = '';
  let last_name = '';

  const setup = async (data: PageData) => {
    username = data?.fullName || '';
    email = data?.email || '';
    first_name = data?.fullName?.split(' ')[0] || '';
    last_name = data?.fullName?.split(' ')[1] || '';
  };

  $: setup(data);
</script>

<div class="mx-auto w-full max-w-4xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
  <h1
    class="text-3xl font-bold capitalize tracking-tight text-neutral-900 dark:text-neutral-100"
  >
    Account
  </h1>

  <form
    class="mt-6 space-y-8 divide-y divide-neutral-200 dark:divide-neutral-800"
  >
    <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
      <div class="sm:col-span-6">
        <h2 class="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Profile
        </h2>
        <p class="mt-1 text-sm text-neutral-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div class="sm:col-span-3">
        <label
          for="first-name"
          class="block text-sm font-medium text-neutral-900">First name</label
        >
        <input
          type="text"
          name="first-name"
          id="first-name"
          autocomplete="given-name"
          bind:value={first_name}
          class="mt-1 block w-full rounded-md border-neutral-300 text-neutral-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 sm:text-sm"
        />
      </div>

      <div class="sm:col-span-3">
        <label
          for="last-name"
          class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >Last name</label
        >
        <input
          type="text"
          name="last-name"
          id="last-name"
          autocomplete="family-name"
          bind:value={last_name}
          class="mt-1 block w-full rounded-md border-neutral-300 text-neutral-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 sm:text-sm"
        />
      </div>

      <div class="sm:col-span-6">
        <label
          for="username"
          class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >Username</label
        >
        <div class="mt-1 flex rounded-md shadow-sm">
          <span
            class="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900/70 sm:text-sm"
            >{$page.url.hostname}/</span
          >
          <input
            type="text"
            name="username"
            id="username"
            autocomplete="username"
            bind:value={username}
            class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-neutral-300 text-neutral-900 focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 sm:text-sm"
          />
        </div>
      </div>

      <div class="sm:col-span-6">
        <label
          for="photo"
          class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >Photo</label
        >
        <div class="mt-1 flex items-center">
          <img
            class="inline-block h-12 w-12 rounded-full"
            src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&amp;format=auto&amp;height=512&amp;version=1582611188&amp;width=512"
            alt=""
          />
          <div class="ml-4 flex">
            <div
              class="relative flex cursor-pointer items-center rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-50 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-black dark:hover:bg-neutral-900/70"
            >
              <label
                for="user-photo"
                class="pointer-events-none relative text-sm font-medium text-neutral-900 dark:text-neutral-100"
              >
                <span>Change</span>
                <span class="sr-only"> user photo</span>
              </label>
              <input
                id="user-photo"
                name="user-photo"
                type="file"
                class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-neutral-300 opacity-0 dark:bg-black"
              />
            </div>
            <button
              type="button"
              class="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium text-neutral-900 hover:text-neutral-700 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:text-neutral-100 dark:focus:border-neutral-700 dark:focus:ring-offset-black"
              >Remove</button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
      <div class="sm:col-span-6">
        <h2 class="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Personal Information
        </h2>
        <p class="mt-1 text-sm text-neutral-500">
          Information about account user.
        </p>
      </div>

      <div class="sm:col-span-3">
        <label
          for="email-address"
          class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >Email address</label
        >
        <input
          type="text"
          name="email-address"
          id="email-address"
          autocomplete="email"
          bind:value={email}
          class="mt-1 block w-full rounded-md border-neutral-300 text-neutral-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 sm:text-sm"
        />
      </div>

      <div class="sm:col-span-3">
        <label
          for="language"
          class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >Language</label
        >
        <input
          type="text"
          name="language"
          id="language"
          class="mt-1 block w-full rounded-md border-neutral-300 text-neutral-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 sm:text-sm"
        />
      </div>

      <p class="text-sm text-neutral-500 sm:col-span-6">
        This account was created on
        <time datetime={data?.createdAt?.toISOString()}>
          {fullLongDateTime(data?.createdAt) + '.'}
        </time>
      </p>
    </div>

    <div class="flex justify-end pt-8">
      <button
        type="button"
        class="rounded-md border border-neutral-300 bg-white py-2 px-6 text-sm font-medium text-neutral-900 shadow-sm transition-colors duration-200 ease-in-out hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black dark:border-neutral-700 dark:bg-black dark:text-neutral-100 dark:hover:bg-neutral-900"
        >Cancel</button
      >
      <button
        type="submit"
        class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-6 text-sm font-medium text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black dark:bg-teal-500 dark:text-black dark:hover:bg-teal-600 dark:hover:text-neutral-800"
        >Save</button
      >
    </div>
  </form>
</div>
