export interface Step {
  key: string;
  name?: string;
  trigger?: Trigger | undefined;
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

export type Event = "click" | "invalid" | "inserted" | "start";

export interface Trigger {
  event: Event;
  path?: Link[];
  selector?: string;
}

export interface Bounding {
  top: number;
  right: number;
}
