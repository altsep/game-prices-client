<script lang="ts">
  export let greeting: string;
  import Input from './Input.svelte';
  import Steam from './Steam.svelte';
</script>

<main class="max-w-xs m-auto">
  <h1 class="text-pink-400 text-center text-4xl font-serif">{greeting}</h1>
  <Input name="name" />
  <Input name="appid" />
  <Steam />
</main>

<style>
  main > :global(*) {
    @apply mt-8;
  }
</style>
