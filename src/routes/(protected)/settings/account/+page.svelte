<script lang="ts">
  import { page } from '$app/stores';
  import { enhance, applyAction } from '$app/forms';
  import { fullLongDateTime } from '$lib/utils/datetime';
  import type { PageData } from './$types';

  export let data: PageData;

  let username = '';
  let email = '';
  let language = '';
  let photo: string;
  let first_name = '';
  let last_name = '';
  let fileinput: HTMLInputElement;

  const upload = async (imgBase64: string) => {
    const data: Record<string, string> = {};
    data['photo'] = imgBase64;
    await fetch(`/api/profile/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const onFileSelected = (e: any) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      if (e?.target?.result) {
        photo = e?.target?.result?.toString();
        upload(photo);
      }
    };
  };
  
  const setup = async (data: PageData) => {
    username = data?.username || data?.fullName || '';
    photo = data?.photo || '';
    email = data?.email || '';
    language = data?.language || ''
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
    method="POST"
    use:enhance={({ form }) => {
      return async ({ result }) => {
        await applyAction(result);
      };
    }}
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
          for="first_name"
          class="block text-sm font-medium text-neutral-900">First name</label
        >
        <input
          type="text"
          name="first_name"
          id="first_name"
          autocomplete="given-name"
          bind:value={first_name}
          class="mt-1 block w-full rounded-md border-neutral-300 text-neutral-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 sm:text-sm"
        />
      </div>

      <div class="sm:col-span-3">
        <label
          for="last_name"
          class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >Last name</label
        >
        <input
          type="text"
          name="last_name"
          id="last_name"
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
          {#if photo}
            <img
              class="inline-block h-12 w-12 rounded-full"
              src={photo}
              alt=""
            />
          {:else}
            <img
              class="inline-block h-12 w-12 rounded-full"
              src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&amp;format=auto&amp;height=512&amp;version=1582611188&amp;width=512"
              alt=""
            />
          {/if}
          <button
            type="button"
            class="ml-3 rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium text-neutral-900 hover:text-neutral-700 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:text-neutral-100 dark:focus:border-neutral-700 dark:focus:ring-offset-black"
            on:click={() => {
              fileinput?.click();
            }}>Change</button
          >
          <button
            type="button"
            class="ml-3 rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium text-neutral-900 hover:text-neutral-700 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:text-neutral-100 dark:focus:border-neutral-700 dark:focus:ring-offset-black"
            on:click={() => {
              photo = '';
              upload(photo);
            }}>Remove</button
          >
          <input
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            on:change={onFileSelected}
            bind:this={fileinput}
          />
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
          for="email_address"
          class="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >Email address</label
        >
        <input
          type="text"
          name="email_address"
          id="email_address"
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
          bind:value={language}
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
