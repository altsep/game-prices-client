<script lang="ts">
  import SliderBtn from './SliderBtn.svelte';
  import { getItemData } from '../F/getData';
  import Loading from './Loading.svelte';
  import System from './System.svelte';
  import Item from './Item.svelte';
  import { servicesStore } from '../stores';
  import ItemHeading from './ItemHeading.svelte';

  export let serviceName: string, items, length;

  let count = 0;
  function handleClick(e: MouseEvent) {
    const { title } = e.target as HTMLButtonElement;
    switch (title) {
      case 'next':
        if (count < length - 1) {
          count += 1;
        } else {
          count = 0;
        }
        break;
      case 'previous':
        if (count > 0) {
          count -= 1;
        } else {
          count = length - 1;
        }
        break;
      default:
        return;
    }
  }
</script>

<div class="relative flex flex-col">
  <ItemHeading {serviceName} />
  {#if items.length > 1}
    <SliderBtn
      handleClick="{handleClick}"
      title="{'previous'}"
      content="{'&lt;'}"
    />
  {/if}
  {#each items as item, i}
    {#if i === count}
      <Item service="{serviceName}" {...item} />
      {#if items.length > 1}
        <div class="text-end">
          <System i end p="{'pt-2'}" content="{`${i + 1} of ${length}`}" />
        </div>
        <SliderBtn
          handleClick="{handleClick}"
          title="{'next'}"
          content="{'&gt;'}"
        />
      {/if}
    {/if}
  {/each}
</div>
