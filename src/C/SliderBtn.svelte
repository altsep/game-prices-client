<script lang="ts">
  export let handleClick: (e: MouseEvent) => void,
    title: string,
    content: string;
</script>

<button
  class="text-gray-600 text-xl h-full hover:bg-gray-200 opacity-50 hover:opacity-100 px-4 md:px-8"
  on:click="{handleClick}"
  title="{title}"
>
  {@html content}
</button>
