<script lang="ts">
  import { tw } from "twind";
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import SplashScreen from "../components/SplashScreen.svelte";
  import { setup } from "twind";
  import theme from "../theme";
  import { vc } from "../store";

  let showSplash = true;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    vc.update((previous) => ({
      ...previous,
      mounted: true,
      contactId: params.get("cid") || null,
    }));
    setTimeout(() => {
      showSplash = false;
    }, 2000);
  });
</script>

{#if showSplash}
  <SplashScreen />
{:else}
  <Header />
  <main class={tw`px-8`}>
    <slot />
  </main>
  <Footer />
{/if}

<style>
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  main {
    flex: 1 0 auto;
    opacity: 0;
    animation-name: fade-in;
    animation-fill-mode: forwards;
    animation-duration: 0.2s;
  }
</style>
