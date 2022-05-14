<script lang="ts">
  export let greeting: string;
  import Input from './Input.svelte';
</script>

<main class="max-w-xs m-auto">
  <h1 class="text-pink-400 text-center text-4xl">{greeting}</h1>
  <Input name="title" />
</main>

<style>
  main > :global(*) {
    @apply mt-8;
  }
</style>
