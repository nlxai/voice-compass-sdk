import { writable } from "svelte/store";

interface VC {
  botId: string;
  apiKey: string;
  mounted: boolean;
  contactId: string | null;
}

export const vc = writable<VC>({
  botId: "bot-1234",
  apiKey: "api-key-1234",
  mounted: false,
  contactId: null,
});
