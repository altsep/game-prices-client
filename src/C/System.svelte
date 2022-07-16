<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let content: string | SvelteComponent,
    i = false,
    end = false,
    p = 'p-0';
</script>

<p
  class="{`font-mono ${i ? 'italic' : ''} text-sm text-slate-400 ${p} ${
    end ? 'text-right' : ''
  }`}"
>
  {content}
</p>
