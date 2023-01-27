export interface Step {
  key: string;
  name?: string;
  trigger: Trigger | undefined | null;
}

interface Toggleable<T> {
  value: T;
  enabled: boolean;
}

export interface Link {
  enabled: boolean;
  tagName: Toggleable<string>;
  classList: Toggleable<string>[];
  id?: Toggleable<string>;
  index?: Toggleable<number>;
}

export interface Trigger {
  event: "click";
  path: Link[];
}
