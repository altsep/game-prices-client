<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import System from './System.svelte';

  export let min = false,
    sys = false,
    i = false,
    p = 'p-0',
    mode = '.',
    text = 'loading';

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
  <System {p} {i} content="{min ? temp : content}" />
{:else}
  <p class="{p} {`${i ? 'italic' : ''}`}">{min ? temp : content}</p>
{/if}
