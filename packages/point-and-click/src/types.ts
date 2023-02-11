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

export const personas: PersonaDetails[] = [
  {
    value: "Mia",
    label: "Mia (Australian accent)",
    defaultLanguage: "en-AU",
    compatibleLanguages: ["en-US", "en-AU"],
  },
  {
    value: "Ana",
    label: "Ana (Spanish accent)",
    defaultLanguage: "es-US",
    compatibleLanguages: ["en-US", "es-US", "es-ES", "es-419", "pt-BR"],
  },
  {
    value: "Sandra",
    label: "Sandra (Portuguese accent)",
    defaultLanguage: "pt-BR",
    compatibleLanguages: ["pt-BR"],
  },
  {
    value: "Victor",
    label: "Victor (American accent)",
    defaultLanguage: "en-US",
    compatibleLanguages: ["en-US", "en-GB", "en-AU"],
  },
  {
    value: "Hiroshi",
    label: "Hiroshi (Japanese accent)",
    defaultLanguage: "ja-JP",
    compatibleLanguages: ["ja-JP"],
  },
  {
    value: "Giorgia",
    label: "Giorgia (Italian accent)",
    defaultLanguage: "it-IT",
    compatibleLanguages: ["it-IT"],
  },
  {
    value: "Charlotte",
    label: "Charlotte (French accent)",
    defaultLanguage: "fr-CA",
    compatibleLanguages: ["fr-CA", "fr-FR"],
  },
  {
    value: "Greta",
    label: "Greta (German accent)",
    defaultLanguage: "de-DE",
    compatibleLanguages: ["de-DE", "en-US"],
  },
  {
    value: "Simon",
    label: "Simon (English accent)",
    defaultLanguage: "en-GB",
    compatibleLanguages: ["en-GB", "en-US"],
  },
  {
    value: "Eve",
    label: "Eve (English accent)",
    defaultLanguage: "en-GB",
    compatibleLanguages: ["en-GB", "en-US"],
  },
  {
    value: "Adrianna",
    label: "Adrianna (American accent)",
    defaultLanguage: "en-US",
    compatibleLanguages: ["en-US"],
  },
];
