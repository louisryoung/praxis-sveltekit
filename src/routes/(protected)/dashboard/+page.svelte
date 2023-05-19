<script lang="ts">
  import {onMount} from 'svelte'
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import { formatCurrency, formatNumber } from '$lib/utils/format';
  import ChartCard from './ChartCard.svelte';
  import TradeCalendar from './TradeCalendar.svelte';
  import StatCard from './StatCard.svelte';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  import PieChartStatCard from './PieChartStatCard.svelte';
  import TradeEmotionFrequencyChart from './TradeEmotionFrequencyChart.svelte';
  import WinRatioCard from './WinRatioCard.svelte';
  import Modal from './WidgetModal.svelte';

  export let data: PageData;

  let showModal = false;

  let selectedWidgets = [];
  let selectedWidgetIds= [];
  let remainedCardIds = [];
  let remainedCards = [];
  let matchedItem = null;

  const handleCalendarWindowChange = async (e: CustomEvent) => {
    const { calendar_month, calendar_year } = e.detail;
    const query = new URLSearchParams({
      calendar_month,
      calendar_year,
    }).toString();
    await goto(`?${query}`);
  };

  let flipDurationMs = 300;

  let cards = [
    {
      id: 'total_net_pl',
      component: StatCard,
      props: {
        title: 'total net p&l',
        value: formatCurrency(data?.tradeData?.totalNetPL, 'USD'),
        change: 0,
        class: 'w-full',
      },
    },
    {
      id: 'profit_factor',
      component: StatCard,
      props: {
        title: 'profit factor',
        value: formatNumber(data?.tradeData?.profitFactor, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
        class: 'w-full',
      },
    },
    {
      id: 'avg_winning_trade',
      component: StatCard,
      props: {
        title: 'avg. winning trade',
        value: formatCurrency(data?.tradeData?.averageWin, 'USD'),
        class: 'w-full',
      },
    },
    {
      id: 'avg_losing_trade',
      component: StatCard,
      props: {
        title: 'avg. losing trade',
        value: formatCurrency(data?.tradeData?.averageLoss, 'USD'),
        class: 'w-full',
      },
    },
    {
      id: 'win_ratio',
      component: WinRatioCard,
      props: {
        title: 'win ratio',
        wins: data?.tradeData?.numberOfWinners,
        losses: data?.tradeData?.numberOfLosers,
        class: 'w-full',
      },
    },
    {
      id: 'win_ratio_by_day',
      component: WinRatioCard,
      props: {
        title: 'win ratio by day',
        wins: data?.tradeData?.winDays,
        losses: data?.tradeData?.lossDays,
        class: 'w-full',
      },
    },
    {
      id: 'trade_pie_chart',
      component: PieChartStatCard,
      props: {
        title: 'trade pie chart',
        class: 'w-full',
      },
    },
    {
      id: 'trade_emotion_frequency',
      component: TradeEmotionFrequencyChart,
      props: {
        title: 'trade emotion frequency',
        class: 'w-full',
      },
    },
  ];

  function handleDndConsider(e: CustomEvent) {
    cards = e.detail.items;
  }
  function handleDndFinalize(e: CustomEvent) {
    cards = e.detail.items;
  }

  const showWidgetEditionModal = () => {
    showModal = !showModal;
  };

  const selectWidgetsById = (id) => {
    matchedItem = remainedCards.find(item => item.id === id)
    if (matchedItem) {
      selectedWidgets = [...selectedWidgets, matchedItem]
      remainedCards = remainedCards.filter(item => item.id !== id)
    }
    setDataInLocalStorage()
  }

  const removeWidgetById = (id) => {
    const index = selectedWidgets.findIndex(item => item.id === id);
    if (index !== -1) {
      let removedItem = selectedWidgets.splice(index, 1);
      selectedWidgets = [...selectedWidgets]
      remainedCards = [...remainedCards, removedItem[0]]
    }
    setDataInLocalStorage()
  }

  const setDataInLocalStorage = () => {
    selectedWidgetIds = selectedWidgets.map((item)=> item.id)
    remainedCardIds = remainedCards.map((item)=> item.id)

    localStorage.setItem("selectedWidgetIds", JSON.stringify(selectedWidgetIds))
    localStorage.setItem("remainedCardIds",JSON.stringify(remainedCardIds))
  }

onMount(()=> {
  let widgetIdsInStorage = localStorage.getItem('selectedWidgetIds')
  if (widgetIdsInStorage) {
    selectedWidgetIds = [...JSON.parse(widgetIdsInStorage)]
    selectedWidgetIds.map((item)=>{
      matchedItem = cards.find(obj=> obj.id === item)
      return selectedWidgets = [...selectedWidgets, matchedItem]
    })
  }

  let cardIdsInStorage = localStorage.getItem('remainedCardIds')
  if (cardIdsInStorage) {
    remainedCardIds = [...JSON.parse(cardIdsInStorage)]
    remainedCardIds.map((item)=>{
      matchedItem = cards.find(obj => obj.id === item)
      return remainedCards = [...remainedCards, matchedItem]
    })
  } else {
    remainedCards = [...cards]
  }
})
</script>

<div class="dashboard relative w-full">
  <div
    class="stats scrollbar auto-hide-scroll-thumb sticky top-0 mt-5 hidden h-[calc(100vh-var(--app-header-height))] w-80 2xl:block"
  >
    <div class="sticky top-0 z-[1] w-full">
      <div class="w-full bg-white px-4 pt-4 dark:bg-black">
        <div class="relative mt-1 flex w-full items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            class="block w-full rounded-md border-neutral-300 pr-12 shadow-sm transition-colors duration-300 ease-in-out focus:border-teal-500 focus:ring-teal-500 dark:border-neutral-700 dark:bg-black dark:text-white sm:text-sm"
          />
          <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd
              class="inline-flex items-center rounded border border-neutral-200 px-2 font-sans text-sm font-medium text-neutral-400 dark:border-neutral-800 dark:text-neutral-600"
              >⌘K</kbd
            >
          </div>
        </div>
      </div>
      <div class="h-8 bg-gradient-to-b from-white dark:from-black">
        <button
          type="button"
          class="rounded-lg border border-neutral-200 px-4 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
          on:click={showWidgetEditionModal}
        >
          <svg
            class="-mt-1 inline h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Edit Widget
        </button>
        
      </div>
    </div>
    <section
      class="flex w-full flex-col items-center justify-start gap-4 p-4 pb-6 !outline-none"
      use:dndzone={{ items: selectedWidgets, flipDurationMs }}
      on:consider={handleDndConsider}
      on:finalize={handleDndFinalize}
    >
      {#each selectedWidgets as card (card.id)}
        <div class="w-full" animate:flip={{ duration: flipDurationMs }}>
          <svelte:component this={card.component} {...card.props} />
        </div>
      {/each}
    </section>
  </div>
  <div
    class="other w-full border-l-neutral-200 pb-20 dark:border-l-neutral-800 2xl:border-l"
  >
    <div
      class="flex w-full flex-col border-b border-neutral-200 bg-white px-4 py-6 dark:border-neutral-800 dark:bg-black dark:text-white sm:px-7 sm:pt-7"
    >
      <div class="flex w-full items-center">
        <div
          class="flex items-center text-2xl font-medium text-neutral-900 dark:text-white"
        >
          <img
            src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&amp;format=auto&amp;height=512&amp;version=1582611188&amp;width=512"
            class="mr-4 w-12 rounded-full"
            alt="profile"
          />
          {data?.user?.fullName}
        </div>
        <div class="ml-auto hidden items-center justify-end sm:flex">
          <div class="text-right">
            <div class="text-xs text-neutral-400 dark:text-neutral-400">
              Account balance:
            </div>
            <div class="text-lg text-neutral-900 dark:text-white">
              {formatCurrency(data?.tradeData?.totalNetPL, 'USD')}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lg: mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 2xl:max-w-7xl"
    >
      <div class="w-full">
        <div class="mt-4 h-80 w-full lg:mt-6 lg:h-96 xl:h-[30rem]">
          <ChartCard
            dailyPL={data?.daily?.dailyPL}
            cumulativeDailyPL={data?.daily?.dailyPL}
          />
        </div>
        <div class="mt-8 w-full rounded-md lg:mt-10">
          <TradeCalendar
            data={data?.calendarData}
            on:calendarWindowChange={handleCalendarWindowChange}
          />
        </div>
      </div>
    </div>
  </div>
</div>
<Modal
title="Select Widgets"
open={showModal}
on:close={showWidgetEditionModal}
>
<svelte:fragment slot="body">
  <div class="grid grid-cols-2 gap-1 text-gray-300">
    <div class="col-span-1 border-2 border-solid border-green-900">
        {#each remainedCards as card (card.id)}
          <div class="flex justify-between p-[10px] cursor-pointer border-slate-900 border-2 border-solid mt-2 hover:bg-green-500" on:click={selectWidgetsById(card.id)}>
            <span>{card.props.title}</span>
            <span>+</span>
          </div>
        {/each}
    </div>
    <div class="col-span-1">
      {#each selectedWidgets as widget (widget.id)}
        <div class="flex justify-between p-[10px] cursor-pointer border-slate-900 border-2 border-solid mt-2 hover:bg-green-400" on:click={removeWidgetById(widget.id)}>
          <span>{widget.props.title}</span>
          <span>-</span>
        </div>
      {/each}
    </div>
  </div>
</svelte:fragment>
</Modal>

<style lang="postcss">
  .dashboard {
    display: grid;
    grid-template-areas: 'stats other';
    grid-template-columns: auto 1fr;
  }
  .stats {
    grid-area: stats;
  }
  .other {
    grid-area: other;
  }
</style>
