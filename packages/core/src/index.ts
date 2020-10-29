import qs from "querystring";
import axios from "axios";

interface Config {
  apiKey: string;
  botId: string;
}

interface VoiceCompass {
  updateStep: (data: StepData) => void;
}

const apiUrl = "https://api.voicecompass.ai/v1";

const parseContactInfo = () => {
  const { search } = window.location;
  const normalizedSearch =
    search && search[0] === "?" ? search.substring(1) : search;
  const parsed = qs.parse(normalizedSearch);

  const contactId = parsed.cid
    ? Array.isArray(parsed.cid)
      ? parsed.cid.join("")
      : parsed.cid
    : localStorage.getItem("vc-cid");

  if (contactId) {
    localStorage.setItem("vc-cid", contactId);
  }

  const fromReferrer = parsed.r
    ? Array.isArray(parsed.r)
      ? parsed.r.join("")
      : parsed.r
    : localStorage.getItem("vc-r");

  if (fromReferrer) {
    localStorage.setItem("vc-r", fromReferrer);
  }

  const email = parsed.email
    ? Array.isArray(parsed.email)
      ? parsed.email.join("")
      : parsed.email
    : localStorage.getItem("vc-email");

  if (email) {
    localStorage.setItem("vc-email", email);
  }

  const phone = parsed.phone
    ? Array.isArray(parsed.phone)
      ? parsed.phone.join("")
      : parsed.phone
    : localStorage.getItem("vc-phone");

  if (phone) {
    localStorage.setItem("vc-phone", phone);
  }

  const voice = parsed.voice
    ? Array.isArray(parsed.voice)
      ? parsed.voice.join("")
      : parsed.voice
    : localStorage.getItem("vc-voice");

  if (voice) {
    localStorage.setItem("vc-voice", voice);
  }

  return {
    contactId,
    email,
    phone,
    fromReferrer,
    voice,
  };
};

interface StepData {
  stepId: string;
  voice: string;
  journeyId?: string;
  end?: boolean;
  escalate?: boolean;
  payload?: object;
}

export const create = (config: Config): VoiceCompass => {
  const info = parseContactInfo();

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

    // skip step if no contactId is set
    if (!info.contactId) {
      return;
    }

    client
      .post("/track", {
        stepId: stepData.stepId,
        contactId: info.contactId,
        voice: stepData.voice,
        end: stepData.end,
        escalate: stepData.escalate,
        payload: stepData.payload,
        botId: config.botId,
        journeyId: stepData.journeyId,
        language: info.voice,
      })
      .then(() => {
        stepId = stepData.stepId;

        // remove the voice from cache, if the call is ending
        // this is to ensure consistency when a new call is placed
        if (stepData.end) {
          localStorage.removeItem("vc-voice");
        }
      });
  };

  return { updateStep };
};
