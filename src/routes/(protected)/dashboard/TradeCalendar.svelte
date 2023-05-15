<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';
  import { scale } from 'svelte/transition';
  import { page } from '$app/stores';
  import { fullShortDate } from '$lib/utils/datetime';
  import { formatCurrency } from '$lib/utils/format';
  import type { Trade } from '$lib/types';
  import { clickOutside } from '$lib/actions/clickOutside';

  const dispatch = createEventDispatcher();

  export let data: {
    date: string;
    trades: Trade[];
    netPL: number;
  }[];

  const parseData = (d) => {
    let res = {};
    d.forEach((item) => {
      res[item.date] = item;
    });
    return res;
  };

  $: tradeData = parseData(data);

  let showMenu = false;
  let showViewOptions = false;

  const today = new Date();

  // let currentDay = today.getDate();
  let currentMonth = $page.url.searchParams.has('calendar_month')
    ? parseInt($page.url.searchParams.get('calendar_month') as string) - 1
    : today.getMonth();
  let currentYear = $page.url.searchParams.has('calendar_year')
    ? parseInt($page.url.searchParams.get('calendar_year') as string)
    : today.getFullYear();

  $: monthString = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    new Date(currentYear, currentMonth)
  );

  const getDates = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const dates = [];

    // fill the first week with the previous month
    const endDay = date.getDay();
    date.setDate(date.getDate() - endDay);
    for (let i = 0; i < endDay; ++i) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    //fill the current month
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    // fill the last week with the next month
    for (let i = 1; dates.length % 7 !== 0; i++) {
      dates.push(new Date(year, month + 1, i));
    }

    return dates.map((date) => {
      return {
        date,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
        isInCurrentMonth: date.getMonth() === currentMonth,
        isSelected: false,
      };
    });
  };

  let dates: {
    date: Date;
    day: number;
    month: number;
    year: number;
    isToday: boolean;
    isInCurrentMonth: boolean;
    isSelected: boolean;
  }[] = [];

  const setDates = (month: number, year: number) => {
    dates = getDates(month, year);
  };

  $: {
    setDates(currentMonth, currentYear);
  }

  const handlePrevious = async () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    await tick();
    dispatch('calendarWindowChange', {
      calendar_month: currentMonth + 1,
      calendar_year: currentYear,
    });
  };

  const handleNext = async () => {
    currentMonth = currentMonth + 1;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    }
    await tick();
    dispatch('calendarWindowChange', {
      calendar_month: currentMonth + 1,
      calendar_year: currentYear,
    });
  };

  const handleCurrent = async () => {
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    await tick();
    dispatch('calendarWindowChange', {
      calendar_month: currentMonth + 1,
      calendar_year: currentYear,
    });
  };

  const handleSelect = (index: number, date: Date) => {
    dispatch('select', date);
  };
</script>

<div class="lg:flex lg:h-full lg:flex-col">
  <header
    class="flex items-center justify-between border-b border-neutral-200 py-4 px-6 dark:border-neutral-800 lg:flex-none"
  >
    <h1 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
      <time
        datetime="{currentYear}-{currentMonth < 10 ? '0' : ''}{currentMonth}"
      >
        {monthString}
        {currentYear}
      </time>
    </h1>
    <div class="flex items-center">
      <div class="flex items-center rounded-md shadow-sm md:items-stretch">
        <button
          type="button"
          class="flex items-center justify-center rounded-l-md border border-r-0 border-neutral-300 bg-white py-2 pl-3 pr-4 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-500 focus:relative dark:border-neutral-700 dark:bg-black dark:text-neutral-600 dark:hover:bg-neutral-900/70 md:w-9 md:px-2"
          on:click={handlePrevious}
        >
          <span class="sr-only">Previous month</span>
          <!-- Heroicon name: mini/chevron-left -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          class="dark:hovertext-neutral-100 hidden border-t border-b border-neutral-300 bg-white px-3.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 focus:relative dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900/70 md:block"
          >Today</button
        >
        <span
          class="relative -mx-px h-5 w-px bg-neutral-300 dark:bg-neutral-700 md:hidden"
        />
        <button
          type="button"
          class="flex items-center justify-center rounded-r-md border border-l-0 border-neutral-300 bg-white py-2 pl-4 pr-3 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-500 focus:relative dark:border-neutral-700 dark:bg-black dark:text-neutral-600 dark:hover:bg-neutral-900 md:w-9 md:px-2"
          on:click={handleNext}
        >
          <span class="sr-only">Next month</span>
          <!-- Heroicon name: mini/chevron-right -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div class="hidden md:ml-4 md:flex md:items-center">
        <div class="relative">
          <button
            type="button"
            class="flex items-center rounded-md border border-neutral-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900/70"
            id="calendar-options-view-button"
            aria-expanded="false"
            aria-haspopup="true"
            on:click={() => (showViewOptions = !showViewOptions)}
          >
            Month view
            <svg
              class="ml-2 h-5 w-5 text-neutral-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          {#if showViewOptions}
            <div
              class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black dark:ring-white dark:ring-opacity-20"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
              in:scale={{ duration: 100, opacity: 0, start: 0.95 }}
              out:scale={{ duration: 100, opacity: 0, start: 0.95 }}
              use:clickOutside={{ ignore: '#calendar-options-view-button' }}
              on:click_outside={() => (showViewOptions = false)}
            >
              <div class="py-1" role="none">
                <!-- Active: "bg-neutral-100 text-neutral-900", Not Active: "text-neutral-700 dark:text-neutral-300" -->
                <a
                  href="#"
                  class="pointer-events-none block px-4 py-2 text-sm text-neutral-700 opacity-50 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0">Day view</a
                >
                <a
                  href="#"
                  class="pointer-events-none block px-4 py-2 text-sm text-neutral-700 opacity-50 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1">Week view</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-2"
                >
                  Month view
                </a>
                <a
                  href="#"
                  class="pointer-events-none block px-4 py-2 text-sm text-neutral-700 opacity-50 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-3">Year view</a
                >
              </div>
            </div>
          {/if}
        </div>
        <!-- <div class="ml-6 h-6 w-px bg-neutral-300 dark:bg-neutral-700"></div>
          <button type="button" class="ml-6 rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">Add event</button> -->
      </div>
      <div class="relative ml-6 md:hidden">
        <button
          type="button"
          class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-neutral-400 hover:text-neutral-500 dark:text-neutral-600"
          id="calendar-options-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          on:click={() => (showMenu = !showMenu)}
        >
          <span class="sr-only">Open menu</span>
          <!-- Heroicon name: mini/ellipsis-horizontal -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
            />
          </svg>
        </button>

        {#if showMenu}
          <div
            class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-neutral-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-800 dark:bg-black dark:ring-white dark:ring-opacity-20"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-0-button"
            tabindex="-1"
            in:scale={{ duration: 100, opacity: 0, start: 0.95 }}
            out:scale={{ duration: 100, opacity: 0, start: 0.95 }}
            use:clickOutside={{ ignore: '#calendar-options-menu-button' }}
            on:click_outside={() => (showMenu = false)}
          >
            <div class="py-1" role="none">
              <a
                href=""
                class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                role="menuitem"
                tabindex="-1"
                id="menu-0-item-1"
                on:click={handleCurrent}
              >
                Go to current month
              </a>
            </div>
            <div class="py-1" role="none">
              <a
                href="#"
                class="pointer-events-none block px-4 py-2 text-sm text-neutral-700 opacity-50 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                role="menuitem"
                tabindex="-1"
                id="menu-0-item-2">Day view</a
              >
              <a
                href="#"
                class="pointer-events-none block px-4 py-2 text-sm text-neutral-700 opacity-50 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                role="menuitem"
                tabindex="-1"
                id="menu-0-item-3">Week view</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                role="menuitem"
                tabindex="-1"
                id="menu-0-item-4">Month view</a
              >
              <a
                href="#"
                class="pointer-events-none block px-4 py-2 text-sm text-neutral-700 opacity-50 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                role="menuitem"
                tabindex="-1"
                id="menu-0-item-5">Year view</a
              >
            </div>
          </div>
        {/if}
      </div>
    </div>
  </header>
  <div
    class="overflow-hidden rounded-b-lg shadow ring-1 ring-black ring-opacity-5 dark:shadow-white/30 dark:ring-white dark:ring-opacity-5 lg:flex lg:flex-auto lg:flex-col"
  >
    <div
      class="grid grid-cols-7 gap-px border-b border-neutral-300 bg-neutral-200 text-center text-xs font-semibold leading-6 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 lg:flex-none"
    >
      <div class="flex justify-center bg-white py-2 dark:bg-black">
        <span>M</span>
        <span class="sr-only sm:not-sr-only">on</span>
      </div>
      <div class="flex justify-center bg-white py-2 dark:bg-black">
        <span>T</span>
        <span class="sr-only sm:not-sr-only">ue</span>
      </div>
      <div class="flex justify-center bg-white py-2 dark:bg-black">
        <span>W</span>
        <span class="sr-only sm:not-sr-only">ed</span>
      </div>
      <div class="flex justify-center bg-white py-2 dark:bg-black">
        <span>T</span>
        <span class="sr-only sm:not-sr-only">hu</span>
      </div>
      <div class="flex justify-center bg-white py-2 dark:bg-black">
        <span>F</span>
        <span class="sr-only sm:not-sr-only">ri</span>
      </div>
      <div class="flex justify-center bg-white py-2 dark:bg-black">
        <span>S</span>
        <span class="sr-only sm:not-sr-only">at</span>
      </div>
      <div class="flex justify-center bg-white py-2 dark:bg-black">
        <span>S</span>
        <span class="sr-only sm:not-sr-only">un</span>
      </div>
    </div>
    <div
      class="flex bg-neutral-200 text-xs leading-6 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 lg:flex-auto"
    >
      <div
        class="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px {dates.length > 35
          ? 'lg:grid-rows-6'
          : 'lg:grid-rows-5'}"
      >
        {#each dates as { date, day, isInCurrentMonth, isSelected, isToday }, i (date.toISOString())}
          {@const dateStr = date.toISOString().slice(0, 10)}
          {@const cm = isInCurrentMonth
            ? 'bg-white dark:bg-black'
            : 'bg-neutral-50 dark:bg-black/60 text-neutral-500'}
          {@const s = isSelected
            ? 'font-semibold bg-primary-500/[0.01] !text-black hover:text-black'
            : ''}
          {@const t = isToday
            ? 'p-1 h-6 w-6 rounded-full bg-black dark:bg-white dark:text-black font-semibold text-white'
            : ''}
          {@const netPL = tradeData?.[dateStr]?.netPL}

          <div
            class="relative min-h-[5.25rem] py-2 px-3 text-right text-neutral-600 dark:text-neutral-400 {cm}"
          >
            {#if (tradeData?.[dateStr]?.trades?.length ?? 0) > 0}
              <a
                href="#"
                class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg border p-2 text-xs leading-5 {isInCurrentMonth
                  ? ''
                  : 'opacity-20'}  {netPL > 0
                  ? 'border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/50 dark:hover:bg-green-900'
                  : 'border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-800 dark:bg-red-900/50 dark:hover:bg-red-900/70'} transition-colors duration-200 ease-in-out"
              >
                <p
                  class="order-1 flex flex-col items-start justify-start gap-0 {netPL >
                  0
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'}"
                >
                  <span class="font-semibold"
                    >{formatCurrency(netPL ?? 0, 'USD')}</span
                  >
                  <span class="-mt-0.5"
                    >{tradeData?.[dateStr]?.trades?.length} trades</span
                  >
                </p>
                <p class="">
                  <time
                    datetime={dateStr}
                    class={t}
                    title={fullShortDate(date)}
                  >
                    {day}
                  </time>
                </p>
              </a>
            {:else}
              <time datetime={dateStr} class={t} title={fullShortDate(date)}>
                {day}
              </time>
            {/if}
          </div>
        {/each}
      </div>
      <div
        class="isolate grid w-full grid-cols-7 gap-px lg:hidden {dates.length >
        35
          ? 'grid-rows-6'
          : 'grid-rows-5'}"
      >
        {#each dates as { date, day, isInCurrentMonth, isSelected, isToday }, i (date.toISOString())}
          {@const dateStr = date.toISOString().slice(0, 10)}
          {@const cm = isInCurrentMonth
            ? 'bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900'
            : 'bg-neutral-50 dark:bg-black/60 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900'}
          {@const s = isSelected
            ? 'font-semibold bg-primary-500/[0.01] !text-black hover:text-black'
            : ''}
          {@const t = isToday
            ? 'p-0 h-6 w-6 rounded-full bg-black dark:bg-white dark:text-black font-semibold text-white'
            : ''}
          {@const netPL = tradeData?.[dateStr]?.netPL}

          <button
            type="button"
            class="flex h-14 flex-col  py-2 px-3 focus:z-10 {cm} transition-colors duration-200 ease-in-out"
          >
            <time
              datetime={dateStr}
              class="ml-auto {t}"
              title={fullShortDate(date)}
            >
              {day}
            </time>
            <span class="sr-only"
              >{tradeData?.[dateStr]?.trades?.length ?? 0} trades</span
            >
            {#if (tradeData?.[dateStr]?.trades?.length ?? 0) > 0}
              <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span
                  class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full {netPL > 0
                    ? 'bg-green-600 dark:bg-green-500'
                    : 'bg-red-600 dark:bg-red-500'}"
                />
              </span>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
