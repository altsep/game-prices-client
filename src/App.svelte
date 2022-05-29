<script lang="ts">
  export let greeting: string;
  import Input from './Input.svelte';
  import Steam from './SteamAppList.svelte';
  import SteamApp from './SteamApp.svelte';
  import Loading from './Loading.svelte';
  import System from './System.svelte';
  import { appStore } from './stores';

  $: ({ loading, error } = $appStore);
</script>

<main class="max-w-xs md:max-w-lg lg:max-w-5xl text-xl my-2 m-auto">
  {#if !$appStore.active}
    <h1 class="text-pink-400 text-center text-5xl font-serif">
      {@html greeting}
    </h1>
  {/if}
  {#if $appStore.active}
    <SteamApp />
  {:else}
    <div
      class="home flex flex-col lg:flex-row items-center lg:items-start lg:justify-center"
    >
    <div>
        <Input name="name" />
        <Input name="appid" />
        {#if loading}
          <Loading sys />
        {:else if error}
          <System content="couldn't get data" />
        {/if}
      </div>
      <Steam />
    </div>
  {/if}
</main>

<style lang="postcss">
  main > :global(*) {
    @apply mt-12;
  }

  .home > :global(*) {
    @apply lg:m-8;
  }
</style>
