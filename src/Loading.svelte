<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import System from './System.svelte';

  export let min = false;
  export let sys = false;

  let ellipses = '.';

  let interval: NodeJS.Timeout;

  onMount(() => {
    interval = setInterval(() => {
      if (ellipses.length < 3) ellipses += '.';
      else ellipses = '.';
    }, 200);
  });

  onDestroy(() => clearInterval(interval));

  $: text = `loading${ellipses}`;
</script>

{#if sys}
  <System content="{min ? ellipses : text}" />
{:else}
  {min ? ellipses : text}
{/if}
