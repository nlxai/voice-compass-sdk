export {
  isValidEmail,
  none,
  pending,
  success,
  error,
  RequestStatus,
} from "./utils";

// Main logic of a flow

export type Logic<T = {}> = Record<string, Step<T>>;

export type State = Record<string, any>;

export type NextPromise = (state: State) => Promise<string>;

export type Next = string | NextPromise;

export const isNextPromise = (next: Next): next is NextPromise => {
  return typeof next !== "string";
};

// Step

export interface Step<Metadata> {
  title: string;
  body: string;
  buttonLabel?: string;
  input?: StepInput;
  $enter?: Object;
  metadata?: Metadata;
}

export type StepInput = ChoiceInput | TextInput;

// Choice

export interface Choice {
  label: string;
  value: string;
  next: Next;
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

// Text

export interface TextInput {
  type: "text";
  inputType?: "email" | "tel" | "datetime" | "one-time-code";
  set: string;
  next: Next;
  isValid?: (val: any) => boolean;
  action?: string;
  $invalid?: Object;
}

export const isTextInput = (stepInput: StepInput): stepInput is TextInput => {
  return stepInput.type === "text";
};

// Step utilities

export function interpolate<T>(
  str: string,
  state: State,
  logic?: Logic<T>
): string {
  return str.replace(/{(.*?)}/g, (val: string) => {
    const key = val.slice(1, -1);
    const step: Step<T> | undefined =
      logic &&
      Object.values(logic).find((step: Step<T>) => step.input?.set === key);
    // Remove curly braces
    if (step && step.input && isChoiceInput(step.input)) {
      const choice = step.input.choices.find((ch) => ch.value === state[key]);
      const stateVal = choice ? choice.label : state[key];
      return String(stateVal) || key;
    }
    return String(state[key]) || key;
  });
}
