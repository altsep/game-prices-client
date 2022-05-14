<script lang="ts">
  export let greeting: string;
  import Input from './Input.svelte';
  import { queries } from './stores';
  $: console.log($queries);
</script>

<main class="max-w-xs m-auto">
  <h1 class="text-pink-400 text-center text-4xl">{greeting}</h1>
  <Input name="title" />
  <Input name="price" />
  <p>{Object.values($queries).join(', ')}</p>
</main>

<style>
  main > :global(*) {
    @apply mt-8;
  }
</style>
