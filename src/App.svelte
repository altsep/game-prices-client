<script lang="ts">
  import Input from './C/Input.svelte';
  import SubmitBtn from './C/SubmitBtn.svelte';
  import { queriesStore } from './stores';
  import { services } from '../constants';
  import Items from './C/Items.svelte';
  import Loading from './C/Loading.svelte';
  import type { Service } from './interfaces';

  let promises: Promise<Service>[];

  let searched = false;

  const handleSubmit = async () => {
    const { default: getAllProducts } = await import('./F/getAllProducts');
    promises = getAllProducts($queriesStore.name, services, 'products');
    $queriesStore.name = '';
    searched = true;
  };

  let servicesHtml = services
    .map((s) => `<span class='font-bold'>${s.toUpperCase()}</span>`)
    .join(',&nbsp;')
    .replace(/(.+),&nbsp;(.+)$/, '$1 and $2');
</script>

<main class="max-w-xs md:max-w-lg lg:max-w-xl text-xl my-2 m-auto">
  <div
    class="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center"
  >
    <div class="input-container flex flex-row">
      <Input name="name" handleSubmit="{handleSubmit}" focus />
      <SubmitBtn name="name" handleSubmit="{handleSubmit}" />
    </div>
  </div>
  {#if !searched}
    <div class="system">
      <p>Welcome to the game stores prices aggregator.</p>
      <p>
        Here a name of the application to search for can be entered to get a
        formatted list of items.
      </p>
      <p>
        The app does not utilize a DB and merely returns search results for each
        of the corresponding services, then separately requests details for
        every displayed item — currently {@html servicesHtml} stores are supported.
      </p>
    </div>
  {/if}
  {#if promises}
    {#each promises as promise, i}
      {#await promise}
        <h4 class="pb-2 border-b item-heading">
          {services[i]}
        </h4>
        <Loading i />
      {:then { serviceName, res: { data } }}
        <Items serviceName="{serviceName}" items="{data}" />
      {:catch { response: { data: { }, status, statusText } }}
        <h4 class="pb-2 border-b item-heading">
          {services[i]}
        </h4>
        <p class="error">{statusText}</p>
      {/await}
    {/each}
  {:else if searched}
    <p class="error text-center">
      Please enter the name of an item to look for.
    </p>
  {/if}
</main>

<style global lang="postcss">
  @import './.css/index.css';
  @import './.css/App.css';
</style>
