<script lang="ts">
  import { getApiData } from '../F/getApiData';
  import Loading from './Loading.svelte';

  export let name: string, service: string, id: string;
</script>

{#await getApiData(service, 'item', id)}
  <div class="min-h-[92.5px] relative">
    <Loading min mode="#" i />
  </div>
{:then { data: { name, basePrice, finalPrice, formattedBasePrice, formattedPrice, message, productUrl, status, releaseDate, headerImg } }}
  <div class="min-h-[92.5px] relative">
    <img
      src="{headerImg}"
      alt="header"
      class="absolute -z-10 right-0 w-full h-full object-cover"
    />
    <a
      class="font-serif underline hover:no-underline w-full"
      href="{productUrl}"
      target="_blank"
      rel="noreferrer"
    >
      {@html name}
    </a>
    <p class="mt-2">
      {#if message}
        <span>{message}</span>
      {/if}
      {#if status}
        <span class="uppercase">{status}</span>
      {:else if basePrice && basePrice !== finalPrice}
        <span class="line-through">{formattedBasePrice}</span>
        <span>-{Math.floor(100 - (100 * finalPrice) / basePrice)}%</span>
        <span>{formattedPrice}</span>
      {:else if formattedPrice}
        <span>{formattedPrice}</span>
      {:else}
        <span class="italic font-mono">n/a</span>
      {/if}
    </p>
    {#if releaseDate}
      <p class="font-mono text-sm mt-2">release: {releaseDate}</p>
    {/if}
  </div>
{:catch { response: { data: { message }, status, statusText } }}
  <div class="mt-12">
    {#if name}
      <h4 class="font-serif">{@html name}</h4>
    {/if}
    <div class="error mt-2">
      <p>{`${statusText}`}</p>
      {#if message}
        <p>{message}.</p>
      {/if}
    </div>
  </div>
{/await}

<style>
  img {
    opacity: 0.7;
    -webkit-mask-image: -webkit-gradient(
      linear,
      right top,
      left top,
      from(black),
      color-stop(50%, transparent)
    );
    -webkit-mask-image: linear-gradient(to left, black, transparent 50%);
    mask-image: -webkit-gradient(
      linear,
      right top,
      left top,
      from(black),
      color-stop(50%, transparent)
    );
    mask-image: linear-gradient(to left, black, transparent 50%);
  }

  @media (min-width: 768px) {
    img {
      opacity: 0.7;
      -webkit-mask-image: -webkit-gradient(
        linear,
        right top,
        left top,
        color-stop(20%, black),
        color-stop(50%, transparent)
      );
      -webkit-mask-image: linear-gradient(to left, black 20%, transparent 50%);
      mask-image: -webkit-gradient(
        linear,
        right top,
        left top,
        color-stop(20%, black),
        color-stop(50%, transparent)
      );
      mask-image: linear-gradient(to left, black 20%, transparent 50%);
    }
  }
</style>
