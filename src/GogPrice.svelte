<script>
  //   import { onMount } from 'svelte';
  import { getGogProductPrice } from './getData';
  import { appStore } from './stores';
  import Loading from './Loading.svelte';

  //   let data;
  //   onMount(async () => {
  //     data = await getGogProductPrice($appStore.data.name);
  //   });

  //   const { currency, basePrice, finalPrice } = data;
  //   const { code } = currency;
  //   const base = basePrice.split(' ')[0];
  //   const final = finalPrice.split(' ')[0];
</script>

<div class="text-lg">
  <p class="uppercase">gog:</p>
  <p class="price text-2xl mt-2">
    {#await getGogProductPrice($appStore.data.name)}
      <Loading min mode="#" i />
    {:then { currency, basePrice, finalPrice }}
      <span class="line-through">
        {+basePrice.split(' ')[0] !== +finalPrice.split(' ')[0]
          ? basePrice
              .split(' ')[0]
              .split(/(?=\d{2}$)/)
              .join('.')
              .replace(/\.00/, '')
          : ''}
      </span>
      <span>{+basePrice.split(' ')[0] !== +finalPrice.split(' ')[0]
      // find percentage of a value
      // (100 * a) / b
      // relative difference
      // 100 * Math.abs((a - b) / ((a + b) / 2))
      ? `-${Math.ceil((100 * +finalPrice.split(' ')[0]) / +basePrice.split(' ')[0])}%` : ''}</span>
      <span>
        {finalPrice
          .split(' ')[0]
          .split(/(?=\d{2}$)/)
          .join('.')
          .replace(/\.00/, '')}
      </span>
      <span>{currency.code.toLowerCase()}</span>
    {:catch}
      <span>n/a</span>
    {/await}
  </p>
</div>
