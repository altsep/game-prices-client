<script lang="ts">
  import { onMount } from 'svelte';
  import { queriesStore } from '../stores';

  export let name = 'input',
    handleSubmit: () => void,
    focus = false;

  let ref: null | HTMLInputElement = null;

  onMount(() => {
    if (focus) {
      ref.focus();
    }
  });
</script>

<input
  class="border-2 rounded-md px-2 py-1 base h-12 w-full md:w-max"
  type="text"
  name="{name}"
  id="{name}"
  bind:value="{$queriesStore[name]}"
  bind:this="{ref}"
  placeholder="{name}"
  on:keydown="{(e) => e.key === 'Enter' && handleSubmit()}"
/>
