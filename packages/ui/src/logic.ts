import type { SvelteComponent } from "svelte";

export interface Choice {
  label: string;
  value: string;
  next: string;
  action?: string;
  clear?: Array<string>;
  $select?: Object;
}

export interface ChoiceInput {
  type: "choice";
  set?: string;
  immediate?: boolean;
  choices: Array<Choice>;
}

export const isChoiceInput = (
  stepInput: StepInput
): stepInput is ChoiceInput => {
  return stepInput.type === "choice";
};

interface TextInput {
  type: "text";
  inputType?: "email" | "tel" | "datetime" | "one-time-code";
  set: string;
  next: string;
  isValid?: (val: string) => boolean;
  action?: string;
  $invalid?: Object;
}

export const isTextInput = (stepInput: StepInput): stepInput is TextInput => {
  return stepInput.type === "text";
};

export type StepInput = ChoiceInput | TextInput;

interface CustomUi {
  component: SvelteComponent;
  props: Record<string, any>;
}

export interface Step {
  title: string;
  body: string;
  customFooter?: CustomUi;
  buttonLabel?: string;
  input?: StepInput;
  $enter?: Object;
}
