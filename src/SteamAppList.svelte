<script lang="ts">
  import { onMount } from 'svelte';
  import { queriesStore, appStore } from './stores';
  import { getSteamAppData } from './getData';
  import System from './System.svelte';

  interface App {
    appid: number;
    name: string;
  }

  let appList: App[];
  let appListFiltered: App[];

  onMount(async () => {
    $appStore.loading = true;
    try {
      const { apps } = await import('./steamapps.json');
      appList = apps;
      $appStore.loading = false;
    } catch (err) {
      if (err) throw err;
      $appStore.loading = false;
    }
  });

  let timeout: NodeJS.Timeout;

  $: {
    const queries = Object.keys($queriesStore);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      appListFiltered = appList
        .filter((a) => {
          if ($queriesStore.name) {
            const qLC = $queriesStore.name.toLowerCase();
            return a.name.toLocaleLowerCase().startsWith(qLC);
          }
          return queries.some((key) => $queriesStore[key]);
        })
        .filter((a) => {
          if ($queriesStore.appid) {
            return a.appid.toString() === $queriesStore.appid;
          }
          return queries.some((key) => $queriesStore[key]);
        })
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 10);
    }, 500);
  }

  const handleClick = async (id: string | number) => {
    $appStore.loading = true;
    $appStore.error = null;
    try {
      const data = await getSteamAppData(id);
      $appStore.data = data;
      $appStore.active = true;
      $appStore.loading = false;
    } catch (err) {
      if (err) {
        $appStore.error = err;
        $appStore.loading = false;
        throw err;
      }
    }
  };
</script>

<div class="max-w-lg w-full mt-8 lg:mt-0">
  {#if appListFiltered && appListFiltered.length > 0}
    {#each appListFiltered as { appid, name }, i}
      <p
        class="even:bg-gray-100 odd:bg-gray-50 hover:bg-gray-200 p-4 cursor-pointer"
        on:click="{() => handleClick(appid)}"
      >
        <span>{name}</span>
      </p>
    {/each}
    {:else}
    <System content='enter app title or id.' />
  {/if}
  <!-- TODO: add logic for showing more elements -->
  <!-- <p class="font-mono text-xs italic text-gray-500 my-2 text-center">load more</p> -->
</div>
