<script lang="ts">
  import SliderBtn from './SliderBtn.svelte';
  import System from './System.svelte';
  import Item from './Item.svelte';

  export let serviceName: string,
    items,
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

<div class="relative flex flex-col">
  {#each items as item, i}
    {#if i === count}
      <div class="md:flex justify-between">
        <Item service="{serviceName}" {...item} />
        {#if items.length > 1}
          <svelte.fragment class="flex justify-center md:justify-right">
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
      {#if items.length > 1}
        <div class="system text-right italic p-2">
          {i + 1} of {length}
        </div>
      {/if}
    {/if}
  {/each}
</div>
