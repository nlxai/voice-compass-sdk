import { type StepData } from "./types";

const safeJsonParse = (value: any): any => {
  try {
    const json = JSON.parse(String(value));
    return json;
  } catch (err) {
    return null;
  }
};

export const isDomElement = (node: any): node is HTMLElement => {
  return node instanceof HTMLElement;
};

export const isInputElement = (node: any): node is HTMLInputElement => {
  return node instanceof HTMLInputElement;
};

export const inputValidationError = (inputNode: HTMLInputElement): null | string => {
  const value = inputNode.value;
  const type = inputNode.type;
  if (type === "email") {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
      ? null
      : "Must be a valid email";
  }
  if (inputNode.pattern) {
    return new RegExp(inputNode.pattern).test(value)
      ? null
      : "Must match pattern";
  }
  return null;
};

export const readVcAttributes = (
  node: HTMLElement,
  eventType: string
): StepData | null => {
  const stepId = node.getAttribute(`vc-${eventType}-stepid`);
  if (!stepId) {
    return null;
  }
  return {
    stepId,
    journeyId: node.getAttribute(`vc-${eventType}-journeyid`) || undefined,
    forceEscalate:
      node.hasAttribute(`vc-${eventType}-force-escalate`) ||
      // Deprecated
      node.hasAttribute(`vc-${eventType}-escalate`),
    forceEnd:
      node.hasAttribute(`vc-${eventType}-force-end`) ||
      // Deprecated
      node.hasAttribute(`vc-${eventType}-end`),
    forceAutomate:
      node.hasAttribute(`vc-${eventType}-force-automate`) ||
      // Deprecated
      node.hasAttribute(`vc-${eventType}-automate`),
    bidirectional: node.hasAttribute(`vc-${eventType}-bidirectional`),
    payload: safeJsonParse(node.getAttribute(`vc-${eventType}-payload`)) || {},
  };
};
