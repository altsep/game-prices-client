<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import System from './System.svelte';

  export let min = false;
  export let sys = false;
  export let i = false;
  export let mode = '.';
  export let text = 'loading';

  let temp: string;

  let interval: NodeJS.Timeout;

  function modifyString(param: string) {
    temp = param;
    interval = setInterval(() => {
      if (temp.length < 3) {
        temp += param;
      } else temp = param;
    }, 300);
  }

  onMount(() => modifyString(mode));

  onDestroy(() => clearInterval(interval));

  $: content = text + temp;
</script>

{#if sys}
  <System content="{min ? temp : content}" />
{:else}
  <span class={`${i && 'italic'}`}>{min ? temp : content}</span>
{/if}
