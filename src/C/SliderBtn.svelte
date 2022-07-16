<script lang="ts">
  export let handleClick: (e: MouseEvent) => void, title: string, content: string;
</script>

<button
  class="text-gray-600 text-5xl hover:bg-gray-50 opacity-50 hover:opacity-100 scale-y-50 py-2"
  on:click="{handleClick}"
  title="{title}"
>
  <div
    class="rotate-90
    pointer-events-none"
  >
    {@html content}
  </div>
</button>
