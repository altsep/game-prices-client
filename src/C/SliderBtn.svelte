<script lang="ts">
  export let handleClick: (e: MouseEvent) => void,
    title: string,
    content: string;
</script>

<button
  class="text-gray-600 text-5xl hover:bg-gray-100 opacity-50 hover:opacity-100 p-4"
  on:click="{handleClick}"
  title="{title}"
>
  {@html content}
</button>
