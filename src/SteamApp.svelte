<script lang="ts">
  import { appStore } from './stores';
  import GogPrice from './GogPrice.svelte';

  const priceOverview = $appStore.data.price_overview;

  $: ({
    name,
    short_description: about,
    metacritic,
    genres,
    screenshots,
    release_date: release,
  } = $appStore.data);

  let initial: string | number;
  let discount: string | number;
  let price: string | number;
  let cur: string | number;

  if (priceOverview) {
    const {
      initial_formatted: initialFormatted,
      discount_percent: discountPercent,
      final_formatted: finalFormatted,
      currency,
    } = priceOverview;
    initial = initialFormatted;
    discount = discountPercent;
    price = finalFormatted;
    cur = currency;
  }

  initial = initial.toString().replace(/^\D|\s\D+/g, '');
  price = `${price.toString().replace(/^\D|\s\D+/g, '')} ${cur
    .toString()
    .toLowerCase()}`;

  let count = 0;
  const { length: scrLength } = $appStore.data.screenshots;
  let fade = false;
  const handleClick = (e: MouseEvent) => {
    const { title } = e.target as HTMLButtonElement;
    fade = true;
    if (title === 'next') return count < scrLength - 1 ? (count += 1) : (count = 0);
    if (title === 'previous') return count > 0 ? (count -= 1) : (count = scrLength - 1);
    return undefined;
  };
</script>

<div class="steam-app flex flex-col bg-gray-50">
  <button
    class="hover:no-underline hover:opacity-100 opacity-50 underline underline-offset-4 font-mono text-slate-500 decoration-slate-500 text-base absolute top-2"
    on:click="{() => ($appStore.active = false)}">return</button
  >
  {#if $appStore.data}
    <h2 class="mt-4 lg:mt-6 font-serif px-4 self-center">{name}</h2>
    <div class="flex flex-col lg:flex-row lg:p-4">
      <div class="self-center lg:self-start lg:p-4">
        <div
          class="relative mt-4 h-[180px] w-[320px] md:h-[252px] md:w-[448px] max-w-xs md:max-w-md"
        >
          <button
            class="text-gray-50 text-5xl hover:bg-gray-50/40 opacity-50 hover:opacity-100 absolute left-0 h-full flex items-center px-2 z-10"
            on:click="{handleClick}"
            title="previous">&lt;</button
          >
          {#each screenshots as { path_thumbnail: thumb, path_full: full }, i}
            {#if i === count}
              <a
                class="w-full"
                href="{full}"
                target="_blank"
                rel="noreferrer"
                title="open"
              >
                <img
                  id="scr"
                  class="{`${
                    fade ? 'opacity-0' : 'opacity-100'
                  } transition-opacity ease-in duration-200 h-full w-full rounded-md`}"
                  src="{thumb}"
                  alt=""
                  on:load="{() => (fade = false)}"
                />
              </a>
            {/if}
          {/each}
          <button
            class="text-gray-50 text-5xl hover:bg-gray-50/40 opacity-50 hover:opacity-100 absolute top-0 right-0 h-full flex items-center px-2 z-10"
            on:click="{handleClick}"
            title="next">&gt;</button
          >
        </div>
        <div class="mt-4 font-mono text-xs px-2">
          <div class="flex row">
            {#each genres as { description }, i}
              <p>{description}{i !== genres.length - 1 ? ',' : ''}</p>
              &nbsp;
            {/each}
          </div>
          {#if metacritic}
            <p class="mt-4">
              <a
                class="underline"
                href="{metacritic.url}"
                target="_blank"
                rel="noreferrer">metacritic</a
              >:
              <span>{metacritic.score}</span>
            </p>
          {/if}
          <p class="mt-4">
            {release.coming_soon ? 'coming soon' : `release: ${release.date}`}
          </p>
          <!-- Add developer info -->
        </div>
      </div>
      <div class="info text-base">
        <p class="p-2 md:p-4  mt-4">{@html about}</p>
        <div class="prices flex flex-col">
          <div class="text-lg">
            <p class="uppercase">steam:</p>
            <p class="price text-2xl mt-2">
              {#if priceOverview}
                {#if initial}
                  <span class="line-through">{initial}</span>
                {/if}
                {#if discount}
                  <span>-{discount}%</span>
                {/if}
                <span>
                  {price}
                </span>
              {:else}
                <span>n/a</span>
              {/if}
            </p>
          </div>
          <GogPrice />
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  h2 {
    @apply text-2xl font-semibold;
  }

  .price > *:not(:last-child) {
    @apply mr-1;
  }

  .prices > :global(div) {
    @apply p-2 md:p-4;
  }
</style>
