<script lang="ts">
  import Input from './C/Input.svelte';
  import SubmitBtn from './C/SubmitBtn.svelte';
  import { queriesStore, promisesStore } from './stores';
  import { getItemData } from './F/getData';
  import Items from './C/Items.svelte';
  import Loading from './C/Loading.svelte';
  import ItemHeading from './C/ItemHeading.svelte';
  import { services } from '../constants';

  function getAll(name: string) {
    const promises = services.map(async (service) => {
      try {
        const res = await getItemData(`${service}products`, name);
        return { serviceName: service, res };
      } catch (err: unknown) {
        if (err) throw err;
      }
    });

    $promisesStore = promises;
  }
</script>

<main class="max-w-xs md:max-w-lg lg:max-w-5xl text-xl my-2 m-auto">
  <div
    class="home flex flex-col lg:flex-row items-center lg:items-start lg:justify-center"
  >
    <div class="input-container flex flex-row">
      <Input name="name" handleKeyDown="{() => getAll($queriesStore.name)}" />
      <SubmitBtn handleClick="{() => getAll($queriesStore.name)}" />
    </div>
  </div>
  {#each $promisesStore as promise, i}
    {#await promise}
      <Loading min i />
    {:then { serviceName, res }}
      <Items serviceName="{serviceName}" items="{res}" length="{res.length}" />
    {:catch { response: { data: { serviceName }, status, statusText } }}
    <ItemHeading {serviceName} />
      <p class="error">{status}: {statusText}</p>
    {/await}
  {/each}
</main>

<style global lang="postcss">
  @import './.css/index.css';
  @import './.css/App.css';
</style>
