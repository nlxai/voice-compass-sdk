import { type Step } from "./types";

export const updateSteps = ({
  journeyId,
  token,
  steps,
  apiKey,
}: {
  journeyId: string;
  token: string;
  steps: Step[];
  apiKey: string;
}): Promise<Step[]> => {
  return fetch(
    `https://dev.journeys.voicecompass.ai/v1/journeyTriggers/${journeyId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ steps }),
    }
  )
    .then((res) => res.json())
    .then((res) => res.steps);
};

export const fetchSteps = async ({
  journeyId,
  token,
  apiKey,
}: {
  journeyId: string;
  token: string;
  apiKey: string;
}): Promise<null | Step[]> => {
  try {
    const res = await fetch(
      `https://dev.journeys.voicecompass.ai/v1/journeyTriggers/${journeyId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
      }
    );
    const json = await res.json();
    return json.steps;
  } catch (err) {
    return null;
  }
};
