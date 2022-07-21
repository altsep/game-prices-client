<script lang="ts">
  let servicesTest: any[] = ['a', 'b', 'c'];

  const handleServiceOrder = async (e: Event) => {
    const { value, name } = e.target as HTMLInputElement;
    const { default: reorderArray } = await import('../F/reorderArray');
    const servicesReordered = reorderArray(servicesTest, name, +value);
    servicesTest = servicesReordered;
    localStorage.setItem('services', JSON.stringify(servicesReordered));
  };
</script>

{#each servicesTest as service, i (service)}
  <h4 class="pb-2 border-b item-heading">{service}</h4>
  <input
    class="system w-10"
    id="number"
    type="number"
    name="{service}"
    value="{i}"
    min="0"
    max="{servicesTest.length - 1}"
    on:change="{handleServiceOrder}"
  />
{/each}
