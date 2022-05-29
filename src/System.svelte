<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let content: string | SvelteComponent;
</script>

<p class="font-mono italic text-sm text-slate-500 p-4">{content}</p>
