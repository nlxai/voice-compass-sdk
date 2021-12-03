<script>
  // Copied from 'node_modules/svelte-feather-icons/src', see https://github.com/dylanblokhuis/svelte-feather-icons/issues/11#issuecomment-776724836
  export let size = "100%";
  export let strokeWidth = 2;
  let customClass = "";
  export { customClass as class };

  if (size !== "100%") {
    size =
      size.slice(-1) === "x"
        ? size.slice(0, size.length - 1) + "em"
        : parseInt(size) + "px";
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class="feather feather-camera {customClass}"><path
    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
  <circle cx="12" cy="13" r="4" /></svg>
