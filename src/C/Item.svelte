<script lang="ts">
  import { getApiData } from '../F/getData';
  import Loading from './Loading.svelte';

  export let name: string, service: string, id: string;
</script>

<div class="min-h-[92.5px] relative">
  {#await getApiData(`${service}item`, id)}
    <Loading min mode="#" i />
  {:then { data: { name, currencyCode, basePrice, finalPrice, message, productUrl, status, releaseDate, headerImg } }}
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
      {:else if !finalPrice}
        <span class="italic font-mono">n/a</span>
      {:else if basePrice === finalPrice}
        <span>{finalPrice}</span>
        <span>{currencyCode}</span>
      {:else if basePrice && finalPrice}
        <span class="line-through">{basePrice}</span>
        <span>-{Math.floor(100 - (100 * +finalPrice) / +basePrice)}%</span>
        <span>{finalPrice}</span>
        <span>{currencyCode}</span>
      {:else if finalPrice}
        <span>{finalPrice}</span>
      {/if}
    </p>
    {#if releaseDate}
      <p class="font-mono text-sm mt-2">release: {releaseDate}</p>
    {/if}
  {:catch { response: { data: { message }, status, statusText } }}
    {#if name}
      <p class="font-serif">{@html name}</p>
    {/if}
    <div class="error mt-2">
      <p>{`${status}: ${statusText}`}</p>
      {#if message}
        <p>{message}.</p>
      {/if}
    </div>
  {/await}
</div>

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
