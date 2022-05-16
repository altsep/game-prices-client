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
  <label class="mr-2" for="{name}">{name}</label>
  <input
    class="border-2 rounded-md px-2 py-1 text-base"
    type="text"
    name="{name}"
    id="{name}"
    bind:value="{$queriesStore[name]}"
    bind:this="{ref}"
  />
</div>
