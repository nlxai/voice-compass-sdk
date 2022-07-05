<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`,
      },
    };
  }
</script>

<script lang="ts">
  export let title: string;
</script>

<svelte:head>
  <title>Error</title>
</svelte:head>

<h1>Something went wrong</h1>

<p>{title}</p>

<style>
</style>
