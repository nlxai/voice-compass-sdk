import axios from "axios";
import "@nlx-voice-compass/point-and-click";

// Initial configuration used when creating a journey manager
interface Config {
  apiVersion?: "v1" | "v2";
  apiKey: string;
  journeyAssistantId?: string;
  botId?: string; // Deprecated, use `journeyAssistantId`
  journeyId?: string;
  voiceOverride?: string;
  languageOverride?: string;
  preventRepeats?: boolean;
  contactId: string;
  debug?: boolean;
  dev?: boolean;
  timeoutSettings?: {
    seconds: number;
    stepId: string;
  };
}

interface EscalationButtonProps {
  container: HTMLElement | string,
  label: string,
}

// The journey manager object
export interface VoiceCompass {
  updateStep: (data: StepData) => Promise<StepUpdate>;
  getLastStepId: () => string | null;
  trackDomAnnotations: () => void;
  stopTrackingDomAnnotations: () => void;
  appendEscalationButton: (data: EscalationButtonProps) => void;
}

interface StepData {
  stepId?: string;
  journeyId?: string;
  forceEnd?: boolean;
  end?: boolean; // Deprecated, use `forceEnd`
  forceEscalate?: boolean;
  escalate?: boolean; // Deprecated, use `forceEscalate`
  forceAutomate?: boolean;
  bidirectional?: boolean;
  payload?: object;
}

export interface StepUpdate {
  escalate?: boolean;
  end?: boolean;
  error?: string;
  warning?: string;
}

const legacyApiUrl = "https://api.voicecompass.ai/v1";

const devApiUrl = "https://dev.journeys.voicecompass.ai/v1";

const prodApiUrl = "https://journeys.voicecompass.ai/v1";

const safeJsonParse = (value: any): any => {
  try {
    const json = JSON.parse(String(value));
    return json;
  } catch (err) {
    return null;
  }
};

const createNewElement = (tag: string, prop: any) =>
  Object.assign(document.createElement(tag), prop);

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

const readVcAttributes = (
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

export const create = (config: Config): VoiceCompass => {
  const botId = config.journeyAssistantId || config.botId;

  // document.body.appendChild(document.createElement("point-and-click"));

  if (!config.contactId) {
    console.warn(
      'No contact ID provided. Please call the Voice Compass client `create` method with a `contactId` field extracted from the URL. Example code: `new URLSearchParams(window.location.search).get("cid")`'
    );
  }

  if (config.botId) {
    console.warn(
      "The `botId` configuration option has been renamed to `journeyAssistantId`."
    );
  }

  const apiUrl =
    !config.apiVersion || config.apiVersion === "v2"
      ? config.dev
        ? devApiUrl
        : prodApiUrl
      : legacyApiUrl;

  const client = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
    headers: {
      "x-api-key": config.apiKey,
    },
  });

  let previousStepId: string | null = null;

  let timeout: number | null = null;

  const sendUpdateRequest = (stepData: StepData): Promise<StepUpdate> => {
    const { end, forceEnd, escalate, forceEscalate, forceAutomate, ...rest } = stepData;
    const payload = {
      ...rest,
      end: forceEnd || end,
      escalate: forceEscalate || escalate,
      automate: forceAutomate,
      contactId: config.contactId,
      botId,
      journeyId: stepData.journeyId || config.journeyId,
      voice: config.voiceOverride,
      language: config.languageOverride,
    };

    return client
      .post<StepUpdate>("/track", payload)
      .then((res) => {
        if (config.debug) {
          console.info(
            `${String.fromCodePoint(0x02713)} step: ${payload.stepId}`,
            payload
          );
        }
        return res.data;
      })
      .catch((err: Error) => {
        if (config.debug) {
          console.error(
            `${String.fromCodePoint(0x000d7)} step: ${payload.stepId}`,
            err
          );
        }
        return {
          // TODO: look into propagating more error context
          error: "Something went wrong",
        };
      });
  };

  const resetCallTimeout = () => {
    // If there is an active timeout, remove it
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }

    const { timeoutSettings } = config;

    // If timeout logic is configured, set it up here
    if (timeoutSettings) {
      timeout = setTimeout(() => {
        sendUpdateRequest({
          stepId: timeoutSettings.stepId,
          forceEnd: true,
        });
      }, timeoutSettings.seconds * 1000) as unknown as number;
    }
  };

  resetCallTimeout();

  const appendEscalationButton = ({ container, label }: EscalationButtonProps) => {
    if (!label) {
      console.error("Text isn't specified");
      return;
    }

    if (!container) {
      console.error("Wrapper element isn't specified or wasn't found");
      return;
    }

    const wrapElement = typeof container === "string" ? document.querySelector(container) : container;

    if (!wrapElement) {
      console.error("Element couldn't be queried, use reference instead");
      return;
    }

    const customButton = createNewElement("button", {
      textContent: label,
      onclick() {
        updateStep({
          forceEscalate: true,
        });
      },
    });

    customButton.setAttribute("style", "background-color: #01c0f8; border-radius: 0.25rem; color: white; padding: 0.5rem 2rem;")

    wrapElement.append(customButton);
  };

  const updateStep = (stepData: StepData) => {
    if (stepData.stepId === previousStepId && config.preventRepeats) {
      const warning = `Duplicate step ID detected, step update prevented: ${stepData.stepId}`;
      if (config.debug) {
        console.warn(warning);
      }
      return Promise.resolve({
        warning: warning,
      });
    }
    previousStepId = stepData.stepId || null;
    resetCallTimeout();
    return sendUpdateRequest(stepData);
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
    getLastStepId: () => {
      return previousStepId;
    },
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
    appendEscalationButton,
  };
};
