// The point-and-click prototype is not used yet
import { toSelector, type Trigger } from "@nlx-voice-compass/point-and-click";
import { type StepData } from "./types";
import {
  isDomElement,
  isInputElement,
  inputValidationError,
  readVcAttributes,
} from "./dom";

// Initial configuration used when creating a journey manager
interface Config {
  apiVersion?: "v1" | "v2";
  apiKey: string;
  journeyId: string;
  journeyAssistantId: string;
  voiceOverride?: string;
  languageOverride?: string;
  preventRepeats?: boolean;
  contactId: string;
  implementation?: "native";
  debug?: boolean;
  dev?: boolean;
  timeoutSettings?: {
    seconds: number;
    stepId: string;
  };
}

interface EscalationButtonProps {
  container: HTMLElement | string;
  label: string;
}

// The journey manager object
export interface VoiceCompass {
  updateStep: (data: StepData) => Promise<StepUpdate>;
  getLastStepId: () => string | null;
  trackDomAnnotations: () => void;
  stopTrackingDomAnnotations: () => void;
  runWizard: () => void;
  stopWizard: () => void;
  appendEscalationButton: (data: EscalationButtonProps) => void;
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

const createNewElement = (tag: string, prop: any) =>
  Object.assign(document.createElement(tag), prop);

interface LiveStep {
  key: string;
  trigger: null | Trigger;
}

export const fetchLiveSteps = ({
  apiUrl,
  apiKey,
  journeyId,
  journeyAssistantId,
}: {
  apiUrl: string;
  apiKey: string;
  journeyId: string;
  journeyAssistantId: string;
}): Promise<LiveStep[]> => {
  return fetch(
    `${apiUrl}/liveJourneyTriggers/${journeyId}?journeyAssistantId=${journeyAssistantId}`,
    {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.steps);
};

export const create = (config: Config): VoiceCompass => {
  const botId = config.journeyAssistantId;

  // Defined using a literal so typos can be avoided during checking
  const mode: "compose" | null =
    new URLSearchParams(window.location.search).get("mode") === "compose"
      ? "compose"
      : null;

  if (mode === "compose") {
    setTimeout(() => {
      const pointAndClick: any = document.createElement("point-and-click");
      document.body.appendChild(pointAndClick);
      pointAndClick.apiKey = config.apiKey;
    });
  }

  if (!config.contactId) {
    console.warn(
      'No contact ID provided. Please call the Voice Compass client `create` method with a `contactId` field extracted from the URL. Example code: `new URLSearchParams(window.location.search).get("cid")`'
    );
  }

  const apiUrl =
    !config.apiVersion || config.apiVersion === "v2"
      ? config.dev
        ? devApiUrl
        : prodApiUrl
      : legacyApiUrl;

  let previousStepId: string | null = null;

  let timeout: number | null = null;

  const sendUpdateRequest = (stepData: StepData): Promise<StepUpdate> => {
    const { forceEnd, forceEscalate, forceAutomate, ...rest } = stepData;

    const payload = {
      ...rest,
      end: forceEnd,
      escalate: forceEscalate,
      automate: forceAutomate,
      contactId: config.contactId,
      implementation: config.implementation,
      botId,
      journeyId: stepData.journeyId || config.journeyId,
      voice: config.voiceOverride,
      language: config.languageOverride,
    };

    return fetch(`${apiUrl}/track`, {
      method: "POST",
      headers: {
        "x-api-key": config.apiKey,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res: StepUpdate) => {
        if (config.debug) {
          console.info(
            `${String.fromCodePoint(0x02713)} step: ${payload.stepId}`,
            payload
          );
        }
        return res;
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

  let liveSteps: LiveStep[] = [];

  fetchLiveSteps({
    apiUrl,
    apiKey: config.apiKey,
    journeyId: config.journeyId,
    journeyAssistantId: config.journeyAssistantId,
  }).then((steps) => {
    liveSteps = steps;
  });

  const appendEscalationButton = ({
    container,
    label,
  }: EscalationButtonProps) => {
    if (!label) {
      console.error("Text isn't specified");
      return;
    }

    if (!container) {
      console.error("Wrapper element isn't specified or wasn't found");
      return;
    }

    const wrapElement =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

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

    customButton.setAttribute(
      "style",
      "background-color: #01c0f8; border-radius: 0.25rem; color: white; padding: 0.5rem 2rem;"
    );

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

  const handleGlobalClickForAnnotations = (ev: any) => {
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

  const handleGlobalBlurForAnnotations = (ev: any) => {
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

  const handleGlobalFocusForAnnotations = (ev: any) => {
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

  const handleGlobalClickForWizard = (ev: any) => {
    if (mode === "compose") {
      return;
    }
    liveSteps.forEach((step) => {
      if (!step.trigger || step.trigger.event !== "click") {
        return;
      }
      const selector =
        step.trigger.selector ||
        (step.trigger.path ? toSelector(step.trigger.path) : undefined);
      if (!selector) {
        return;
      }
      const node = document.querySelector(selector);
      if (!node) {
        return;
      }
      if (node.contains(ev.target) || node === ev.target) {
        updateStep({
          stepId: step.key,
        });
      }
    });
  };

  const handleGlobalBlurForWizard = (ev: any) => {
    if (mode === "compose") {
      return;
    }
    liveSteps.forEach((step) => {
      if (!step.trigger || step.trigger.event !== "invalid") {
        return;
      }
      const selector =
        step.trigger.selector ||
        (step.trigger.path ? toSelector(step.trigger.path) : undefined);
      if (!selector) {
        return;
      }
      const node = document.querySelector(selector);
      if (
        node === ev.target &&
        node instanceof HTMLInputElement &&
        inputValidationError(node)
      ) {
        updateStep({
          stepId: step.key,
        });
      }
    });
  };

  return {
    updateStep,
    getLastStepId: () => {
      return previousStepId;
    },
    trackDomAnnotations: () => {
      document.addEventListener("click", handleGlobalClickForAnnotations);
      // The 'blur' even does not bubble, hence 'focusout'
      document.addEventListener("focusout", handleGlobalBlurForAnnotations);
      // The 'focus' even does not bubble, hence 'focusin'
      document.addEventListener("focusin", handleGlobalFocusForAnnotations);
    },
    stopTrackingDomAnnotations: () => {
      document.removeEventListener("click", handleGlobalClickForAnnotations);
      document.removeEventListener("focusout", handleGlobalBlurForAnnotations);
      document.removeEventListener("focusin", handleGlobalFocusForAnnotations);
    },
    runWizard: () => {
      document.addEventListener("click", handleGlobalClickForWizard);
      document.addEventListener("focusout", handleGlobalBlurForWizard);
    },
    stopWizard: () => {
      document.removeEventListener("click", handleGlobalClickForWizard);
      document.removeEventListener("focusout", handleGlobalBlurForWizard);
    },
    appendEscalationButton,
  };
};
