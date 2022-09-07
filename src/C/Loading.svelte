<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let min = false,
    sys = false,
    i = false,
    lc = false,
    p = 'p-0',
    mode = '.',
    text = 'Loading';

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

<p class="{p} {`${i ? 'italic' : ''}`} {lc ? 'lowercase' : ''} {sys ? 'system' : ''} text-base">
  {min ? temp : content}
</p>
