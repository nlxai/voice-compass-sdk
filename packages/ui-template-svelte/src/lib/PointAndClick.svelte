<script lang="ts">
  interface Toggleable<T> {
    value: T;
    enabled: boolean;
  }

  interface Link {
    enabled: boolean;
    tagName: Toggleable<string>;
    classList: Toggleable<string>[];
    id?: Toggleable<string>;
    index?: Toggleable<number>;
  }

  interface LinkableStep {
    key: string;
    name: string;
    links?: Link[];
  }

  export let apiKey: string;

  let hovered: HTMLElement | null = null;

  let container: HTMLElement | null = null;

  let steps: LinkableStep[] = [
    {
      key: "3a8155e5-6d25-4add-bc2e-ae4ae7247347",
      name: "Step One",
    },
    {
      key: "2825058f-48aa-4eab-8fca-2feef2531665",
      name: "Step Two",
    },
    {
      key: "6196e7f3-f70c-42fa-970a-27ddc1cd319c",
      name: "Step Three",
    },
  ];

  let drag: { start: [number, number]; current: [number, number] } | null =
    null;

  let position: [number, number] = [0, 0];

  let activeStepId: string | null = null;

  $: activeStep = steps.find((step) => step.key === activeStepId);

  const toSelector = (links: Link[]): string => {
    return links
      .map((link) => {
        if (!link.enabled) {
          return "*";
        }
        return [
          link.tagName.enabled ? link.tagName.value : "*",
          link.id && link.id.enabled ? link.id.value : undefined,
          ...link.classList
            .filter((val) => val.enabled)
            .map((val) => `.${val.value}`),
          link.index && link.index.enabled
            ? `:nth-child(${link.index.value + 1})`
            : undefined,
        ]
          .filter<string>((val): val is string => Boolean(val))
          .join("");
      })
      .join(" > ");
  };

  const isInsideComponent = (element: HTMLElement): boolean => {
    const containerWithCustomElementWrapper =
      document.querySelector("point-and-click") || container;

    return Boolean(
      containerWithCustomElementWrapper &&
        (containerWithCustomElementWrapper.contains(element) ||
          containerWithCustomElementWrapper === element)
    );
  };

  const getLinks = (elem: HTMLElement): Link[] => {
    let path: Link[] = [];
    let current: HTMLElement | null = elem;
    while (current) {
      path = [
        {
          enabled: true,
          tagName: { value: current.tagName.toLowerCase(), enabled: true },
          classList: (current.classList
            ? Array.from(current.classList) || []
            : []
          ).map((cls) => ({ value: cls, enabled: true })),
          index: current.parentNode
            ? {
                value: Array.from(current.parentNode.children).indexOf(current),
                enabled: true,
              }
            : undefined,
          id:
            current.id && current.id !== ""
              ? { value: current.id, enabled: true }
              : undefined,
        },
        ...path,
      ];
      if (current === document.body) {
        current = null;
      }
      current = (current?.parentNode as HTMLElement) || null;
    }
    return path;
  };

  const handleMouseOver = (ev: any) => {
    if (isInsideComponent(ev.target)) {
      return;
    }
    hovered = ev.target;
    if (hovered) {
      hovered.style.outline = "2px solid teal";
    }
  };

  const handleMouseOut = (ev: any) => {
    if (isInsideComponent(ev.target)) {
      return;
    }
    if (hovered && !hovered.getAttribute("data-highlighted")) {
      hovered.style.outline = "";
    }
    hovered = null;
  };

  const handleClick = (ev: any) => {
    const closeDetails = document.querySelectorAll<HTMLDetailsElement>(
      "details.close-on-clickaway"
    );

    closeDetails.forEach((details) => {
      if (!details.contains(ev.target)) {
        details.removeAttribute("open");
      }
    });

    if (isInsideComponent(ev.target)) {
      return;
    }

    if (activeStep) {
      activeStep.links = getLinks(ev.target);
      steps = steps;
    }
  };

  const handleDragButtonMouseDown = (ev: any) => {
    drag = {
      start: [ev.screenX, ev.screenY],
      current: [ev.screenX, ev.screenY],
    };
  };

  const handleMouseMove = (ev: any) => {
    if (!drag) {
      return;
    }
    drag = {
      ...drag,
      current: [ev.screenX, ev.screenY],
    };
  };

  const handleMouseUp = () => {
    if (!drag) {
      return;
    }
    position = [
      position[0] + drag.current[0] - drag.start[0],
      position[1] + drag.current[1] - drag.start[1],
    ];
    drag = null;
  };

  $: tempPosition = [
    position[0] + (drag ? drag.current[0] - drag.start[0] : 0),
    position[1] + (drag ? drag.current[1] - drag.start[1] : 0),
  ];

  const refreshSelected = (selector?: string) => {
    const currentHighlighted: HTMLElement[] = Array.from(
      document.querySelectorAll("[data-highlighted]")
    );
    currentHighlighted.forEach((el: HTMLElement) => {
      if (isInsideComponent(el)) {
        return;
      }
      el.style.outline = "";
      el.removeAttribute("data-highlighted");
    });
    if (selector) {
      const newHighlighted: HTMLElement[] = Array.from(
        document.querySelectorAll(selector)
      );
      newHighlighted.forEach((el: HTMLElement) => {
        if (isInsideComponent(el)) {
          return;
        }
        el.style.outline = "2px solid purple";
        el.setAttribute("data-highlighted", "highlighted");
      });
    }
  };

  $: refreshSelected(
    activeStep?.links ? toSelector(activeStep?.links) : undefined
  );
</script>

<svelte:body
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:click={handleClick} />

<div
  class="w-96 fixed top-4 left-4 bg-white shadow-lg font-sans rounded-lg"
  style="z-index: 100000; transform: translate3d({tempPosition[0]}px, {tempPosition[1]}px, 0)"
  bind:this={container}
>
  <div
    class="px-2 text-base py-1 bg-black rounded-t-lg text-white flex items-center justify-between"
  >
    <p>Compose Live</p>
    <button
      class="w-8 h-8 px-2 py-2 text-gray-200 hover:text-white"
      on:mousedown={handleDragButtonMouseDown}
    >
      <svg viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.7452 6.56847L14.5319 6.35508L14.5319 6.65685L14.5319 8.69988L11.942 8.69089L11.8166 8.69045L11.8166 8.81589V10.1547V10.2801L11.942 10.2797L14.5319 10.2707L14.5319 12.3137V12.6155L14.7452 12.4021L17.5737 9.57367L17.6621 9.48528L17.5737 9.39689L14.7452 6.56847ZM6.08318 3.74004L5.8698 3.95343L6.17157 3.95343L8.2146 3.95343L8.20561 6.54328L8.20517 6.66872L8.33061 6.66872H9.66939L9.79483 6.66872L9.79439 6.54328L9.7854 3.95343L11.8284 3.95343L12.1302 3.95343L11.9168 3.74004L9.08839 0.911612L9 0.823223L8.91161 0.911612L6.08318 3.74004ZM3.25476 12.4021L3.46815 12.6155V12.3137L3.46815 10.2707L6.058 10.2797L6.18344 10.2801V10.1547V8.81589L6.18344 8.69045L6.058 8.69089L3.46815 8.69988L3.46815 6.65685L3.46815 6.35508L3.25476 6.56847L0.42633 9.39689L0.337942 9.48528L0.42633 9.57367L3.25476 12.4021ZM11.9168 15.2305L12.1302 15.0171H11.8284H9.7854L9.79439 12.4273L9.79483 12.3018H9.66939H8.33061H8.20517L8.20561 12.4273L8.2146 15.0171H6.17157H5.8698L6.08318 15.2305L8.91161 18.059L9 18.1473L9.08839 18.059L11.9168 15.2305Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="0.25"
        />
      </svg>
    </button>
  </div>
  {#if activeStep}
    <div class="p-2">
      <button
        on:click|stopPropagation={() => {
          activeStepId = null;
        }}
        class="flex items-center space-x-2"
      >
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.8583 10L6 8.825L2.2915 5L6 1.175L4.8583 -9.98106e-08L4.37114e-07 5L4.8583 10Z"
            fill="currentColor"
          />
        </svg>
        <span>Back</span></button
      >
    </div>
    <div class="px-2 py-2 cursor-pointer">
      <h2 class="text-base font-bold">{activeStep.name}</h2>
      <p class="font-mono text-xs">{activeStep.key}</p>
    </div>
    <div class="px-2 py-2 bg-gray-200">
      {#if activeStep.links}
        <p>
          {#each activeStep.links as link}
            <details class="close-on-clickaway">
              <summary
                class:text-gray-500={!link.enabled}
                class="font-mono bg-white text-xs">{link.tagName.value}</summary
              >
              <div
                class="text-left w-40 absolute px-1 py-1 rounded shadow z-20 transform translate-y-full -bottom-[2px] bg-white"
              >
                <label
                  ><input type="checkbox" bind:checked={link.enabled} /><span
                    class="text-sm">Enabled</span
                  ></label
                >
                <hr />
                <label
                  ><input
                    type="checkbox"
                    bind:checked={link.tagName.enabled}
                  /><span class="text-sm">Tag name</span></label
                >
                {#if link.classList.length > 0}
                  <p class="text-sm">Classes</p>
                  {#each link.classList as cls}
                    <div style="padding-left: 8px">
                      <label
                        ><input
                          type="checkbox"
                          bind:checked={cls.enabled}
                        /><span class="text-sm">{cls.value}</span></label
                      >
                    </div>
                  {/each}
                {/if}
                {#if link.id}
                  <p class="text-sm">ID</p>
                {/if}
                {#if link.index}
                  <label
                    ><input
                      type="checkbox"
                      bind:checked={link.index.enabled}
                    /><span class="text-sm">Order: {link.index.value + 1}</span
                    ></label
                  >
                {/if}
              </div>
            </details>
          {/each}
        </p>
        <details>
          <summary class="flex items-center text-xs space-x-1">
            <span class="inline-block w-3 h-3">
              <svg
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(5 5) rotate(180) translate(-5 -5)">
                  <g transform="translate(2 0)">
                    <path
                      d="M4.8583 10L6 8.825L2.2915 5L6 1.175L4.8583 -9.98106e-08L4.37114e-07 5L4.8583 10Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </svg>
            </span>
            CSS Selector
          </summary>
          <p class="text-xs mt-2 font-mono">{toSelector(activeStep.links)}</p>
        </details>
      {:else}
        <p class="text-sm text-gray-500">Select an element...</p>
      {/if}
    </div>
  {:else}
    {#each steps as step}
      <div
        class="px-2 py-2 cursor-pointer"
        on:click|stopPropagation={() => {
          activeStepId = step.key;
        }}
      >
        <h2 class="text-base font-bold">{step.name}</h2>
        <p class="font-mono text-xs">{step.key}</p>
      </div>
    {/each}
  {/if}
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto+Mono&display=swap");

  summary {
    list-style: none;
  }

  summary {
    font-family: monospace;
    cursor: pointer;
    padding: 0 4px;
  }

  summary:hover {
    color: blue;
  }

  details summary::-webkit-details-marker,
  details summary::marker {
    display: none;
  }

  details {
    position: relative;
    padding: 1px 2px;
    display: inline-block;
  }

  label input {
    display: inline-block;
    margin-right: 4px;
  }

  /** 
   * Mini-Tailwind. Instructions to generate:
   * - add tailwind classes to the Svelte component markup.
   * - copy outerHTML to clipboard using devtools.
   * - paste it in to https://play.tailwindcss.com/.
   * - copy the resulting generated CSS starting from the `*, ::before, ::after {` line.
   */

  *,
  ::before,
  ::after {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
  }

  ::-webkit-backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
  }

  ::backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
  }

  .fixed {
    position: fixed;
  }

  .absolute {
    position: absolute;
  }

  .relative {
    position: relative;
  }

  .top-4 {
    top: 1rem;
  }

  .left-4 {
    left: 1rem;
  }

  .-bottom-\[2px\] {
    bottom: -2px;
  }

  .z-20 {
    z-index: 20;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .mt-2 {
    margin-top: 0.5rem;
  }

  .block {
    display: block;
  }

  .inline-block {
    display: inline-block;
  }

  .flex {
    display: flex;
  }

  .h-8 {
    height: 2rem;
  }

  .h-4 {
    height: 1rem;
  }

  .h-3 {
    height: 0.75rem;
  }

  .w-96 {
    width: 24rem;
  }

  .w-8 {
    width: 2rem;
  }

  .w-full {
    width: 100%;
  }

  .w-4 {
    width: 1rem;
  }

  .w-40 {
    width: 10rem;
  }

  .w-3 {
    width: 0.75rem;
  }

  .max-w-screen-sm {
    max-width: 640px;
  }

  .translate-y-full {
    --tw-translate-y: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y))
      rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
      scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .transform {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y))
      rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
      scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .items-start {
    align-items: flex-start;
  }

  .items-center {
    align-items: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .space-y-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(2rem * var(--tw-space-y-reverse));
  }

  .space-y-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }

  .space-x-3 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.75rem * var(--tw-space-x-reverse));
    margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  .rounded {
    border-radius: 0.25rem;
  }

  .rounded-t-lg {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  }

  .bg-black {
    --tw-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity));
  }

  .bg-gray-200 {
    --tw-bg-opacity: 1;
    background-color: rgb(229 231 235 / var(--tw-bg-opacity));
  }

  .p-2 {
    padding: 0.5rem;
  }

  .p-4 {
    padding: 1rem;
  }

  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .px-1 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  .px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .text-left {
    text-align: left;
  }

  .font-sans {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }

  .font-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
  }

  .text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .font-bold {
    font-weight: 700;
  }

  .text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  .text-gray-200 {
    --tw-text-opacity: 1;
    color: rgb(229 231 235 / var(--tw-text-opacity));
  }

  .text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
  }

  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  .shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
      0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .duration-300 {
    transition-duration: 300ms;
  }

  .hover\:text-white:hover {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }
</style>
