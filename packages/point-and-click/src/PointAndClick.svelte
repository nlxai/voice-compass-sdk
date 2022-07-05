<svelte:options tag="point-and-click" />

<script lang="ts">
  let selected: HTMLElement | null = null;

  let hovered: HTMLElement | null = null;

  let container: HTMLElement | null = null;

  interface Link {
    tagName: string;
    classList: string[];
    id?: string;
    index?: number;
  }

  const getLinks = (elem: HTMLElement): Link[] => {
    let path: Link[] = [];
    let current: HTMLElement | null = elem;
    while (current) {
      path = [
        {
          tagName: current.tagName.toLowerCase(),
          classList: current.classList
            ? Array.from(current.classList) || []
            : [],
          index: current.parentNode
            ? Array.from(current.parentNode.children).indexOf(current)
            : undefined,
          id: current.id,
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
    if (container && container.contains(ev.target)) {
      return;
    }
    hovered = ev.target;
    if (hovered && hovered !== selected) {
      hovered.style.outline = "2px solid teal";
    }
  };

  const handleMouseOut = (ev: any) => {
    if (container && container.contains(ev.target)) {
      return;
    }
    if (hovered && hovered !== selected) {
      hovered.style.outline = "";
    }
    hovered = null;
  };

  const handleClick = (ev: any) => {
    if (container && container.contains(ev.target)) {
      return;
    }
    if (selected) {
      selected.style.outline = "";
    }
    selected = hovered;
    selected.style.outline = "2px solid purple";
  };
</script>

<svelte:body
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
  on:click={handleClick} />

{#if false}
  <div class="container" bind:this={container}>
    {#if !selected}
      <p class="heading">Not selected</p>
    {:else}
      {@const links = getLinks(selected)}
      <p class="heading">Selected</p>
      <p class="links">
        {#each links as link}
          <details>
            <summary>{link.tagName}</summary>
            <div>
              <button class="">Tag name</button>
              <button class="">Classes</button>
              <button class="">ID</button>
              <button class="">Index</button>
            </div>
          </details>
        {/each}
      </p>
    {/if}
  </div>
{/if}

<style>
  .container {
    position: fixed;
    background-color: #fff;
    z-index: 100000;
    width: 320px;
    top: 10px;
    left: 10px;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }

  .heading {
    font-weight: bold;
    padding: 4px 12px;
  }

  summary {
    list-style: none;
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

  .links {
    padding: 4px 12px;
  }

  details > div {
    width: 100px;
    border-radius: 4px;
    position: absolute;
    bottom: -2px;
    transform: translateY(100%);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    z-index: 100001;
  }

  details button {
    display: block;
    width: 100%;
    padding: 2px 6px;
  }
</style>
