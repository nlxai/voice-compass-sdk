import axios from "axios";

interface Config {
  apiKey: string;
  botId: string;
  journeyId?: string;
  contactId: string;
}

export interface VoiceCompass {
  updateStep: (data: StepData) => void;
  trackDomAnnotations: () => void;
  stopTrackingDomAnnotations: () => void;
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

interface StepData {
  stepId: string;
  voice?: string;
  journeyId?: string;
  end?: boolean;
  escalate?: boolean;
  payload?: object;
}

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
  return null;
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
        const stepId = node.getAttribute("vc-click-step");
        const journeyIdFromAttr = node.getAttribute("vc-click-journey");
        const escalate = node.hasAttribute("vc-click-escalate");
        const end = node.hasAttribute("vc-click-end");
        const payload = safeJsonParse(node.getAttribute("vc-click-payload"));
        const journeyId = journeyIdFromAttr || config.journeyId;
        if (stepId) {
          updateStep({
            stepId,
            journeyId,
            escalate,
            end,
            payload,
          });
        }
      }
      node = node.parent;
    }
  };

  const handleGlobalBlur = (ev: any) => {
    let node = ev.target;
    while (node && node !== document.body) {
      if (isInputElement(node) && node.tagName === "INPUT") {
        const validationError = inputValidationError(node);
        if (validationError) {
          const stepId = node.getAttribute("vc-invalid-step");
          const journeyIdFromAttr = node.getAttribute("vc-invalid-journey");
          const escalate = node.hasAttribute("vc-invalid-escalate");
          const end = node.hasAttribute("vc-invalid-end");
          const payload =
            safeJsonParse(node.getAttribute("vc-invalid-payload")) || {};
          const journeyId = journeyIdFromAttr || config.journeyId;
          if (stepId) {
            updateStep({
              stepId,
              journeyId,
              escalate,
              end,
              payload,
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
    },
    stopTrackingDomAnnotations: () => {
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("focusout", handleGlobalBlur);
    },
  };
};
