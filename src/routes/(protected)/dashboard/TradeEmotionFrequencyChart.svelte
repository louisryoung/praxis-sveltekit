<script lang="ts">
  export let title: string;
  let classProp = '';
  export { classProp as class };

  const emotions = {
    fear: {
      imoji: '😨',
      frequency: 0,
    },
    greed: {
      imoji: '🤑',
      frequency: 0,
    },
    hope: {
      imoji: '🤞',
      frequency: 0,
    },
    anxiety: {
      imoji: '😰',
      frequency: 0,
    },
    boredom: {
      imoji: '😴',
      frequency: 0,
    },
    frustration: {
      imoji: '😡',
      frequency: 0,
    },
    revenge: {
      imoji: '🤬',
      frequency: 0,
    },
    conviction: {
      imoji: '💪',
      frequency: 0,
    },
    confidence: {
      imoji: '😎',
      frequency: 0,
    },
  };

  for (const [key, value] of Object.entries(emotions)) {
    emotions[key].frequency = Math.floor(Math.random() * 100);
  }

  let totalFrequency = Object.values(emotions).reduce(
    (acc, cur) => acc + cur.frequency,
    0
  );
</script>

<div
  class="relative overflow-hidden rounded-lg border border-neutral-200/70 bg-neutral-50 transition-colors duration-200 ease-in-out hover:bg-neutral-100/80 dark:border-neutral-800/70 dark:bg-neutral-900/70 dark:hover:bg-neutral-900 {classProp}"
>
  <div class="px-5 py-3">
    <div class="flex items-center">
      <div class="flex-shrink-0" />
      <div class="ml-0 w-0 flex-1">
        <dl>
          <dt>
            <p
              class="truncate text-sm font-medium capitalize text-teal-500 dark:text-teal-500"
            >
              {title}
            </p>
          </dt>
          <dd class="w-full">
            <div class="mt-2 flex h-full flex-col gap-1">
              {#each Object.entries(emotions) as [key, value] (key)}
                {@const share = (value.frequency / totalFrequency) * 100}
                <div class="w-full">
                  <div class="flex items-center justify-between">
                    <h4
                      class="text-sm capitalize leading-none text-black dark:text-white"
                    >
                      {key} <span class="text-base">{value.imoji}</span>
                    </h4>
                    <div
                      class="flex flex-row text-xs text-neutral-700 dark:text-neutral-300"
                    >
                      ({value.frequency})
                    </div>
                  </div>
                  <div class="relative pt-0.5">
                    <div
                      class="mb-2 flex h-2 overflow-hidden rounded bg-neutral-200 text-xs dark:bg-neutral-800"
                      title="{share.toFixed(2)}%"
                    >
                      <div
                        style="width: {share}%"
                        class="flex flex-col justify-center whitespace-nowrap bg-teal-500 text-center text-white shadow-none dark:bg-teal-500"
                      />
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </dd>
        </dl>
        <dl class="flex items-center justify-end gap-x-1">
          <dt>
            <span
              class="truncate text-xs font-medium capitalize text-teal-600 dark:text-teal-500"
            >
              Total:
            </span>
          </dt>
          <dd class="mt-0.5 text-sm dark:text-white">
            <span
              class="text-xs font-medium text-neutral-700 dark:text-neutral-300"
            >
              {Math.floor(
                Object.values(emotions).reduce(
                  (acc, cur) => acc + cur.frequency,
                  0
                ) / 3
              )}
            </span>
            <!-- /
            <span class="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {Object.values(emotions).length}
            </span> -->
          </dd>
        </dl>
      </div>
    </div>
  </div>
</div>
