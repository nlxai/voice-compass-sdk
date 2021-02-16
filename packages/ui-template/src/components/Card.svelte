<script lang="ts">
  import { tw } from "twind";
  import { quadIn, quadOut } from "svelte/easing";

  export let title: string = "";

  const fadeOut = () => {
    return {
      duration: 300,
      css: (t: number) => {
        const eased = quadOut(t);
        return `
          top: 0;
          left: 0;
          right: 0;
          position: absolute;
          transform: translate3d(${(1 - eased) * 6}px, 0, 0);
          opacity: ${eased};
        `;
      },
    };
  };

  const fadeIn = () => {
    return {
      duration: 300,
      delay: 250,
      css: (t: number) => {
        const eased = quadIn(t);
        return `
          transform: translate3d(${eased * 6}px, 0, 0);
          opacity: ${eased};
        `;
      },
    };
  };
</script>

<div
  class={tw`transition-all duration-300 mx-auto space-y-8`}
  in:fadeIn
  out:fadeOut>
  <h2 class={tw`text-4xl font-bold text-center`}>{title}</h2>
  <slot />
</div>
