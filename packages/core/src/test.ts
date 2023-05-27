/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_VC_DEV_API_KEY: string;
  readonly VITE_VC_DEV_JOURNEY_ASSISTANT_ID: string;
  readonly VITE_VC_DEV_JOURNEY_ID: string;
}

import { create } from "./index";

const contactId = new URLSearchParams(window.location.search).get("cid") || "";

const vc = create({
  dev: false,
  // @ts-ignore
  apiKey: import.meta.env.VITE_VC_DEV_API_KEY,
  contactId,
  // @ts-ignore
  journeyId: import.meta.env.VITE_VC_DEV_JOURNEY_ID,
  // @ts-ignore
  journeyAssistantId: import.meta.env.VITE_VC_DEV_JOURNEY_ASSISTANT_ID,
});

vc.trackDomAnnotations();
