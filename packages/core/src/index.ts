import axios from "axios";

// Initial configuration used when creating a journey manager
interface Config {
  apiKey: string;
  botId: string;
  journeyId?: string;
  contactId: string;
}

// The journey manager object
export interface VoiceCompass {
  updateStep: (data: StepData) => void;
  trackDomAnnotations: () => void;
  stopTrackingDomAnnotations: () => void;
}

interface StepData {
  stepId: string;
  voice?: string;
  journeyId?: string;
  end?: boolean;
  escalate?: boolean;
  payload?: object;
}

const apiUrl = "https://api.voicecompass.ai/v1";

const safeJsonParse = (value: any): any => {
  try {
    const json = JSON.parse(String(value));
    return json;
  } catch (err) {
    return null;
  }
};

const isDomElement = (node: any): node is HTMLElement => {
  return node instanceof HTMLElement;
};

const isInputElement = (node: any): node is HTMLInputElement => {
  return node instanceof HTMLInputElement;
};

const inputValidationError = (inputNode: HTMLInputElement): null | string => {
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

const readVcAttributes = (node: HTMLElement, eventType: string) => {
  const stepId = node.getAttribute(`vc-${eventType}-stepid`);
  if (!stepId) {
    return null;
  }
  return {
    stepId,
    journeyId: node.getAttribute(`vc-${eventType}-journeyid`),
    escalate: node.hasAttribute(`vc-${eventType}-escalate`),
    end: node.hasAttribute(`vc-${eventType}-end`),
    payload: safeJsonParse(node.getAttribute(`vc-${eventType}-payload`)) || {},
  };
};

export const create = (config: Config): VoiceCompass => {
  const client = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
    headers: {
      "x-api-key": config.apiKey,
    },
  });

  let stepId: string | null = null;

  const updateStep = (stepData: StepData) => {
    // skip step if the previous stepId is the same as the current stepId
    if (stepData.stepId === stepId) {
      return;
    }

    client
      .post("/track", {
        ...stepData,
        contactId: config.contactId,
        botId: config.botId,
        journeyId: stepData.journeyId || config.journeyId,
      })
      .then(() => {
        stepId = stepData.stepId;
      });
  };

  const handleGlobalClick = (ev: any) => {
    let node = ev.target;
    while (node && node !== document.body) {
      if (isDomElement(node)) {
        const vcAttributes = readVcAttributes(node, "click");
        if (vcAttributes) {
          updateStep({
            ...vcAttributes,
            journeyId: vcAttributes.journeyId || config.journeyId,
          });
        }
      }
      node = node.parent;
    }
  };

  const handleGlobalBlur = (ev: any) => {
    let node = ev.target;
    while (node && node !== document.body) {
      if (isInputElement(node)) {
        const validationError = inputValidationError(node);
        if (validationError) {
          const vcAttributes = readVcAttributes(node, "invalid");
          if (vcAttributes) {
            updateStep({
              ...vcAttributes,
              journeyId: vcAttributes.journeyId || config.journeyId,
            });
          }
        }
      }
      node = node.parent;
    }
  };

  const handleGlobalFocus = (ev: any) => {
    let node = ev.target;
    while (node && node !== document.body) {
      if (isInputElement(node)) {
        const validationError = inputValidationError(node);
        if (validationError) {
          const vcAttributes = readVcAttributes(node, "focus");
          if (vcAttributes) {
            updateStep({
              ...vcAttributes,
              journeyId: vcAttributes.journeyId || config.journeyId,
            });
          }
        }
      }
      node = node.parent;
    }
  };

  return {
    updateStep,
    trackDomAnnotations: () => {
      document.addEventListener("click", handleGlobalClick);
      // The 'blur' even does not bubble, hence 'focusout'
      document.addEventListener("focusout", handleGlobalBlur);
      // The 'focus' even does not bubble, hence 'focusin'
      document.addEventListener("focusin", handleGlobalFocus);
    },
    stopTrackingDomAnnotations: () => {
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("focusout", handleGlobalBlur);
      document.removeEventListener("focusin", handleGlobalFocus);
    },
  };
};
