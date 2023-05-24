<script lang="ts">
  import {
    formatCurrency,
    formatDateTime,
    formatNumber,
  } from '$lib/utils/format';
  import type { PageData } from './$types';
  import DailyNotebookCard from './DailyNotebookCard.svelte';
  import MonthlyNotebookCard from './MonthlyNotebookCard.svelte';
  import SimpleLineChart from './SimpleLineChart.svelte';

  export let data: PageData;
  // trades.reduce((acc, trade) => {
  //   const date = trade.closeDate;
  //   const momentedDate = moment(date).format('YYYY-MM-DD');
  //   if (acc[momentedDate]) {
  //     acc[momentedDate] += trade.netPL;
  //   } else {
  //     acc[momentedDate] = trade.netPL;
  //   }
  //   return acc;
  // }, {} as { [key: string]: number });
</script>

<div class="h-full w-full">
  <div class="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
    <h1
      class="text-3xl font-bold capitalize tracking-tight text-slate-900 dark:text-neutral-100"
    >
      notebooks
    </h1>
    <div class="mt-4 grid w-full gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
      {#each data.groupedTradesByDay as group, i (group.id)}
        <h3
          class="col-span-full mt-6 block text-lg font-semibold text-black/80 dark:text-white/80"
        >
          {formatDateTime(new Date(group.id), {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
          })}
        </h3>
        <a
          href="/notebooks/month--{group.id.slice(0, 7)}"
          class="col-span-full"
        >
          <MonthlyNotebookCard
            title="overview - {formatDateTime(new Date(group.id), {
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            })}"
            class="w-full"
            value={formatCurrency(
              group.items.reduce((acc, item) => acc + item.netPL, 0),
              'USD'
            )}
            change={group.winRate /
              (data.groupedTradesByDay?.[i - 1]?.winRate ?? 1)}
            items={group.items}
            winRate={group.winRate}
            date={group.id}
          />
        </a>
        {#each group.items as notebook, j (notebook.id)}
          {@const previousWinRate = group.items?.[j - 1]?.winRate ?? 1}
          <a href="/notebooks/day--{notebook.date.slice(0, 10)}">
            <DailyNotebookCard
              title={formatDateTime(new Date(notebook.date), {
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC',
              })}
              value={formatCurrency(notebook.netPL, 'USD')}
              change={(notebook.winRate - previousWinRate) / previousWinRate}
            >
              <svelte:fragment slot="value" let:value>
                {value}
                <span class="ml-2 text-sm font-medium dark:text-neutral-400"
                  >Net P/L</span
                >
              </svelte:fragment>
              <svelte:fragment slot="other">
                <div
                  class="mt-1 flex basis-full items-center justify-start capitalize text-neutral-600 dark:text-neutral-400"
                >
                  <div class="text-sm">
                    <span class="font-medium text-black dark:text-white">
                      {notebook.trades.length}
                    </span>
                    total
                  </div>
                  <div
                    class="mx-2 h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-500"
                  />
                  <div class="text-sm">
                    <span class="font-medium text-green-500"
                      >{notebook.wins}</span
                    > w
                  </div>
                  <div
                    class="mx-2 h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-500"
                  />
                  <div class="text-sm">
                    <span class="font-medium text-red-500"
                      >{notebook.losses}</span
                    > l
                  </div>
                  <div
                    class="mx-2 h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-500"
                  />
                  <div class="text-sm">
                    <span class="font-medium text-black dark:text-white">
                      {formatNumber(notebook.winRate, {
                        style: 'percent',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    rate
                  </div>
                </div>
                <div class="mt-1 h-20 w-full">
                  <SimpleLineChart
                    id={`notebook-${notebook.id}`}
                    data={Object.fromEntries(
                      notebook.trades.map((trade) => [
                        new Date(trade.closeDate) + 0,
                        trade.netPL,
                      ])
                    )}
                  />
                </div>
              </svelte:fragment>
            </DailyNotebookCard>
          </a>
        {/each}
      {/each}
    </div>
  </div>
</div>
