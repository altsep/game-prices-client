<script lang="ts">
  import SliderBtn from './SliderBtn.svelte';
  import Item from './Item.svelte';
  import type { Product } from '../interfaces';

  export let serviceName: string,
    items: Product[],
    length = items.length;

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

{#each items as item, i}
  {#if i === count}
    <div class="pb-2 border-b flex justify-between items-center">
      <h4 class="item-heading">
        {serviceName}
      </h4>
      {#if items.length > 1}
        <p class="system text-center italic">
          {i + 1} of {length}
        </p>
        <svelte.fragment class="text-center md:text-right ">
          <SliderBtn
            handleClick="{handleClick}"
            title="{'previous'}"
            content="{'&lt;'}"
          />
          <SliderBtn
            handleClick="{handleClick}"
            title="{'next'}"
            content="{'&gt;'}"
          />
        </svelte.fragment>
      {/if}
    </div>
    <Item service="{serviceName}" {...item} />
  {/if}
{/each}
