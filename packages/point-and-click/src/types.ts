export interface Step {
  key: string;
  body?: string;
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

export type Persona =
  | "Victor"
  | "Ana"
  | "Sandra"
  | "Mia"
  | "Hiroshi"
  | "Giorgia"
  | "Charlotte"
  | "Greta"
  | "Simon"
  | "Eve"
  | "Adrianna";

export type Language =
  | "de-DE"
  | "en-AU"
  | "en-GB"
  | "en-US"
  | "es-419"
  | "es-ES"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "it-IT"
  | "ja-JP"
  | "pt-BR";

export interface PersonaDetails {
  value: Persona;
  label: string;
  defaultLanguage: Language;
  compatibleLanguages: Language[];
}
