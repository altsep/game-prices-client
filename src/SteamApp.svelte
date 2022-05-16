<script lang="ts">
  import axios from 'axios';
  import { queriesStore } from './stores';
  import { onMount } from 'svelte';
  const API_ROOT = process.env.API_ROOT;

  /*   
  STOREFRONT APIS
  https://wiki.teamfortress.com/wiki/User:RJackson/StorefrontAPI#appdetails
  APP RELATED API LIST
  https://steamapi.xpaw.me/#ISteamApps
  APP LIST
  'https://api.steampowered.com/ISteamApps/GetAppList/v2/?format=json';
  APP DETAILS
  'https://store.steampowered.com/api/appdetails?appids=57690&format=json';
  APP PAGE
  'https://store.steampowered.com/app/238960/Path_of_Exile/';
  */

  interface App {
    appid: number;
    name: string;
  }
  interface AppDataEntry {
    [key: string]: string | number;
  }
  type LinkedList<T> = T & {
    [key: string]: LinkedList<T>;
  };
  type AppData = LinkedList<AppDataEntry>;

  let appList: App[],
    appListFiltered: App[],
    appData: AppData[] = [],
    appsUrl = API_ROOT + 'api/steamapps',
    /* next url accepts filters! */
    appDataUrl = (appId: number) =>
      API_ROOT +
      `api/steamappdetails/${appId}/?format=json&filters=price_overview,basic`;

  onMount(() => {
    /* get app list */
    axios
      .get(appsUrl)
      .then(({ data }) => {
        /* appList is an array of 142334 items */
        appList = data.apps;
      })
      .catch((err) => console.log(err));
  });

  let status: boolean, timeout: NodeJS.Timeout;

  $: $queriesStore,
    clearTimeout(timeout),
    (timeout = setTimeout(() => {
      status = false;
    }, 500)),
    (status = true);

  $: {
    if (appList) {
      const queries = Object.keys($queriesStore);
      if (!status) {
        appListFiltered = appList
          .filter((a) => {
            for (let q of queries) {
              if ($queriesStore[q]) {
                switch (q) {
                  case 'name': {
                    const qLC = $queriesStore[q].toLowerCase();
                    return a[q].toLocaleLowerCase().startsWith(qLC);
                  }
                  case 'appid': {
                    // 57690
                    if (a[q].toString().startsWith($queriesStore[q])) {
                      console.log($queriesStore[q], a[q]);
                    }
                    return a[q].toString().startsWith($queriesStore[q]);
                  }
                }
              }
            }
          })
          .sort((a, b) => a.name.localeCompare(b.name));
      }
    }
  }

  $: displayedArr = appListFiltered && appListFiltered.slice(0, 5);

  async function getPrice(id: number) {
    try {
      const { data } = await axios.get(appDataUrl(id));
      const { type, name, steam_appid: appid, price_overview } = data;
      const {
        initial_formatted: initial,
        discount_percent: discount,
        final_formatted: price,
      } = price_overview;
      return { type, name, appid, initial, discount, price };
    } catch (err) {
      throw new Error(err);
    }
  }
</script>

{#if displayedArr}
  <div>
    <h4 class="font-bold">steam</h4>
    {#each displayedArr as { appid, name }, i}
      {#await getPrice(appid)}
        <p>...</p>
      {:then { name, appid, initial, discount, price }}
        <p>
          <span>{appid}</span>:&nbsp;
          <span>{name}</span>
          {#if initial}
            <span class="line-through">{initial}</span>
          {/if}
          <span>{price}</span>
          {#if discount}
            <span>-{discount}%</span>
          {/if}
        </p>
      {:catch err}
        <p>
          <span>{appid}</span>:&nbsp;
          <span>{name}</span>
          <span class="italic text-xs font-mono">#unavailable</span>
        </p>
      {/await}
    {/each}
  </div>
{/if}
