<script lang="ts">
  import { humanizerShort } from '$lib/utils/datetime';
  import { formatCurrency, formatNumber } from '$lib/utils/format';
  import ChartCard from './ChartCard.svelte';
  import HighlightedStatCard from './HighlightedStatCard.svelte';
  import StatCard from './StatCard.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="h-full w-full">
  <div class="mx-auto w-full max-w-[92rem] py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
    <h1
      class="text-3xl font-bold capitalize tracking-tight text-slate-900 dark:text-neutral-100"
    >
      reports
    </h1>

    <dl class="mt-12 grid grid-cols-12 gap-3 sm:gap-5 lg:mt-16">
      <HighlightedStatCard
        title="best month"
        value={formatCurrency(data?.tradeData?.largestProfit, 'USD')}
        change={0.151}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <HighlightedStatCard
        title="worst month"
        value={formatCurrency(data?.tradeData?.largestLoss, 'USD')}
        change={-0.5056}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <HighlightedStatCard
        title="month average"
        value={formatCurrency(data?.tradeData?.averageWin, 'USD')}
        change={0.1291}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
    </dl>

    <div class="mt-12 h-80 w-full lg:mt-16 lg:h-96 xl:h-[30rem]">
      <ChartCard
        dailyPL={data?.daily?.dailyPL}
        cumulativeDailyPL={data?.daily?.dailyPL}
      />
    </div>

    <h2
      class="mt-16 text-xl font-medium capitalize tracking-tight text-slate-900 dark:text-neutral-100 lg:mt-20"
    >
      trade statistics
    </h2>
    <dl class="mt-2 grid grid-cols-12 gap-3 sm:gap-5">
      <!-- <div class="relative overflow-hidden rounded-lg bg-white dark:bg-neutral-900/70 px-4 pt-5 shadow sm:px-6 sm:pt-6">
        <dt>
          <div class="absolute rounded-md bg-indigo-500 p-3">
            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <p class="ml-16 truncate text-sm font-medium text-neutral-500">Total Subscribers</p>
        </dt>
        <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
          <p class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">71,897</p>
          <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
            <svg class="h-5 w-5 flex-shrink-0 self-center text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd" />
            </svg>
            <span class="sr-only"> Increased by </span>
            122
          </p>
        </dd>
      </div> -->

      <StatCard
        title="total net p&l"
        value={formatCurrency(data?.tradeData?.totalNetPL, 'USD')}
        change={0}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="total trades"
        value={data?.tradeData?.totalTrades}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="max consecutive wins"
        value={data?.tradeData?.maxConsecutiveWins}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="largest profit"
        value={formatCurrency(data?.tradeData?.largestProfit, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="profit factor"
        value={formatNumber(data?.tradeData?.profitFactor, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="number of winners"
        value={data?.tradeData?.numberOfWinners}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="max consecutive losses"
        value={data?.tradeData?.maxConsecutiveLosses}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="largest loss"
        value={formatCurrency(data?.tradeData?.largestLoss, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="average winner"
        value={formatCurrency(data?.tradeData?.averageWin, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="number of losers"
        value={formatCurrency(data?.tradeData?.averageLoss, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="total fees"
        value={formatCurrency(data?.tradeData?.totalFees, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="avgrage hold time for winners"
        value={humanizerShort(data?.tradeData?.averageHoldingTimeForWinners, {
          maxDecimalPoints: 0,
          largest: 2,
        })}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="average loser"
        value={formatCurrency(data?.tradeData?.averageLoss, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="avgrage hold time for losers"
        value={humanizerShort(data?.tradeData?.averageHoldingTimeForLosers, {
          maxDecimalPoints: 0,
          largest: 2,
        })}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
    </dl>
    <h2
      class="mt-12 text-xl font-medium capitalize tracking-tight text-slate-900 dark:text-neutral-100 lg:mt-16"
    >
      daily statistics
    </h2>
    <dl class="mt-2 grid grid-cols-12 gap-3 sm:gap-5">
      <StatCard
        title="total net p&l"
        value={formatCurrency(data?.tradeData?.totalNetPL, 'USD')}
        change={0}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="total fees"
        value={formatCurrency(data?.tradeData?.totalFees, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="avgrage hold time for winners"
        value={humanizerShort(data?.tradeData?.averageHoldingTimeForWinners, {
          maxDecimalPoints: 0,
          largest: 2,
        })}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="average loser"
        value={formatCurrency(data?.tradeData?.averageLoss, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="avgrage hold time for losers"
        value={humanizerShort(data?.tradeData?.averageHoldingTimeForLosers, {
          maxDecimalPoints: 0,
          largest: 2,
        })}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
    </dl>
    <h2
      class="mt-12 text-xl font-medium capitalize tracking-tight text-slate-900 dark:text-neutral-100 lg:mt-16"
    >
      weekly statistics
    </h2>
    <dl class="mt-2 grid grid-cols-12 gap-3 sm:gap-5">
      <StatCard
        title="number of winners"
        value={data?.tradeData?.numberOfWinners}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="max consecutive losses"
        value={data?.tradeData?.maxConsecutiveLosses}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="largest loss"
        value={formatCurrency(data?.tradeData?.largestLoss, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="average winner"
        value={formatCurrency(data?.tradeData?.averageWin, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="number of losers"
        value={formatCurrency(data?.tradeData?.averageLoss, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
    </dl>
    <h2
      class="mt-12 text-xl font-medium capitalize tracking-tight text-slate-900 dark:text-neutral-100 lg:mt-16"
    >
      monthly statistics
    </h2>
    <dl class="mt-2 grid grid-cols-12 gap-3 sm:gap-5">
      <StatCard
        title="number of winners"
        value={data?.tradeData?.numberOfWinners}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="max consecutive losses"
        value={data?.tradeData?.maxConsecutiveLosses}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="total trades"
        value={data?.tradeData?.totalTrades}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="max consecutive wins"
        value={data?.tradeData?.maxConsecutiveWins}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="largest profit"
        value={formatCurrency(data?.tradeData?.largestProfit, 'USD')}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="profit factor"
        value={formatNumber(data?.tradeData?.profitFactor, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="number of winners"
        value={data?.tradeData?.numberOfWinners}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
      <StatCard
        title="max consecutive losses"
        value={data?.tradeData?.maxConsecutiveLosses}
        class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
      />
    </dl>
  </div>
</div>
