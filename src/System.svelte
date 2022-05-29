<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let content: string | SvelteComponent;
  export let nonItalic = false;
</script>

<p
  class="{`font-mono ${!nonItalic ? 'italic' : ''} text-sm text-slate-500 p-4`}"
>
  {content}
</p>
