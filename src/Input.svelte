<script lang="ts">
  import { onMount } from 'svelte';
  import { queries } from './stores';

  export let name = 'input';
  let ref = null;

  onMount(() => {
    ref.focus();
  });
</script>

<div class="w-max m-auto">
  <input
    class="border-2 rounded-md px-2 py-1 text-base"
    type="text"
    name="{name}"
    bind:value="{$queries[name]}"
    bind:this="{ref}"
  />
</div>
