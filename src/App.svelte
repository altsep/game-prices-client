<script lang="ts">
  import Input from './C/Input.svelte';
  import SubmitBtn from './C/SubmitBtn.svelte';
  import { queriesStore } from './stores';
  import Items from './C/Items.svelte';
  import Loading from './C/Loading.svelte';
  import { services } from '../constants';
  import getAllProducts from './F/getAllProducts';
  import type { Service } from './interfaces';

  let promises: Promise<Service>[];

  const assignPromises = () =>
    (promises = getAllProducts($queriesStore.name, services, 'products'));
</script>

<main class="max-w-xs md:max-w-lg lg:max-w-xl text-xl my-2 m-auto">
  <div
    class="home flex flex-col lg:flex-row items-center lg:items-start lg:justify-center"
  >
    <div class="input-container flex flex-row">
      <Input name="name" handleKeyDown="{assignPromises}" focus />
      <SubmitBtn handleClick="{assignPromises}" />
    </div>
  </div>
  {#if promises}
    {#each promises as promise, i}
      {#await promise}
        <h4 class="pb-2 border-b item-heading">
          {services[i]}
        </h4>
        <Loading min mode="#" i />
      {:then { serviceName, res: { data } }}
        <Items serviceName="{serviceName}" items="{data}" />
      {:catch { response: { data: { serviceName }, status, statusText } }}
        <h4 class="pb-2 border-b item-heading">
          {services[i]}
        </h4>
        <p class="error">{status}: {statusText}</p>
      {/await}
    {/each}
  {:else}
    <p class="error text-center">
      Please enter the name of an item to look for.
    </p>
  {/if}
</main>

<style global lang="postcss">
  @import './.css/index.css';
  @import './.css/App.css';
</style>
