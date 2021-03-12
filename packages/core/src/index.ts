import axios from "axios";

// Initial configuration used when creating a journey manager
interface Config {
  apiKey: string;
  botId: string;
  contactId: string;
  debug?: boolean;
  journeyId?: string;
  language?: string;
  voice?: string;
}

// The journey manager object
export interface VoiceCompass {
  updateStep: <T>(data: StepData<T>) => void;
  trackDomAnnotations: () => void;
  stopTrackingDomAnnotations: () => void;
}

interface StepData<T> {
  stepId: string;
  journeyId?: Config["journeyId"];
  end?: boolean;
  escalate?: boolean;
  payload?: T;
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

const readVcAttributes = <T>(
  node: HTMLElement,
  eventType: string
): {
  stepId: StepData<T>["stepId"];
  journeyId: StepData<T>["journeyId"];
  escalate: StepData<T>["escalate"];
  end: StepData<T>["end"];
  payload: StepData<T>["payload"];
} | null => {
  const stepId = node.getAttribute(`vc-${eventType}-stepid`);
  if (!stepId) {
    return null;
  }
  return {
    stepId,
    journeyId: node.getAttribute(`vc-${eventType}-journeyid`) ?? undefined,
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

  let _stepId: string | null = null;

  const updateStep = <T>({
    stepId,
    journeyId = config.journeyId,
    end,
    escalate,
    payload,
  }: StepData<T>) => {
    // skip step if the previous stepId is the same as the current stepId
    if (stepId === _stepId) {
      return;
    }

    const _payload = {
      stepId,
      ...(typeof end === "boolean" ? { end } : {}),
      ...(typeof escalate === "boolean" ? { escalate } : {}),
      ...(typeof payload === "object" &&
      payload !== null &&
      !Array.isArray(payload)
        ? payload
        : {}),
      contactId: config.contactId,
      botId: config.botId,
      journeyId,
      voice: config.voice,
      language: config.language,
    };

    if (config.debug) {
      console.info(`calling new step`, JSON.stringify(_payload));
    }
    client.post("/track", _payload).then(() => {
      if (config.debug) {
        console.info(`updating stepId from ${_stepId} to ${stepId}`);
      }
      _stepId = stepId;
    });
  };

  const handleGlobalClick = (ev: any) => {
    let node = ev.target;
    while (node && node !== document.body) {
      if (isDomElement(node)) {
        const vcAttributes = readVcAttributes(node, "click");
        if (vcAttributes) {
          updateStep(vcAttributes);
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
            updateStep(vcAttributes);
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
            updateStep(vcAttributes);
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
