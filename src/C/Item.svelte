<script lang="ts">
  import { getItemData } from '../F/getData';
  import Loading from './Loading.svelte';

  export let name: string, service: string, id: string;
</script>

<div>
  <p class="font-serif">{@html name}</p>
  <p class="mt-2">
    {#await getItemData(`${service}itemprice`, id)}
      <Loading min mode="#" i />
    {:then { data: { code, basePrice, finalPrice, message } }}
      {#if message}
        <span>{message}</span>
      {:else if finalPrice === '0'}
        <span>FREE</span>
      {:else if basePrice === finalPrice}
        <span>{finalPrice}</span>
        <span>{code}</span>
      {:else}
        <span class="line-through">{basePrice}</span>
        <span>-{Math.floor(100 - (100 * +finalPrice) / +basePrice)}%</span>
        <span>{finalPrice}</span>
        <span>{code}</span>
      {/if}
    {:catch { response }}
      <div class="error">
        <p>{`${response.status}: ${response.statusText}`}</p>
        <p>{response.data.message}.</p>
      </div>
    {/await}
  </p>
</div>
