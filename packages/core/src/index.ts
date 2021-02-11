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

interface StepData {
  stepId: string;
  voice?: string;
  journeyId?: string;
  end?: boolean;
  escalate?: boolean;
  payload?: object;
}

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
      if (node.getAttribute) {
        const stepId = node.getAttribute("vc-click-step");
        const journeyIdFromAttr = node.getAttribute("vc-click-journey");
        const escalate = node.hasAttribute("vc-click-escalate");
        const end = node.hasAttribute("vc-click-end");
        const journeyId = journeyIdFromAttr || config.journeyId;
        if (stepId) {
          updateStep({
            stepId,
            journeyId,
            escalate,
            end,
          });
        }
      }
      node = node.parent;
    }
  };

  return {
    updateStep,
    trackDomAnnotations: () => {
      document.addEventListener("click", handleGlobalClick);
    },
    stopTrackingDomAnnotations: () => {
      document.removeEventListener("click", handleGlobalClick);
    },
  };
};
