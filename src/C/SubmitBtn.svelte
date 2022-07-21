<script lang="ts">
  export let handleSubmit: () => void, name: string;
</script>

<button
  class="submit mono p-2 bg-gray-100 hover:bg-gray-200 border-2 border-gray-500 rounded-md active:scale-95"
  on:click="{handleSubmit}"
  name="{name}">OK</button
>
