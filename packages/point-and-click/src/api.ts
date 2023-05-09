import { type Step } from "./types";
import { personas } from "./config.js";

const baseUrl = (dev: boolean) =>
  `https://${dev ? "dev." : ""}journeys.voicecompass.ai/v1`;

export const updateSteps = ({
  journeyId,
  token,
  steps,
  apiKey,
  dev,
}: {
  journeyId: string;
  token: string;
  steps: Step[];
  apiKey: string;
  dev: boolean;
}): Promise<Step[]> => {
  return fetch(`${baseUrl(dev)}/journeyTriggers/${journeyId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ steps }),
  })
    .then((res) => res.json())
    .then((res) => res.steps);
};

export const fetchSteps = async ({
  journeyId,
  token,
  apiKey,
  dev,
}: {
  journeyId: string;
  token: string;
  apiKey: string;
  dev: boolean;
}): Promise<null | Step[]> => {
  try {
    const res = await fetch(`${baseUrl(dev)}/journeyTriggers/${journeyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": apiKey,
      },
    });
    const json = await res.json();
    return json.steps;
  } catch (err) {
    return null;
  }
};

const speechSynthesisCache: Record<string, string> = {};

interface SpeechSynthesisProps {
  transcript: string;
  persona?: string;
  languageCode?: string;
  token: string;
  apiKey: string;
  dev: boolean;
}

export const getSpeechSynthesisCache = (
  props: SpeechSynthesisProps
): string | null => {
  const language = props.languageCode || "en-US";
  const cacheKey = `vcsdk-${language}-${props.transcript}`;
  const cached = speechSynthesisCache[cacheKey];
  if (cached) {
    return cached;
  }
  return null;
};

export const setSpeechSynthesisCache = (
  props: SpeechSynthesisProps,
  base64Encoded: string
) => {
  const language = props.languageCode || "en-US";
  const cacheKey = `vcsdk-${language}-${props.transcript}`;
  speechSynthesisCache[cacheKey] = base64Encoded;
};

export const fetchSpeechSynthesis = async (
  data: SpeechSynthesisProps
): Promise<null | string> => {
  try {
    const language = data.languageCode || "en-US";
    const cached = getSpeechSynthesisCache(data);
    if (cached) {
      return Promise.resolve(cached);
    }
    const res = await fetch(`${baseUrl(data.dev)}/speechSynthesis`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.token}`,
        "x-api-key": data.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: data.transcript,
        persona:
          data.persona ||
          personas.find((p) => p.defaultLanguage === language)?.value,
        language,
      }),
    });
    const base64Audio = await res.json();
    if (typeof base64Audio !== "string") {
      throw new Error("Invalid transcript");
    }
    const url = `data:audio/mp3;base64,${base64Audio}`;
    setSpeechSynthesisCache(data, url);
    return url;
  } catch (err) {
    return null;
  }
};
