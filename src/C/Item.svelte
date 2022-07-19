<script lang="ts">
  import { getApiData } from '../F/getData';
  import Loading from './Loading.svelte';

  export let name: string, service: string, id: string;
</script>

<div class="flex flex-col">
  {#await getApiData(`${service}item`, id)}
    <Loading min mode="#" i />
    <p class="mt-1">&nbsp;</p>
    <p class="mt-1">&nbsp;</p>
    <!-- <p class="mt-1">&nbsp;</p> -->
  {:then { data: { name, currencyCode, basePrice, finalPrice, message, productUrl, status, releaseDate } }}
    <a
      class="font-serif underline hover:no-underline"
      href="{productUrl}"
      target="_blank"
      rel="noreferrer">{@html name}</a
    >
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
      {:else if finalPrice}
        <span class="line-through">{basePrice}</span>
        <span>-{Math.floor(100 - (100 * +finalPrice) / +basePrice)}%</span>
        <span>{finalPrice}</span>
        <span>{currencyCode}</span>
      {/if}
    </p>
    {#if releaseDate}
      <p class="font-mono text-sm mt-2">release: {releaseDate}</p>
    {/if}
  {:catch { response: { data: { message }, status, statusText } }}
    {#if name}
      <p>{@html name}</p>
    {/if}
    <div class="error mt-2">
      <p>{`${status}: ${statusText}`}</p>
      {#if message}
        <p>{message}.</p>
      {/if}
    </div>
  {/await}
</div>
