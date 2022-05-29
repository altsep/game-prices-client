<script lang="ts">
  import { onMount } from 'svelte';
  import { queriesStore } from './stores';

  export let name = 'input';
  let ref: null | HTMLInputElement = null;

  onMount(() => {
    if (ref.name === 'title') {
      ref.focus();
    }
  });
</script>

<div class="">
  <input
    class="border-2 rounded-md px-2 py-1 base h-12 w-full md:w-max"
    type="text"
    name="{name}"
    id="{name}"
    bind:value="{$queriesStore[name]}"
    bind:this="{ref}"
    placeholder="{name}"
  />
</div>

<style>
  div:not(:first-of-type) {
    @apply mt-4;
  }
</style>
