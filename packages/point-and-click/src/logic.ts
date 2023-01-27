import { type Link } from "./types";

export const toSelector = (links: Link[]): string => {
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

export const isInsideComponent = (element: HTMLElement): boolean => {
  const containerWithCustomElementWrapper =
    document.querySelector("point-and-click");

  return Boolean(
    containerWithCustomElementWrapper &&
      (containerWithCustomElementWrapper.contains(element) ||
        containerWithCustomElementWrapper === element)
  );
};

export const getLinks = (elem: HTMLElement): Link[] => {
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
